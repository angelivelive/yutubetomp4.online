import { useState, useRef } from 'react';

export default function ConverterWidget() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    if (!url) return;
    setStatus('processing');
    setProgress(0);

    // Mock progress simulation
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
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full rounded-xl bg-black/50 border-0 py-4 pl-12 pr-32 text-white placeholder:text-white/30 focus:ring-2 focus:ring-brand-red focus:outline-none sm:text-base sm:leading-6 transition-all duration-300"
              placeholder="Paste YouTube link here..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-x-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!url}
              >
                Start
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </>
        ) : status === 'processing' ? (
          <div className="w-full py-4 text-center space-y-4">
             <p className="text-white font-medium animate-pulse">Analyzing Video...</p>
             <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto relative">
                <div 
                  className="h-full bg-brand-red transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                </div>
             </div>
          </div>
        ) : (
          <div className="w-full py-2 flex items-center justify-between px-4">
             <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-white/10 rounded animate-pulse"></div> {/* Thumbnail Placeholder */}
                <div className="text-left">
                    <h3 className="text-white font-medium text-sm">Amazing Video Title</h3>
                    <p className="text-white/50 text-xs">Duration: 10:25 • Quality: 1080p</p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                 <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors font-medium">Download MP3</button>
                 <button className="px-4 py-2 bg-brand-red rounded-lg text-sm text-white hover:bg-red-600 transition-colors shadow-lg shadow-brand-red/20 font-medium">Download MP4</button>
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
