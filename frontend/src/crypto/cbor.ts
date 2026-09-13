import { decode } from 'cbor-x'

export function decodeCbor(bytes: Uint8Array): unknown {
  return decode(bytes)
}

/** COSE key labels are integers (including negative ones); handle both Map and plain-object decodes. */
export function cborMapGet(map: unknown, key: number): unknown {
  if (map instanceof Map) return map.get(key)
  if (map && typeof map === 'object') return (map as Record<string, unknown>)[String(key)]
  return undefined
}
