import { createI18n } from 'vue-i18n'
import { messages, SUPPORTED_LANGUAGES } from './locales'

const STORAGE_KEY = 'wwwallet-site.locale'

function detectInitialLocale(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in messages) return stored
  } catch {
    // Private-mode/blocked storage — fall through to browser detection.
  }
  // A deliberate improvement over the app itself, which has no navigator.language
  // detection — worth having here since there's no auth gate to unlock first.
  for (const candidate of navigator.languages ?? [navigator.language]) {
    const short = candidate.split('-')[0]
    const match = SUPPORTED_LANGUAGES.find((lang) => lang.id === candidate || lang.id === short)
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
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Private-mode/blocked storage — locale still applies for this page load.
  }
}
