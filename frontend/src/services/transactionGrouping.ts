import type { Transaction } from '@/services/api'
import { transactionTime } from '@/services/pendingTransactions'

export interface TransactionGroup {
  dateLabel: string
  transactions: Transaction[]
}

function dateLabel(time: number, locale: string): string {
  const date = new Date(time)
  const sameYear = date.getFullYear() === new Date().getFullYear()
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric',
  }).format(date)
}

/**
 * Transactions with no time yet (still pending) are grouped first, ahead of
 * any dated group. One that was dropped, never mined, goes by when it was sent.
 */
export function groupTransactionsByDate(transactions: Transaction[], locale: string): TransactionGroup[] {
  const groups: TransactionGroup[] = []
  for (const txn of transactions) {
    const time = transactionTime(txn)
    const label = time !== null ? dateLabel(time, locale) : ''
    const current = groups.at(-1)
    if (current?.dateLabel === label) current.transactions.push(txn)
    else groups.push({ dateLabel: label, transactions: [txn] })
  }
  return groups
}
