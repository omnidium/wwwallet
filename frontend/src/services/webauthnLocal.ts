import { i18n } from '@/i18n'
import { db } from './db'
import { TranslatedError, translatedError } from './errors'

const CREDENTIAL_ID = 'default' as const
const RP_NAME = 'wwwallet'

/** Minimal typing for the PRF extension — not yet in every TS lib.dom version. */
interface PrfExtensionResults {
  prf?: { enabled?: boolean; results?: { first?: ArrayBuffer } }
}

export class PrfNotSupportedError extends TranslatedError {
  constructor() {
    super(i18n.global.t('errors.prfNotSupported'))
    this.name = 'PrfNotSupportedError'
  }
}

/**
 * `navigator.credentials.create/get` reject with a native DOMException on
 * anything short of success — cancelling the prompt, letting it time out, or
 * the browser refusing it outright (e.g. no user gesture) all land here as
 * "NotAllowedError: The operation either timed out or was not allowed. ..."
 * straight from the platform, in English regardless of the app's language.
 * Wrapping every call site with this turns that into the same translated,
 * per-operation message the existing null-result branches already use below
 * (a null result is the rarer, spec-legal alternative to a rejection — both
 * mean the same thing to the user) — anything that isn't the common
 * "cancelled/timed out" case still gets a translated, if generic, fallback
 * rather than that raw platform text.
 */
async function runCeremony<T>(promise: Promise<T>, cancelledKey: string): Promise<T> {
  try {
    return await promise
  } catch (err) {
    if (err instanceof DOMException && err.name === 'NotAllowedError') throw translatedError(cancelledKey)
    throw translatedError('errors.passkeyOperationFailed')
  }
}

export type CapabilityAnswer = 'supported' | 'unsupported' | 'unknown'

/** Where a passkey is created — see registerLocalPasskeyWithPrf. */
export type PasskeyLocation = 'device' | 'phone' | 'securityKey'

let capabilities: Promise<Record<string, boolean> | null> | null = null
function clientCapabilities(): Promise<Record<string, boolean> | null> {
  capabilities ??= (async () => {
    const getCapabilities = (
      PublicKeyCredential as unknown as { getClientCapabilities?: () => Promise<Record<string, boolean>> }
    ).getClientCapabilities
    if (typeof getCapabilities !== 'function') return null
    try {
      return await getCapabilities.call(PublicKeyCredential)
    } catch {
      return null
    }
  })()
  return capabilities
}

async function capability(name: string): Promise<CapabilityAnswer> {
  if (typeof PublicKeyCredential === 'undefined' || !navigator.credentials) return 'unsupported'
  const value = (await clientCapabilities())?.[name]
  return value === true ? 'supported' : value === false ? 'unsupported' : 'unknown'
}

/**
 * Whether this browser can do the PRF extension at all, asked up front
 * (WebAuthn's getClientCapabilities) instead of found out from a failed
 * registration. "unknown" — the browser can't say — means try and see.
 * "supported" is about the browser: a particular authenticator (say, a
 * laptop's built-in one) can still lack PRF, which registration reports as
 * PrfNotSupportedError — a phone or security key may still work then.
 */
export function prfAvailability(): Promise<CapabilityAnswer> {
  return capability('extension:prf')
}

/**
 * Whether this browser can use a passkey on a phone, by QR code ("hybrid"
 * transport) — not, say, Firefox on Linux, or Chrome without Bluetooth to
 * check the phone is nearby.
 */
export function phoneAvailability(): Promise<CapabilityAnswer> {
  return capability('hybridTransport')
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
  // 'phone' (by QR code) or 'securityKey': for when this device's own
  // authenticator lacks PRF.
  where: PasskeyLocation = 'device',
): Promise<{ credentialId: Uint8Array<ArrayBuffer>; prfSalt: Uint8Array<ArrayBuffer>; prfSecret: ArrayBuffer }> {
  if (!navigator.credentials) throw translatedError('errors.webauthnUnavailable')

  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const userId = crypto.getRandomValues(new Uint8Array(16))
  const prfSalt = crypto.getRandomValues(new Uint8Array(32))

  const credential = (await runCeremony(
    navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: RP_NAME, id: location.hostname },
        user: { id: userId, name: displayName, displayName },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: where === 'device' ? 'platform' : 'cross-platform',
          userVerification: 'required',
          residentKey: 'preferred',
        },
        attestation: 'none',
        timeout: 60_000,
        // Which of the browser's own options to lead with — the QR code for
        // a phone, the "insert your key" prompt for a security key — in
        // browsers that read hints (WebAuthn Level 3); others ignore it.
        // (Spread in: not in every TS lib.dom version yet, same as PRF's types.)
        ...({ hints: [where === 'phone' ? 'hybrid' : where === 'securityKey' ? 'security-key' : 'client-device'] } as object),
        // Evaluating PRF right here, not just probing for support, lets browsers
        // that implement PRF-at-creation return the derived secret in this same
        // response — skipping the second navigator.credentials.get() ceremony
        // (and its own biometric prompt) that evaluatePrf() below exists for.
        extensions: { prf: { eval: { first: toArrayBuffer(prfSalt) } } } as AuthenticationExtensionsClientInputs,
      },
    }),
    'errors.passkeyRegistrationCancelled',
  )) as PublicKeyCredential | null
  if (!credential) throw translatedError('errors.passkeyRegistrationCancelled')

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
  if (!secret) throw translatedError('errors.passkeyNoPrfSecret')
  return secret
}

async function evaluatePrf(credentialId: Uint8Array, prfSalt: Uint8Array): Promise<ArrayBuffer | undefined> {
  const challenge = crypto.getRandomValues(new Uint8Array(32))
  const assertion = (await runCeremony(
    navigator.credentials.get({
      publicKey: {
        challenge,
        allowCredentials: [{ type: 'public-key', id: toArrayBuffer(credentialId) }],
        userVerification: 'required',
        timeout: 60_000,
        extensions: { prf: { eval: { first: toArrayBuffer(prfSalt) } } } as AuthenticationExtensionsClientInputs,
      },
    }),
    'errors.passkeyUnlockCancelled',
  )) as PublicKeyCredential | null
  if (!assertion) throw translatedError('errors.passkeyUnlockCancelled')

  const results = assertion.getClientExtensionResults() as PrfExtensionResults
  return results.prf?.results?.first
}
