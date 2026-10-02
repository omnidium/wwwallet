import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { displayErrorMessage, TranslatedError } from '@/services/errors'
import { QUOTE_DEBOUNCE_MS, QUOTE_MAX_AGE_MS } from '@/config/appSettings'

/**
 * Fetches a quote whenever its inputs settle, replacing the old explicit
 * "Get quote" step: `params` returns null while the form can't be quoted
 * yet (no amount, same token twice…), which clears any shown quote.
 *
 * Only the newest request's answer is kept — typing quickly fires several,
 * and an older one resolving late mustn't overwrite the current amount's.
 * `fresh()` re-fetches a quote that's gone stale before it's acted on.
 */
export function useAutoQuote<P, Q>(params: () => P | null, fetcher: (p: P) => Promise<Q>) {
  const quote = shallowRef<Q | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  /** The backend's reason code for `error`, when it gave one. */
  const errorCode = ref<string | null>(null)
  let fetchedAt = 0
  let generation = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  async function run(p: P): Promise<Q | null> {
    const mine = ++generation
    loading.value = true
    error.value = null
    errorCode.value = null
    try {
      const result = await fetcher(p)
      if (mine !== generation) return null
      quote.value = result
      fetchedAt = Date.now()
      return result
    } catch (err) {
      if (mine !== generation) return null
      quote.value = null
      error.value = displayErrorMessage(err)
      errorCode.value = err instanceof TranslatedError ? (err.code ?? null) : null
      return null
    } finally {
      if (mine === generation) loading.value = false
    }
  }

  watch(
    () => JSON.stringify(params()),
    () => {
      clearTimeout(timer)
      const p = params()
      // Invalidate whatever's in flight; the inputs it was for are gone.
      generation++
      quote.value = null
      error.value = null
      errorCode.value = null
      if (p === null) {
        loading.value = false
        return
      }
      loading.value = true
      timer = setTimeout(() => void run(p), QUOTE_DEBOUNCE_MS)
    },
    { immediate: true },
  )

  /** The current quote, re-fetched first if it's older than QUOTE_MAX_AGE_MS. */
  async function fresh(): Promise<Q | null> {
    const p = params()
    if (p === null) return null
    if (quote.value && Date.now() - fetchedAt < QUOTE_MAX_AGE_MS) return quote.value
    return run(p)
  }

  async function refresh(): Promise<Q | null> {
    const p = params()
    return p === null ? null : run(p)
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return { quote, loading, error, errorCode, fresh, refresh }
}
