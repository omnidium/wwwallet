import { argon2id } from 'hash-wasm'

export interface KdfParams {
  memoryKiB: number
  iterations: number
  parallelism: number
}

// OWASP-recommended baseline for Argon2id (2023 cheat sheet): 19 MiB, 2 iterations,
// 1 degree of parallelism, when memory is constrained (mobile browsers). We use a
// higher memory cost since this runs interactively, once, on unlock rather than
// per-request on a server.
export const DEFAULT_KDF_PARAMS: KdfParams = {
  memoryKiB: 65536, // 64 MiB
  iterations: 3,
  parallelism: 1,
}

export async function deriveKeyBytes(
  passphrase: string,
  salt: Uint8Array<ArrayBuffer>,
  params: KdfParams = DEFAULT_KDF_PARAMS,
): Promise<Uint8Array<ArrayBuffer>> {
  const digest = await argon2id({
    password: passphrase,
    salt,
    memorySize: params.memoryKiB,
    iterations: params.iterations,
    parallelism: params.parallelism,
    hashLength: 32,
    outputType: 'binary',
  })
  return new Uint8Array(digest)
}

export function generateSalt(): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(16))
}

/**
 * Derives an AES-GCM key-wrapping key from raw key material that's already
 * high-entropy (a WebAuthn PRF output, or a TOTP secret) — unlike a
 * passphrase, this doesn't need a slow memory-hard KDF, just domain
 * separation via HKDF's `info` parameter so the same input can't be reused
 * to derive a different context's key.
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
