import type { AddressPresence, ChainSlug } from '@/services/api'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import { toHumanAmount } from '@/services/money'
import { createConcurrencyLimiter } from '@/services/concurrencyLimit'

const ALL_CHAINS = Object.keys(NATIVE_ASSETS) as ChainSlug[]

// chain:address pairs already looked at this session that turned up
// nothing — not probed again until the next page load, so a 10-minute
// auto-refresh doesn't re-query every empty chain for every account. A
// failed probe isn't recorded, so it's retried next refresh.
const probedEmpty = new Set<string>()

// Every account is checked on every chain it isn't on yet — 14 at once
// each — and the backend's per-IP limit trips on a concurrent burst, so
// only a few run at a time, across every caller.
const probeLimit = createConcurrencyLimiter(4)

/** The account balance row's value: the chain's native coin in USD, or null before it's known. */
export function nativeBalanceUsd(
  chainData: ReturnType<typeof useChainDataStore>,
  chain: ChainSlug,
  address: string,
): number | null {
  const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
  const native = activity?.balances.find((b) => b.contract_address === null)
  const priceUsd = chainData.nativePriceUsdByChain[chain]
  if (!activity || priceUsd === undefined) return null
  return native ? toHumanAmount(native.balance, native.decimals) * priceUsd : 0
}

/**
 * Finds each account's address on the other supported chains — the same
 * key controls it on all of them — and adds it (as a `discovered` account,
 * shown in the original's carousel) wherever its account balance (the
 * native coin, as on the card's balance row) is worth more than dust, or it
 * has native transaction history of its own: anything it sent, or anything
 * it received worth more than dust. Tokens don't count either way: spam
 * airdrops land on every active address on every chain, often with a
 * made-up price. Nor do incoming zero-value (or dust) transfers — address
 * poisoning sends those to active addresses en masse, especially on cheap
 * L2s like Base, so they'd make a chain look used when the owner never
 * touched it. Each chain is first checked for a balance or a nonce, which
 * is cheap; only one with either is loaded in full to decide (see
 * mayQualify). Chains already in the account list, including hidden ones,
 * are never probed: hiding a discovered account keeps its record, so it
 * stays hidden rather than being re-found.
 */
export function useChainDiscovery() {
  const accounts = useAccountsStore()
  const chainData = useChainDataStore()

  /** Null while there's no data to judge by yet. */
  function qualifies(chain: ChainSlug, address: string): boolean | null {
    const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
    if (!activity) return null
    const priceUsd = chainData.nativePriceUsdByChain[chain]
    const ownHistory = activity.transactions.some(
      (t) =>
        t.contract_address === null &&
        (t.from.toLowerCase() === address.toLowerCase() ||
          (priceUsd !== undefined && Number(t.value) * priceUsd > DUST_THRESHOLD_USD)),
    )
    if (ownHistory) return true
    const usd = nativeBalanceUsd(chainData, chain, address)
    return usd === null ? null : usd > DUST_THRESHOLD_USD
  }

  /**
   * Whether a chain could qualify, from its native balance and nonce alone.
   * Every way to qualify needs one or the other: native history it sent
   * raises the nonce, and native coin it received is either still there or
   * left in a transaction it sent. So a chain that fails this needn't be
   * loaded in full, which is most of them, and costs a fifth as much.
   */
  function mayQualify(chain: ChainSlug, presence: AddressPresence): boolean {
    if (presence.transaction_count > 0) return true
    const native = toHumanAmount(presence.native_balance, 18)
    const priceUsd = chainData.nativePriceUsdByChain[chain]
    return priceUsd === undefined ? native > 0 : native * priceUsd > DUST_THRESHOLD_USD
  }

  async function probe(source: WalletAccount, chain: ChainSlug): Promise<void> {
    const key = chainData.keyFor(chain, source.address)
    const [presence] = await Promise.all([
      chainData.loadAddressPresence(chain, source.address),
      chainData.nativePriceUsdByChain[chain] === undefined ? chainData.loadNativePrice(chain) : undefined,
    ])
    if (!mayQualify(chain, presence)) {
      probedEmpty.add(key)
      return
    }
    // No token metadata: tokens don't decide anything here, and pricing
    // every token on every probed chain burns the price providers' quota.
    // A chain that's added gets it with the next regular refresh.
    await chainData.loadAddressActivity(chain, source.address, { refreshTokenMetadata: false })
    if (qualifies(chain, source.address)) await accounts.addDiscovered(source, chain)
    else probedEmpty.add(key)
  }

  /** Settles every probe; failures are left for the next call to retry. */
  async function discover(): Promise<void> {
    // Drop discovered chains that (no longer, or under an earlier, looser
    // rule never did) qualify — judged on data already loaded, so a chain
    // whose refresh failed isn't dropped for want of it.
    for (const account of accounts.accounts.filter((a) => a.discovered)) {
      if (qualifies(account.chain, account.address) === false) {
        await accounts.removeDiscovered(account.chain, account.address)
      }
    }

    const sources = new Map<string, WalletAccount>()
    for (const account of accounts.accounts) {
      const address = account.address.toLowerCase()
      if (!account.discovered && !sources.has(address)) sources.set(address, account)
    }
    const probes: Promise<void>[] = []
    for (const [address, source] of sources) {
      const present = new Set(
        accounts.accounts.filter((a) => a.address.toLowerCase() === address).map((a) => a.chain),
      )
      for (const chain of ALL_CHAINS) {
        // Not probed again on every refresh, for any account, once the
        // backend has said it can't serve the chain (see chainData).
        if (present.has(chain) || chainData.isChainUnavailable(chain)) continue
        if (probedEmpty.has(chainData.keyFor(chain, source.address))) continue
        probes.push(probeLimit(() => probe(source, chain)))
      }
    }
    await Promise.allSettled(probes)
  }

  return { discover }
}
