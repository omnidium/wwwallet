//! Anonymous, proof-of-work session tokens: a better thing than an IP
//! address to rate-limit by, without identifying anyone.
//!
//! To get a token, the app asks for a challenge, finds a nonce such that
//! SHA-256("<challenge>:<nonce>") starts with `pow_bits` zero bits (a second
//! or two of a browser's time), and trades the pair for a token valid for a
//! day. Each request then carries the token, and is rate-limited per token
//! (routes/mod.rs). An abuser can't sidestep the per-token limit by minting
//! more tokens for free: every one costs that work again, and minting is
//! itself limited per IP.
//!
//! Nothing is stored server-side, and nothing in a token identifies a
//! person or device: challenges and tokens are random bytes plus a
//! timestamp, signed (HMAC-SHA256) with SESSION_SECRET so the backend can
//! check its own signature instead of keeping a list. The only state is the
//! rate limiter's short-lived counters, keyed by the token's random id.
//!
//! A token's id is its challenge's random bytes, so redeeming one solved
//! challenge twice yields the same id — the same rate-limit bucket — rather
//! than a second identity for the price of one solve.

use base64::engine::general_purpose::URL_SAFE_NO_PAD;
use base64::Engine;
use hmac::{Hmac, Mac};
use sha2::{Digest, Sha256};

type HmacSha256 = Hmac<Sha256>;

const CHALLENGE_LABEL: &[u8] = b"wwwallet-challenge-v1";
const TOKEN_LABEL: &[u8] = b"wwwallet-session-v1";
/// How long a challenge may take to solve and redeem.
pub const CHALLENGE_TTL_SECS: u64 = 5 * 60;
pub const TOKEN_TTL_SECS: u64 = 24 * 60 * 60;
const ID_LEN: usize = 16;

/// How strictly requests need a session token — set by SESSION_MODE.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Mode {
    /// Tokens are neither issued nor checked.
    Off,
    /// A valid token is rate-limited by it; no token falls back to the
    /// per-IP limits alone; an invalid or expired one is refused, so the app
    /// knows to fetch a fresh one. For rolling out before every client sends one.
    Optional,
    /// Every request needs a valid token.
    Required,
}

impl Mode {
    pub fn parse(value: Option<&str>) -> Mode {
        match value.map(str::trim) {
            Some("off") => Mode::Off,
            Some("required") => Mode::Required,
            _ => Mode::Optional,
        }
    }
}

pub struct Sessions {
    secret: Vec<u8>,
    pub pow_bits: u32,
}

fn sign(secret: &[u8], label: &[u8], payload: &[u8]) -> Vec<u8> {
    let mut mac = HmacSha256::new_from_slice(secret).expect("HMAC accepts any key length");
    mac.update(label);
    mac.update(payload);
    mac.finalize().into_bytes().to_vec()
}

fn verify_signature(secret: &[u8], label: &[u8], payload: &[u8], signature: &[u8]) -> bool {
    let mut mac = HmacSha256::new_from_slice(secret).expect("HMAC accepts any key length");
    mac.update(label);
    mac.update(payload);
    mac.verify_slice(signature).is_ok()
}

/// "<payload>.<signature>", both base64url — what challenges and tokens look like on the wire.
fn encode(payload: &[u8], signature: &[u8]) -> String {
    format!("{}.{}", URL_SAFE_NO_PAD.encode(payload), URL_SAFE_NO_PAD.encode(signature))
}

fn decode(value: &str) -> Option<(Vec<u8>, Vec<u8>)> {
    let (payload, signature) = value.split_once('.')?;
    Some((URL_SAFE_NO_PAD.decode(payload).ok()?, URL_SAFE_NO_PAD.decode(signature).ok()?))
}

/// Random id followed by a big-endian timestamp (issue time for a
/// challenge, expiry for a token).
fn id_and_time(id: &[u8; ID_LEN], secs: u64) -> Vec<u8> {
    let mut bytes = id.to_vec();
    bytes.extend_from_slice(&secs.to_be_bytes());
    bytes
}

fn split_payload(bytes: &[u8]) -> Option<([u8; ID_LEN], u64)> {
    if bytes.len() != ID_LEN + 8 {
        return None;
    }
    let id: [u8; ID_LEN] = bytes[..ID_LEN].try_into().ok()?;
    let secs = u64::from_be_bytes(bytes[ID_LEN..].try_into().ok()?);
    Some((id, secs))
}

pub fn leading_zero_bits(hash: &[u8]) -> u32 {
    let mut bits = 0;
    for byte in hash {
        if *byte == 0 {
            bits += 8;
        } else {
            return bits + byte.leading_zeros();
        }
    }
    bits
}

fn pow_hash(challenge: &str, nonce: &str) -> Vec<u8> {
    Sha256::digest(format!("{challenge}:{nonce}").as_bytes()).to_vec()
}

#[derive(Debug, PartialEq, Eq)]
pub enum RedeemError {
    BadChallenge,
    ExpiredChallenge,
    InsufficientWork,
}

impl Sessions {
    pub fn new(secret: Vec<u8>, pow_bits: u32) -> Self {
        Sessions { secret, pow_bits }
    }

    pub fn challenge(&self, id: [u8; ID_LEN], now_secs: u64) -> String {
        let payload = id_and_time(&id, now_secs);
        encode(&payload, &sign(&self.secret, CHALLENGE_LABEL, &payload))
    }

    /// Checks a solved challenge and returns a token for it, with its expiry.
    pub fn redeem(&self, challenge: &str, nonce: &str, now_secs: u64) -> Result<(String, u64), RedeemError> {
        let (payload, signature) = decode(challenge).ok_or(RedeemError::BadChallenge)?;
        if !verify_signature(&self.secret, CHALLENGE_LABEL, &payload, &signature) {
            return Err(RedeemError::BadChallenge);
        }
        let (id, issued_at) = split_payload(&payload).ok_or(RedeemError::BadChallenge)?;
        if now_secs.saturating_sub(issued_at) > CHALLENGE_TTL_SECS || issued_at > now_secs + 60 {
            return Err(RedeemError::ExpiredChallenge);
        }
        if nonce.len() > 32 || leading_zero_bits(&pow_hash(challenge, nonce)) < self.pow_bits {
            return Err(RedeemError::InsufficientWork);
        }
        let expires_at = now_secs + TOKEN_TTL_SECS;
        let token_payload = id_and_time(&id, expires_at);
        Ok((encode(&token_payload, &sign(&self.secret, TOKEN_LABEL, &token_payload)), expires_at))
    }

    /// The token's id (hex, for rate-limit keys) if it's genuine and unexpired.
    pub fn verify(&self, token: &str, now_secs: u64) -> Option<String> {
        let (payload, signature) = decode(token)?;
        if !verify_signature(&self.secret, TOKEN_LABEL, &payload, &signature) {
            return None;
        }
        let (id, expires_at) = split_payload(&payload)?;
        if now_secs >= expires_at {
            return None;
        }
        Some(id.iter().map(|b| format!("{b:02x}")).collect())
    }
}

/// Fresh random bytes for a challenge id, from the Workers runtime's CSPRNG.
pub fn random_id() -> Option<[u8; ID_LEN]> {
    let mut id = [0u8; ID_LEN];
    getrandom::getrandom(&mut id).ok()?;
    Some(id)
}

#[cfg(test)]
mod tests {
    use super::*;

    const NOW: u64 = 1_800_000_000;

    fn sessions(bits: u32) -> Sessions {
        Sessions::new(b"test-secret".to_vec(), bits)
    }

    fn solve(challenge: &str, bits: u32) -> String {
        (0u64..)
            .map(|n| n.to_string())
            .find(|n| leading_zero_bits(&pow_hash(challenge, n)) >= bits)
            .unwrap()
    }

    #[test]
    fn counts_leading_zero_bits() {
        assert_eq!(leading_zero_bits(&[0, 0, 0b0001_0000]), 19);
        assert_eq!(leading_zero_bits(&[0b1000_0000]), 0);
        assert_eq!(leading_zero_bits(&[0, 0]), 16);
    }

    #[test]
    fn a_solved_challenge_becomes_a_token_that_verifies_until_it_expires() {
        let s = sessions(8);
        let challenge = s.challenge([7; ID_LEN], NOW);
        let nonce = solve(&challenge, 8);
        let (token, expires_at) = s.redeem(&challenge, &nonce, NOW + 10).unwrap();
        assert_eq!(expires_at, NOW + 10 + TOKEN_TTL_SECS);
        assert_eq!(s.verify(&token, NOW + 20).as_deref(), Some("07".repeat(ID_LEN).as_str()));
        assert_eq!(s.verify(&token, expires_at), None);
    }

    #[test]
    fn redeeming_the_same_solve_twice_gives_the_same_identity() {
        let s = sessions(8);
        let challenge = s.challenge([9; ID_LEN], NOW);
        let nonce = solve(&challenge, 8);
        let (a, _) = s.redeem(&challenge, &nonce, NOW).unwrap();
        let (b, _) = s.redeem(&challenge, &nonce, NOW + 1).unwrap();
        assert_eq!(s.verify(&a, NOW + 2), s.verify(&b, NOW + 2));
    }

    #[test]
    fn refuses_unsolved_stale_forged_or_cross_used_values() {
        let s = sessions(12);
        let challenge = s.challenge([1; ID_LEN], NOW);
        let nonce = solve(&challenge, 12);
        let unsolved = (0u64..).map(|n| n.to_string()).find(|n| leading_zero_bits(&pow_hash(&challenge, n)) < 12).unwrap();
        assert_eq!(s.redeem(&challenge, &unsolved, NOW), Err(RedeemError::InsufficientWork));
        assert_eq!(s.redeem(&challenge, &nonce, NOW + CHALLENGE_TTL_SECS + 1), Err(RedeemError::ExpiredChallenge));

        // Signed with another secret, or tampered with.
        let other = Sessions::new(b"other".to_vec(), 12).challenge([1; ID_LEN], NOW);
        assert_eq!(s.redeem(&other, &solve(&other, 12), NOW), Err(RedeemError::BadChallenge));
        let (payload, sig) = challenge.split_once('.').unwrap();
        let flipped = if payload.starts_with('A') { 'B' } else { 'A' };
        let tampered = format!("{flipped}{}.{sig}", &payload[1..]);
        assert_eq!(s.redeem(&tampered, &nonce, NOW), Err(RedeemError::BadChallenge));

        // A challenge isn't a token, and a token isn't a challenge.
        assert_eq!(s.verify(&challenge, NOW), None);
        let (token, _) = s.redeem(&challenge, &nonce, NOW).unwrap();
        assert_eq!(s.redeem(&token, &nonce, NOW), Err(RedeemError::BadChallenge));
    }

    #[test]
    fn parses_modes_defaulting_to_optional() {
        assert_eq!(Mode::parse(Some("off")), Mode::Off);
        assert_eq!(Mode::parse(Some("required")), Mode::Required);
        assert_eq!(Mode::parse(Some("optional")), Mode::Optional);
        assert_eq!(Mode::parse(None), Mode::Optional);
    }
}
