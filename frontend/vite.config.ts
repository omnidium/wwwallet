import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'node:child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// The commit itself is the version — no separate number to bump, and it
// points straight at exactly what's deployed for debugging. Falls back to
// 'dev' outside a git checkout (e.g. a source tarball) rather than failing
// the build over a version string nothing depends on functionally.
function getAppVersion(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
}

// https://vite.dev/config/
export default defineConfig({
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
        theme_color: '#1e1e2e',
        background_color: '#1e1e2e',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-inv-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-inv-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-inv-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/v1/chains/'),
            handler: 'NetworkFirst',
            options: { cacheName: 'chain-data', networkTimeoutSeconds: 5 },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
