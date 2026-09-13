import { db } from './db'

/**
 * Stale-while-revalidate against the Dexie cache: returns cached data immediately
 * if present (so the UI renders instantly, including fully offline), and always
 * attempts a background refresh, resolved separately via `onUpdate`.
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  onUpdate?: (fresh: T) => void,
): Promise<T> {
  const cached = await db.cache.get(key)
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
