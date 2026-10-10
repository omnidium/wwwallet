use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub enum ApiError {
    BadRequest(String),
    /// Well-formed request the upstream explicitly can't fulfill (e.g. a swap
    /// quote for a token pair with no liquidity, or a transaction that would
    /// revert on-chain) — distinct from `Upstream` (an actual upstream/network
    /// failure). `code` is a fixed, machine-readable tag (never shown as-is)
    /// the frontend switches on to pick its own translated message, since
    /// `message` itself is hardcoded English with no i18n of its own.
    Unprocessable { code: &'static str, message: String },
    Upstream(String),
    RateLimited,
    /// The backend's own per-provider budget is spent (upstream_budget.rs):
    /// a transient, everyone-wide slowdown rather than this client's fault.
    Busy,
    /// A refusal the app acts on by `code` (session tokens: routes/session.rs).
    Coded { status: StatusCode, code: &'static str },
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, body) = match self {
            ApiError::BadRequest(msg) => (StatusCode::BAD_REQUEST, json!({ "error": msg })),
            ApiError::Unprocessable { code, message } => (
                StatusCode::UNPROCESSABLE_ENTITY,
                json!({ "error": message, "code": code }),
            ),
            ApiError::Upstream(msg) => (StatusCode::BAD_GATEWAY, json!({ "error": msg })),
            ApiError::RateLimited => (
                StatusCode::TOO_MANY_REQUESTS,
                json!({ "error": "rate limit exceeded, try again shortly" }),
            ),
            ApiError::Coded { status, code } => (status, json!({ "error": code, "code": code })),
            ApiError::Busy => (
                StatusCode::SERVICE_UNAVAILABLE,
                json!({ "error": "busy, try again shortly", "code": "busy" }),
            ),
        };
        (status, Json(body)).into_response()
    }
}

impl From<wwwallet_providers::ProviderError> for ApiError {
    fn from(err: wwwallet_providers::ProviderError) -> Self {
        match err {
            wwwallet_providers::ProviderError::InvalidInput(msg) => ApiError::BadRequest(msg),
            wwwallet_providers::ProviderError::RateLimited => ApiError::RateLimited,
            wwwallet_providers::ProviderError::Busy => ApiError::Busy,
            wwwallet_providers::ProviderError::NoLiquidity => ApiError::Unprocessable {
                code: "no_liquidity",
                message: "no liquidity available for this token pair".to_string(),
            },
            wwwallet_providers::ProviderError::TokenNotOnChain => ApiError::Unprocessable {
                code: "token_not_on_chain",
                message: "token not supported on one of these chains".to_string(),
            },
            wwwallet_providers::ProviderError::ChainNotEnabled => ApiError::Unprocessable {
                code: "chain_unavailable",
                message: "this network isn't available yet".to_string(),
            },
            wwwallet_providers::ProviderError::TransactionWouldRevert(reason) => {
                worker::console_warn!("transaction would revert: {reason}");
                ApiError::Unprocessable {
                    code: "would_revert",
                    message: "the transaction would fail if submitted".to_string(),
                }
            }
            other => {
                worker::console_warn!("upstream provider error: {other}");
                ApiError::Upstream("upstream provider request failed".to_string())
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_chain_not_switched_on_is_a_422_the_app_recognises() {
        let err = ApiError::from(wwwallet_providers::ProviderError::ChainNotEnabled);
        assert!(matches!(err, ApiError::Unprocessable { code: "chain_unavailable", .. }));
        assert_eq!(err.into_response().status(), StatusCode::UNPROCESSABLE_ENTITY);
    }
}
