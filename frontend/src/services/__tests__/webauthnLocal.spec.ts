import { afterEach, describe, expect, it, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { registerLocalPasskeyWithPrf } from '../webauthnLocal'

function failCreateWith(name: string) {
  vi.stubGlobal('navigator', {
    ...navigator,
    credentials: { create: vi.fn<CredentialsContainer["create"]>().mockRejectedValue(new DOMException('platform message', name)) },
  })
}

describe('passkey registration failures', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('points at a locked or paused passkey manager when the provider itself fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    for (const name of ['NotReadableError', 'UnknownError']) {
      failCreateWith(name)
      await expect(registerLocalPasskeyWithPrf('wwwallet')).rejects.toThrow(/sync passphrase/)
    }
  })

  it('names anything it has no specific message for, and still reads a cancel as a cancel', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    failCreateWith('AbortError')
    await expect(registerLocalPasskeyWithPrf('wwwallet')).rejects.toThrow('(AbortError)')
    failCreateWith('NotAllowedError')
    await expect(registerLocalPasskeyWithPrf('wwwallet')).rejects.toThrow(/cancelled/)
  })
})
