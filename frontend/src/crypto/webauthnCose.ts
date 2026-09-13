import { cborMapGet, decodeCbor } from './cbor'

export interface ParsedAttestation {
  credentialId: Uint8Array
  publicKeyJwk: JsonWebKey
  algorithm: number
}

const ATTESTED_CREDENTIAL_DATA_FLAG = 0x40

/**
 * Parses the CBOR `authData` structure from a WebAuthn attestationObject to pull
 * out the credential id and public key, without needing a remote relying party
 * to do it for us. Only ES256 (P-256) is supported — that's what `pubKeyCredParams`
 * requests at registration time, and is the default for platform authenticators
 * (Touch ID, Windows Hello, Android biometric).
 */
export function parseAttestationObject(attestationObject: ArrayBuffer): ParsedAttestation {
  const att = decodeCbor(new Uint8Array(attestationObject)) as { authData: Uint8Array }
  const authData = att.authData

  const flags = authData[32]!
  if ((flags & ATTESTED_CREDENTIAL_DATA_FLAG) === 0) {
    throw new Error('authenticator did not include attested credential data')
  }

  let offset = 37 // rpIdHash(32) + flags(1) + signCount(4)
  offset += 16 // aaguid
  const credentialIdLength = (authData[offset]! << 8) | authData[offset + 1]!
  offset += 2
  const credentialId = authData.slice(offset, offset + credentialIdLength)
  offset += credentialIdLength

  const coseKey = decodeCbor(authData.slice(offset))
  const keyType = cborMapGet(coseKey, 1)
  const algorithm = cborMapGet(coseKey, 3) as number
  if (keyType !== 2 || algorithm !== -7) {
    throw new Error('only ES256 (P-256) platform authenticator keys are supported')
  }

  const x = cborMapGet(coseKey, -2) as Uint8Array
  const y = cborMapGet(coseKey, -3) as Uint8Array

  return {
    credentialId,
    algorithm,
    publicKeyJwk: {
      kty: 'EC',
      crv: 'P-256',
      x: base64UrlEncode(x),
      y: base64UrlEncode(y),
      ext: true,
    },
  }
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
