import { createI18n } from 'vue-i18n'
import { messages, SUPPORTED_LANGUAGES } from '@/locales'
import { getSharedCookie } from '@/services/sharedPrefs'

export const LOCALE_COOKIE_KEY = 'wwwallet.locale'

export function isSupportedLocale(id: string): boolean {
  return SUPPORTED_LANGUAGES.some((lang) => lang.id === id)
}

// Pre-auth starting locale, mirroring the website's (website/src/i18n/index.ts):
// the shared cross-origin cookie first, so a language picked on either side is
// reflected in both, then the browser's own preference list. An unlocked
// vault's saved locale overrides this (see loadIntoStores, stores/vault.ts).
// Browser language codes that differ from our ids: `iw` is the legacy code
// DeepL's list uses for Hebrew (browsers report `he`), and Norwegian browsers
// usually report Bokmål `nb` or Nynorsk `nn` rather than the macrolanguage `no`.
const BROWSER_LOCALE_ALIASES: Record<string, string> = { he: 'iw', nb: 'no', nn: 'no' }

function detectInitialLocale(): string {
  const fromCookie = getSharedCookie(LOCALE_COOKIE_KEY)
  if (fromCookie && isSupportedLocale(fromCookie)) return fromCookie
  for (const candidate of navigator.languages ?? [navigator.language]) {
    const short = candidate.split('-')[0]!.toLowerCase()
    const id = BROWSER_LOCALE_ALIASES[short] ?? short
    const match = SUPPORTED_LANGUAGES.find((lang) => lang.id === candidate || lang.id === id)
    if (match) return match.id
  }
  return 'en'
}

// Message catalogs are bundled statically (src/locales/) rather than fetched
// from a backend — there's nothing to fetch, cache, or go offline for.
// `en` is fully populated; every other locale is a ready-to-fill-in stub.
export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages,
})
