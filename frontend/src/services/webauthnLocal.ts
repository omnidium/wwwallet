import { db } from './db'
import { parseAttestationObject } from '@/crypto/webauthnCose'
import { derToRawEcdsaSignature } from '@/crypto/ecdsaDer'

const CREDENTIAL_ID = 'default' as const
const RP_NAME = 'wwwallet'

export async function hasLocalPasskey(): Promise<boolean> {
  return (await db.localWebAuthnCredential.get(CREDENTIAL_ID)) !== undefined
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

/**
 * Registers a device-bound platform authenticator credential for a purely
 * local unlock gate — there is no remote relying party. Only the public key
 * is ever stored (in IndexedDB, on-device); it is never sent anywhere.
 */
export async function registerLocalPasskey(displayName: string): Promise<void> {
  if (!navigator.credentials) throw new Error('WebAuthn is not available in this browser')

  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const userId = crypto.getRandomValues(new Uint8Array(16))

  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: RP_NAME, id: location.hostname },
      user: { id: userId, name: displayName, displayName },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
      attestation: 'none',
      timeout: 60_000,
    },
  })) as PublicKeyCredential | null
  if (!credential) throw new Error('passkey registration was cancelled')

  const response = credential.response as AuthenticatorAttestationResponse
  const { credentialId, publicKeyJwk, algorithm } = parseAttestationObject(response.attestationObject)

  await db.localWebAuthnCredential.put({
    id: CREDENTIAL_ID,
    credentialId: toArrayBuffer(credentialId),
    publicKey: publicKeyJwk,
    algorithm,
  })
}

/**
 * Verifies a fresh assertion against the locally stored public key. This is a
 * real cryptographic check (unlike checking merely that "some credential
 * exists"), just verified on-device instead of by a remote relying party.
 */
export async function verifyLocalPasskey(): Promise<boolean> {
  const stored = await db.localWebAuthnCredential.get(CREDENTIAL_ID)
  if (!stored) return false

  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const assertion = (await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: [{ type: 'public-key', id: stored.credentialId }],
      userVerification: 'required',
      timeout: 60_000,
    },
  })) as PublicKeyCredential | null
  if (!assertion) return false

  const response = assertion.response as AuthenticatorAssertionResponse
  const key = await crypto.subtle.importKey(
    'jwk',
    stored.publicKey,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['verify'],
  )

  const clientDataHash = await crypto.subtle.digest('SHA-256', response.clientDataJSON)
  const signedData = new Uint8Array(response.authenticatorData.byteLength + clientDataHash.byteLength)
  signedData.set(new Uint8Array(response.authenticatorData), 0)
  signedData.set(new Uint8Array(clientDataHash), response.authenticatorData.byteLength)

  const rawSignature = derToRawEcdsaSignature(new Uint8Array(response.signature))

  return crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, rawSignature, signedData)
}
