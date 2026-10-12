import { describe, expect, it } from 'vitest'
import { Transaction, Wallet } from 'ethers'
import type { TransactionPrep } from '../api'
import { feeFieldsOf, feeWeiOf, maxFeeWeiOf } from '../fees'

// A throwaway key: these only sign, never broadcast.
const wallet = new Wallet(`0x${'11'.repeat(32)}`)
const TO = `0x${'b'.repeat(40)}`

const eip1559: TransactionPrep = {
  nonce: 39,
  gas_price: '65000000',
  gas_limit: '21000',
  chain_id: 1,
  max_fee_per_gas: '125000000',
  max_priority_fee_per_gas: '5000000',
}
const legacy: TransactionPrep = { nonce: 39, gas_price: '65000000', gas_limit: '21000', chain_id: 1, max_fee_per_gas: null }

async function signed(prep: TransactionPrep) {
  const raw = await wallet.signTransaction({
    to: TO,
    value: '1',
    nonce: prep.nonce,
    gasLimit: prep.gas_limit,
    ...feeFieldsOf(prep),
    chainId: prep.chain_id,
  })
  return Transaction.from(raw)
}

describe('fees', () => {
  it('signs an EIP-1559 transaction with the prepared caps', async () => {
    const tx = await signed(eip1559)
    expect(tx.type).toBe(2)
    expect(tx.maxFeePerGas).toBe(125000000n)
    expect(tx.maxPriorityFeePerGas).toBe(5000000n)
    expect(tx.gasPrice).toBeNull()
  })

  it('signs with the plain gas price where the chain has no caps', async () => {
    for (const prep of [legacy, { ...eip1559, max_fee_per_gas: undefined, max_priority_fee_per_gas: undefined }]) {
      const tx = await signed(prep)
      expect(tx.type).not.toBe(2)
      expect(tx.gasPrice).toBe(65000000n)
    }
  })

  it('shows the expected fee, and keeps back the most it can cost', () => {
    expect(feeWeiOf(eip1559)).toBe(65000000n * 21000n)
    expect(maxFeeWeiOf(eip1559)).toBe(125000000n * 21000n)
    expect(maxFeeWeiOf(legacy)).toBe(65000000n * 21000n)
  })
})
