import { describe, expect, it } from 'vitest'
import { unitsToSignificant } from '../money'

describe('unitsToSignificant', () => {
  it('cuts fractional digits to six significant figures, never rounding up', () => {
    // 0.123456789… ETH
    expect(unitsToSignificant(123456789987654321n, 18)).toBe('0.123456')
    // 1234.56789 USDC
    expect(unitsToSignificant(1234567890n, 6)).toBe('1234.56')
  })

  it('counts significant figures from the first non-zero digit', () => {
    expect(unitsToSignificant(1234567n, 18)).toBe('0.00000000000123456')
  })

  it('keeps the whole-number part in full and drops trailing zeros', () => {
    expect(unitsToSignificant(12345678_900000n, 6)).toBe('12345678')
    expect(unitsToSignificant(1500000n, 6)).toBe('1.5')
    expect(unitsToSignificant(0n, 18)).toBe('0')
  })
})
