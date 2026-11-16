import type { Transaction, TransactionStatusReport } from '@/services/api'
import { DROPPED_TRANSACTION_MS } from '@/config/appSettings'

// A transaction sent from this device shows as pending until history lists
// it. History only lists transfers that moved money, so a transaction that
// reverted (no Transfer events) or was never mined at all would otherwise
// stay "pending" for good. Those are looked up on the network instead.

/**
 * What a still-pending transaction has become, by what the network reports
 * of it: mined (successful or not, with when), dropped, or — null — no
 * change yet.
 */
export function resolvePending(txn: Transaction, report: TransactionStatusReport, now: number): Transaction | null {
  if (report.status !== 'pending') {
    return {
      ...txn,
      status: report.status,
      block_number: report.block_number ?? txn.block_number,
      timestamp: report.timestamp ?? txn.timestamp,
    }
  }
  // `known` absent is an older backend that can't tell — never a drop.
  // Sent before submitted_at was recorded is long enough ago by now.
  const sentAgo = now - (txn.submitted_at ?? 0)
  if (report.known === false && sentAgo >= DROPPED_TRANSACTION_MS) return { ...txn, status: 'dropped' }
  return null
}

/** When a transaction happened, for ordering history: mined, else when it was sent. */
export function transactionTime(txn: Transaction): number | null {
  if (txn.timestamp) {
    const mined = Date.parse(txn.timestamp)
    if (!Number.isNaN(mined)) return mined
  }
  return txn.status === 'pending' ? null : (txn.submitted_at ?? null)
}

/**
 * Swaps `txn` in for the entry with its hash, moved to where its time puts
 * it in newest-first history — a transaction resolved long after it was
 * sent would otherwise sit at the top, out of date order. One with no time
 * to go by stays where it was.
 */
export function placeInHistory(history: Transaction[], txn: Transaction): Transaction[] {
  const at = transactionTime(txn)
  if (at === null) return history.map((t) => (t.hash === txn.hash ? txn : t))
  const rest = history.filter((t) => t.hash !== txn.hash)
  const before = rest.findIndex((t) => {
    const other = t.timestamp ? Date.parse(t.timestamp) : NaN
    return !Number.isNaN(other) && other <= at
  })
  rest.splice(before === -1 ? rest.length : before, 0, txn)
  return rest
}
