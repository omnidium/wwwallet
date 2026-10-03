import { createI18n } from 'vue-i18n'
import { messages, SUPPORTED_LANGUAGES } from './locales'
import { getSharedCookie, setSharedCookie } from '@/composables/sharedPrefs'
import { DEFAULT_LOCALE, isSupported, languageTag, pathForLocale, textDirection } from './paths'

const COOKIE_KEY = 'wwwallet.locale'

// Browser language codes that differ from our ids: `iw` is the legacy code
// DeepL's list uses for Hebrew (browsers report `he`), and Norwegian browsers
// usually report Bokmål `nb` or Nynorsk `nn` rather than the macrolanguage `no`.
const BROWSER_LOCALE_ALIASES: Record<string, string> = { he: 'iw', nb: 'no', nn: 'no' }

// Starts in English and touches no browser API, so the build can import it
// to prerender every language (src/entry-server.ts). In the browser,
// main.ts sets the language the page's URL is for before mounting.
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

/**
 * The language this visitor would choose: one picked before, here or in the
 * wallet app (a cookie both share), else their browser's preference.
 */
export function preferredLocale(): string {
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if (fromCookie && isSupported(fromCookie)) return fromCookie
  // Same order as the wallet app's (frontend/src/i18n.ts).
  for (const candidate of navigator.languages ?? [navigator.language]) {
    const short = candidate.split('-')[0]!.toLowerCase()
    const id = BROWSER_LOCALE_ALIASES[short] ?? short
    const match = SUPPORTED_LANGUAGES.find((lang) => lang.id === candidate || lang.id === id)
    if (match) return match.id
  }
  return DEFAULT_LOCALE
}

/**
 * Shows the page in a language: its text, and the URL, <html lang> and dir, title
 * and description that go with it (each language has its own page — see
 * paths.ts). The URL is replaced, not pushed: switching language isn't a
 * step Back should undo.
 */
export function applyLocale(id: string) {
  i18n.global.locale.value = id as 'en'
  document.documentElement.lang = languageTag(id)
  document.documentElement.dir = textDirection(id)
  const url = pathForLocale(id) + location.search + location.hash
  if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url)
  document.title = i18n.global.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.global.t('meta.description'))
}

/** A language the visitor picked — remembered, for this site and the wallet app. */
export function setLocale(id: string) {
  applyLocale(id)
  setSharedCookie(COOKIE_KEY, id)
}

// Re-reads the cookie and applies it if it changed — for when a bfcache
// restore (browser Back/Forward) repaints this exact page from a frozen
// snapshot instead of reloading it, so nothing else re-runs to notice a
// cookie written by another page (this one included) in the meantime.
export function resyncLocale() {
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if (fromCookie && isSupported(fromCookie) && fromCookie !== i18n.global.locale.value) applyLocale(fromCookie)
}
