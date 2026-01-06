// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.yutubetomp4.online',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'pt', 'ja', 'ko', 'ar'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});