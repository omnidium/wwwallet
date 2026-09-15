import { db } from './db'

const CREDENTIAL_ID = 'default' as const
const RP_NAME = 'wwwallet'

/** Minimal typing for the PRF extension — not yet in every TS lib.dom version. */
interface PrfExtensionResults {
  prf?: { enabled?: boolean; results?: { first?: ArrayBuffer } }
}

export class PrfNotSupportedError extends Error {
  constructor() {
    super(
      'This device or browser does not support passwordless passkey unlock (WebAuthn PRF). ' +
        "You can still unlock with your recovery phrase, or try a different device/browser.",
    )
    this.name = 'PrfNotSupportedError'
  }
}

export async function hasLocalPasskey(): Promise<boolean> {
  return (await db.localWebAuthnCredential.get(CREDENTIAL_ID)) !== undefined
}

export async function localPasskeyCredentialId(): Promise<Uint8Array<ArrayBuffer> | null> {
  const stored = await db.localWebAuthnCredential.get(CREDENTIAL_ID)
  return stored ? new Uint8Array(stored.credentialId) : null
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

/**
 * Registers a device-bound platform authenticator and, in the same flow,
 * confirms it supports the WebAuthn PRF extension — the only way a passkey
 * can produce real key material rather than just proving "some credential
 * exists". Throws `PrfNotSupportedError` rather than registering a passkey
 * that can't actually unlock anything.
 *
 * Returns the raw PRF secret for this registration so the caller (the vault
 * store) can immediately wrap the vault's master key with it — the same
 * secret is deterministically reproducible on future unlocks by evaluating
 * PRF with the same `prfSalt` against the same credential.
 */
export async function registerLocalPasskeyWithPrf(
  displayName: string,
): Promise<{ credentialId: Uint8Array<ArrayBuffer>; prfSalt: Uint8Array<ArrayBuffer>; prfSecret: ArrayBuffer }> {
  if (!navigator.credentials) throw new Error('WebAuthn is not available in this browser')

  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const userId = crypto.getRandomValues(new Uint8Array(16))
  const prfSalt = crypto.getRandomValues(new Uint8Array(32))

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
      extensions: { prf: {} } as AuthenticationExtensionsClientInputs,
    },
  })) as PublicKeyCredential | null
  if (!credential) throw new Error('passkey registration was cancelled')

  const credentialId = new Uint8Array(credential.rawId)
  const createResults = credential.getClientExtensionResults() as PrfExtensionResults

  // Some authenticators only confirm PRF support on `create()` without
  // returning a usable secret yet — a follow-up `get()` evaluates it for real.
  let prfSecret = createResults.prf?.results?.first
  if (!prfSecret) {
    if (createResults.prf?.enabled === false) throw new PrfNotSupportedError()
    prfSecret = await evaluatePrf(credentialId, prfSalt)
  }
  if (!prfSecret) throw new PrfNotSupportedError()

  await db.localWebAuthnCredential.put({ id: CREDENTIAL_ID, credentialId: toArrayBuffer(credentialId) })

  return { credentialId, prfSalt, prfSecret }
}

/** Evaluates PRF against the stored credential — returns the same secret every time for the same salt. */
export async function unlockPasskeyPrfSecret(
  credentialId: Uint8Array,
  prfSalt: Uint8Array,
): Promise<ArrayBuffer> {
  const secret = await evaluatePrf(credentialId, prfSalt)
  if (!secret) throw new Error('passkey did not return a PRF secret')
  return secret
}

async function evaluatePrf(credentialId: Uint8Array, prfSalt: Uint8Array): Promise<ArrayBuffer | undefined> {
  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const assertion = (await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: [{ type: 'public-key', id: toArrayBuffer(credentialId) }],
      userVerification: 'required',
      timeout: 60_000,
      extensions: { prf: { eval: { first: toArrayBuffer(prfSalt) } } } as AuthenticationExtensionsClientInputs,
    },
  })) as PublicKeyCredential | null
  if (!assertion) throw new Error('passkey unlock was cancelled')

  const results = assertion.getClientExtensionResults() as PrfExtensionResults
  return results.prf?.results?.first
}
