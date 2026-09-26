use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub enum ApiError {
    BadRequest(String),
    /// Well-formed request the upstream explicitly can't fulfill (e.g. a swap
    /// quote for a token pair with no liquidity) — distinct from `Upstream`
    /// (an actual upstream/network failure) so the frontend can special-case
    /// it with its own clear message instead of a generic "request failed".
    Unprocessable(String),
    Upstream(String),
    RateLimited,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            ApiError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            ApiError::Unprocessable(msg) => (StatusCode::UNPROCESSABLE_ENTITY, msg),
            ApiError::Upstream(msg) => (StatusCode::BAD_GATEWAY, msg),
            ApiError::RateLimited => (
                StatusCode::TOO_MANY_REQUESTS,
                "rate limit exceeded, try again shortly".to_string(),
            ),
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}

impl From<wwwallet_providers::ProviderError> for ApiError {
    fn from(err: wwwallet_providers::ProviderError) -> Self {
        match err {
            wwwallet_providers::ProviderError::InvalidInput(msg) => ApiError::BadRequest(msg),
            wwwallet_providers::ProviderError::RateLimited => ApiError::RateLimited,
            wwwallet_providers::ProviderError::NoLiquidity => {
                ApiError::Unprocessable("no liquidity available for this token pair".to_string())
            }
            other => {
                worker::console_warn!("upstream provider error: {other}");
                ApiError::Upstream("upstream provider request failed".to_string())
            }
        }
    }
}
