import { describe, expect, it } from 'vitest'
import { generateKeyPairSync, sign } from 'node:crypto'
import { derToRawEcdsaSignature } from '../ecdsaDer'

describe('derToRawEcdsaSignature', () => {
  it('converts a real DER-encoded P-256 ECDSA signature to raw r||s and verifies with Web Crypto', async () => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
    const message = new TextEncoder().encode('authenticatorData || clientDataHash')

    const derSignature = sign('sha256', message, privateKey) // Node defaults to DER encoding
    const rawSignature = derToRawEcdsaSignature(new Uint8Array(derSignature))
    expect(rawSignature).toHaveLength(64)

    const jwk = publicKey.export({ format: 'jwk' }) as JsonWebKey
    const cryptoKey = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify'],
    )

    const isValid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      cryptoKey,
      rawSignature,
      message,
    )
    expect(isValid).toBe(true)
  })

  it('rejects a corrupted signature', async () => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
    const message = new TextEncoder().encode('some data')
    const derSignature = sign('sha256', message, privateKey)
    const rawSignature = derToRawEcdsaSignature(new Uint8Array(derSignature))
    rawSignature[0] = rawSignature[0]! ^ 0xff // corrupt it

    const jwk = publicKey.export({ format: 'jwk' }) as JsonWebKey
    const cryptoKey = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify'],
    )

    const isValid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      cryptoKey,
      rawSignature,
      message,
    )
    expect(isValid).toBe(false)
  })
})
