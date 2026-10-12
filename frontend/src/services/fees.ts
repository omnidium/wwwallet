import type { TransactionPrep } from './api'

/** A prepared transaction's expected network fee, in the native coin's smallest unit. */
export function feeWeiOf(prep: { gas_price: string; gas_limit: string }): bigint {
  return BigInt(prep.gas_price) * BigInt(prep.gas_limit)
}

/**
 * The most a prepared transaction's fee can come to — what the network
 * checks the balance against before taking it, so what a max send keeps back.
 */
export function maxFeeWeiOf(prep: TransactionPrep): bigint {
  return BigInt(prep.max_fee_per_gas ?? prep.gas_price) * BigInt(prep.gas_limit)
}

/**
 * The fee fields to sign a prepared transaction with: EIP-1559 caps, which
 * leave room for the base fee to rise before it's mined, wherever the chain
 * has them; a plain gas price where it doesn't.
 */
export function feeFieldsOf(
  prep: TransactionPrep,
): { type: 2; maxFeePerGas: string; maxPriorityFeePerGas: string } | { gasPrice: string } {
  if (prep.max_fee_per_gas != null && prep.max_priority_fee_per_gas != null) {
    return { type: 2, maxFeePerGas: prep.max_fee_per_gas, maxPriorityFeePerGas: prep.max_priority_fee_per_gas }
  }
  return { gasPrice: prep.gas_price }
}
