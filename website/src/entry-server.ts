// The build's prerender step (scripts/prerender.mjs) imports this, built for
// Node, to turn the site into finished HTML, one page per language — so
// search engines and AI crawlers, most of which never run JavaScript, see
// the whole page rather than an empty <div id="app">.

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { i18n } from './i18n'
import { messages, SUPPORTED_LANGUAGES } from './i18n/locales'

export { SUPPORTED_LANGUAGES }
export { DEFAULT_LOCALE, languageTag, pathForLocale, textDirection } from './i18n/paths'
export { APP_URL, GITHUB_REPO_URL, WEBSITE_URL } from '@shared/config/links'

/**
 * The page's markup in one language, and what its <Teleport to="#teleports">s
 * render (the closed panels' placeholders), for index.html's #teleports
 * container — where Vue looks for it when taking the page over. Call one at
 * a time: they share one i18n.
 */
export async function render(locale: string): Promise<{ html: string; teleports: string }> {
  i18n.global.locale.value = locale as 'en'
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(createSSRApp(App).use(i18n), context)
  return { html, teleports: context.teleports?.['#teleports'] ?? '' }
}

/** What the page's <head> needs in one language — title, description, FAQs. */
export function headData(locale: string) {
  const m = messages[locale as keyof typeof messages]
  return {
    title: m.meta.title,
    description: m.meta.description,
    faqs: m.faqs.items.map((item) => ({ q: item.q, a: item.a })),
  }
}
