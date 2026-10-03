import { execSync } from 'node:child_process'

// The commit itself is the version — no separate number to bump, and it
// points straight at exactly what's deployed for debugging. Falls back to
// 'dev' outside a git checkout (e.g. a source tarball) rather than failing
// the build over a version string nothing depends on functionally. Used by
// both the wallet app's and the website's vite.config.ts.
export function getAppVersion(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
}
