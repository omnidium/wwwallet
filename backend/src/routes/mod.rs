pub mod chains;
pub mod markets;
pub mod session;

use axum::middleware;
use axum::routing::{get, post};
use axum::Router;
use tower_http::cors::CorsLayer;

use crate::state::AppState;

pub fn build_router(state: AppState, cors: CorsLayer) -> Router {
    Router::new()
        .route(
            "/api/v1/chains/{chain}/address/{address}",
            get(chains::address_activity),
        )
        .route(
            "/api/v1/chains/{chain}/address/{address}/presence",
            get(chains::address_presence),
        )
        .route(
            "/api/v1/chains/{chain}/address/{address}/transactions/more",
            post(chains::transaction_page),
        )
        .route(
            "/api/v1/chains/{chain}/address/{address}/nft-collections",
            get(chains::nft_collections),
        )
        .route(
            "/api/v1/chains/{chain}/address/{address}/nfts",
            get(chains::nfts),
        )
        .route(
            "/api/v1/chains/{chain}/address/{address}/nft-transfers",
            get(chains::nft_transfers),
        )
        .route(
            "/api/v1/chains/{chain}/token/{address}",
            get(chains::token_metadata),
        )
        .route(
            "/api/v1/chains/{chain}/token/{address}/price-history",
            get(chains::token_price_history),
        )
        .route(
            "/api/v1/chains/{chain}/tokens",
            get(chains::token_list),
        )
        .route(
            "/api/v1/chains/{chain}/native-price",
            get(chains::native_price),
        )
        .route(
            "/api/v1/chains/{chain}/native-price-history",
            get(chains::native_price_history),
        )
        .route(
            "/api/v1/chains/{chain}/abi/{address}",
            get(chains::contract_abi),
        )
        .route(
            "/api/v1/chains/{chain}/tx-prep/{address}",
            get(chains::transaction_prep),
        )
        .route(
            "/api/v1/chains/{chain}/broadcast",
            post(chains::broadcast_transaction),
        )
        .route(
            "/api/v1/chains/{chain}/tx-status/{hash}",
            get(chains::transaction_status),
        )
        .route(
            "/api/v1/chains/{chain}/tx-fee/{hash}",
            get(chains::transaction_fee),
        )
        .route(
            "/api/v1/chains/{chain}/historical-price",
            get(chains::historical_price),
        )
        .route("/api/v1/chains/{chain}/allowance", get(chains::allowance))
        .route("/api/v1/chains/{chain}/swap-quote", get(chains::swap_quote))
        .route("/api/v1/bridge/quote", get(chains::bridge_quote))
        .route("/api/v1/bridge/status", get(chains::bridge_status))
        .route("/api/v1/fx-rates", get(chains::fx_rates))
        .route("/api/v1/coins/search", get(markets::coin_search))
        .route("/api/v1/coins/{id}/price-history", get(markets::coin_price_history))
        .route("/api/v1/fx-history", get(markets::fx_history))
        .route("/api/v1/session/challenge", get(session::challenge))
        .route("/api/v1/session", post(session::redeem))
        // Inside the CORS layer, so refusals still carry CORS headers (the
        // app can read them) and preflights never reach it.
        .layer(middleware::from_fn_with_state(state.clone(), session::gate))
        .layer(cors)
        .with_state(state)
}
