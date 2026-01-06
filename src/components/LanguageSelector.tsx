import { useState, useRef, useEffect } from 'react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
];

interface Props {
    currentLang?: string;
}

export default function LanguageSelector({ currentLang = 'en' }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (langCode: string) => {
        setIsOpen(false);

        // Navigate to the new locale URL
        const currentPath = window.location.pathname;

        // Remove current locale prefix if present
        let pathWithoutLocale = currentPath;
        for (const lang of languages) {
            if (currentPath.startsWith(`/${lang.code}/`) || currentPath === `/${lang.code}`) {
                pathWithoutLocale = currentPath.replace(`/${lang.code}`, '') || '/';
                break;
            }
        }

        // Build new URL
        const newPath = langCode === 'en'
            ? pathWithoutLocale
            : `/${langCode}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

        window.location.href = newPath || '/';
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-white/90"
            >
                <span>{currentLanguage.code.toUpperCase()}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50">
                    <div className="py-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${currentLang === lang.code ? 'text-brand-red' : 'text-white/80'
                                    }`}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
