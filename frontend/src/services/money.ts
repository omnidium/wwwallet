import type { FxRates } from '@/services/api'

/** Not BigInt-exact — matches the same display-only precision tradeoff SendView already makes elsewhere in this app. */
export function toHumanAmount(rawBalance: string, decimals: number): number {
  return Number(rawBalance) / 10 ** decimals
}

/** `fxRates.base` is always 'USD' here (see chainData.loadFxRates), so `rates[currency]` is a direct USD -> currency multiplier. */
export function convertUsd(usdAmount: number, currency: string, fxRates: FxRates | null): number {
  if (currency === 'USD' || !fxRates) return usdAmount
  const rate = fxRates.rates[currency]
  return rate ? usdAmount * rate : usdAmount
}

export function formatFiat(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}
