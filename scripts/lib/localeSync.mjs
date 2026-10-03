// Shared engine behind frontend/scripts/sync-locales.mjs and
// website/scripts/sync-locales.mjs (both now thin per-project wrappers
// around syncProjectLocales below), and behind the root-level
// scripts/sync-i18n.mjs orchestrator.
//
// Keeps every stub in a project's locales dir (one file per language) in
// sync with that project's en.ts, the single hand-maintained — well, as of
// the master-file system, machine-generated-from-shared/i18n/master_en.ts —
// source of truth:
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
// language tier — see scripts/lib/deeplLocales.mjs.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { LOCALE_TO_DEEPL, LOCALE_CODES } from './deeplLocales.mjs'

// Locale modules are plain `export default { ... }` object literals with no
// TypeScript-specific syntax (no type annotations), so evaluating the object
// literal directly is safe and avoids pulling in a TS toolchain just to read
// our own generated files.
export function loadLocaleModule(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const literal = src.replace(/^\s*export\s+default\s*/m, '').trim().replace(/;\s*$/, '')
  return new Function(`'use strict'; return (${literal})`)()
}

export function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object') flatten(v, key, out)
    else out[key] = v
  }
  return out
}

// Creates intermediate containers as arrays rather than objects when the
// *next* path segment is a plain integer index — needed for website content
// like `faqs.items.0.q`, which frontend's copy never had (no arrays there),
// so this never changed behavior for frontend's own keys.
function setPath(obj, dottedKey, value) {
  const parts = dottedKey.split('.')
  let node = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const nextIsIndex = /^\d+$/.test(parts[i + 1])
    if (node[parts[i]] === undefined) node[parts[i]] = nextIsIndex ? [] : {}
    node = node[parts[i]]
  }
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

// Note: only prunes now-empty plain objects, not sparse holes left behind by
// deleting a single element out of an array (e.g. one whole FAQ item) — that
// edge case is rare for this content (array entries are normally edited in
// place or replaced wholesale in the master file, not individually spliced
// by key removal) and isn't handled generically here.
function pruneEmptyObjects(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] !== null && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
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

// Sent with every request. DeepL reads the context to choose words but
// doesn't translate or bill it: without it, "wallet" came out as a purse,
// "mnemonic" as a memory trick and "non-custodial" as a literal phrase
// nobody uses.
const DEEPL_CONTEXT =
  'Interface and website text for wwwallet, a free, non-custodial cryptocurrency wallet app for Ethereum. ' +
  '"Wallet" always means a crypto wallet. "Non-custodial" means users hold their own keys; use the term the ' +
  'crypto community in this language uses. A "recovery phrase" or "mnemonic" is a crypto seed phrase. ' +
  'Keep "wwwallet", "Ethereum", "ETH", token symbols and network names unchanged. Friendly, plain, direct tone.'

// Informal address (du, tu, ты…) wherever a language distinguishes it,
// consistently — the copy's tone is casual, and without this DeepL mixed the
// two from one string to the next. "prefer_" falls back silently for
// languages with no such distinction.
const DEEPL_FORMALITY = 'prefer_less'

async function translateBatch({ texts, deeplTargetLang, apiKey, apiHost }) {
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
        const res = await fetch(`${apiHost}/v2/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `DeepL-Auth-Key ${apiKey}`,
          },
          body: JSON.stringify({
            text: chunk,
            source_lang: 'EN',
            target_lang: deeplTargetLang,
            context: DEEPL_CONTEXT,
            formality: DEEPL_FORMALITY,
          }),
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

/**
 * @param {object} config
 * @param {string} config.projectRoot - absolute path the prettier call runs from
 * @param {string} config.localesDir - absolute path to the locales directory
 * @param {string} config.enPath - absolute path to that project's en.ts
 * @param {string} config.statePath - absolute path to its .translation-state.json
 * @param {string[]} config.prettierGlobs - globs (relative to projectRoot) to format after writing
 * @param {string|undefined} config.apiKey
 * @param {string} [config.apiHost]
 * @param {boolean} [config.dryRun]
 * @param {boolean} [config.checkMode]
 * @param {Set<string>|null} [config.onlyLangs]
 * @param {boolean} [config.retranslateAll] - redo every tracked, not hand-edited translation, changed or not
 * @returns {Promise<boolean>} true if the sync succeeded (or there was nothing to do / dry-run), false on failure or (in check mode) drift
 */
export async function syncProjectLocales(config) {
  const {
    projectRoot,
    localesDir,
    enPath,
    statePath,
    prettierGlobs,
    apiKey,
    apiHost = apiKey?.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com',
    dryRun = false,
    checkMode = false,
    onlyLangs = null,
    retranslateAll = false,
  } = config

  if (!dryRun && !apiKey) {
    console.error('DEEPL_API_KEY is not set (env var, or .env.locales at the repo root).')
    console.error('Pass --dry-run to preview changes without calling the API.')
    return false
  }

  const enFlat = flatten(loadLocaleModule(enPath))
  const enKeys = new Set(Object.keys(enFlat))
  const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {}

  let totalCharsSent = 0
  const report = []
  const failures = []

  for (const code of LOCALE_CODES) {
    if (onlyLangs && !onlyLangs.has(code)) continue
    const filePath = `${localesDir}/${code}.ts`
    // A brand-new locale with no stub file yet starts from an empty object
    // rather than being skipped — lets a project go from zero locale files
    // to fully synced in one run instead of needing 30 hand-created stubs
    // first.
    const current = existsSync(filePath) ? loadLocaleModule(filePath) : {}
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
      return (enChanged || retranslateAll) && !handEdited
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
      const translated = await translateBatch({
        texts: protectedPairs.map((p) => p.protectedText),
        deeplTargetLang: LOCALE_TO_DEEPL[code],
        apiKey,
        apiHost,
      })
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
    writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n')
    execFileSync('npx', ['prettier', '--write', ...prettierGlobs], {
      cwd: projectRoot,
      stdio: 'inherit',
    })
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
    return false
  }

  if (checkMode) {
    const syncable = report.filter((r) => r.add || r.remove || r.retranslate)
    if (syncable.length > 0 || needingReview.length > 0) {
      console.error('\n✖ Locale files are out of sync with en.ts.')
      if (syncable.length > 0) {
        console.error('\n  Run `node scripts/sync-i18n.mjs` from the repo root (needs DEEPL_API_KEY), then commit the result.')
      }
      if (needingReview.length > 0) {
        console.error('  The keysNeedingReview above were hand-edited and won\'t be touched by that command —')
        console.error('  their English source changed since, so update those translations by hand instead.')
      }
      return false
    }
    console.log('\n✓ All locales are in sync with en.ts.')
  }

  return true
}
