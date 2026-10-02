//! Chain-agnostic market data for favourites: any coin the price source
//! lists (Bitcoin, Solana…) and currency pairs — none of it tied to an
//! account or an EVM chain, unlike everything in chains.rs.

use axum::extract::{Path, Query, State};
use axum::http::HeaderMap;
use axum::Json;
use serde::Deserialize;

use crate::error::ApiError;
use crate::state::AppState;
use wwwallet_providers::types::{CoinSearchResult, FxHistory, PriceHistory};

fn client_ip(headers: &HeaderMap) -> &str {
    // See chains.rs's copy: set by Cloudflare's edge, not spoofable.
    headers
        .get("cf-connecting-ip")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown")
}

const MAX_QUERY_LEN: usize = 50;

fn validate_query(query: &str) -> Result<&str, ApiError> {
    let query = query.trim();
    if query.is_empty() || query.chars().count() > MAX_QUERY_LEN {
        return Err(ApiError::BadRequest(format!("q must be 1-{MAX_QUERY_LEN} characters")));
    }
    Ok(query)
}

/// CoinGecko ids are lower-case words joined by hyphens ("wrapped-bitcoin").
fn validate_coin_id(id: &str) -> Result<(), ApiError> {
    let ok = !id.is_empty()
        && id.len() <= 100
        && id.chars().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == '-');
    if !ok {
        return Err(ApiError::BadRequest("invalid coin id".to_string()));
    }
    Ok(())
}

fn validate_symbol(symbol: &str) -> Result<(), ApiError> {
    let ok = !symbol.is_empty() && symbol.len() <= 20 && symbol.chars().all(|c| c.is_ascii_alphanumeric());
    if !ok {
        return Err(ApiError::BadRequest("invalid coin symbol".to_string()));
    }
    Ok(())
}

fn validate_currency(code: &str, field: &str) -> Result<(), ApiError> {
    if code.len() != 3 || !code.chars().all(|c| c.is_ascii_alphabetic()) {
        return Err(ApiError::BadRequest(format!("{field} must be a 3-letter currency code")));
    }
    Ok(())
}

#[derive(Deserialize)]
pub struct SearchQuery {
    q: String,
}

#[worker::send]
pub async fn coin_search(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<SearchQuery>,
) -> Result<Json<Vec<CoinSearchResult>>, ApiError> {
    let q = validate_query(&query.q)?;
    Ok(Json(state.providers.search_coins(q, client_ip(&headers)).await?))
}

#[derive(Deserialize)]
pub struct CoinHistoryQuery {
    symbol: String,
}

#[worker::send]
pub async fn coin_price_history(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(id): Path<String>,
    Query(query): Query<CoinHistoryQuery>,
) -> Result<Json<PriceHistory>, ApiError> {
    validate_coin_id(&id)?;
    validate_symbol(&query.symbol)?;
    Ok(Json(
        state
            .providers
            .coin_price_history(&id, &query.symbol.to_uppercase(), client_ip(&headers))
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct FxHistoryQuery {
    base: String,
    quote: String,
}

#[worker::send]
pub async fn fx_history(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<FxHistoryQuery>,
) -> Result<Json<FxHistory>, ApiError> {
    validate_currency(&query.base, "base")?;
    validate_currency(&query.quote, "quote")?;
    if query.base.eq_ignore_ascii_case(&query.quote) {
        return Err(ApiError::BadRequest("base and quote must differ".to_string()));
    }
    Ok(Json(
        state
            .providers
            .fx_history(&query.base, &query.quote, client_ip(&headers))
            .await?,
    ))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn query_is_trimmed_and_length_capped() {
        assert_eq!(validate_query("  sol ").ok(), Some("sol"));
        assert!(validate_query("   ").is_err());
        assert!(validate_query(&"a".repeat(51)).is_err());
    }

    #[test]
    fn coin_ids_and_symbols_are_restricted_to_safe_characters() {
        assert!(validate_coin_id("wrapped-bitcoin").is_ok());
        assert!(validate_coin_id("Bitcoin").is_err());
        assert!(validate_coin_id("../etc").is_err());
        assert!(validate_symbol("BTC").is_ok());
        assert!(validate_symbol("BTC&x=1").is_err());
    }

    #[test]
    fn currencies_must_be_three_letters() {
        assert!(validate_currency("EUR", "base").is_ok());
        assert!(validate_currency("EU", "base").is_err());
        assert!(validate_currency("E1R", "base").is_err());
    }
}
