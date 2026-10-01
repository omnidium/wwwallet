export interface LanguageInfo {
  id: string
  name: string
}

// Matches frontend/src/locales/languages.ts's list exactly — the two share a
// cross-origin locale cookie (see composables/sharedPrefs.ts), so a language
// picked in one needs to be a valid option in the other. Fully translated as
// of the shared/i18n/master_en.ts system (see src/i18n/locales/index.ts and
// scripts/sync-i18n.mjs at the repo root) — English is the master copy, but
// every language below renders its own translated content, not an English
// fallback.
export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { id: 'ar', name: 'عربي' },
  { id: 'bg', name: 'български' },
  { id: 'cs', name: 'čeština' },
  { id: 'da', name: 'dansk' },
  { id: 'de', name: 'Deutsch' },
  { id: 'el', name: 'Ελληνικά' },
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Español' },
  { id: 'et', name: 'eesti keel' },
  { id: 'fi', name: 'Suomalainen' },
  { id: 'fr', name: 'français' },
  { id: 'hu', name: 'Magyar' },
  { id: 'id', name: 'bahasa Indonesia' },
  { id: 'it', name: 'italiano' },
  { id: 'iw', name: 'עברית' },
  { id: 'ja', name: '日本' },
  { id: 'ko', name: '한국인' },
  { id: 'lt', name: 'lietuvių' },
  { id: 'lv', name: 'latviski' },
  { id: 'nl', name: 'Nederlands' },
  { id: 'no', name: 'norsk' },
  { id: 'pl', name: 'Polskie' },
  { id: 'ro', name: 'Română' },
  { id: 'ru', name: 'русский' },
  { id: 'sk', name: 'slovenský' },
  { id: 'sl', name: 'Slovenščina' },
  { id: 'sv', name: 'svenska' },
  { id: 'tr', name: 'Türk' },
  { id: 'uk', name: 'український' },
  { id: 'vi', name: 'Tiếng Việt' },
  { id: 'zh-CN', name: '华语' },
]
