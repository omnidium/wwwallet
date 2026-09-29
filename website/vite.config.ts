import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Distinct from frontend/'s 5173 so both dev servers can run together —
    // see the Launch button's VITE_APP_URL for cross-linking between them.
    port: 5174,
  },
})
