import type { ChainSlug } from '@/services/api'
import type { SelectItem } from '@/components/AppSelect.vue'
import { NATIVE_ASSETS } from '@/config/nativeAssets'

export const ALL_CHAINS = Object.keys(NATIVE_ASSETS) as ChainSlug[]

/** Chains as AppSelect items — logo and network name, the same everywhere a chain is picked. */
export function chainItems(chains: readonly ChainSlug[] = ALL_CHAINS, subtitle?: (c: ChainSlug) => string | undefined): SelectItem[] {
  return chains.map((chain) => ({
    value: chain,
    title: NATIVE_ASSETS[chain].networkName,
    subtitle: subtitle?.(chain),
    logoUrl: `/chains/${chain}.svg`,
  }))
}
