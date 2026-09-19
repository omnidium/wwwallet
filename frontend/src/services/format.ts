/** `0x1234…6789` — used wherever a full address would be too long to show inline. */
export function truncateAddress(address: string): string {
  return address.length > 12 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address
}
