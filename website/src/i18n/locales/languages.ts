export interface LanguageInfo {
  id: string
  name: string
}

// English-only at launch — real, native-quality copy rather than machine
// translation. Structured the same way as frontend/src/locales/languages.ts
// so more languages can be added later without reshaping anything.
export const SUPPORTED_LANGUAGES: LanguageInfo[] = [{ id: 'en', name: 'English' }]
