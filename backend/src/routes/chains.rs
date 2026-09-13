use axum::extract::{Path, State};
use axum::Json;
use serde::{Deserialize, Serialize};

use crate::error::ApiError;
use crate::state::AppState;
use wwwallet_providers::ChainId;
use wwwallet_providers::types::{AddressActivity, ContractAbi, FxRates, TokenMetadata, TransactionPrep};

fn parse_chain(slug: &str) -> Result<ChainId, ApiError> {
    ChainId::from_slug(slug).ok_or_else(|| ApiError::BadRequest(format!("unknown chain '{slug}'")))
}

fn validate_address(address: &str) -> Result<(), ApiError> {
    let is_hex_address = address.len() == 42
        && address.starts_with("0x")
        && address[2..].chars().all(|c| c.is_ascii_hexdigit());
    if !is_hex_address {
        return Err(ApiError::BadRequest("invalid address format".to_string()));
    }
    Ok(())
}

pub async fn address_activity(
    State(state): State<AppState>,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<AddressActivity>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(state.providers.address_activity(chain, &address).await?))
}

pub async fn token_metadata(
    State(state): State<AppState>,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<TokenMetadata>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(state.providers.token_metadata(chain, &address).await?))
}

pub async fn contract_abi(
    State(state): State<AppState>,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<ContractAbi>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(state.providers.contract_abi(chain, &address).await?))
}

#[derive(Deserialize)]
pub struct BroadcastRequest {
    raw_transaction: String,
}

#[derive(Serialize)]
pub struct BroadcastResponse {
    transaction_hash: String,
}

pub async fn broadcast_transaction(
    State(state): State<AppState>,
    Path(chain): Path<String>,
    Json(body): Json<BroadcastRequest>,
) -> Result<Json<BroadcastResponse>, ApiError> {
    let chain = parse_chain(&chain)?;
    let raw = body.raw_transaction.trim();
    if !raw.starts_with("0x") || raw.len() < 4 || !raw[2..].chars().all(|c| c.is_ascii_hexdigit()) {
        return Err(ApiError::BadRequest("raw_transaction must be 0x-prefixed hex".to_string()));
    }
    let transaction_hash = state.providers.broadcast_transaction(chain, raw).await?;
    Ok(Json(BroadcastResponse { transaction_hash }))
}

#[derive(Deserialize)]
pub struct TxPrepQuery {
    to: String,
    /// Decimal wei string.
    value: String,
    data: Option<String>,
}

pub async fn transaction_prep(
    State(state): State<AppState>,
    Path((chain, from)): Path<(String, String)>,
    axum::extract::Query(query): axum::extract::Query<TxPrepQuery>,
) -> Result<Json<TransactionPrep>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&from)?;
    validate_address(&query.to)?;
    Ok(Json(
        state
            .providers
            .prepare_transaction(chain, &from, &query.to, &query.value, query.data.as_deref())
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct FxQuery {
    base: Option<String>,
}

pub async fn fx_rates(
    State(state): State<AppState>,
    axum::extract::Query(query): axum::extract::Query<FxQuery>,
) -> Result<Json<FxRates>, ApiError> {
    let base = query.base.unwrap_or_else(|| "USD".to_string());
    if base.len() != 3 || !base.chars().all(|c| c.is_ascii_alphabetic()) {
        return Err(ApiError::BadRequest("base must be a 3-letter currency code".to_string()));
    }
    Ok(Json(state.providers.fx_rates(&base).await?))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_well_formed_checksummed_and_lowercase_addresses() {
        assert!(validate_address("0x0BfAfCEF10B1F2911F36149e66378A2d9Fdf27eC").is_ok());
        let all_zero = format!("0x{}", "0".repeat(40));
        assert!(validate_address(&all_zero).is_ok());
    }

    #[test]
    fn rejects_wrong_length_missing_prefix_or_non_hex_chars() {
        assert!(validate_address("0x123").is_err());
        assert!(validate_address("0BfAfCEF10B1F2911F36149e66378A2d9Fdf27eC00").is_err());
        assert!(validate_address("0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz").is_err());
    }

    #[test]
    fn parse_chain_accepts_known_slugs_and_rejects_unknown_ones() {
        assert!(parse_chain("ethereum").is_ok());
        assert!(parse_chain("dogecoin").is_err());
    }

    fn is_valid_raw_tx(raw: &str) -> bool {
        raw.starts_with("0x") && raw.len() >= 4 && raw[2..].chars().all(|c| c.is_ascii_hexdigit())
    }

    #[test]
    fn raw_transaction_validation_matches_the_handler() {
        assert!(is_valid_raw_tx("0xf86c0182"));
        assert!(!is_valid_raw_tx("f86c0182"));
        assert!(!is_valid_raw_tx("0x"));
        assert!(!is_valid_raw_tx("0xzz"));
    }
}
