// Propagates shared/i18n/master_en.ts (the hand-maintained source of truth)
// into a project's own en.ts. Unlike localeSync.mjs's DeepL step, there's no
// hand-edit reconciliation to worry about here — en.ts is purely generated,
// so the master file always wins outright. The two diffs computed below
// (edited-in-place vs. added/removed) exist to report what changed, not to
// drive any merge logic.

import { readFileSync, writeFileSync } from 'node:fs'
import { flatten, loadLocaleModule } from './localeSync.mjs'

const GENERATED_HEADER =
  '// AUTO-GENERATED from shared/i18n/master_en.ts — do not edit directly.\n' +
  '// Edit that file instead, then run `node scripts/sync-i18n.mjs` from the repo root.\n'

// master_en.ts has multiple named exports (`export const frontendEn = {...}`,
// `export const websiteEn = {...}`), unlike the single `export default {...}`
// every generated locale file uses — so it needs its own small loader rather
// than loadLocaleModule. Comments are fine here (unlike loadLocaleModule's
// stricter stripping) since this evaluates the whole file as a function body.
export function loadMasterModule(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const transformed = src.replace(/export\s+const\s+(\w+)\s*=/g, 'exports.$1 =')
  const exports = {}
  new Function('exports', transformed)(exports)
  return exports
}

/**
 * @param {object} args
 * @param {object} args.masterSection - e.g. masterModule.frontendEn
 * @param {string} args.enPath - absolute path to the project's en.ts
 * @param {boolean} [args.dryRun]
 * @returns {{ added: string[], removed: string[], edited: string[] }}
 */
export function syncProjectFromMaster({ masterSection, enPath, dryRun = false }) {
  const masterFlat = flatten(masterSection)
  const currentFlat = flatten(loadLocaleModule(enPath))

  const added = Object.keys(masterFlat).filter((k) => !(k in currentFlat))
  const removed = Object.keys(currentFlat).filter((k) => !(k in masterFlat))
  const edited = Object.keys(masterFlat).filter(
    (k) => k in currentFlat && currentFlat[k] !== masterFlat[k],
  )
  // Content can already match master (e.g. someone reverted en.ts to a
  // pre-generation commit with a plain VCS checkout) while still missing the
  // "don't edit this file" header — treated as its own kind of drift so
  // --check still catches it and a real run still restores it.
  const headerMissing = !readFileSync(enPath, 'utf8').startsWith(GENERATED_HEADER)

  if (!dryRun && (added.length || removed.length || edited.length || headerMissing)) {
    writeFileSync(enPath, `${GENERATED_HEADER}export default ${JSON.stringify(masterSection, null, 2)}\n`)
  }

  return { added, removed, edited, headerMissing }
}
