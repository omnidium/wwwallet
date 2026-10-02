import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { leadingZeroBits, sha256, solve } from '../powSolver'

describe('powSolver', () => {
  it('counts leading zero bits the same way the backend does', () => {
    expect(leadingZeroBits(new Uint8Array([0, 0, 0b0001_0000]))).toBe(19)
    expect(leadingZeroBits(new Uint8Array([0b1000_0000]))).toBe(0)
    expect(leadingZeroBits(new Uint8Array([0, 0]))).toBe(16)
  })

  it('hashes exactly like WebCrypto (and so like the backend), across block boundaries', async () => {
    const encoder = new TextEncoder()
    for (const text of ['', 'abc', 'a'.repeat(55), 'a'.repeat(56), 'a'.repeat(64), 'x.y:12345', 'é'.repeat(70)]) {
      const expected = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(text)))
      expect(sha256(encoder.encode(text))).toEqual(expected)
    }
  })

  it('finds a nonce whose hash has enough zero bits, and lanes never overlap', async () => {
    const nonce = solve('challenge', 10)
    const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`challenge:${nonce}`)))
    expect(leadingZeroBits(hash)).toBeGreaterThanOrEqual(10)
    const lane = solve('challenge', 6, 1, 3)
    expect(Number(lane) % 3).toBe(1)
  })
})

// An in-memory Storage: this test environment's global localStorage
// (Node's own) doesn't implement the full Storage interface.
function memoryStorage(): Storage {
  const items = new Map<string, string>()
  return {
    get length() {
      return items.size
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (i) => [...items.keys()][i] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, String(value)),
  }
}

describe('session token client', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('localStorage', memoryStorage())
  })
  afterEach(() => vi.unstubAllGlobals())

  it('reuses a stored, unexpired token without contacting the backend', async () => {
    localStorage.setItem('wwwallet.session', JSON.stringify({ token: 'stored', expiresAt: Date.now() + 3_600_000 }))
    const fetchSpy = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchSpy)
    const { sessionToken } = await import('../session')
    expect(await sessionToken()).toBe('stored')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('carries on without a token when the backend has them switched off, and stops asking', async () => {
    const fetchSpy = vi.fn<typeof fetch>().mockResolvedValue(new Response('{"code":"sessions_off"}', { status: 404 }))
    vi.stubGlobal('fetch', fetchSpy)
    const { sessionToken } = await import('../session')
    expect(await sessionToken()).toBeNull()
    expect(await sessionToken()).toBeNull()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('treats a nearly-expired stored token as gone', async () => {
    localStorage.setItem('wwwallet.session', JSON.stringify({ token: 'old', expiresAt: Date.now() + 60_000 }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 500 })))
    const { sessionToken } = await import('../session')
    expect(await sessionToken()).toBeNull()
  })
})
