import type { FxRates } from '@/services/api'

/** Not BigInt-exact — matches the same display-only precision tradeoff SendView already makes elsewhere in this app. */
export function toHumanAmount(rawBalance: string, decimals: number): number {
  return Number(rawBalance) / 10 ** decimals
}

/**
 * Caps a raw crypto amount to at most 6 total digits for display — e.g.
 * 6994.597881346333 -> "6994.6", 0.0000000001 -> "0.000000" — by giving the
 * integer part as many digits as it needs and rounding the fraction down to
 * whatever's left of the budget. A full on-chain value can carry 18 decimals
 * worth of noise that was never meaningful to look at and, left unformatted,
 * is long enough to force transaction rows and tables wider than a phone
 * screen. Display-only: never call this on a value still headed into an
 * actual transaction amount (parseUnits, etc.), where the real precision
 * still matters.
 */
export function formatAmount(value: number): string {
  if (!Number.isFinite(value)) return '0'
  const integerDigits = Math.abs(value) < 1 ? 0 : Math.floor(Math.log10(Math.abs(value))) + 1
  const decimals = Math.max(0, 6 - integerDigits)
  return value.toFixed(decimals)
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
