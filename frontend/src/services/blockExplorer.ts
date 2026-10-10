import type { ChainSlug } from '@/services/api'

const EXPLORER_BASE_URL: Record<ChainSlug, string> = {
  ethereum: 'https://etherscan.io',
  polygon: 'https://polygonscan.com',
  arbitrum: 'https://arbiscan.io',
  base: 'https://basescan.org',
  optimism: 'https://optimistic.etherscan.io',
  robinhood: 'https://robin.etherscan.io',
  worldchain: 'https://worldscan.org',
  ink: 'https://explorer.inkonchain.com',
  linea: 'https://lineascan.build',
  gnosis: 'https://gnosisscan.io',
  celo: 'https://celoscan.io',
  zksync: 'https://era.zksync.network',
  ronin: 'https://app.roninchain.com',
  unichain: 'https://uniscan.xyz',
  scroll: 'https://scrollscan.com',
}

export function txnUrl(chain: ChainSlug, hash: string): string {
  return `${EXPLORER_BASE_URL[chain]}/tx/${hash}`
}

export function addressUrl(chain: ChainSlug, address: string): string {
  return `${EXPLORER_BASE_URL[chain]}/address/${address}`
}

export function tokenUrl(chain: ChainSlug, contractAddress: string): string {
  return `${EXPLORER_BASE_URL[chain]}/token/${contractAddress}`
}

// Etherscan-run explorers, which give each NFT its own page; elsewhere an
// NFT links to its collection's.
const NFT_PAGE_CHAINS: ReadonlySet<ChainSlug> = new Set<ChainSlug>([
  'ethereum', 'polygon', 'arbitrum', 'base', 'optimism', 'robinhood', 'worldchain', 'linea', 'gnosis', 'celo',
  'zksync', 'unichain', 'scroll',
])

/** `tokenId` is decimal. */
export function nftUrl(chain: ChainSlug, contractAddress: string, tokenId: string): string {
  return NFT_PAGE_CHAINS.has(chain)
    ? `${EXPLORER_BASE_URL[chain]}/nft/${contractAddress}/${tokenId}`
    : tokenUrl(chain, contractAddress)
}
