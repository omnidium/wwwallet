/** `0x1234…6789` — used wherever a full address would be too long to show inline. */
export function truncateAddress(address: string): string {
  return address.length > 14 ? `${address.slice(0, 8)}…${address.slice(-6)}` : address
}
