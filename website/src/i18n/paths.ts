import { SUPPORTED_LANGUAGES } from './locales/languages'

// Each language has its own URL — English at the root, the rest under
// their code (/de/, /ja/, /zh-cn/) — so search engines can index every
// translation, not just whichever one a crawler's browser happened to get.
// Pure functions: used by the browser and by the build's prerender step
// (scripts/prerender.mjs) alike.

export const DEFAULT_LOCALE = 'en'

export function isSupported(id: string): boolean {
  return SUPPORTED_LANGUAGES.some((lang) => lang.id === id)
}

/** The page's path for a language: `/` for English, `/de/` for German. */
export function pathForLocale(id: string): string {
  return id === DEFAULT_LOCALE ? '/' : `/${id.toLowerCase()}/`
}

/** The language a path is for, or null for the root (and anything else). */
export function localeFromPath(pathname: string): string | null {
  const segment = pathname.split('/')[1]?.toLowerCase()
  if (!segment) return null
  return SUPPORTED_LANGUAGES.find((lang) => lang.id.toLowerCase() === segment)?.id ?? null
}

// The standard (BCP 47) tag for <html lang> and hreflang, where our id —
// DeepL's — differs: `iw` is Hebrew's withdrawn code.
const LANGUAGE_TAGS: Record<string, string> = { iw: 'he' }

export function languageTag(id: string): string {
  return LANGUAGE_TAGS[id] ?? id
}

// Written right to left: Arabic and Hebrew. The page's layout mirrors with
// it (the CSS uses start/end rather than left/right).
const RTL_LANGUAGES = new Set(['ar', 'iw'])

/** The <html dir> for a language. */
export function textDirection(id: string): 'ltr' | 'rtl' {
  return RTL_LANGUAGES.has(id) ? 'rtl' : 'ltr'
}
