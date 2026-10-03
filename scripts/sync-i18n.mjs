#!/usr/bin/env node
// Root-level i18n orchestrator: the one command that keeps every project's
// copy in sync with shared/i18n/master_en.ts (the hand-maintained source of
// truth for both the wallet app and the marketing website) and keeps every
// translated locale file in sync with that.
//
// For each project, in order:
//   1. masterSync — diffs shared/i18n/master_en.ts's section for this
//      project against the project's own en.ts (edited-in-place values vs.
//      added/removed keys), then overwrites en.ts to match the master
//      exactly. Reports what changed; never merges/preserves — master wins.
//   2. localeSync — the existing DeepL-powered sync (add/remove/retranslate
//      against the now-updated en.ts, respecting hand-edited translations).
//
// Usage:
//   node scripts/sync-i18n.mjs                      # sync everything
//   node scripts/sync-i18n.mjs --dry-run             # report only, no writes/calls
//   node scripts/sync-i18n.mjs --check                # CI mode (see below)
//   node scripts/sync-i18n.mjs --project=frontend      # scope to one project
//   node scripts/sync-i18n.mjs --langs=es,fr,de        # scope to these locale codes
//   node scripts/sync-i18n.mjs --retranslate           # redo every machine translation
//
// --retranslate sends every string again, not just those whose English
// changed — for when the translation settings themselves change (tone,
// context; see lib/localeSync.mjs). Hand-edited translations are still left
// alone. It's a whole project's copy per language, so check the estimate
// with --dry-run first.
//
// --check exits 1 if a project's en.ts doesn't exactly match master_en.ts,
// or if any locale file is out of sync with en.ts — same as --dry-run
// otherwise: no writes, no DeepL calls, no DEEPL_API_KEY needed.
//
// Requires DEEPL_API_KEY for a real (non-dry-run, non-check) run — see
// scripts/lib/env.mjs and .env.example.

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncProjectLocales } from './lib/localeSync.mjs'
import { loadMasterModule, syncProjectFromMaster } from './lib/masterSync.mjs'
import { loadDeeplApiKey } from './lib/env.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.join(__dirname, '..')
const MASTER_PATH = path.join(REPO_ROOT, 'shared', 'i18n', 'master_en.ts')

const PROJECTS = {
  frontend: {
    masterKey: 'frontendEn',
    root: path.join(REPO_ROOT, 'frontend'),
    localesDir: path.join(REPO_ROOT, 'frontend', 'src', 'locales'),
    prettierGlobs: ['src/locales/*.ts', 'src/locales/.translation-state.json'],
  },
  website: {
    masterKey: 'websiteEn',
    root: path.join(REPO_ROOT, 'website'),
    localesDir: path.join(REPO_ROOT, 'website', 'src', 'i18n', 'locales'),
    prettierGlobs: ['src/i18n/locales/*.ts', 'src/i18n/locales/.translation-state.json'],
  },
}

const args = process.argv.slice(2)
const checkMode = args.includes('--check')
const dryRun = args.includes('--dry-run') || checkMode
const langsArg = args.find((a) => a.startsWith('--langs='))
const onlyLangs = langsArg ? new Set(langsArg.slice('--langs='.length).split(',')) : null
const retranslateAll = args.includes('--retranslate')
const projectArg = args.find((a) => a.startsWith('--project='))
const onlyProjects = projectArg ? [projectArg.slice('--project='.length)] : Object.keys(PROJECTS)

async function main() {
  const apiKey = loadDeeplApiKey(REPO_ROOT)
  const master = loadMasterModule(MASTER_PATH)

  let ok = true

  for (const name of onlyProjects) {
    const project = PROJECTS[name]
    if (!project) {
      console.error(`Unknown project "${name}" — expected one of: ${Object.keys(PROJECTS).join(', ')}`)
      ok = false
      continue
    }

    const enPath = path.join(project.localesDir, 'en.ts')
    const statePath = path.join(project.localesDir, '.translation-state.json')
    const masterSection = master[project.masterKey]

    console.log(`\n=== ${name} ===`)

    const { added, removed, edited, headerMissing } = syncProjectFromMaster({
      masterSection,
      enPath,
      dryRun,
    })
    const masterChanged = added.length || removed.length || edited.length || headerMissing
    console.log(
      `master_en.ts → en.ts: ${edited.length} edited, ${added.length} added, ${removed.length} removed` +
        (headerMissing ? ', generated-file header missing' : '') +
        (masterChanged ? '' : ' (already in sync)'),
    )
    if (checkMode && masterChanged) {
      console.error(
        `\n✖ ${name}/src/${name === 'website' ? 'i18n/locales' : 'locales'}/en.ts is out of sync with shared/i18n/master_en.ts.`,
      )
      console.error('  Run `node scripts/sync-i18n.mjs` from the repo root, then commit the result.')
      ok = false
    }

    const localesOk = await syncProjectLocales({
      projectRoot: project.root,
      localesDir: project.localesDir,
      enPath,
      statePath,
      prettierGlobs: project.prettierGlobs,
      apiKey,
      dryRun,
      checkMode,
      onlyLangs,
      retranslateAll,
    })
    if (!localesOk) ok = false
  }

  process.exit(ok ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
