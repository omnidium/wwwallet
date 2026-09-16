import type { ChainSlug } from '@/services/api'

const EXPLORER_BASE_URL: Record<ChainSlug, string> = {
  ethereum: 'https://etherscan.io',
  polygon: 'https://polygonscan.com',
  arbitrum: 'https://arbiscan.io',
  base: 'https://basescan.org',
  optimism: 'https://optimistic.etherscan.io',
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
