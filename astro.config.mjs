// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// Bing-optimized sitemap configuration
const siteUrl = 'https://www.yutubetomp4.online';

// High-priority pages for Bing
const highPriorityPages = [
  '/',
  '/youtube-to-mp4',
  '/youtube-to-mp3',
  '/faq',
];

// Medium priority SEO landing pages
const seoLandingPages = [
  '/yotube-mp4',
  '/youtube-to-mp4-free',
  '/youtube-url-to-mp4',
  '/youtube-videos-to-mp4',
  '/ytb-to-mp4',
];

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom filter to exclude unnecessary pages
      filter: (page) => !page.includes('/_') && !page.includes('/api/'),
      // Bing-optimized serialization
      serialize(item) {
        const urlPath = item.url.replace(siteUrl, '');

        // Homepage - highest priority
        if (item.url === `${siteUrl}/` || item.url === siteUrl) {
          // @ts-ignore
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        // Main converter pages - high priority
        else if (highPriorityPages.some(page => urlPath === page || urlPath === `${page}/`)) {
          // @ts-ignore
          item.changefreq = 'daily';
          item.priority = 0.9;
        }
        // SEO landing pages - medium-high priority
        else if (seoLandingPages.some(page => urlPath === page || urlPath === `${page}/`)) {
          // @ts-ignore
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        // Localized pages - medium priority
        else if (urlPath.match(/^\/(es|de|fr|pt|ja|ko|ar)\//)) {
          // @ts-ignore
          item.changefreq = 'weekly';
          item.priority = 0.7;
        }
        // Legal pages - lower priority
        else if (urlPath.includes('/terms') || urlPath.includes('/privacy')) {
          // @ts-ignore
          item.changefreq = 'monthly';
          item.priority = 0.3;
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