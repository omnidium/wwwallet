import { createI18n } from 'vue-i18n'
import { messages, SUPPORTED_LANGUAGES } from './locales'
import { getSharedCookie, setSharedCookie } from '@/composables/sharedPrefs'

const COOKIE_KEY = 'wwwallet.locale'

function isSupported(id: string): boolean {
  return SUPPORTED_LANGUAGES.some((lang) => lang.id === id)
}

// Browser language codes that differ from our ids: `iw` is the legacy code
// DeepL's list uses for Hebrew (browsers report `he`), and Norwegian browsers
// usually report Bokmål `nb` or Nynorsk `nn` rather than the macrolanguage `no`.
const BROWSER_LOCALE_ALIASES: Record<string, string> = { he: 'iw', nb: 'no', nn: 'no' }

function detectInitialLocale(): string {
  // Shared with the wallet app (app.wwwallet.me) via a cross-origin cookie —
  // takes priority over browser-language detection so a language picked in
  // either place is reflected in both.
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if (fromCookie && isSupported(fromCookie)) return fromCookie
  // Then the browser's own preference list — same order as the wallet app's
  // (frontend/src/i18n.ts).
  for (const candidate of navigator.languages ?? [navigator.language]) {
    const short = candidate.split('-')[0]!.toLowerCase()
    const id = BROWSER_LOCALE_ALIASES[short] ?? short
    const match = SUPPORTED_LANGUAGES.find((lang) => lang.id === candidate || lang.id === id)
    if (match) return match.id
  }
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

document.documentElement.lang = i18n.global.locale.value

export function setLocale(id: string) {
  i18n.global.locale.value = id as 'en'
  document.documentElement.lang = id
  setSharedCookie(COOKIE_KEY, id)
}

// Re-reads the cookie and applies it if it changed — for when a bfcache
// restore (browser Back/Forward) repaints this exact page from a frozen
// snapshot instead of reloading it, so nothing else re-runs to notice a
// cookie written by another page (this one included) in the meantime.
export function resyncLocale() {
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if (fromCookie && isSupported(fromCookie) && fromCookie !== i18n.global.locale.value) {
    i18n.global.locale.value = fromCookie as 'en'
    document.documentElement.lang = fromCookie
  }
}
