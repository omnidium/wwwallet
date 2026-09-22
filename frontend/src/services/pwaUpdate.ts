import { registerSW } from 'virtual:pwa-register'
import { PWA_UPDATE_CHECK_INTERVAL_MS } from '@/config/appSettings'

/**
 * Registers the service worker and keeps checking for a newer deployed
 * version for as long as the app stays open, rather than only ever noticing
 * one on whatever schedule the browser happens to re-fetch sw.js on its own
 * (in practice: rarely, since nothing here was forcing a check). `immediate`
 * covers a fresh load/hard refresh; the interval covers a tab left open.
 *
 * registerType: 'autoUpdate' (see vite.config.ts) means the new service
 * worker itself skips waiting as soon as it's installed — the only piece
 * that was missing is calling updateSW() once onNeedRefresh actually fires,
 * which is what applies it and reloads to pick up the new build.
 */
export function setupPwaUpdates(): void {
  const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      if (!registration) return
      setInterval(() => void registration.update(), PWA_UPDATE_CHECK_INTERVAL_MS)
    },
    onNeedRefresh() {
      void updateSW(true)
    },
  })
}
