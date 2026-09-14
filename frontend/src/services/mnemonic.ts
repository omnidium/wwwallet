import { Mnemonic } from 'ethers'

/**
 * The vault's recovery secret: a random BIP-39 mnemonic instead of a
 * user-chosen passphrase. 32 bytes of entropy -> 24 words (the same standard
 * format wallets already use for seed phrases), so there's nothing to
 * remember or type up front — the user only ever copies it down once.
 */
export function generateRecoveryMnemonic(): string {
  const entropy = crypto.getRandomValues(new Uint8Array(32))
  return Mnemonic.fromEntropy(entropy).phrase
}

export function recoveryMnemonicWords(phrase: string): string[] {
  return phrase.trim().split(/\s+/)
}

/** Case/whitespace differences shouldn't matter when pasting the phrase back in on unlock. */
export function normalizeMnemonic(input: string): string {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean).join(' ')
}

export function isValidRecoveryMnemonic(input: string): boolean {
  try {
    return Mnemonic.isValidMnemonic(normalizeMnemonic(input))
  } catch {
    return false
  }
}
