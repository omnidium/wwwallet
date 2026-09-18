import { ref, type Ref } from 'vue'
import type { ChainSlug } from '@/services/api'
import { useChainDataStore } from '@/stores/chainData'

/**
 * Drives "load one more configured-size batch, then prefetch the batch after
 * that in the background" for a transaction list's infinite scroll.
 *
 * Growth is tracked via `visibleCount` — the caller's own filtered/rendered
 * count (e.g. AccountCard's dust-hidden, native-only list), not the store's
 * raw per-page count. A fetched page can contribute zero rows to what's
 * actually on screen (every transfer in it was a different asset, or all
 * were hidden as dust) — chasing the raw count would consider that page a
 * "success" and stop after one fetch even though the visible list never
 * grew, which is exactly what left real accounts stuck at one page with the
 * dust-hiding toggle on: nothing rendered, the list's on-screen height never
 * changed, so nothing was left to prompt another attempt.
 */
export function useTransactionBatchLoader(
  chain: ChainSlug,
  address: string,
  visibleCount: () => number,
): { loadNextBatch: () => Promise<void>; isLoading: Ref<boolean> } {
  const chainData = useChainDataStore()
  const isLoading = ref(false)
  let busy = false

  async function loadUntilVisibleGrowthOrExhausted(targetGrowth: number) {
    const startingVisible = visibleCount()
    while (visibleCount() - startingVisible < targetGrowth) {
      if (!chainData.hasMoreTransactions(chain, address)) return
      await chainData.loadMoreTransactions(chain, address)
    }
  }

  async function loadNextBatch() {
    if (busy) return
    busy = true
    isLoading.value = true
    try {
      await loadUntilVisibleGrowthOrExhausted(chainData.transactionBatchSize)
    } finally {
      isLoading.value = false
      busy = false
    }
    // Prefetch the next batch in the background — best-effort, so a later
    // scroll/resize check finds it already sitting in the store instead of
    // waiting on a fresh fetch. Not reflected in `isLoading`: the whole point
    // is the user never sees a loading state for it.
    if (chainData.hasMoreTransactions(chain, address)) {
      busy = true
      void loadUntilVisibleGrowthOrExhausted(chainData.transactionBatchSize)
        .catch(() => {
          // Best-effort — retried the next time loadNextBatch is triggered.
        })
        .finally(() => {
          busy = false
        })
    }
  }

  return { loadNextBatch, isLoading }
}
