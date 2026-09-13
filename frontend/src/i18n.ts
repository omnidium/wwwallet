import { createI18n } from 'vue-i18n'
import { messages } from '@/locales'

// Message catalogs are bundled statically (src/locales/) rather than fetched
// from a backend — there's nothing to fetch, cache, or go offline for.
// `en` is fully populated; every other locale is a ready-to-fill-in stub.
export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
