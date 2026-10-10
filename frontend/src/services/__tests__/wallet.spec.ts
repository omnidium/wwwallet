import { describe, expect, it } from 'vitest'
import { getAddress } from 'ethers'
import { addressInText, parseAddress } from '../wallet'

const HEX = 'a0ee7a142d267c1f36714e4a8f75612f20a79720'
const CHECKSUMMED = getAddress(`0x${HEX}`)

describe('parseAddress', () => {
  it('takes a 0x address or bare hex, trimmed and checksummed', () => {
    expect(parseAddress(`  0x${HEX} `)).toBe(CHECKSUMMED)
    expect(parseAddress(HEX)).toBe(CHECKSUMMED)
  })

  it("reads Ronin's ronin: form as the same 0x address", () => {
    expect(parseAddress(`ronin:${HEX}`)).toBe(CHECKSUMMED)
  })

  it('rejects anything else', () => {
    expect(parseAddress(`ronin:0x${HEX}`)).toBeNull()
    expect(parseAddress(`ronin:${HEX.slice(1)}`)).toBeNull()
    expect(parseAddress(`0x${HEX.slice(1)}`)).toBeNull()
    expect(parseAddress('')).toBeNull()
  })
})

describe('addressInText', () => {
  it('finds a bare address, an EIP-681 URI or a ronin: address', () => {
    expect(addressInText(`0x${HEX}`)).toBe(`0x${HEX}`)
    expect(addressInText(`ethereum:0x${HEX}@1`)).toBe(`0x${HEX}`)
    expect(addressInText(`ronin:${HEX}`)).toBe(`0x${HEX}`)
  })

  it('is null when there is no address', () => {
    expect(addressInText('https://example.com')).toBeNull()
  })
})
