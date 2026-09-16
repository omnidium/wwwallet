import { HDNodeWallet, Wallet, isAddress } from 'ethers'
import type { ChainSlug } from './api'
import type { NewWalletAccount } from '@/stores/accounts'

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
  const wallet = HDNodeWallet.fromPhrase(trimmed)
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
  const wallet = new Wallet(privateKey.trim())
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
  const wallet = await Wallet.fromEncryptedJson(keystoreJson, filePassword)
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey, hasMnemonic: false }
}

export async function unlockWalletForSigning(account: NewWalletAccount): Promise<Wallet> {
  return new Wallet(account.privateKey)
}

export function isValidAddress(address: string): boolean {
  return isAddress(address)
}
