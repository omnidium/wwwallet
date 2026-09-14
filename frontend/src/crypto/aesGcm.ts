export async function importAesKey(
  rawKeyBytes: Uint8Array<ArrayBuffer>,
  extractable = false,
): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', rawKeyBytes, 'AES-GCM', extractable, ['encrypt', 'decrypt'])
}

export async function exportAesKeyBytes(key: CryptoKey): Promise<Uint8Array<ArrayBuffer>> {
  return new Uint8Array(await crypto.subtle.exportKey('raw', key))
}

export function generateIv(): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(12))
}

export async function encrypt(
  key: CryptoKey,
  iv: Uint8Array<ArrayBuffer>,
  plaintext: Uint8Array<ArrayBuffer>,
): Promise<ArrayBuffer> {
  return crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext)
}

export async function decrypt(
  key: CryptoKey,
  iv: Uint8Array<ArrayBuffer>,
  ciphertext: ArrayBuffer,
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
}
