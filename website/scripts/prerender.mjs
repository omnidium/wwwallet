#!/usr/bin/env node
// The build's last step (see package.json's build-only): turns the built
// single-page site into finished HTML, one page per language — English at
// dist/index.html, the rest at dist/<code>/index.html — each with its own
// title, description, canonical and alternate-language links, link-preview
// tags and structured data, plus a sitemap listing them all.
//
// Search engines and AI crawlers then see the whole page, in every
// language, without running JavaScript (most AI crawlers never do); in the
// browser, Vue takes the markup over in place (src/main.ts).
//
// Renders with the Node build of src/entry-server.ts (vite build --ssr).

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SSR_DIST = path.join(ROOT, 'dist-ssr')

const {
  render,
  headData,
  SUPPORTED_LANGUAGES,
  DEFAULT_LOCALE,
  languageTag,
  pathForLocale,
  textDirection,
  APP_URL,
  GITHUB_REPO_URL,
  WEBSITE_URL,
} = await import(
  pathToFileURL(path.join(SSR_DIST, 'entry-server.js')).href
)

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')
for (const marker of ['<div id="teleports"></div>', '<html lang="en">', '<title>wwwallet</title>', '<meta name="description" content="" />', '<!--seo-head-->', '<div id="app"></div>']) {
  if (!template.includes(marker)) throw new Error(`prerender: index.html no longer contains ${marker}`)
}

const OG_IMAGE = `${WEBSITE_URL}/og-image.png`
const LOGO = `${WEBSITE_URL}/icons/icon-inv-512.png`
const locales = SUPPORTED_LANGUAGES.map((lang) => lang.id)
const urlFor = (id) => WEBSITE_URL + pathForLocale(id)

const escapeHtml = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Inside <script>, only "</" could end it early.
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

// Every language's page, plus x-default: the root, which picks the
// visitor's own language for them.
const alternates = [
  ...locales.map((id) => ({ hreflang: languageTag(id), href: urlFor(id) })),
  { hreflang: 'x-default', href: urlFor(DEFAULT_LOCALE) },
]

function structuredData(id, head) {
  const url = urlFor(id)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${WEBSITE_URL}/#organization`,
        name: 'wwwallet',
        url: `${WEBSITE_URL}/`,
        logo: LOGO,
        sameAs: [GITHUB_REPO_URL],
      },
      {
        '@type': 'WebSite',
        '@id': `${WEBSITE_URL}/#website`,
        name: 'wwwallet',
        url: `${WEBSITE_URL}/`,
        publisher: { '@id': `${WEBSITE_URL}/#organization` },
        inLanguage: locales.map(languageTag),
      },
      {
        '@type': 'WebApplication',
        '@id': `${WEBSITE_URL}/#app`,
        name: 'wwwallet',
        url: APP_URL,
        description: head.description,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any — runs in a web browser',
        browserRequirements: 'A modern web browser',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: locales.map(languageTag),
        publisher: { '@id': `${WEBSITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faqs`,
        url,
        inLanguage: languageTag(id),
        mainEntity: head.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }
}

function seoHead(id, head) {
  const url = urlFor(id)
  const title = escapeHtml(head.title)
  const description = escapeHtml(head.description)
  return [
    `<link rel="canonical" href="${url}" />`,
    ...alternates.map((alt) => `<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="wwwallet" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${jsonLd(structuredData(id, head))}</script>`,
  ]
    .map((line) => `    ${line}`)
    .join('\n')
    .trimStart()
}

for (const id of locales) {
  const head = headData(id)
  const { html: appHtml, teleports } = await render(id)
  const page = template
    .replace('<html lang="en">', `<html lang="${languageTag(id)}" dir="${textDirection(id)}">`)
    .replace('<title>wwwallet</title>', `<title>${escapeHtml(head.title)}</title>`)
    .replace('<meta name="description" content="" />', `<meta name="description" content="${escapeHtml(head.description)}" />`)
    .replace('<!--seo-head-->', seoHead(id, head))
    // A function, so "$" in the markup isn't read as a replacement pattern.
    .replace('<div id="app"></div>', () => `<div id="app">${appHtml}</div>`)
    .replace('<div id="teleports"></div>', () => `<div id="teleports">${teleports}</div>`)
  const dir = path.join(DIST, pathForLocale(id))
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), page)
}

// Each page listed with all its translations, as search engines prefer.
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${locales
  .map(
    (id) => `  <url>
    <loc>${urlFor(id)}</loc>
    <lastmod>${today}</lastmod>
${alternates.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)

await rm(SSR_DIST, { recursive: true, force: true })
console.log(`prerender: ${locales.length} languages written to dist/, plus sitemap.xml`)
