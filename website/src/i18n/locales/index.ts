import en from './en'

export { SUPPORTED_LANGUAGES, type LanguageInfo } from './languages'

// Just English for now — see languages.ts for why. Adding a locale later is
// a matter of adding a file here and to SUPPORTED_LANGUAGES, same as the app.
export const messages = {
  en,
}
