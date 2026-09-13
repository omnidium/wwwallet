import { HDNodeWallet, Wallet, isAddress } from 'ethers'
import type { ChainSlug } from './api'
import type { WalletAccount } from '@/stores/accounts'

/**
 * Wallets are ethers v6 encrypted keystores (Web3 Secret Storage v3, scrypt-derived
 * AES key) — the same proven format the original app used. The keystore's own
 * password is independent of the vault passphrase; the vault encrypts the
 * keystore blob again at rest, so unlocking the vault alone is not enough to
 * spend funds without also knowing the keystore password.
 */
export async function createWallet(
  label: string,
  chain: ChainSlug,
  keystorePassword: string,
): Promise<WalletAccount> {
  const wallet = HDNodeWallet.createRandom()
  const encryptedKeystore = await wallet.encrypt(keystorePassword)
  return { address: wallet.address, label, chain, encryptedKeystore }
}

export async function importFromMnemonic(
  label: string,
  chain: ChainSlug,
  mnemonic: string,
  keystorePassword: string,
): Promise<WalletAccount> {
  const wallet = HDNodeWallet.fromPhrase(mnemonic.trim())
  const encryptedKeystore = await wallet.encrypt(keystorePassword)
  return { address: wallet.address, label, chain, encryptedKeystore }
}

export async function importFromPrivateKey(
  label: string,
  chain: ChainSlug,
  privateKey: string,
  keystorePassword: string,
): Promise<WalletAccount> {
  const wallet = new Wallet(privateKey.trim())
  const encryptedKeystore = await wallet.encrypt(keystorePassword)
  return { address: wallet.address, label, chain, encryptedKeystore }
}

export async function importFromKeystoreJson(
  label: string,
  chain: ChainSlug,
  keystoreJson: string,
  keystorePassword: string,
): Promise<WalletAccount> {
  // Round-trips through ethers to validate the file and normalize on our own
  // encryption before storing it, rather than trusting an arbitrary uploaded blob.
  const wallet = await Wallet.fromEncryptedJson(keystoreJson, keystorePassword)
  const encryptedKeystore = await wallet.encrypt(keystorePassword)
  return { address: wallet.address, label, chain, encryptedKeystore }
}

/** Decrypts a stored keystore to get a signer — needed only at the moment of signing a transaction. */
export async function unlockWalletForSigning(account: WalletAccount, keystorePassword: string): Promise<Wallet> {
  const wallet = await Wallet.fromEncryptedJson(account.encryptedKeystore, keystorePassword)
  return wallet as Wallet
}

export function isValidAddress(address: string): boolean {
  return isAddress(address)
}
