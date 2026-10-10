import type { ChainSlug } from '@/services/api'

// The backend's NFT provider covers every chain but these (see its
// NftProvider::supports); their accounts offer no NFTs at all.
const NO_NFT_DATA: ReadonlySet<ChainSlug> = new Set<ChainSlug>(['ink'])

export function hasNftData(chain: ChainSlug): boolean {
  return !NO_NFT_DATA.has(chain)
}
