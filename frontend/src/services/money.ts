import type { Balance, FxRates, TokenMetadata } from '@/services/api'
import { formatUnits } from 'ethers'

/** Not BigInt-exact — matches the same display-only precision tradeoff SendView already makes elsewhere in this app. */
export function toHumanAmount(rawBalance: string, decimals: number): number {
  return Number(rawBalance) / 10 ** decimals
}

/** A held ERC-20's USD value at its last-known price — null while no price is known. */
export function tokenUsdValue(balance: Balance, metadata: TokenMetadata | undefined): number | null {
  if (metadata?.usd_price == null) return null
  return toHumanAmount(balance.balance, metadata.decimals ?? balance.decimals) * metadata.usd_price
}

/**
 * Caps a raw crypto amount to at most 6 total digits for display — e.g.
 * 6994.597881346333 -> "6994.6", 1.5 -> "1.5" (not "1.50000"), 0.0000000001
 * -> "0" — by giving the integer part as many digits as it needs, rounding
 * the fraction down to whatever's left of the 6-digit budget, then trimming
 * any trailing zeros that budget left padded in (6 is a ceiling on precision
 * shown, not a fixed width to fill). A full on-chain value can carry 18
 * decimals worth of noise that was never meaningful to look at and, left
 * unformatted, is long enough to force transaction rows and tables wider
 * than a phone screen. Display-only: never call this on a value still headed
 * into an actual transaction amount (parseUnits, etc.), where the real
 * precision still matters.
 */
export function formatAmount(value: number): string {
  if (!Number.isFinite(value)) return '0'
  const integerDigits = Math.abs(value) < 1 ? 0 : Math.floor(Math.log10(Math.abs(value))) + 1
  const decimals = Math.max(0, 6 - integerDigits)
  const fixed = value.toFixed(decimals)
  // Only the fractional part should ever lose trailing zeros — decimals > 0
  // guarantees `fixed` actually contains a '.', so this can never eat into
  // the integer part (e.g. "100" must never become "1").
  return decimals > 0 ? fixed.replace(/\.?0+$/, '') : fixed
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

/**
 * A unit price in USD. Below $1, four significant digits rather than
 * formatFiat's fixed two decimals — which would show most altcoins as "$0.00".
 */
export function formatUsdPrice(amount: number, locale: string): string {
  if (amount >= 1) return formatFiat(amount, 'USD', locale)
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }).format(amount)
}

/** A percent change, always signed ("+1.23%", "−0.45%"). */
export function formatPercentChange(pct: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    signDisplay: 'exceptZero',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pct / 100)
}

/**
 * A raw token amount as an editable decimal string, cut (never rounded up —
 * it must not exceed what it was taken from) to `significant` significant
 * digits. The whole-number part is always kept in full. For filling an
 * amount field from a balance: 18 decimals of a percentage run off the field.
 */
export function unitsToSignificant(raw: bigint, decimals: number, significant = 6): string {
  const full = formatUnits(raw, decimals)
  const [whole = '0', frac = ''] = full.split('.')
  const wholeDigits = whole.replace(/^0+/, '').length
  let keep: number
  if (wholeDigits > 0) {
    keep = Math.max(0, significant - wholeDigits)
  } else {
    const leadingZeros = frac.length - frac.replace(/^0+/, '').length
    keep = leadingZeros + significant
  }
  const cut = frac.slice(0, keep).replace(/0+$/, '')
  return cut ? `${whole}.${cut}` : whole
}
