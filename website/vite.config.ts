import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
    // Groups with backend's 3001 / frontend's 3000 (see start_all.sh) so both
    // dev servers can run together — see the Launch button's VITE_APP_URL for
    // cross-linking between them.
    port: 3002,
    fs: {
      // Needed to @import ../../../shared/design-tokens.css (global.css) —
      // outside this project's root, which Vite's dev server otherwise
      // refuses to serve.
      allow: ['..'],
    },
  },
})
