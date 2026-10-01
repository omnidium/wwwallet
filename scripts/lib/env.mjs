import { readFileSync, existsSync } from 'node:fs'

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {}
  const out = {}
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*?)\s*$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

// DEEPL_API_KEY lives in a gitignored .env.locales file — checked at the
// repo root first (shared by both projects' locale sync), falling back to
// the old frontend-local path so an existing, not-yet-moved key still works.
export function loadDeeplApiKey(repoRoot) {
  if (process.env.DEEPL_API_KEY) return process.env.DEEPL_API_KEY
  const rootKey = loadEnvFile(`${repoRoot}/.env.locales`).DEEPL_API_KEY
  if (rootKey) return rootKey
  return loadEnvFile(`${repoRoot}/frontend/.env.locales`).DEEPL_API_KEY
}
