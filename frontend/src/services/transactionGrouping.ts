import type { Transaction } from '@/services/api'

export interface TransactionGroup {
  dateLabel: string
  transactions: Transaction[]
}

function dateLabel(timestamp: string, locale: string): string {
  const date = new Date(timestamp)
  const sameYear = date.getFullYear() === new Date().getFullYear()
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric',
  }).format(date)
}

/** Transactions with no timestamp yet (still pending) are grouped first, ahead of any dated group. */
export function groupTransactionsByDate(transactions: Transaction[], locale: string): TransactionGroup[] {
  const groups: TransactionGroup[] = []
  for (const txn of transactions) {
    const label = txn.timestamp ? dateLabel(txn.timestamp, locale) : ''
    const current = groups.at(-1)
    if (current?.dateLabel === label) current.transactions.push(txn)
    else groups.push({ dateLabel: label, transactions: [txn] })
  }
  return groups
}
