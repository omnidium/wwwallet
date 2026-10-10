import type { ChainSlug } from '@/services/api'

/**
 * Display details for each chain's native asset — the one balance with no
 * contract address, so the backend's token-metadata lookup never covers it.
 * Most L2s use ETH, hence the shared Ethereum logo; `networkName` is what
 * tells those apart in the native-token pane. The few with a coin of their
 * own show their chain's logo for it, as Polygon does. `symbol` matches the backend's
 * ChainId::native_symbol, for wherever no balance entry is at hand to read it
 * from (e.g. the lock screen).
 */
export const NATIVE_ASSETS: Record<
  ChainSlug,
  {
    name: string
    symbol: string
    logoUrl: string
    networkName: string
    /**
     * The native coin's own ERC-20 contract, where swaps and bridges trade
     * it through one (LI.FI knows CELO only as its token), so selling it
     * needs an approval like any token's.
     */
    tokenAddress?: string
  }
> = {
  ethereum: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Ethereum' },
  polygon: { name: 'Polygon', symbol: 'POL', logoUrl: '/chains/polygon.svg', networkName: 'Polygon' },
  arbitrum: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Arbitrum One' },
  base: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Base' },
  optimism: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'OP Mainnet' },
  robinhood: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Robinhood Chain' },
  worldchain: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'World Chain' },
  ink: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Ink' },
  linea: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Linea' },
  gnosis: { name: 'xDAI', symbol: 'XDAI', logoUrl: '/chains/gnosis.svg', networkName: 'Gnosis' },
  celo: {
    name: 'Celo',
    symbol: 'CELO',
    logoUrl: '/chains/celo.svg',
    networkName: 'Celo',
    tokenAddress: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  },
  zksync: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'ZKsync Era' },
  ronin: { name: 'Ronin', symbol: 'RON', logoUrl: '/chains/ronin.svg', networkName: 'Ronin' },
  unichain: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Unichain' },
  scroll: { name: 'Ether', symbol: 'ETH', logoUrl: '/chains/ethereum.svg', networkName: 'Scroll' },
}
