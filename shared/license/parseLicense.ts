// The repo's LICENSE (PolyForm Strict 1.0.0) as structured blocks, for the
// wallet app and the marketing site to show in a panel of their own rather
// than sending people off to GitHub. Both import the real file at build time
// (`../../LICENSE?raw` — their Vite configs allow reading above their own
// root), so what's shown can never drift from the licence itself.
//
// Only the Markdown that file actually uses is understood: `#`/`##`
// headings, blank-line-separated paragraphs (a lone line ending a paragraph
// is joined to it), and `<https://…>` autolinks. Output is plain data, never
// HTML — the panels render it as elements, so nothing is ever injected.
//
// The "Required Notice:" line's bare repo URL is left out of what's shown:
// the panels link to the repo themselves ("View source on GitHub"), so it
// would only repeat that link as raw text at the top of the licence.

export type LicenseInline = { text: string } | { href: string }

export type LicenseBlock =
  | { kind: 'title'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; parts: LicenseInline[] }

const AUTOLINK = /<(https?:\/\/[^>\s]+)>/g
const PARENTHESISED_URL = /\s*\(https?:\/\/[^)\s]+\)/g

function inlineParts(text: string): LicenseInline[] {
  const parts: LicenseInline[] = []
  let last = 0
  for (const match of text.matchAll(AUTOLINK)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) })
    parts.push({ href: match[1]! })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}

export function parseLicense(source: string): LicenseBlock[] {
  const blocks: LicenseBlock[] = []
  for (const chunk of source.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const text = chunk.trim()
    if (!text) continue
    if (text.startsWith('## ')) blocks.push({ kind: 'heading', text: text.slice(3).trim() })
    else if (text.startsWith('# ')) blocks.push({ kind: 'title', text: text.slice(2).trim() })
    else {
      let paragraph = text.replace(/\s*\n\s*/g, ' ')
      if (paragraph.startsWith('Required Notice:')) paragraph = paragraph.replace(PARENTHESISED_URL, '')
      blocks.push({ kind: 'paragraph', parts: inlineParts(paragraph) })
    }
  }
  return blocks
}
