import { useState } from 'react';

interface Props {
    lang?: string;
}

const translations: Record<string, Record<string, string>> = {
    en: {
        placeholder: 'Paste YouTube link here...',
        start: 'Start',
        processing: 'Analyzing Video...',
        downloadMp3: 'Download MP3',
        downloadMp4: 'Download MP4',
    },
    es: {
        placeholder: 'Pega el enlace de YouTube aquí...',
        start: 'Iniciar',
        processing: 'Analizando Video...',
        downloadMp3: 'Descargar MP3',
        downloadMp4: 'Descargar MP4',
    },
    de: {
        placeholder: 'YouTube-Link hier einfügen...',
        start: 'Starten',
        processing: 'Video wird analysiert...',
        downloadMp3: 'MP3 herunterladen',
        downloadMp4: 'MP4 herunterladen',
    },
    fr: {
        placeholder: 'Collez le lien YouTube ici...',
        start: 'Démarrer',
        processing: 'Analyse de la vidéo...',
        downloadMp3: 'Télécharger MP3',
        downloadMp4: 'Télécharger MP4',
    },
    pt: {
        placeholder: 'Cole o link do YouTube aqui...',
        start: 'Iniciar',
        processing: 'Analisando Vídeo...',
        downloadMp3: 'Baixar MP3',
        downloadMp4: 'Baixar MP4',
    },
    ja: {
        placeholder: 'YouTubeリンクをここに貼り付け...',
        start: '開始',
        processing: '動画を分析中...',
        downloadMp3: 'MP3をダウンロード',
        downloadMp4: 'MP4をダウンロード',
    },
    ko: {
        placeholder: 'YouTube 링크를 여기에 붙여넣기...',
        start: '시작',
        processing: '동영상 분석 중...',
        downloadMp3: 'MP3 다운로드',
        downloadMp4: 'MP4 다운로드',
    },
    ar: {
        placeholder: 'الصق رابط YouTube هنا...',
        start: 'ابدأ',
        processing: 'جاري تحليل الفيديو...',
        downloadMp3: 'تحميل MP3',
        downloadMp4: 'تحميل MP4',
    },
};

export default function ConverterWidget({ lang = 'en' }: Props) {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [progress, setProgress] = useState(0);

    const t = translations[lang] || translations.en;

    const handleStart = () => {
        if (!url) return;
        setStatus('processing');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus('success');
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const handleReset = () => {
        setStatus('idle');
        setUrl('');
        setProgress(0);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-brand-card/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50 ring-1 ring-white/5 overflow-hidden relative">
            <div className="relative flex items-center p-2">
                {status === 'idle' ? (
                    <>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/30">
                                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full rounded-xl bg-black/50 border-0 py-4 pl-12 pr-32 text-white placeholder:text-white/30 focus:ring-2 focus:ring-brand-red focus:outline-none sm:text-base sm:leading-6 transition-all duration-300"
                            placeholder={t.placeholder}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button
                                type="button"
                                onClick={handleStart}
                                className="inline-flex items-center gap-x-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!url}
                            >
                                {t.start}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : status === 'processing' ? (
                    <div className="w-full py-4 text-center space-y-4">
                        <p className="text-white font-medium animate-pulse">{t.processing}</p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto relative">
                            <div
                                className="h-full bg-brand-red transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)' }}></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full py-2 flex items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-10 bg-white/10 rounded animate-pulse"></div>
                            <div className="text-left">
                                <h3 className="text-white font-medium text-sm">Amazing Video Title</h3>
                                <p className="text-white/50 text-xs">Duration: 10:25 • Quality: 1080p</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors font-medium">{t.downloadMp3}</button>
                            <button className="px-4 py-2 bg-brand-red rounded-lg text-sm text-white hover:bg-red-600 transition-colors shadow-lg shadow-brand-red/20 font-medium">{t.downloadMp4}</button>
                            <button onClick={handleReset} className="p-2 text-white/50 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
