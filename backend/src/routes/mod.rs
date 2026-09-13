pub mod chains;
pub mod reference;

use axum::routing::{get, post};
use axum::Router;

use crate::state::AppState;

pub fn build_router(state: AppState) -> Router {
    Router::new()
        .route("/api/v1/reference/currencies/:language", get(reference::currencies))
        .route("/api/v1/reference/languages", get(reference::languages))
        .route("/api/v1/reference/msg-codes/:language", get(reference::msg_codes))
        .route("/api/v1/reference/templates/:language", get(reference::templates))
        .route("/api/v1/chains/:chain/address/:address", get(chains::address_activity))
        .route("/api/v1/chains/:chain/token/:address", get(chains::token_metadata))
        .route("/api/v1/chains/:chain/abi/:address", get(chains::contract_abi))
        .route("/api/v1/chains/:chain/tx-prep/:address", get(chains::transaction_prep))
        .route("/api/v1/chains/:chain/broadcast", post(chains::broadcast_transaction))
        .route("/api/v1/fx-rates", get(chains::fx_rates))
        .with_state(state)
}
