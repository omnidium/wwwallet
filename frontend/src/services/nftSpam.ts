/**
 * Telling an airdropped lure from a real NFT collection by its name alone.
 * The provider's own spam verdict misses many — and on some chains it
 * doesn't check at all — but lures give themselves away in how they're
 * named: they have to tell the victim where to go and why ("10,000 USDT
 * reward at usdt-stake.top"), or pose as something official ("Circle USDC
 * Yield Permit"). Tuned against ~1,500 collections held by two heavily
 * airdropped addresses (2026-10-10): every name these rules hide was spam.
 * The user can still show anything hidden — see stores/nfts.ts.
 */

// Formatting characters that render as nothing: a name made of them, or
// salted with them, is spam dodging filters while showing as blank. (Not
// the joiners and variation selectors emoji use.)
// The combining ones are spelled out, not in the bracket, where they
// could combine with their neighbour.
// oxlint-disable-next-line no-control-regex -- control characters are exactly what's being looked for
const INVISIBLE = /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u115f\u1160\u180e\u200b\u200c\u200e\u200f\u202a-\u202e\u2060-\u206f\u3164\ufeff\uffa0]|\u034f|\u17b4|\u17b5|\u180b|\u180c|\u180d/u

// Somewhere to send the victim: a link, or a bare domain on one of the
// TLDs lures use. Spaces around the dot allowed ("evmentry .com").
const LINK = /https?:|www\.|t\.me\//
const TLDS =
  'com|net|org|io|xyz|top|site|fun|finance|app|gift|to|me|cc|co|club|online|live|pro|info|link|vip|cash|website|space|store|tech|digital|exchange|network|world|ai|biz|claims?|bet|win|gg|us|icu|lol|cloud|today|events?|codes?|promo|rewards?|zone|click|pw|run|tokens?|dev'
const DOMAIN = new RegExp(`(^|[^a-z0-9])[a-z0-9][a-z0-9-]*\\s?\\.\\s?(${TLDS})($|[^a-z0-9])`)

// Why to go there.
const LURE_WORDS =
  /\b(claim|claims|claimable|reward|rewards|airdrop|airdrops|voucher|vouchers|coupon|coupons|giveaway|gift|bonus|prize|redeem|eligible|visit|seed phrase|secret phrase|private key|permit|authori[sz]ation|disbursement|compensation|attestation|award|refund|free|presale|winners?|handout|casino|freespins?|free spins?)\b/

// Money on offer: "$1000", "$ TWT", "150M SHIB", "2,000 USDT".
const MONEY =
  /\$\s?\d|\$\s?[a-z]{2,10}\b|\d[\d,.]*\s?(k|m)?\s?(usdt|usdc|eth|weth|shib|bone|hex|cro|bnb|matic|pol|uni|arb|op|btc|sol|trx|ape|pepe|steth|wsteth)\b/

// Posing as a stablecoin's issuer — real NFT collections don't name them.
const STABLECOINS = /\b(usdc|usdt|usd coin|tether|digital dollar|stablecoin)\b/

// A recovery phrase planted in the name, to bait whoever "rescues" it.
const SEED_WORDS = /(?:\b[a-z]{3,8}\b[\s,]+){11,}\b[a-z]{3,8}\b/

// Named after nothing but a contract address.
const ADDRESS_ONLY = /^0x[0-9a-f]{40}$/

/** Whether a collection's name marks it as an airdropped lure — or it has none worth showing. */
export function isSpamName(name: string | null): boolean {
  if (!name || INVISIBLE.test(name)) return true
  // Folds look-alike letters ("𝙚𝙫𝙢𝙚𝙣𝙩𝙧𝙮") back to plain ones first.
  const plain = name.normalize('NFKC').toLowerCase().trim()
  if (!/\p{L}/u.test(plain)) return true
  return [SEED_WORDS, ADDRESS_ONLY, LINK, DOMAIN, LURE_WORDS, MONEY, STABLECOINS].some((rule) => rule.test(plain))
}
