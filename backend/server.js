const express = require('express');
const cors = require('cors');
const ytdlp = require('yt-dlp-exec');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow your Vercel frontend
const allowedOrigins = [
  'https://www.yutubetomp4.online',
  'https://yutubetomp4.online',
  'http://localhost:4321', // Astro dev server
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TubeToMP4 API',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Validate YouTube URL
function isValidYouTubeUrl(url) {
  const patterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+/,
    /^(https?:\/\/)?youtu\.be\/[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]+/,
  ];
  return patterns.some(pattern => pattern.test(url));
}

// Get video info endpoint
app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    console.log(`Fetching info for: ${url}`);

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:Mozilla/5.0'],
    });

    // Extract relevant formats (MP4 video + audio)
    const videoFormats = info.formats
      .filter(f =>
        f.ext === 'mp4' &&
        f.vcodec !== 'none' &&
        f.acodec !== 'none' &&
        f.filesize
      )
      .map(f => ({
        formatId: f.format_id,
        quality: f.format_note || f.resolution || 'Unknown',
        resolution: f.resolution || `${f.width}x${f.height}`,
        ext: f.ext,
        filesize: f.filesize,
        filesizeApprox: f.filesize_approx,
        url: f.url,
        hasAudio: f.acodec !== 'none',
        hasVideo: f.vcodec !== 'none',
      }))
      .sort((a, b) => (b.filesize || 0) - (a.filesize || 0));

    // Get video-only formats for higher quality (need merge)
    const videoOnlyFormats = info.formats
      .filter(f =>
        f.ext === 'mp4' &&
        f.vcodec !== 'none' &&
        f.acodec === 'none' &&
        f.height >= 720
      )
      .map(f => ({
        formatId: f.format_id,
        quality: f.format_note || `${f.height}p`,
        resolution: f.resolution || `${f.width}x${f.height}`,
        height: f.height,
        ext: f.ext,
        filesize: f.filesize,
        filesizeApprox: f.filesize_approx,
        needsMerge: true,
      }))
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    // Get audio formats for MP3
    const audioFormats = info.formats
      .filter(f =>
        f.acodec !== 'none' &&
        f.vcodec === 'none' &&
        (f.ext === 'm4a' || f.ext === 'webm')
      )
      .map(f => ({
        formatId: f.format_id,
        quality: f.format_note || `${f.abr}kbps`,
        abr: f.abr,
        ext: f.ext,
        filesize: f.filesize,
        url: f.url,
      }))
      .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    const response = {
      id: info.id,
      title: info.title,
      description: info.description?.substring(0, 500),
      thumbnail: info.thumbnail,
      duration: info.duration,
      durationString: info.duration_string,
      viewCount: info.view_count,
      likeCount: info.like_count,
      uploadDate: info.upload_date,
      channel: info.channel,
      channelUrl: info.channel_url,
      formats: {
        video: videoFormats.slice(0, 5), // Top 5 combined formats
        videoOnly: videoOnlyFormats.slice(0, 5), // Top 5 video-only
        audio: audioFormats.slice(0, 3), // Top 3 audio formats
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching video info:', error.message);
    res.status(500).json({
      error: 'Failed to fetch video info',
      message: error.message
    });
  }
});

// Get direct download URL
app.post('/api/download', async (req, res) => {
  try {
    const { url, formatId, type = 'video' } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    console.log(`Getting download URL for: ${url}, format: ${formatId}, type: ${type}`);

    let format;
    if (formatId) {
      format = formatId;
    } else if (type === 'audio') {
      format = 'bestaudio[ext=m4a]/bestaudio';
    } else {
      format = 'best[ext=mp4]/best';
    }

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      format: format,
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: ['referer:youtube.com', 'user-agent:Mozilla/5.0'],
    });

    // Find the requested format
    const selectedFormat = info.formats.find(f => f.format_id === format) ||
                          info.formats[info.formats.length - 1];

    res.json({
      id: info.id,
      title: info.title,
      thumbnail: info.thumbnail,
      downloadUrl: selectedFormat?.url || info.url,
      format: {
        id: selectedFormat?.format_id,
        ext: selectedFormat?.ext,
        quality: selectedFormat?.format_note || selectedFormat?.resolution,
        filesize: selectedFormat?.filesize,
      },
    });
  } catch (error) {
    console.error('Error getting download URL:', error.message);
    res.status(500).json({
      error: 'Failed to get download URL',
      message: error.message
    });
  }
});

// Get available qualities for a video
app.post('/api/qualities', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Valid YouTube URL is required' });
    }

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
    });

    // Get unique quality options
    const qualities = [...new Set(
      info.formats
        .filter(f => f.ext === 'mp4' && f.height)
        .map(f => f.height)
    )].sort((a, b) => b - a);

    res.json({
      id: info.id,
      title: info.title,
      qualities: qualities.map(q => ({
        label: `${q}p`,
        value: q,
      })),
    });
  } catch (error) {
    console.error('Error getting qualities:', error.message);
    res.status(500).json({ error: 'Failed to get qualities' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`TubeToMP4 API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
