import { Secret, TOTP } from 'otpauth'

const ISSUER = 'wwwallet'

export function generateTotpSecret(): string {
  return new Secret({ size: 20 }).base32
}

export function totpProvisioningUri(secretBase32: string, accountLabel: string): string {
  const totp = new TOTP({
    issuer: ISSUER,
    label: accountLabel,
    secret: Secret.fromBase32(secretBase32),
  })
  return totp.toString()
}

/** Accepts a code within +/- 1 time step (30s) to absorb clock drift. */
export function verifyTotpCode(secretBase32: string, code: string): boolean {
  const totp = new TOTP({ secret: Secret.fromBase32(secretBase32) })
  return totp.validate({ token: code, window: 1 }) !== null
}
