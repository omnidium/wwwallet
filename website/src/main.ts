import { createApp, createSSRApp } from 'vue'
import { applyLocale, i18n, preferredLocale } from './i18n'
import { localeFromPath, DEFAULT_LOCALE } from './i18n/paths'
import App from './App.vue'
import './style/global.css'

const container = document.getElementById('app')!
// The built site arrives as finished HTML, one page per language
// (scripts/prerender.mjs), which Vue takes over in place; the dev server
// sends an empty page, rendered from scratch.
const prerendered = container.hasChildNodes()
const fromPath = localeFromPath(location.pathname)

// First in the language the page's markup is in, so taking it over matches.
i18n.global.locale.value = (fromPath ?? DEFAULT_LOCALE) as 'en'
;(prerendered ? createSSRApp : createApp)(App).use(i18n).mount(container)

// The root is the English page, but a visitor arriving there gets their own
// language — one they picked before, or their browser's — switched to in
// place, URL and all. A language's own URL (/de/) always shows that language:
// it's what was linked to, or clicked in a search result.
applyLocale(fromPath ?? preferredLocale())
