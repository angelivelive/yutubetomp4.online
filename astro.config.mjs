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

  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://www.yutubetomp4.online/') {
          // @ts-ignore
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        return item;
      }
    })
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'pt', 'ja', 'ko', 'ar'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});