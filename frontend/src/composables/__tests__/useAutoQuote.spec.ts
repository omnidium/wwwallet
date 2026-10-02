import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { QUOTE_DEBOUNCE_MS, QUOTE_MAX_AGE_MS } from '@/config/appSettings'
import { useAutoQuote } from '../useAutoQuote'

// Only the message is stubbed; the rest (TranslatedError, which the
// composable checks errors against) stays real.
vi.mock(import('@/services/errors'), async (importOriginal) => ({
  ...(await importOriginal()),
  displayErrorMessage: () => 'failed',
}))

/** A fetcher whose calls resolve only when told to, in any order. */
function deferredFetcher() {
  const calls: { amount: number; resolve: (v: string) => void; reject: (e: unknown) => void }[] = []
  const fetcher = vi.fn<(p: { amount: number }) => Promise<string>>(
    (p: { amount: number }) =>
      new Promise<string>((resolve, reject) => calls.push({ amount: p.amount, resolve, reject })),
  )
  return { fetcher, calls }
}

async function settle() {
  await vi.advanceTimersByTimeAsync(QUOTE_DEBOUNCE_MS)
}

describe('useAutoQuote', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    vi.useFakeTimers()
    scope = effectScope()
  })

  afterEach(() => {
    scope.stop()
    vi.useRealTimers()
  })

  it('fetches once the inputs settle, not on every change', async () => {
    const amount = ref<number | null>(1)
    const { fetcher, calls } = deferredFetcher()
    const q = scope.run(() => useAutoQuote(() => (amount.value ? { amount: amount.value } : null), fetcher))!
    amount.value = 2
    await nextTick()
    amount.value = 3
    await nextTick()
    await settle()
    expect(fetcher).toHaveBeenCalledTimes(1)
    calls[0]!.resolve('quote-3')
    await vi.runAllTimersAsync()
    expect(q.quote.value).toBe('quote-3')
    expect(q.loading.value).toBe(false)
  })

  it('drops a late answer for inputs that have since changed', async () => {
    const amount = ref<number | null>(1)
    const { fetcher, calls } = deferredFetcher()
    const q = scope.run(() => useAutoQuote(() => (amount.value ? { amount: amount.value } : null), fetcher))!
    await settle()
    amount.value = 2
    await nextTick()
    await settle()
    calls[1]!.resolve('quote-2')
    await nextTick()
    calls[0]!.resolve('quote-1')
    await vi.runAllTimersAsync()
    expect(q.quote.value).toBe('quote-2')
  })

  it('clears the quote while the form cannot be quoted', async () => {
    const amount = ref<number | null>(1)
    const { fetcher, calls } = deferredFetcher()
    const q = scope.run(() => useAutoQuote(() => (amount.value ? { amount: amount.value } : null), fetcher))!
    await settle()
    calls[0]!.resolve('quote-1')
    await vi.runAllTimersAsync()
    amount.value = null
    await nextTick()
    expect(q.quote.value).toBeNull()
    expect(q.loading.value).toBe(false)
  })

  it('reports a failure as an error message, not a quote', async () => {
    const { fetcher, calls } = deferredFetcher()
    const q = scope.run(() => useAutoQuote(() => ({ amount: 1 }), fetcher))!
    await settle()
    calls[0]!.reject(new Error('boom'))
    await vi.runAllTimersAsync()
    expect(q.quote.value).toBeNull()
    expect(q.error.value).toBe('failed')
  })

  it('fresh() re-fetches only a stale quote', async () => {
    const fetcher = vi.fn<() => Promise<string>>(async () => 'quote')
    const q = scope.run(() => useAutoQuote(() => ({ amount: 1 }), fetcher))!
    await settle()
    await q.fresh()
    expect(fetcher).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(QUOTE_MAX_AGE_MS + 1)
    await q.fresh()
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
