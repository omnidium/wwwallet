import { api, type BridgeStatus, type ChainSlug, type TransactionStatus } from './api'
import { BRIDGE_STATUS_MAX_WAIT_MS, BRIDGE_STATUS_POLL_MS } from '@/config/appSettings'

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

/**
 * Polls a bridged transfer until it lands on the destination chain, fails,
 * or polling gives up (reported as pending). Starts once the source
 * transaction has confirmed. Never throws, same as above.
 */
export async function waitForBridgeArrival(
  hash: string,
  fromChain: ChainSlug,
  toChain: ChainSlug,
): Promise<BridgeStatus> {
  const deadline = Date.now() + BRIDGE_STATUS_MAX_WAIT_MS
  while (Date.now() < deadline) {
    try {
      const status = await api.bridgeStatus(hash, fromChain, toChain)
      if (status.status !== 'pending') return status
    } catch {
      // Keep polling — the status service being briefly unreachable isn't the transfer failing.
    }
    await sleep(BRIDGE_STATUS_POLL_MS)
  }
  return { status: 'pending', substatus: null, receiving_tx_hash: null }
}
