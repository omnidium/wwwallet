import { describe, expect, it } from 'vitest'
import { Interface } from 'ethers'
import { encodeNftTransfer, isSendableNftType } from '../nft'

const FROM = `0x${'a'.repeat(40)}`
const TO = `0x${'b'.repeat(40)}`
// Bigger than any Number — e.g. an ENS name's token id.
const BIG_ID = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

describe('NFT transfer calldata', () => {
  it("calls ERC-721's three-argument safeTransferFrom", () => {
    const data = encodeNftTransfer({ tokenType: 'ERC721', from: FROM, to: TO, tokenId: BIG_ID })
    expect(data.slice(0, 10)).toBe('0x42842e0e')
    const [from, to, id] = new Interface(['function safeTransferFrom(address,address,uint256)']).decodeFunctionData(
      'safeTransferFrom',
      data,
    )
    expect([from.toLowerCase(), to.toLowerCase(), id.toString()]).toEqual([FROM, TO, BIG_ID])
  })

  it("calls ERC-1155's safeTransferFrom with the amount and empty data", () => {
    const data = encodeNftTransfer({ tokenType: 'ERC1155', from: FROM, to: TO, tokenId: '6', amount: '3' })
    expect(data.slice(0, 10)).toBe('0xf242432a')
    const [from, to, id, amount, extra] = new Interface([
      'function safeTransferFrom(address,address,uint256,uint256,bytes)',
    ]).decodeFunctionData('safeTransferFrom', data)
    expect([from.toLowerCase(), to.toLowerCase(), id.toString(), amount.toString(), extra]).toEqual([
      FROM,
      TO,
      '6',
      '3',
      '0x',
    ])
  })

  it('only sends the two standard kinds', () => {
    expect(isSendableNftType('ERC721')).toBe(true)
    expect(isSendableNftType('ERC1155')).toBe(true)
    expect(isSendableNftType('NO_SUPPORTED_NFT_STANDARD')).toBe(false)
    expect(isSendableNftType('UNKNOWN')).toBe(false)
  })
})
