/**
 * WebAuthn assertion signatures are DER-encoded (SEQUENCE of two INTEGERs),
 * but Web Crypto's ECDSA verify expects the raw fixed-length r||s (P1363)
 * format — this conversion is easy to miss and silently makes every
 * verification fail.
 */
export function derToRawEcdsaSignature(der: Uint8Array, componentSize = 32): Uint8Array<ArrayBuffer> {
  let offset = 0
  if (der[offset++] !== 0x30) throw new Error('invalid DER signature: expected SEQUENCE')

  const seqLenByte = der[offset++]
  if (seqLenByte === undefined) throw new Error('invalid DER signature: unexpected end of data')
  if (seqLenByte & 0x80) {
    offset += seqLenByte & 0x7f
  }

  const readInteger = (): Uint8Array<ArrayBuffer> => {
    if (der[offset++] !== 0x02) throw new Error('invalid DER signature: expected INTEGER')
    const len = der[offset++]
    if (len === undefined) throw new Error('invalid DER signature: unexpected end of data')
    let value = der.slice(offset, offset + len)
    offset += len
    while (value.length > componentSize && value[0] === 0) {
      value = value.slice(1)
    }
    return value
  }

  const r = readInteger()
  const s = readInteger()

  const out = new Uint8Array(componentSize * 2)
  out.set(padLeft(r, componentSize), 0)
  out.set(padLeft(s, componentSize), componentSize)
  return out
}

function padLeft(bytes: Uint8Array<ArrayBuffer>, size: number): Uint8Array<ArrayBuffer> {
  if (bytes.length === size) return bytes
  const out = new Uint8Array(size)
  out.set(bytes, size - bytes.length)
  return out
}
