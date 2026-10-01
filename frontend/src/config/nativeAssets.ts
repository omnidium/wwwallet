import type { ChainSlug } from '@/services/api'

/**
 * Display details for each chain's native asset — the one balance with no
 * contract address, so the backend's token-metadata lookup never covers it.
 * The L2s all use ETH, hence the shared Ethereum logo; `networkName` is what
 * tells those apart in the native-token pane. `symbol` matches the backend's
 * ChainId::native_symbol, for wherever no balance entry is at hand to read it
 * from (e.g. the lock screen).
 */
export const NATIVE_ASSETS: Record<
  ChainSlug,
  { name: string; symbol: string; logoUrl: string; networkName: string }
> = {
  ethereum: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Ethereum' },
  polygon: { name: 'Polygon', symbol: 'POL', logoUrl: '/chains/polygon.svg', networkName: 'Polygon' },
  arbitrum: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Arbitrum One' },
  base: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Base' },
  optimism: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'OP Mainnet' },
}
