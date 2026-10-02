import { computed, watch, type Ref } from 'vue'
import { formatUnits } from 'ethers'
import type { ChainSlug } from '@/services/api'
import { useChainDataStore } from '@/stores/chainData'
import { toHumanAmount } from '@/services/money'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import type { HeldToken } from '@/components/TokenPickerField.vue'

export interface TokenOption {
  key: string
  symbol: string
  contractAddress: string | null
  decimals: number
  rawBalance: string
  logoUrl: string | null
  usdPrice: number | null
}

// Highest USD value held first; a token with no resolved price sinks to the
// bottom — same convention as AccountCard.vue's tokenRows sort.
function usdValueOf(opt: TokenOption): number {
  if (opt.usdPrice == null) return -1
  return toHumanAmount(opt.rawBalance, opt.decimals) * opt.usdPrice
}

/**
 * One account's balances on one chain as pickable tokens, following
 * whichever chain/address the refs currently point to — the transfer panel
 * switches both freely. Also fetches metadata (symbol/decimals/logo/price)
 * for any held ERC-20 the accounts screen's own refresh hasn't resolved yet.
 */
export function useHeldTokens(chain: Ref<ChainSlug>, address: Ref<string>) {
  const chainData = useChainDataStore()

  const activity = computed(() => chainData.activityByAddress[chainData.keyFor(chain.value, address.value)])

  const options = computed<TokenOption[]>(() =>
    (activity.value?.balances ?? [])
      .map((b) => {
        if (b.contract_address === null) {
          return {
            key: 'native',
            symbol: b.symbol,
            contractAddress: null,
            decimals: b.decimals,
            rawBalance: b.balance,
            logoUrl: NATIVE_ASSETS[chain.value].logoUrl,
            usdPrice: chainData.nativePriceUsdByChain[chain.value] ?? null,
          }
        }
        const metadata = chainData.tokenMetadataByKey[chainData.keyFor(chain.value, b.contract_address)]
        return {
          key: b.contract_address,
          symbol: metadata?.symbol ?? b.symbol,
          contractAddress: b.contract_address,
          decimals: metadata?.decimals ?? b.decimals,
          rawBalance: b.balance,
          logoUrl: metadata?.logo_url ?? null,
          usdPrice: metadata?.usd_price ?? null,
        }
      })
      .sort((a, b) => usdValueOf(b) - usdValueOf(a)),
  )

  /** The same list in TokenPickerField's shape. */
  const heldTokens = computed<HeldToken[]>(() =>
    options.value.map((t) => {
      const balance = Number(formatUnits(t.rawBalance, t.decimals))
      return {
        address: t.contractAddress,
        symbol: t.symbol,
        name: t.symbol,
        decimals: t.decimals,
        logoUrl: t.logoUrl,
        balance,
        usdValue: t.usdPrice != null ? balance * t.usdPrice : null,
      }
    }),
  )

  const native = computed(() => options.value.find((t) => t.contractAddress === null) ?? null)

  /** Held balance of a token (null address = native), 0 when not held. */
  function balanceOf(contractAddress: string | null): number {
    const held = options.value.find(
      (t) => (t.contractAddress?.toLowerCase() ?? null) === (contractAddress?.toLowerCase() ?? null),
    )
    return held ? Number(formatUnits(held.rawBalance, held.decimals)) : 0
  }

  watch(
    () => activity.value?.balances ?? [],
    (balances) => {
      for (const b of balances) {
        if (b.contract_address) void chainData.ensureTokenMetadata(chain.value, b.contract_address)
      }
    },
    { immediate: true },
  )

  return { activity, options, heldTokens, native, balanceOf }
}
