export const languages = {
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    pt: 'Português',
    ja: '日本語',
    ko: '한국어',
    ar: 'العربية',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const translations = {
    en: {
        // Header
        'nav.home': 'Home',
        'nav.mp3': 'YouTube to MP3',
        'nav.mp4_guide': 'YouTube to MP4 Guide',
        'nav.features': 'Features',
        'nav.faq': 'FAQ',

        // Hero
        'hero.title': 'Convert YouTube to',
        'hero.title.highlight': 'MP4',
        'hero.description': 'The fastest and most reliable tool to download YouTube videos in 1080p, 4K, and 8K. No ads, no registration, completely free.',
        'hero.terms': 'By using our service you agree to our',
        'hero.terms.link': 'Terms of Service',

        // Converter
        'converter.placeholder': 'Paste YouTube link here...',
        'converter.start': 'Start',
        'converter.processing': 'Analyzing Video...',
        'converter.download.mp3': 'Download MP3',
        'converter.download.mp4': 'Download MP4',

        // How To Section
        'howto.title': 'How to Download YouTube Videos',
        'howto.step1.title': 'Copy the Video URL',
        'howto.step1.desc': 'Open YouTube and copy the URL of the video you want to download.',
        'howto.step2.title': 'Paste the Link',
        'howto.step2.desc': 'Paste the YouTube link into the search box above and click "Start".',
        'howto.step3.title': 'Select Quality',
        'howto.step3.desc': 'Choose your preferred video quality (360p, 480p, 720p, 1080p, 4K).',
        'howto.step4.title': 'Download',
        'howto.step4.desc': 'Click the "Download" button and save the file to your device.',
        'howto.step5.title': 'Enjoy Offline',
        'howto.step5.desc': 'Watch your downloaded video anytime, anywhere - no internet required.',

        // Why Us Section
        'whyus.title': 'Why Use Our Downloader?',
        'whyus.unlimited.title': 'Unlimited Conversions',
        'whyus.unlimited.desc': 'Convert as many videos as you want with no daily limits.',
        'whyus.tech.title': 'Latest Technology',
        'whyus.tech.desc': 'We use cutting-edge servers for lightning-fast conversions.',
        'whyus.noreg.title': 'No Registration Required',
        'whyus.noreg.desc': 'Start downloading immediately - no sign-up, no personal data.',
        'whyus.formats.title': 'Multiple Formats',
        'whyus.formats.desc': 'Download in MP4, MP3, WebM, and other popular formats.',
        'whyus.hd.title': 'HD Quality Support',
        'whyus.hd.desc': 'Download videos in 360p, 480p, 720p, 1080p, and 4K resolution.',

        // Features
        'features.title': 'Why Choose TubeToMP4?',
        'features.fast.title': 'Fastest Conversion',
        'features.fast.desc': 'Our advanced servers ensure the fastest download speeds without compromising quality.',
        'features.easy.title': 'Easy to Use',
        'features.easy.desc': 'Simply paste the URL and click download. No technical knowledge required.',
        'features.free.title': '100% Free',
        'features.free.desc': 'No hidden fees, no subscriptions, no limits. Completely free forever.',
        'features.noreg.title': 'No Registration',
        'features.noreg.desc': 'Start downloading immediately without creating an account or signing up.',
        'features.hd.title': 'HD Video Quality',
        'features.hd.desc': 'Download videos in original HD quality up to 4K and 8K resolution.',
        'features.devices.title': 'All Devices',
        'features.devices.desc': 'Works on Windows, Mac, iOS, Android, and any device with a browser.',

        // Footer
        'footer.pages': 'Pages',
        'footer.legal': 'Legal',
        'footer.disclaimer': 'Disclaimer',
        'footer.disclaimer.text': 'TubeToMP4 is an independent tool and is not affiliated with YouTube, Google, or Alphabet Inc. Please use this service responsibly and respect copyright laws.',
        'footer.copyright': 'All rights reserved.',
    },
    es: {
        // Header
        'nav.home': 'Inicio',
        'nav.mp3': 'YouTube a MP3',
        'nav.mp4_guide': 'Guía YouTube a MP4',
        'nav.features': 'Características',
        'nav.faq': 'Preguntas',

        // Hero
        'hero.title': 'Convierte YouTube a',
        'hero.title.highlight': 'MP4',
        'hero.description': 'La herramienta más rápida y confiable para descargar videos de YouTube en 1080p, 4K y 8K. Sin anuncios, sin registro, completamente gratis.',
        'hero.terms': 'Al usar nuestro servicio aceptas nuestros',
        'hero.terms.link': 'Términos de Servicio',

        // Converter
        'converter.placeholder': 'Pega el enlace de YouTube aquí...',
        'converter.start': 'Iniciar',
        'converter.processing': 'Analizando Video...',
        'converter.download.mp3': 'Descargar MP3',
        'converter.download.mp4': 'Descargar MP4',

        // How To Section
        'howto.title': 'Cómo Descargar Videos de YouTube',
        'howto.step1.title': 'Copia la URL del Video',
        'howto.step1.desc': 'Abre YouTube y copia la URL del video que deseas descargar.',
        'howto.step2.title': 'Pega el Enlace',
        'howto.step2.desc': 'Pega el enlace de YouTube en el cuadro de búsqueda y haz clic en "Iniciar".',
        'howto.step3.title': 'Selecciona la Calidad',
        'howto.step3.desc': 'Elige tu calidad de video preferida (360p, 480p, 720p, 1080p, 4K).',
        'howto.step4.title': 'Descargar',
        'howto.step4.desc': 'Haz clic en el botón "Descargar" y guarda el archivo en tu dispositivo.',
        'howto.step5.title': 'Disfruta Sin Conexión',
        'howto.step5.desc': 'Mira tu video descargado en cualquier momento y lugar, sin internet.',

        // Why Us Section
        'whyus.title': '¿Por Qué Usar Nuestro Descargador?',
        'whyus.unlimited.title': 'Conversiones Ilimitadas',
        'whyus.unlimited.desc': 'Convierte tantos videos como quieras sin límites diarios.',
        'whyus.tech.title': 'Última Tecnología',
        'whyus.tech.desc': 'Usamos servidores de última generación para conversiones ultra rápidas.',
        'whyus.noreg.title': 'Sin Registro',
        'whyus.noreg.desc': 'Comienza a descargar inmediatamente, sin registrarte ni dar datos personales.',
        'whyus.formats.title': 'Múltiples Formatos',
        'whyus.formats.desc': 'Descarga en MP4, MP3, WebM y otros formatos populares.',
        'whyus.hd.title': 'Calidad HD',
        'whyus.hd.desc': 'Descarga videos en resolución 360p, 480p, 720p, 1080p y 4K.',

        // Features
        'features.title': '¿Por Qué Elegir TubeToMP4?',
        'features.fast.title': 'Conversión Rápida',
        'features.fast.desc': 'Nuestros servidores avanzados garantizan las velocidades de descarga más rápidas.',
        'features.easy.title': 'Fácil de Usar',
        'features.easy.desc': 'Simplemente pega la URL y haz clic en descargar. Sin conocimientos técnicos.',
        'features.free.title': '100% Gratis',
        'features.free.desc': 'Sin tarifas ocultas, sin suscripciones, sin límites. Gratis para siempre.',
        'features.noreg.title': 'Sin Registro',
        'features.noreg.desc': 'Comienza a descargar inmediatamente sin crear una cuenta.',
        'features.hd.title': 'Calidad HD',
        'features.hd.desc': 'Descarga videos en calidad HD original hasta 4K y 8K.',
        'features.devices.title': 'Todos los Dispositivos',
        'features.devices.desc': 'Funciona en Windows, Mac, iOS, Android y cualquier dispositivo con navegador.',

        // Footer
        'footer.pages': 'Páginas',
        'footer.legal': 'Legal',
        'footer.disclaimer': 'Aviso Legal',
        'footer.disclaimer.text': 'TubeToMP4 es una herramienta independiente y no está afiliada con YouTube, Google o Alphabet Inc.',
        'footer.copyright': 'Todos los derechos reservados.',
    },
    de: {
        'nav.home': 'Startseite',
        'nav.mp3': 'YouTube zu MP3',
        'nav.features': 'Funktionen',
        'nav.faq': 'FAQ',
        'hero.title': 'YouTube zu',
        'hero.title.highlight': 'MP4',
        'hero.description': 'Das schnellste und zuverlässigste Tool zum Herunterladen von YouTube-Videos in 1080p, 4K und 8K. Keine Werbung, keine Registrierung, völlig kostenlos.',
        'hero.terms': 'Durch die Nutzung unseres Dienstes akzeptieren Sie unsere',
        'hero.terms.link': 'Nutzungsbedingungen',
        'converter.placeholder': 'YouTube-Link hier einfügen...',
        'converter.start': 'Starten',
        'converter.processing': 'Video wird analysiert...',
        'converter.download.mp3': 'MP3 herunterladen',
        'converter.download.mp4': 'MP4 herunterladen',
        'howto.title': 'So laden Sie YouTube-Videos herunter',
        'features.title': 'Warum TubeToMP4 wählen?',
        'footer.pages': 'Seiten',
        'footer.legal': 'Rechtliches',
        'footer.disclaimer': 'Haftungsausschluss',
        'footer.copyright': 'Alle Rechte vorbehalten.',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.mp3': 'YouTube vers MP3',
        'nav.features': 'Fonctionnalités',
        'nav.faq': 'FAQ',
        'hero.title': 'Convertir YouTube en',
        'hero.title.highlight': 'MP4',
        'hero.description': "L'outil le plus rapide et le plus fiable pour télécharger des vidéos YouTube en 1080p, 4K et 8K. Sans publicité, sans inscription, entièrement gratuit.",
        'converter.placeholder': 'Collez le lien YouTube ici...',
        'converter.start': 'Démarrer',
        'features.title': 'Pourquoi choisir TubeToMP4?',
    },
    pt: {
        'nav.home': 'Início',
        'nav.mp3': 'YouTube para MP3',
        'nav.features': 'Recursos',
        'nav.faq': 'Perguntas',
        'hero.title': 'Converter YouTube para',
        'hero.title.highlight': 'MP4',
        'hero.description': 'A ferramenta mais rápida e confiável para baixar vídeos do YouTube em 1080p, 4K e 8K. Sem anúncios, sem registro, totalmente grátis.',
        'converter.placeholder': 'Cole o link do YouTube aqui...',
        'converter.start': 'Iniciar',
        'features.title': 'Por que escolher TubeToMP4?',
    },
    ja: {
        'nav.home': 'ホーム',
        'nav.mp3': 'YouTubeからMP3',
        'nav.features': '機能',
        'nav.faq': 'よくある質問',
        'hero.title': 'YouTubeを',
        'hero.title.highlight': 'MP4',
        'hero.description': '1080p、4K、8KでYouTube動画をダウンロードする最速かつ最も信頼性の高いツール。広告なし、登録不要、完全無料。',
        'converter.placeholder': 'YouTubeリンクをここに貼り付け...',
        'converter.start': '開始',
        'features.title': 'TubeToMP4を選ぶ理由',
    },
    ko: {
        'nav.home': '홈',
        'nav.mp3': 'YouTube에서 MP3로',
        'nav.features': '기능',
        'nav.faq': '자주 묻는 질문',
        'hero.title': 'YouTube를',
        'hero.title.highlight': 'MP4',
        'hero.description': '1080p, 4K, 8K로 YouTube 동영상을 다운로드하는 가장 빠르고 안정적인 도구입니다. 광고 없음, 가입 불필요, 완전 무료.',
        'converter.placeholder': 'YouTube 링크를 여기에 붙여넣기...',
        'converter.start': '시작',
        'features.title': 'TubeToMP4를 선택하는 이유',
    },
    ar: {
        'nav.home': 'الرئيسية',
        'nav.mp3': 'YouTube إلى MP3',
        'nav.features': 'الميزات',
        'nav.faq': 'الأسئلة الشائعة',
        'hero.title': 'تحويل YouTube إلى',
        'hero.title.highlight': 'MP4',
        'hero.description': 'أسرع وأكثر أداة موثوقة لتحميل مقاطع فيديو YouTube بجودة 1080p و 4K و 8K. بدون إعلانات، بدون تسجيل، مجاني تماماً.',
        'converter.placeholder': 'الصق رابط YouTube هنا...',
        'converter.start': 'ابدأ',
        'features.title': 'لماذا تختار TubeToMP4؟',
    },
} as const;

export function useTranslations(lang: Language) {
    return function t(key: keyof typeof translations.en): string {
        // @ts-ignore
        return translations[lang][key] || translations.en[key] || key;
    }
}

export function getLangFromUrl(url: URL): Language {
    const [, lang] = url.pathname.split('/');
    if (lang in languages) return lang as Language;
    return defaultLang;
}
