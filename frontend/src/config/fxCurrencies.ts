// Every currency the FX source (Frankfurter, ECB reference rates) quotes —
// what the Favourites card offers as currency pairs. Fixed by the ECB, so
// kept here rather than fetched; the backend rejects anything else anyway.
export const FX_CURRENCIES = [
  'AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD',
  'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK',
  'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR',
] as const

export function isFxCurrency(code: string): boolean {
  return (FX_CURRENCIES as readonly string[]).includes(code)
}

/**
 * The currency pairs a search query names, if any: "EUR/USD", "eur usd" or
 * "EURUSD" give that pair; a lone code like "EUR" pairs it with
 * `preferredQuote` (the user's display currency), or USD when that's the
 * same code or not quotable.
 */
export function fxPairsForQuery(query: string, preferredQuote: string): { base: string; quote: string }[] {
  const letters = query.toUpperCase().replace(/[^A-Z]/g, '')
  if (letters.length === 6) {
    const base = letters.slice(0, 3)
    const quote = letters.slice(3)
    return isFxCurrency(base) && isFxCurrency(quote) && base !== quote ? [{ base, quote }] : []
  }
  if (letters.length !== 3 || !isFxCurrency(letters)) return []
  const quote = isFxCurrency(preferredQuote) && preferredQuote !== letters ? preferredQuote : letters === 'USD' ? 'EUR' : 'USD'
  return [{ base: letters, quote }]
}
