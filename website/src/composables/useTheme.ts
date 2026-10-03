import { ref, watch } from 'vue'
import { getSharedCookie, setSharedCookie } from './sharedPrefs'

export type ThemeName = 'light' | 'dark'

const COOKIE_KEY = 'wwwallet.theme'

function readInitialTheme(): ThemeName {
  // Prerendering (src/entry-server.ts) has no page to read it from.
  if (typeof document === 'undefined') return 'light'
  // index.html's inline blocking script already resolved and applied the
  // initial theme (shared cookie, else prefers-color-scheme) before any Vue
  // code runs, so we just read it back rather than re-deriving it.
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

// Module-level state: a singleton shared by every useTheme() call, the same
// pattern Pinia gives the app but without pulling Pinia into this project.
const theme = ref<ThemeName>(readInitialTheme())

let mediaListenerAttached = false
function attachSystemPreferenceListener() {
  if (mediaListenerAttached) return
  mediaListenerAttached = true
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    // Once the user (or the app, via the shared cookie) picks explicitly,
    // stop following the system setting.
    if (getSharedCookie(COOKIE_KEY)) return
    theme.value = event.matches ? 'dark' : 'light'
  })
}

watch(
  theme,
  (next) => {
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next)
  },
  { immediate: true },
)

// Re-reads the cookie and applies it if it changed — for when a bfcache
// restore (browser Back/Forward) repaints this exact page from a frozen
// snapshot instead of reloading it, so nothing else re-runs to notice a
// cookie written by another page (this one included) in the meantime.
export function resyncTheme() {
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if ((fromCookie === 'light' || fromCookie === 'dark') && fromCookie !== theme.value) {
    theme.value = fromCookie
  }
}

export function useTheme() {
  attachSystemPreferenceListener()

  function setTheme(next: ThemeName) {
    theme.value = next
    setSharedCookie(COOKIE_KEY, next)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
