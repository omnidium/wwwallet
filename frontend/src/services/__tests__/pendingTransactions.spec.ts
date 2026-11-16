import { describe, expect, it } from 'vitest'
import type { Transaction } from '@/services/api'
import { DROPPED_TRANSACTION_MS } from '@/config/appSettings'
import { placeInHistory, resolvePending, transactionTime } from '../pendingTransactions'

const NOW = Date.parse('2026-11-16T12:00:00Z')

function txn(hash: string, overrides: Partial<Transaction> = {}): Transaction {
  return {
    hash,
    from: '0xme',
    to: '0xrouter',
    value: '1',
    asset: 'ETH',
    contract_address: null,
    block_number: null,
    timestamp: null,
    status: 'success',
    counter_asset: null,
    counter_value: null,
    counter_contract_address: null,
    ...overrides,
  }
}

const sent = txn('0xsent', { status: 'pending', submitted_at: NOW - 60_000 })

describe('resolvePending', () => {
  it('takes a mined status, with when it was mined', () => {
    const report = { status: 'failed' as const, block_number: 42, timestamp: '2026-11-15T09:00:00.000Z', known: true }
    expect(resolvePending(sent, report, NOW)).toMatchObject({
      status: 'failed',
      block_number: 42,
      timestamp: '2026-11-15T09:00:00.000Z',
    })
  })

  it('leaves one the network is still holding as it is', () => {
    expect(resolvePending(sent, { status: 'pending', known: true }, NOW + DROPPED_TRANSACTION_MS)).toBeNull()
  })

  it("only takes one the network doesn't know for dropped once it's had time to arrive", () => {
    expect(resolvePending(sent, { status: 'pending', known: false }, NOW)).toBeNull()
    const later = NOW + DROPPED_TRANSACTION_MS
    expect(resolvePending(sent, { status: 'pending', known: false }, later)?.status).toBe('dropped')
  })

  it('takes one sent before send times were kept for long enough ago', () => {
    const old = txn('0xold', { status: 'pending' })
    expect(resolvePending(old, { status: 'pending', known: false }, NOW)?.status).toBe('dropped')
  })

  it("never drops one when the backend can't tell", () => {
    expect(resolvePending(txn('0xold', { status: 'pending' }), { status: 'pending' }, NOW)).toBeNull()
  })
})

describe('transactionTime', () => {
  it('is when it was mined, else when a no-longer-pending one was sent', () => {
    expect(transactionTime(txn('0x1', { timestamp: '2026-11-15T09:00:00.000Z' }))).toBe(Date.parse('2026-11-15T09:00:00Z'))
    expect(transactionTime(txn('0x2', { status: 'dropped', submitted_at: NOW }))).toBe(NOW)
    expect(transactionTime(txn('0x3', { status: 'pending', submitted_at: NOW }))).toBeNull()
  })
})

describe('placeInHistory', () => {
  const history = [
    txn('0xpending', { status: 'pending' }),
    sent,
    txn('0xnewer', { timestamp: '2026-11-16T10:00:00.000Z' }),
    txn('0xolder', { timestamp: '2026-11-14T10:00:00.000Z' }),
  ]

  it('moves a resolved transaction to where its time puts it', () => {
    const resolved = { ...sent, status: 'failed' as const, timestamp: '2026-11-15T09:00:00.000Z' }
    expect(placeInHistory(history, resolved).map((t) => t.hash)).toEqual(['0xpending', '0xnewer', '0xsent', '0xolder'])
  })

  it('goes last when it is older than everything loaded', () => {
    const resolved = { ...sent, status: 'failed' as const, timestamp: '2026-01-01T00:00:00.000Z' }
    const placed = placeInHistory(history, resolved)
    expect(placed[placed.length - 1]!.hash).toBe('0xsent')
  })

  it('stays put with no time to go by', () => {
    const resolved = { ...sent, status: 'dropped' as const, submitted_at: undefined }
    const placed = placeInHistory(history, resolved)
    expect(placed.map((t) => t.hash)).toEqual(history.map((t) => t.hash))
    expect(placed[1]!.status).toBe('dropped')
  })
})
