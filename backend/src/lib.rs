mod error;
mod routes;
mod state;

use std::rc::Rc;

use axum::http::{header, HeaderValue, Method};
use tower::Service;
use tower_http::cors::{AllowOrigin, CorsLayer};
use worker::send::SendWrapper;
use worker::{event, Context, Env, HttpRequest};
use wwwallet_providers::{ProviderConfig, ProviderRegistry};

use crate::state::AppState;

#[event(fetch)]
async fn fetch(
    req: HttpRequest,
    env: Env,
    _ctx: Context,
) -> worker::Result<axum::http::Response<axum::body::Body>> {
    let providers = build_provider_registry(&env)?;
    let cors = build_cors_layer(&env);

    let state = AppState {
        providers: SendWrapper::new(Rc::new(providers)),
    };

    let mut router = routes::build_router(state, cors);
    let response = router
        .call(req.map(axum::body::Body::new))
        .await
        .expect("axum router with no fallible middleware is infallible");

    Ok(response)
}

fn build_provider_registry(env: &Env) -> worker::Result<ProviderRegistry> {
    let rate_limiter_default = env.rate_limiter("RATE_LIMITER_DEFAULT")?;
    let rate_limiter_broadcast = env.rate_limiter("RATE_LIMITER_BROADCAST")?;
    let config = ProviderConfig {
        alchemy_api_key: env.secret("ALCHEMY_API_KEY")?.to_string(),
        ethplorer_api_key: env.secret("ETHPLORER_API_KEY")?.to_string(),
        etherscan_api_key: env.secret("ETHERSCAN_API_KEY")?.to_string(),
        zerox_api_key: env.secret("ZEROX_API_KEY")?.to_string(),
    };
    Ok(ProviderRegistry::new(config, rate_limiter_default, rate_limiter_broadcast))
}

fn build_cors_layer(env: &Env) -> CorsLayer {
    let allowed_origins = env
        .var("CORS_ALLOWED_ORIGINS")
        .map(|v| v.to_string())
        .unwrap_or_default();

    let origins: Vec<HeaderValue> = allowed_origins
        .split(',')
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .filter_map(|o| o.parse().ok())
        .collect();

    if origins.is_empty() {
        worker::console_warn!("CORS_ALLOWED_ORIGINS is empty; no browser origin will be allowed");
        return CorsLayer::new();
    }

    CorsLayer::new()
        .allow_origin(AllowOrigin::list(origins))
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([header::CONTENT_TYPE])
}
