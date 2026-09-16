import { api, type ChainSlug, type TransactionStatus } from './api'

const POLL_INTERVAL_MS = 4000
const MAX_ATTEMPTS = 30 // ~2 minutes, matching typical L1/L2 confirmation times.

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Polls tx-status until the transaction is mined (or polling gives up).
 * Never throws — an RPC hiccup mid-poll is treated as "still pending" rather
 * than failing the whole submit flow the receipt belongs to.
 */
export async function waitForTransactionConfirmation(
  chain: ChainSlug,
  hash: string,
): Promise<TransactionStatus> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const { status } = await api.transactionStatus(chain, hash)
      if (status !== 'pending') return status
    } catch {
      // Keep polling — a transient RPC error isn't the transaction failing.
    }
    await sleep(POLL_INTERVAL_MS)
  }
  return 'pending'
}
