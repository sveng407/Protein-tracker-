import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Protein Tracker – Blühendes Tagebuch',
        short_name: 'ProteinTracker',
        description: 'Logge dein Protein täglich und lass deinen Garten erblühen.',
        theme_color: '#C4A8FF',
        background_color: '#FFF0F7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/Protein-tracker-/',
        scope: '/Protein-tracker-/',
        categories: ['health', 'fitness', 'food'],
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        runtimeCaching: [
          // Cache Open Food Facts API responses for 24h
          {
            urlPattern: /^https:\/\/world\.openfoodfacts\.net\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'off-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              networkTimeoutSeconds: 5,
            },
          },
          // Cache Firebase Auth scripts
          {
            urlPattern: /^https:\/\/.*\.googleapis\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-apis',
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
    }),
  ],
  base: '/Protein-tracker-/',
  build: {
    outDir: 'docs',
  },
})
