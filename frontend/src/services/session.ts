import { API_BASE_URL } from './apiBase'

// The anonymous session token every backend request carries (see
// backend/src/session.rs): the backend rate-limits by it instead of by IP
// alone, and minting one costs a second or two of proof of work, which is
// what makes abusing many of them expensive. It identifies nothing: a random
// id and an expiry, signed by the backend. Kept in localStorage so a reload
// doesn't mean solving again, and shared by every request in the meantime.
//
// Never fatal: if a token can't be had (backend has them switched off, a
// network blip, an old backend), requests go out without one and the
// backend falls back to its per-IP limits.

const STORAGE_KEY = 'wwwallet.session'
// Renewed this long before it actually expires, so a request never races it.
const RENEW_MARGIN_MS = 5 * 60_000
// After the backend says tokens are off, don't ask again for this long.
const OFF_RECHECK_MS = 60 * 60_000
const MAX_WORKERS = 4

interface StoredSession {
  token: string
  /** Unix ms. */
  expiresAt: number
}

let current: StoredSession | null = null
let minting: Promise<string | null> | null = null
let offUntil = 0

function usable(session: StoredSession | null): session is StoredSession {
  return !!session && session.expiresAt - RENEW_MARGIN_MS > Date.now()
}

function readStored(): StoredSession | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as StoredSession | null
    return parsed && typeof parsed.token === 'string' && typeof parsed.expiresAt === 'number' ? parsed : null
  } catch {
    return null
  }
}

function store(session: StoredSession | null) {
  current = session
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Private mode / blocked storage: the in-memory copy still serves this page.
  }
}

/** Splits the search across a few workers; the first to find a nonce wins. */
function solveInWorkers(challenge: string, bits: number): Promise<string> {
  const lanes = Math.max(1, Math.min(MAX_WORKERS, navigator.hardwareConcurrency || 1))
  const workers = Array.from(
    { length: lanes },
    () => new Worker(new URL('./powWorker.ts', import.meta.url), { type: 'module' }),
  )
  return new Promise<string>((resolve, reject) => {
    workers.forEach((worker, start) => {
      worker.onmessage = (event: MessageEvent<{ nonce: string }>) => resolve(event.data.nonce)
      worker.onerror = (event) => reject(new Error(event.message))
      worker.postMessage({ challenge, bits, start, stride: lanes })
    })
  }).finally(() => workers.forEach((worker) => worker.terminate()))
}

async function mint(): Promise<string | null> {
  try {
    const challengeRes = await fetch(`${API_BASE_URL}/api/v1/session/challenge`)
    if (challengeRes.status === 404) {
      offUntil = Date.now() + OFF_RECHECK_MS
      return null
    }
    if (!challengeRes.ok) return null
    const { challenge, bits } = (await challengeRes.json()) as { challenge: string; bits: number }
    const nonce = await solveInWorkers(challenge, bits)
    const tokenRes = await fetch(`${API_BASE_URL}/api/v1/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challenge, nonce }),
    })
    if (!tokenRes.ok) return null
    const { token, expires_at } = (await tokenRes.json()) as { token: string; expires_at: number }
    store({ token, expiresAt: expires_at * 1000 })
    return token
  } catch {
    return null
  }
}

/** The current token, minting one first if there's none (or it's about to expire); null if none can be had. */
export async function sessionToken(): Promise<string | null> {
  if (usable(current)) return current.token
  const stored = readStored()
  if (usable(stored)) {
    current = stored
    return stored.token
  }
  if (Date.now() < offUntil) return null
  minting ??= mint().finally(() => {
    minting = null
  })
  return minting
}

/** After the backend refused the token (expired, or its secret was rotated). */
export function discardSessionToken() {
  store(null)
}

/** The request header the token travels in (backend/src/routes/session.rs). */
export const SESSION_HEADER = 'X-Wwwallet-Session'
