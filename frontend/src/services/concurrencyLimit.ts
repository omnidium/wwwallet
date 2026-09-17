/**
 * Runs `fn` over `items` with at most `limit` calls in flight at once, rather
 * than firing every one of them in parallel — needed wherever the item count
 * is driven by user data (e.g. one request per held token) and can otherwise
 * burst well past a backend rate limit sized for a "slow trickle" of traffic.
 */
export async function mapWithConcurrency<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let index = 0
  async function worker() {
    while (index < items.length) {
      const item = items[index++]!
      await fn(item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
}
