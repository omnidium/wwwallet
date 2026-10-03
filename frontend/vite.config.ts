import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import { getAppVersion } from '../shared/config/appVersion'

// https://vite.dev/config/
export default defineConfig({
  // Moved out of frontend/ into shared/ — a first step toward the wallet
  // and the public website drawing their static assets (icons especially)
  // from one place instead of each keeping its own copy. Paths inside
  // (includeAssets/manifest.icons below, index.html's favicon link) are
  // unchanged since they're relative to whatever publicDir points at.
  publicDir: fileURLToPath(new URL('../shared/frontend-public', import.meta.url)),
  define: {
    __APP_VERSION__: JSON.stringify(getAppVersion()),
  },
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }),
    VitePWA({
      registerType: 'autoUpdate',
      // We call registerSW ourselves (see services/pwaUpdate.ts) so it can
      // also poll for updates on an interval, not just once per load —
      // injecting the plugin's own default registration script alongside
      // that would register the service worker twice. Must be `null`, not
      // `false`: the plugin only bakes the unconditional self.skipWaiting()
      // + clientsClaim() into the generated sw.js for registerType
      // 'autoUpdate' when injectRegister is 'auto' or null — `false` skips
      // that too, leaving the new worker stuck waiting forever and the
      // periodic update check with nothing to actually apply.
      injectRegister: null,
      includeAssets: ['favicon.ico', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-512-maskable.png'],
      manifest: {
        name: 'wwwallet',
        short_name: 'wwwallet',
        description: 'A personal, non-custodial Ethereum/EVM wallet',
        theme_color: '#0d1f1a',
        background_color: '#0d1f1a',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-inv-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-inv-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-inv-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // No runtime caching of API responses: provider data is cached in
      // exactly one place, IndexedDB (see stores/chainData.ts). A service
      // worker cache in front of it would hand back old responses as if they
      // were fresh whenever the network is slow.
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  resolve: {
    // A shared/ component imports 'vue' from outside this project, where
    // there's no node_modules to find it in — resolve it from here instead.
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Components shared with the other project (see shared/ui/).
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
  server: {
    fs: {
      // Needed to @import ../../../shared/design-tokens.css (main.css) —
      // outside this project's root, which Vite's dev server otherwise
      // refuses to serve.
      allow: ['..'],
    },
  },
})
