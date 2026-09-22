import { db } from './db'

/**
 * Stale-while-revalidate against the Dexie cache: returns cached data immediately
 * if present (so the UI renders instantly, including fully offline), and — unless
 * the cached copy is still within `maxAgeMs` — always attempts a background
 * refresh, resolved separately via `onUpdate`.
 *
 * `maxAgeMs` (default 0, i.e. always revalidate) exists for data that's
 * effectively immutable once fetched (e.g. token metadata): without it, every
 * single call — including one for every held token on every app reload —
 * re-hits the backend regardless of how fresh the cached copy already is,
 * which is what was needlessly burning through the backend's own per-route
 * rate limit (and Ethplorer's far stricter one) on every hard refresh for a
 * wallet holding many tokens.
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  onUpdate?: (fresh: T) => void,
  maxAgeMs = 0,
): Promise<T> {
  const cached = await db.cache.get(key)
  if (cached && maxAgeMs > 0 && Date.now() - cached.fetchedAt < maxAgeMs) {
    return cached.data as T
  }
  const refresh = fetcher()
    .then(async (fresh) => {
      await db.cache.put({ key, data: fresh, fetchedAt: Date.now() })
      onUpdate?.(fresh)
      return fresh
    })
    .catch((err) => {
      if (!cached) throw err
      return cached.data as T
    })

  return cached ? (cached.data as T) : refresh
}
