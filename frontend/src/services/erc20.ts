import { Interface } from 'ethers'

const ERC20_ABI = ['function approve(address spender, uint256 amount) returns (bool)']
const erc20Interface = new Interface(ERC20_ABI)

export function encodeApprove(spender: string, amountWei: string): string {
  return erc20Interface.encodeFunctionData('approve', [spender, amountWei])
}
