import { HDNodeWallet, Wallet, isAddress } from 'ethers'
import type { ChainSlug } from './api'
import type { WalletAccount } from '@/stores/accounts'

/**
 * Account private keys are stored as plain hex, protected only by the vault's
 * own encryption (master key, unlocked via passkey or recovery phrase — see
 * crypto/vault.ts) — there's no separate per-account keystore password to
 * type. That used to be an ethers Web3 Secret Storage keystore requiring its
 * own scrypt password, which meant a second secret to remember just to spend
 * funds; the vault unlock is now the only gate, matching how the passwordless
 * redesign already treats "vault unlocked" as sufficient authorization.
 */
export async function createWallet(label: string, chain: ChainSlug): Promise<WalletAccount> {
  const wallet = HDNodeWallet.createRandom()
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey }
}

export async function importFromMnemonic(
  label: string,
  chain: ChainSlug,
  mnemonic: string,
): Promise<WalletAccount> {
  const wallet = HDNodeWallet.fromPhrase(mnemonic.trim())
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey }
}

export async function importFromPrivateKey(
  label: string,
  chain: ChainSlug,
  privateKey: string,
): Promise<WalletAccount> {
  const wallet = new Wallet(privateKey.trim())
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey }
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
): Promise<WalletAccount> {
  const wallet = await Wallet.fromEncryptedJson(keystoreJson, filePassword)
  return { address: wallet.address, label, chain, privateKey: wallet.privateKey }
}

export async function unlockWalletForSigning(account: WalletAccount): Promise<Wallet> {
  return new Wallet(account.privateKey)
}

export function isValidAddress(address: string): boolean {
  return isAddress(address)
}
