import { HDNodeWallet, Wallet, getAddress, isAddress } from 'ethers'
import type { ChainSlug } from './api'
import type { NewWalletAccount } from '@/stores/accounts'
import { translatedError } from './errors'

/**
 * Account private keys are stored as plain hex, protected only by the vault's
 * own encryption (master key, unlocked via passkey or recovery phrase — see
 * crypto/vault.ts) — there's no separate per-account keystore password to
 * type. That used to be an ethers Web3 Secret Storage keystore requiring its
 * own scrypt password, which meant a second secret to remember just to spend
 * funds; the vault unlock is now the only gate, matching how the passwordless
 * redesign already treats "vault unlocked" as sufficient authorization.
 */
export async function createWallet(label: string, chain: ChainSlug): Promise<NewWalletAccount> {
  const wallet = HDNodeWallet.createRandom()
  return {
    address: wallet.address,
    label,
    chain,
    privateKey: wallet.privateKey,
    hasMnemonic: true,
    mnemonic: wallet.mnemonic?.phrase,
  }
}

export async function importFromMnemonic(
  label: string,
  chain: ChainSlug,
  mnemonic: string,
): Promise<NewWalletAccount> {
  const trimmed = mnemonic.trim()
  // ethers throws its own untranslated error here (e.g. "invalid mnemonic")
  // for a malformed phrase — every other validation-failure message in this
  // app is translated, so this shouldn't be the one exception.
  let wallet: HDNodeWallet
  try {
    wallet = HDNodeWallet.fromPhrase(trimmed)
  } catch {
    throw translatedError('errors.invalidMnemonic')
  }
  return {
    address: wallet.address,
    label,
    chain,
    privateKey: wallet.privateKey,
    hasMnemonic: true,
    mnemonic: trimmed,
  }
}

export async function importFromPrivateKey(
  label: string,
  chain: ChainSlug,
  privateKey: string,
): Promise<NewWalletAccount> {
  let wallet: Wallet
  try {
    wallet = new Wallet(privateKey.trim())
  } catch {
    throw translatedError('errors.invalidPrivateKey')
  }
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey, hasMnemonic: false }
}

/**
 * A keystore JSON file has its own password baked in by whatever tool created
 * it (e.g. MetaMask, geth) — that's an inherent property of the file being
 * imported, not a new app password, so there's no way around asking for it
 * once, here, to decrypt the file.
 */
export async function importFromKeystoreJson(
  label: string,
  chain: ChainSlug,
  keystoreJson: string,
  filePassword: string,
): Promise<NewWalletAccount> {
  let wallet: Wallet
  try {
    wallet = (await Wallet.fromEncryptedJson(keystoreJson, filePassword)) as Wallet
  } catch {
    // Covers both a malformed keystore file and a wrong password — ethers
    // doesn't distinguish the two in a way worth surfacing separately.
    throw translatedError('errors.invalidKeystoreFile')
  }
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey, hasMnemonic: false }
}

export async function unlockWalletForSigning(account: NewWalletAccount): Promise<Wallet> {
  return new Wallet(account.privateKey)
}

export function isValidAddress(address: string): boolean {
  return isAddress(address)
}

// Ronin's wallets and explorer write the same address as "ronin:" plus the
// hex, without the 0x.
const RONIN_ADDRESS = /^ronin:([0-9a-fA-F]{40})$/

/**
 * The address typed or pasted — 0x or bare hex, or Ronin's "ronin:" form —
 * as a checksummed 0x address, or null if it isn't one.
 */
export function parseAddress(input: string): string | null {
  const trimmed = input.trim()
  const ronin = trimmed.match(RONIN_ADDRESS)
  const address = ronin ? `0x${ronin[1]}` : trimmed
  return isAddress(address) ? getAddress(address) : null
}

/** The first address anywhere in `text` (a scanned QR code: bare, an EIP-681 "ethereum:0x…" URI, or "ronin:…"), as 0x. */
export function addressInText(text: string): string | null {
  const match = text.match(/(?:0x|ronin:)([a-fA-F0-9]{40})/)
  return match ? `0x${match[1]}` : null
}
