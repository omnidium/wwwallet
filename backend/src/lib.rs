mod error;
mod routes;
mod session;
mod state;

use std::rc::Rc;

use axum::http::{header, HeaderName, HeaderValue, Method};
use tower::Service;
use tower_http::cors::{AllowOrigin, CorsLayer};
use worker::send::SendWrapper;
use worker::{event, Context, Env, HttpRequest};
use wwwallet_providers::{ProviderConfig, ProviderRegistry};

use crate::session::{Mode, Sessions};
use crate::state::{AppState, SessionGate};

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
        sessions: SendWrapper::new(Rc::new(build_session_gate(&env)?)),
    };

    let mut router = routes::build_router(state, cors);
    let mut response = router
        .call(req.map(axum::body::Body::new))
        .await
        .expect("axum router with no fallible middleware is infallible");

    // Responses carry the user's addresses, balances and transaction
    // history; the client keeps its own (encrypted) cache of what it needs,
    // so the browser's HTTP cache must never write a copy of its own to disk.
    response
        .headers_mut()
        .insert(header::CACHE_CONTROL, HeaderValue::from_static("no-store"));

    Ok(response)
}

fn build_provider_registry(env: &Env) -> worker::Result<ProviderRegistry> {
    wwwallet_providers::upstream_budget::install(
        env.rate_limiter("RATE_LIMITER_UPSTREAM_PRICES")?,
        env.rate_limiter("RATE_LIMITER_UPSTREAM")?,
    );
    let rate_limiter_default = env.rate_limiter("RATE_LIMITER_DEFAULT")?;
    let rate_limiter_broadcast = env.rate_limiter("RATE_LIMITER_BROADCAST")?;
    let config = ProviderConfig {
        alchemy_api_key: env.secret("ALCHEMY_API_KEY")?.to_string(),
        ethplorer_api_key: env.secret("ETHPLORER_API_KEY")?.to_string(),
        etherscan_api_key: env.secret("ETHERSCAN_API_KEY")?.to_string(),
        zerox_api_key: env.secret("ZEROX_API_KEY")?.to_string(),
        lifi_api_key: env.secret("LIFI_API_KEY").ok().map(|s| s.to_string()),
    };
    Ok(ProviderRegistry::new(config, rate_limiter_default, rate_limiter_broadcast))
}

fn build_session_gate(env: &Env) -> worker::Result<SessionGate> {
    let mode = Mode::parse(env.var("SESSION_MODE").ok().map(|v| v.to_string()).as_deref());
    let pow_bits = env
        .var("SESSION_POW_BITS")
        .ok()
        .and_then(|v| v.to_string().parse().ok())
        .unwrap_or(17);
    let secret = env.secret("SESSION_SECRET").ok().map(|s| s.to_string()).filter(|s| s.len() >= 32);
    if secret.is_none() && mode != Mode::Off {
        worker::console_warn!("SESSION_SECRET missing or shorter than 32 chars; session tokens disabled");
    }
    Ok(SessionGate {
        mode,
        sessions: secret.map(|s| Sessions::new(s.into_bytes(), pow_bits)),
        limiter: env.rate_limiter("RATE_LIMITER_SESSION")?,
        mint_limiter: env.rate_limiter("RATE_LIMITER_SESSION_MINT")?,
    })
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
        .allow_headers([
            header::CONTENT_TYPE,
            HeaderName::from_static(routes::session::SESSION_HEADER),
        ])
}
