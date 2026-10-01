/**
 * Returns a runner that lets at most `limit` tasks passed to it be in flight
 * at once, queuing the rest in call order — needed wherever the request count
 * is driven by user data (e.g. one request per held token, across every
 * account at once) and could otherwise burst well past the backend's rate
 * limit or its upstream providers' own.
 */
export function createConcurrencyLimiter(limit: number) {
  let active = 0
  const waiting: (() => void)[] = []
  return async function run<T>(task: () => Promise<T>): Promise<T> {
    // A finishing task hands its slot straight to the next waiter (below)
    // rather than freeing it, so a newcomer can't slip in between and push
    // the in-flight count past `limit`.
    if (active < limit) active++
    else await new Promise<void>((resolve) => waiting.push(resolve))
    try {
      return await task()
    } finally {
      const next = waiting.shift()
      if (next) next()
      else active--
    }
  }
}
