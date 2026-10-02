//! Issuing and checking the anonymous proof-of-work session tokens described
//! in session.rs.

use axum::extract::{Request, State};
use axum::http::{HeaderMap, StatusCode};
use axum::middleware::Next;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde::{Deserialize, Serialize};

use crate::error::ApiError;
use crate::session::{random_id, Mode, RedeemError, CHALLENGE_TTL_SECS};
use crate::state::AppState;

/// The request header a session token travels in.
pub const SESSION_HEADER: &str = "x-wwwallet-session";

fn client_ip(headers: &HeaderMap) -> &str {
    // See chains.rs's copy: set by Cloudflare's edge, not spoofable.
    headers
        .get("cf-connecting-ip")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown")
}

fn now_secs() -> u64 {
    worker::Date::now().as_millis() / 1000
}

fn refused(status: StatusCode, code: &'static str) -> ApiError {
    ApiError::Coded { status, code }
}

#[derive(Serialize)]
pub struct ChallengeResponse {
    challenge: String,
    /// Leading zero bits SHA-256("<challenge>:<nonce>") must have.
    bits: u32,
    expires_in: u64,
}

#[worker::send]
pub async fn challenge(State(state): State<AppState>, headers: HeaderMap) -> Result<Json<ChallengeResponse>, ApiError> {
    let gate = &state.sessions;
    let Some(sessions) = gate.sessions.as_ref().filter(|_| gate.mode != Mode::Off) else {
        // The app takes this as "carry on without a token".
        return Err(refused(StatusCode::NOT_FOUND, "sessions_off"));
    };
    state.providers.check_rate_limit(client_ip(&headers), "session_challenge").await?;
    let id = random_id().ok_or_else(|| ApiError::Upstream("no randomness available".to_string()))?;
    Ok(Json(ChallengeResponse {
        challenge: sessions.challenge(id, now_secs()),
        bits: sessions.pow_bits,
        expires_in: CHALLENGE_TTL_SECS,
    }))
}

#[derive(Deserialize)]
pub struct RedeemBody {
    challenge: String,
    nonce: String,
}

#[derive(Serialize)]
pub struct TokenResponse {
    token: String,
    expires_at: u64,
}

#[worker::send]
pub async fn redeem(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(body): Json<RedeemBody>,
) -> Result<Json<TokenResponse>, ApiError> {
    let gate = &state.sessions;
    let Some(sessions) = gate.sessions.as_ref().filter(|_| gate.mode != Mode::Off) else {
        return Err(refused(StatusCode::NOT_FOUND, "sessions_off"));
    };
    // Minting is the expensive-to-abuse step, so it gets its own, much
    // tighter per-IP limit than ordinary requests.
    if let Ok(outcome) = gate.mint_limiter.limit(format!("mint:{}", client_ip(&headers))).await {
        if !outcome.success {
            return Err(ApiError::RateLimited);
        }
    }
    match sessions.redeem(&body.challenge, &body.nonce, now_secs()) {
        Ok((token, expires_at)) => Ok(Json(TokenResponse { token, expires_at })),
        Err(RedeemError::ExpiredChallenge) => Err(refused(StatusCode::BAD_REQUEST, "challenge_expired")),
        Err(RedeemError::BadChallenge | RedeemError::InsufficientWork) => {
            Err(refused(StatusCode::BAD_REQUEST, "bad_solution"))
        }
    }
}

/// In front of every route except the two above: checks the request's
/// session token (per SESSION_MODE) and rate-limits by it.
#[worker::send]
pub async fn gate(State(state): State<AppState>, request: Request, next: Next) -> Response {
    if request.uri().path().starts_with("/api/v1/session") {
        return next.run(request).await;
    }
    let gate = &state.sessions;
    if gate.mode == Mode::Off {
        return next.run(request).await;
    }
    let Some(sessions) = gate.sessions.as_ref() else {
        if gate.mode == Mode::Required {
            // Fail closed: "required" with no secret to check against.
            return refused(StatusCode::SERVICE_UNAVAILABLE, "sessions_misconfigured").into_response();
        }
        return next.run(request).await;
    };
    let token = request.headers().get(SESSION_HEADER).and_then(|v| v.to_str().ok());
    match token {
        Some(token) => match sessions.verify(token, now_secs()) {
            Some(id) => {
                // A limiter failure lets the request through: the per-IP and
                // upstream budgets behind this still apply.
                if let Ok(outcome) = gate.limiter.limit(format!("session:{id}")).await {
                    if !outcome.success {
                        return ApiError::RateLimited.into_response();
                    }
                }
            }
            // Expired or forged: the app fetches a fresh token and retries.
            None => return refused(StatusCode::UNAUTHORIZED, "session_invalid").into_response(),
        },
        None if gate.mode == Mode::Required => {
            return refused(StatusCode::UNAUTHORIZED, "session_required").into_response()
        }
        None => {}
    }
    next.run(request).await
}
