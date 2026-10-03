import type { ChainSlug } from '@/services/api'

/**
 * Well-known tokens the swap picker suggests before anything's typed, by
 * symbol — resolved against each chain's own token list (see
 * services/tokenSearch.ts's popularTokens), which carries the verified
 * contract addresses. A symbol that's missing from a chain's list, or that
 * more than one of its tokens share, is simply not suggested there.
 */
export const POPULAR_TOKEN_SYMBOLS: Record<ChainSlug, string[]> = {
  ethereum: ['USDC', 'USDT', 'DAI', 'WETH', 'WBTC', 'CBBTC', 'LINK', 'AAVE', 'UNI', 'PYUSD'],
  polygon: ['USDC', 'USDT', 'DAI', 'WETH', 'WBTC', 'LINK', 'AAVE', 'UNI'],
  arbitrum: ['USDC', 'USDT', 'DAI', 'WETH', 'WBTC', 'ARB', 'LINK', 'AAVE', 'UNI'],
  base: ['USDC', 'USDT', 'DAI', 'WETH', 'CBBTC', 'LINK', 'AAVE'],
  optimism: ['USDC', 'USDT', 'DAI', 'WETH', 'WBTC', 'OP', 'LINK', 'AAVE', 'UNI'],
}
