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

/** The bare symbol ('$', '€', ...) for a currency code, without formatting a number. */
export function currencySymbol(currency: string, locale: string): string {
  const part = new Intl.NumberFormat(locale, { style: 'currency', currency })
    .formatToParts(0)
    .find((p) => p.type === 'currency')
  return part?.value ?? currency
}

/** Inverse of `convertUsd` — a display-currency amount back to USD. */
export function convertToUsd(displayAmount: number, currency: string, fxRates: FxRates | null): number {
  if (currency === 'USD' || !fxRates) return displayAmount
  const rate = fxRates.rates[currency]
  return rate ? displayAmount / rate : displayAmount
}
