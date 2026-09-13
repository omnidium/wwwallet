use axum::extract::{Path, State};
use axum::Json;
use serde::Deserialize;

use crate::error::ApiError;
use crate::state::AppState;
use wwwallet_providers::ChainId;
use wwwallet_providers::types::{AddressActivity, ContractAbi, FxRates, TokenMetadata};

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
