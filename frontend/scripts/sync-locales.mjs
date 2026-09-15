#!/usr/bin/env node
// Keeps every stub in src/locales/ (one file per language) in sync with
// en.ts, the single hand-maintained source of truth:
//
//   - a key that exists in en.ts but not in a locale file is machine
//     translated and added
//   - a key that exists in a locale file but no longer exists in en.ts is
//     removed (prunes now-empty parent objects too)
//   - a key whose English text changed since it was last translated is
//     re-translated — UNLESS the target-language value no longer matches
//     what this script last wrote there, which means a human edited it by
//     hand; those are left alone and flagged for manual review instead of
//     being silently overwritten
//
// Translation is via DeepL's API, restricted to DeepL's own "premium"
// language tier — the 30 (+ English) languages where DeepL also supports
// glossaries, style rules and translation memory, i.e. its long-established
// quality set — rather than the much larger "basic translation only" tier
// it has since added, which has no such quality signal. See LOCALE_CODES.
//
// Usage:
//   node scripts/sync-locales.mjs             # sync every locale
//   node scripts/sync-locales.mjs --dry-run   # report only, no writes/calls
//   node scripts/sync-locales.mjs --langs=es,fr,de   # limit to these codes
//
// Requires DEEPL_API_KEY, either already in the environment or in a
// gitignored frontend/.env.locales file (see .env.example). Get one at
// https://www.deepl.com/en/your-account/keys after signing up for the free
// Developer plan (hits api-free.deepl.com — confirm the current character
// allowance there, DeepL has changed how this plan is packaged).

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRONTEND_ROOT = path.join(__dirname, '..')
const LOCALES_DIR = path.join(FRONTEND_ROOT, 'src', 'locales')
const STATE_PATH = path.join(LOCALES_DIR, '.translation-state.json')
const EN_PATH = path.join(LOCALES_DIR, 'en.ts')

// DeepL's 30 "premium" target languages (English, the 31st, is the source
// and has no locale file of its own). Keys are this repo's locale-file
// codes; values are the code DeepL's API expects — identical for most, but
// three of this repo's codes predate DeepL entirely and use older
// conventions (Google Translate's legacy "iw" for Hebrew, and a bare "no"
// for Norwegian where DeepL is specifically Bokmål, "nb"). Kept in sync
// with src/locales/index.ts and src/locales/languages.ts by hand — if you
// add or remove a language there, update this map too.
const LOCALE_TO_DEEPL = {
  ar: 'AR', bg: 'BG', cs: 'CS', da: 'DA', de: 'DE', el: 'EL', es: 'ES', et: 'ET',
  fi: 'FI', fr: 'FR', hu: 'HU', id: 'ID', it: 'IT', iw: 'HE', ja: 'JA', ko: 'KO',
  lt: 'LT', lv: 'LV', nl: 'NL', no: 'NB', pl: 'PL', ro: 'RO', ru: 'RU', sk: 'SK',
  sl: 'SL', sv: 'SV', tr: 'TR', uk: 'UK', vi: 'VI', 'zh-CN': 'ZH',
}
const LOCALE_CODES = Object.keys(LOCALE_TO_DEEPL)

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const langsArg = args.find((a) => a.startsWith('--langs='))
const onlyLangs = langsArg ? new Set(langsArg.slice('--langs='.length).split(',')) : null

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {}
  const out = {}
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*?)\s*$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

const API_KEY =
  process.env.DEEPL_API_KEY || loadEnvFile(path.join(FRONTEND_ROOT, '.env.locales')).DEEPL_API_KEY

// The free Developer plan uses a different host than a paid Pro key.
// DeepL free-plan keys are conventionally suffixed ":fx" — used here only to
// pick the right host automatically; if that convention changes, override
// with DEEPL_API_HOST.
const API_HOST =
  process.env.DEEPL_API_HOST ||
  (API_KEY?.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com')

// Locale modules are plain `export default { ... }` object literals with no
// TypeScript-specific syntax (no type annotations), so evaluating the object
// literal directly is safe and avoids pulling in a TS toolchain just to read
// our own generated files.
function loadLocaleModule(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const literal = src.replace(/^\s*export\s+default\s*/m, '').trim().replace(/;\s*$/, '')
  return new Function(`'use strict'; return (${literal})`)()
}

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object') flatten(v, key, out)
    else out[key] = v
  }
  return out
}

function setPath(obj, dottedKey, value) {
  const parts = dottedKey.split('.')
  let node = obj
  for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]] ??= {}
  node[parts.at(-1)] = value
}

function deletePath(obj, dottedKey) {
  const parts = dottedKey.split('.')
  let node = obj
  for (let i = 0; i < parts.length - 1; i++) {
    node = node?.[parts[i]]
    if (!node) return
  }
  delete node[parts.at(-1)]
}

function pruneEmptyObjects(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] !== null && typeof obj[k] === 'object') {
      pruneEmptyObjects(obj[k])
      if (Object.keys(obj[k]).length === 0) delete obj[k]
    }
  }
}

function hash(str) {
  return createHash('sha256').update(str).digest('hex').slice(0, 16)
}

// vue-i18n interpolation tokens like "{count}" must survive machine
// translation byte-for-byte. Swap each for a numbered sentinel that has no
// linguistic content for the translator to "helpfully" reword, then swap
// the real tokens back in afterward.
function protectPlaceholders(str) {
  const tokens = []
  const protectedText = str.replace(/\{[^}]+\}/g, (m) => {
    tokens.push(m)
    return `@@${tokens.length - 1}@@`
  })
  return { protectedText, tokens }
}

function restorePlaceholders(str, tokens) {
  return str.replace(/@@\s*(\d+)\s*@@/g, (_, i) => tokens[Number(i)] ?? '')
}

async function translateBatch(texts, deeplTargetLang) {
  if (texts.length === 0) return []
  // DeepL's documented limit is 50 text items per request, tighter than
  // most providers — chunk conservatively.
  const CHUNK = 50
  const out = []
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK)
    let lastErr
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(`${API_HOST}/v2/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `DeepL-Auth-Key ${API_KEY}`,
          },
          body: JSON.stringify({ text: chunk, source_lang: 'EN', target_lang: deeplTargetLang }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
        const data = await res.json()
        out.push(...data.translations.map((t) => t.text))
        lastErr = null
        break
      } catch (err) {
        lastErr = err
        if (attempt < 3) await new Promise((r) => setTimeout(r, 500 * attempt))
      }
    }
    if (lastErr) throw new Error(`translate(${deeplTargetLang}) failed: ${lastErr.message}`)
  }
  return out
}

async function main() {
  if (!dryRun && !API_KEY) {
    console.error('DEEPL_API_KEY is not set (env var, or frontend/.env.locales).')
    console.error('Pass --dry-run to preview changes without calling the API.')
    process.exit(1)
  }

  const enFlat = flatten(loadLocaleModule(EN_PATH))
  const enKeys = new Set(Object.keys(enFlat))
  const state = existsSync(STATE_PATH) ? JSON.parse(readFileSync(STATE_PATH, 'utf8')) : {}

  let totalCharsSent = 0
  const report = []
  const failures = []

  for (const code of LOCALE_CODES) {
    if (onlyLangs && !onlyLangs.has(code)) continue
    const filePath = path.join(LOCALES_DIR, `${code}.ts`)
    if (!existsSync(filePath)) continue

    const current = loadLocaleModule(filePath)
    const currentFlat = flatten(current)
    const localeState = state[code] ?? {}

    const toRemove = Object.keys(currentFlat).filter((k) => !enKeys.has(k))
    const toAdd = [...enKeys].filter((k) => !(k in currentFlat))
    const toRetranslate = [...enKeys].filter((k) => {
      if (toAdd.includes(k)) return false
      const tracked = localeState[k]
      if (!tracked) return false // pre-dates this tool tracking it — leave as-is
      const enChanged = tracked.enHash !== hash(enFlat[k])
      const handEdited = tracked.value !== currentFlat[k]
      return enChanged && !handEdited
    })
    const needsReview = [...enKeys].filter((k) => {
      const tracked = localeState[k]
      if (!tracked) return false
      return tracked.enHash !== hash(enFlat[k]) && tracked.value !== currentFlat[k]
    })

    report.push({
      code,
      add: toAdd.length,
      remove: toRemove.length,
      retranslate: toRetranslate.length,
      review: needsReview.length,
    })

    const keysToTranslate = [...toAdd, ...toRetranslate]
    const protectedPairs = keysToTranslate.map((k) => protectPlaceholders(enFlat[k]))
    totalCharsSent += protectedPairs.reduce((s, p) => s + p.protectedText.length, 0)

    if (dryRun) continue
    if (keysToTranslate.length === 0 && toRemove.length === 0) continue

    try {
      const translated = await translateBatch(
        protectedPairs.map((p) => p.protectedText),
        LOCALE_TO_DEEPL[code],
      )
      const next = structuredClone(current)

      for (const k of toRemove) {
        deletePath(next, k)
        delete localeState[k]
      }
      keysToTranslate.forEach((k, i) => {
        const finalText = restorePlaceholders(translated[i], protectedPairs[i].tokens)
        setPath(next, k, finalText)
        localeState[k] = { enHash: hash(enFlat[k]), value: finalText }
      })
      pruneEmptyObjects(next)
      state[code] = localeState

      writeFileSync(filePath, `export default ${JSON.stringify(next, null, 2)}\n`)
    } catch (err) {
      failures.push({ code, error: err.message })
    }
  }

  if (!dryRun) {
    writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n')
    execFileSync(
      'npx',
      ['prettier', '--write', 'src/locales/*.ts', 'src/locales/.translation-state.json'],
      { cwd: FRONTEND_ROOT, stdio: 'inherit' },
    )
  }

  const changed = report.filter((r) => r.add || r.remove || r.retranslate || r.review)
  console.log(`\n${dryRun ? '[dry run] ' : ''}${changed.length} of ${report.length} locales have changes.`)
  console.log(`Estimated characters sent to DeepL: ${totalCharsSent} (confirm this fits your plan's allowance at https://www.deepl.com/en/your-account/usage)`)
  if (changed.length) console.table(changed)

  const needingReview = report.filter((r) => r.review > 0)
  if (needingReview.length) {
    console.warn('\nThese locales have hand-edited translations whose English source changed — left untouched, review manually:')
    console.table(needingReview.map((r) => ({ code: r.code, keysNeedingReview: r.review })))
  }

  if (failures.length) {
    console.error('\nFailed to sync:')
    for (const f of failures) console.error(`  ${f.code}: ${f.error}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
