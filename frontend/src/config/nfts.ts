import type { ChainSlug } from '@/services/api'
import { NATIVE_ASSETS } from '@/config/nativeAssets'

// The backend's NFT provider covers every chain but these (see its
// NftProvider::supports); their accounts offer no NFTs at all.
const NO_NFT_DATA: ReadonlySet<ChainSlug> = new Set<ChainSlug>(['ink'])

export function hasNftData(chain: ChainSlug): boolean {
  return !NO_NFT_DATA.has(chain)
}

// OpenSea's own name for each chain it lists NFTs on, as its item pages
// spell it — checked against opensea.io. Elsewhere there's no marketplace
// link at all rather than one that 404s.
const OPENSEA_CHAINS: Partial<Record<ChainSlug, string>> = {
  ethereum: 'ethereum',
  polygon: 'polygon',
  arbitrum: 'arbitrum',
  base: 'base',
  optimism: 'optimism',
  robinhood: 'robinhood',
  ronin: 'ronin',
  unichain: 'unichain',
}

/** Where an NFT can be bought or sold; null on a chain wwwallet knows no marketplace for. `tokenId` is decimal. */
export function marketplaceLink(
  chain: ChainSlug,
  contract: string,
  tokenId: string,
): { name: string; url: string } | null {
  const slug = OPENSEA_CHAINS[chain]
  return slug ? { name: 'OpenSea', url: `https://opensea.io/item/${slug}/${contract}/${tokenId}` } : null
}

/** A collection's floor price comes quoted in ETH, so it's only shown where that's the chain's own coin. */
export function showsFloorPrice(chain: ChainSlug): boolean {
  return NATIVE_ASSETS[chain].symbol === 'ETH'
}
