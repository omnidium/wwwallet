import { Interface } from 'ethers'

// Both standards' "safe" transfer: a recipient contract that can't hold
// NFTs refuses it, so the fee estimate fails up front instead of the token
// being stranded there for good. Overloaded, hence the full signatures.
const nftInterface = new Interface([
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)',
])

export type SendableNftType = 'ERC721' | 'ERC1155'

/** Whether wwwallet can send a token of this type — the two standard interfaces only. */
export function isSendableNftType(tokenType: string): tokenType is SendableNftType {
  return tokenType === 'ERC721' || tokenType === 'ERC1155'
}

/** Calldata for the NFT's own contract. `tokenId` and `amount` are decimal. */
export function encodeNftTransfer(transfer: {
  tokenType: SendableNftType
  from: string
  to: string
  tokenId: string
  /** ERC-1155 only: how many copies. */
  amount?: string
}): string {
  const { tokenType, from, to, tokenId, amount } = transfer
  if (tokenType === 'ERC721') {
    return nftInterface.encodeFunctionData('safeTransferFrom(address,address,uint256)', [from, to, tokenId])
  }
  return nftInterface.encodeFunctionData('safeTransferFrom(address,address,uint256,uint256,bytes)', [
    from,
    to,
    tokenId,
    amount ?? '1',
    '0x',
  ])
}
