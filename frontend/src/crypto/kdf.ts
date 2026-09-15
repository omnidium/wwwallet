/**
 * Derives an AES-GCM key-wrapping key from raw key material that's already
 * high-entropy (a WebAuthn PRF output, or the vault's 256-bit recovery
 * mnemonic) — unlike a human-chosen passphrase, this doesn't need a slow
 * memory-hard KDF, just domain separation via HKDF's `info` parameter so the
 * same input can't be reused to derive a different context's key.
 */
export async function deriveWrapKeyFromBytes(
  rawKeyMaterial: Uint8Array<ArrayBuffer> | ArrayBuffer,
  infoLabel: string,
): Promise<CryptoKey> {
  const ikm = await crypto.subtle.importKey('raw', rawKeyMaterial, 'HKDF', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(0),
      info: new TextEncoder().encode(infoLabel),
    },
    ikm,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}
