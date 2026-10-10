/** A prepared transaction's network fee, in the native coin's smallest unit. */
export function feeWeiOf(prep: { gas_price: string; gas_limit: string }): bigint {
  return BigInt(prep.gas_price) * BigInt(prep.gas_limit)
}
