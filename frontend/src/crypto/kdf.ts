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
