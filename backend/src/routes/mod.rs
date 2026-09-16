pub mod chains;

use axum::routing::{get, post};
use axum::Router;
use tower_http::cors::CorsLayer;

use crate::state::AppState;

pub fn build_router(state: AppState, cors: CorsLayer) -> Router {
    Router::new()
        .route(
            "/api/v1/chains/:chain/address/:address",
            get(chains::address_activity),
        )
        .route(
            "/api/v1/chains/:chain/token/:address",
            get(chains::token_metadata),
        )
        .route(
            "/api/v1/chains/:chain/native-price",
            get(chains::native_price),
        )
        .route(
            "/api/v1/chains/:chain/abi/:address",
            get(chains::contract_abi),
        )
        .route(
            "/api/v1/chains/:chain/tx-prep/:address",
            get(chains::transaction_prep),
        )
        .route(
            "/api/v1/chains/:chain/broadcast",
            post(chains::broadcast_transaction),
        )
        .route("/api/v1/chains/:chain/allowance", get(chains::allowance))
        .route("/api/v1/chains/:chain/swap-quote", get(chains::swap_quote))
        .route("/api/v1/fx-rates", get(chains::fx_rates))
        .layer(cors)
        .with_state(state)
}
