use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub enum ApiError {
    BadRequest(String),
    Upstream(String),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            ApiError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            ApiError::Upstream(msg) => (StatusCode::BAD_GATEWAY, msg),
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}

impl From<wwwallet_providers::ProviderError> for ApiError {
    fn from(err: wwwallet_providers::ProviderError) -> Self {
        match err {
            wwwallet_providers::ProviderError::InvalidInput(msg) => ApiError::BadRequest(msg),
            other => {
                tracing::warn!(error = %other, "upstream provider error");
                ApiError::Upstream("upstream provider request failed".to_string())
            }
        }
    }
}
