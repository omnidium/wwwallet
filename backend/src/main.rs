mod config;
mod error;
mod routes;
mod state;

use std::sync::Arc;
use std::time::Duration;

use axum::http::{HeaderValue, Method};
use tower_http::compression::CompressionLayer;
use tower_http::cors::{AllowOrigin, CorsLayer};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use wwwallet_providers::{ProviderConfig, ProviderRegistry};

use crate::config::Config;
use crate::state::AppState;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let config = Config::from_env()?;
    let db = wwwallet_db::create_pool(&config.database_url).await?;
    wwwallet_db::run_migrations(&db).await?;

    let providers = Arc::new(ProviderRegistry::new(ProviderConfig {
        alchemy_api_key: config.alchemy_api_key.clone(),
        ethplorer_api_key: config.ethplorer_api_key.clone(),
        etherscan_api_key: config.etherscan_api_key.clone(),
    }));

    let cors = if config.cors_allowed_origins.is_empty() {
        tracing::warn!("CORS_ALLOWED_ORIGINS is empty; no browser origin will be allowed");
        CorsLayer::new()
    } else {
        let origins: Vec<HeaderValue> = config
            .cors_allowed_origins
            .iter()
            .filter_map(|o| o.parse().ok())
            .collect();
        CorsLayer::new()
            .allow_origin(AllowOrigin::list(origins))
            .allow_methods([Method::GET])
    };

    let state = AppState { db, providers };
    let app = routes::build_router(state)
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(TimeoutLayer::with_status_code(
            axum::http::StatusCode::GATEWAY_TIMEOUT,
            Duration::from_secs(10),
        ))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind(&config.bind_addr).await?;
    tracing::info!(addr = %config.bind_addr, "wwwallet backend listening");
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;
    Ok(())
}

async fn shutdown_signal() {
    let _ = tokio::signal::ctrl_c().await;
    tracing::info!("shutdown signal received");
}
