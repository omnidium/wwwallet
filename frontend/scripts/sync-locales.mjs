#!/usr/bin/env node
// Thin wrapper around the shared engine in scripts/lib/localeSync.mjs —
// kept so existing muscle memory (`cd frontend && npm run sync-locales`)
// and CI (.github/workflows/frontend.yml) keep working unchanged. For
// editing English copy, see shared/i18n/master_en.ts and
// scripts/sync-i18n.mjs at the repo root — that's the new source of truth;
// this script only re-syncs the 30 translated locale files against
// whatever's currently in en.ts (which sync-i18n.mjs keeps in sync with the
// master file).
//
// Usage:
//   node scripts/sync-locales.mjs             # sync every locale
//   node scripts/sync-locales.mjs --dry-run   # report only, no writes/calls
//   node scripts/sync-locales.mjs --langs=es,fr,de   # limit to these codes
//   node scripts/sync-locales.mjs --check     # exit 1 if any locale is out
//                                              # of sync with en.ts; used by
//                                              # CI (see .github/workflows/
//                                              # frontend.yml) — same as
//                                              # --dry-run otherwise: no
//                                              # writes, no DeepL calls, no
//                                              # DEEPL_API_KEY needed.
//
// Requires DEEPL_API_KEY, either already in the environment or in a
// gitignored .env.locales file at the repo root (see .env.example). Get one
// at https://www.deepl.com/en/your-account/keys after signing up for the
// free Developer plan (hits api-free.deepl.com — confirm the current
// character allowance there, DeepL has changed how this plan is packaged).

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncProjectLocales } from '../../scripts/lib/localeSync.mjs'
import { loadDeeplApiKey } from '../../scripts/lib/env.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRONTEND_ROOT = path.join(__dirname, '..')
const REPO_ROOT = path.join(FRONTEND_ROOT, '..')
const LOCALES_DIR = path.join(FRONTEND_ROOT, 'src', 'locales')

const args = process.argv.slice(2)
const checkMode = args.includes('--check')
const dryRun = args.includes('--dry-run') || checkMode
const langsArg = args.find((a) => a.startsWith('--langs='))
const onlyLangs = langsArg ? new Set(langsArg.slice('--langs='.length).split(',')) : null

const ok = await syncProjectLocales({
  projectRoot: FRONTEND_ROOT,
  localesDir: LOCALES_DIR,
  enPath: path.join(LOCALES_DIR, 'en.ts'),
  statePath: path.join(LOCALES_DIR, '.translation-state.json'),
  prettierGlobs: ['src/locales/*.ts', 'src/locales/.translation-state.json'],
  apiKey: loadDeeplApiKey(REPO_ROOT),
  dryRun,
  checkMode,
  onlyLangs,
})
process.exit(ok ? 0 : 1)
