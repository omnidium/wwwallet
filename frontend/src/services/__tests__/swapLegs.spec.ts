import { describe, expect, it } from 'vitest'
import type { Transaction } from '@/services/api'
import { amountOfToken, swapLegOf, swapRate } from '../swapLegs'

const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

function transfer(overrides: Partial<Transaction> = {}): Transaction {
  return {
    hash: '0x1',
    from: '0xme',
    to: '0xrouter',
    value: '100',
    asset: 'USDC',
    contract_address: USDC,
    block_number: 1,
    timestamp: null,
    status: 'success',
    counter_asset: null,
    counter_value: null,
    counter_contract_address: null,
    ...overrides,
  }
}

// USDC sold for ETH — the native coin is the bought leg.
const usdcForEth = transfer({ counter_asset: 'ETH', counter_value: '0.04', counter_contract_address: null })

describe('swapLegOf', () => {
  it('finds a swap under both of its tokens', () => {
    expect(swapLegOf(usdcForEth, USDC.toLowerCase())).toBe('sold')
    expect(swapLegOf(usdcForEth, null)).toBe('bought')
  })

  it("doesn't take a plain token transfer for a native one", () => {
    expect(swapLegOf(transfer(), null)).toBeNull()
    expect(swapLegOf(transfer({ contract_address: null, asset: 'ETH' }), null)).toBe('sold')
  })
})

describe('amountOfToken', () => {
  it("is the leg of the token asked about", () => {
    expect(amountOfToken(usdcForEth, USDC)).toBe('100')
    expect(amountOfToken(usdcForEth, null)).toBe('0.04')
    expect(amountOfToken(usdcForEth, '0xother')).toBe('0')
  })
})

describe('swapRate', () => {
  it('is one of the token sold by default', () => {
    expect(swapRate(usdcForEth)).toEqual({ baseAsset: 'USDC', quoteAsset: 'ETH', rate: 0.0004 })
    expect(swapRate(usdcForEth, USDC)).toEqual({ baseAsset: 'USDC', quoteAsset: 'ETH', rate: 0.0004 })
  })

  it('is one of the token bought when viewed from it', () => {
    expect(swapRate(usdcForEth, null)).toEqual({ baseAsset: 'ETH', quoteAsset: 'USDC', rate: 2500 })
  })

  it('is absent for anything but a swap with both amounts', () => {
    expect(swapRate(transfer())).toBeNull()
    expect(swapRate({ ...usdcForEth, counter_value: '0' })).toBeNull()
    expect(swapRate({ ...usdcForEth, value: 'nope' })).toBeNull()
  })
})
