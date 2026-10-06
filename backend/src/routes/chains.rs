use axum::extract::{Path, State};
use axum::http::HeaderMap;
use axum::Json;
use serde::{Deserialize, Serialize};

use crate::error::ApiError;
use crate::state::AppState;
use wwwallet_providers::types::{
    AddressActivity, BridgeQuote, BridgeStatus, ContractAbi, HistoricalPrice, FxRates, NativePrice, PriceHistory, SwapQuote, TokenListItem,
    TokenMetadata, TransactionFee, TransactionPage, TransactionPrep, TransactionStatus,
};
use wwwallet_providers::traits::BridgeQuoteRequest;
use wwwallet_providers::ChainId;

fn client_ip(headers: &HeaderMap) -> &str {
    // Set by Cloudflare's edge itself from the real TCP connection — any
    // client-supplied copy of this header is stripped/overwritten before the
    // Worker ever sees the request, so it can't be spoofed.
    headers
        .get("cf-connecting-ip")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown")
}

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

#[worker::send]
pub async fn address_activity(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<AddressActivity>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(
        state
            .providers
            .address_activity(chain, &address, client_ip(&headers))
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct TransactionPageRequest {
    /// Opaque — round-tripped verbatim from a previous `next_cursor`. Never
    /// inspected or constructed by this handler; a malformed one is rejected
    /// by the provider that owns its shape.
    cursor: serde_json::Value,
}

#[worker::send]
pub async fn transaction_page(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, address)): Path<(String, String)>,
    Json(body): Json<TransactionPageRequest>,
) -> Result<Json<TransactionPage>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(
        state
            .providers
            .transaction_page(chain, &address, body.cursor, client_ip(&headers))
            .await?,
    ))
}

#[worker::send]
pub async fn token_metadata(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<TokenMetadata>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(
        state
            .providers
            .token_metadata(chain, &address, client_ip(&headers))
            .await?,
    ))
}

#[worker::send]
pub async fn token_list(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
) -> Result<Json<Vec<TokenListItem>>, ApiError> {
    let chain = parse_chain(&chain)?;
    Ok(Json(state.providers.token_list(chain, client_ip(&headers)).await?))
}

#[worker::send]
pub async fn native_price(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
) -> Result<Json<NativePrice>, ApiError> {
    let chain = parse_chain(&chain)?;
    Ok(Json(state.providers.native_price(chain, client_ip(&headers)).await?))
}

#[worker::send]
pub async fn native_price_history(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
) -> Result<Json<PriceHistory>, ApiError> {
    let chain = parse_chain(&chain)?;
    Ok(Json(state.providers.price_history(chain, None, client_ip(&headers)).await?))
}

#[worker::send]
pub async fn token_price_history(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<PriceHistory>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(
        state
            .providers
            .price_history(chain, Some(&address), client_ip(&headers))
            .await?,
    ))
}

#[worker::send]
pub async fn contract_abi(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, address)): Path<(String, String)>,
) -> Result<Json<ContractAbi>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_address(&address)?;
    Ok(Json(
        state
            .providers
            .contract_abi(chain, &address, client_ip(&headers))
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct BroadcastRequest {
    raw_transaction: String,
}

#[derive(Serialize)]
pub struct BroadcastResponse {
    transaction_hash: String,
}

#[worker::send]
pub async fn broadcast_transaction(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
    Json(body): Json<BroadcastRequest>,
) -> Result<Json<BroadcastResponse>, ApiError> {
    state
        .providers
        .check_broadcast_rate_limit(client_ip(&headers))
        .await?;
    let chain = parse_chain(&chain)?;
    let raw = body.raw_transaction.trim();
    if !raw.starts_with("0x") || raw.len() < 4 || !raw[2..].chars().all(|c| c.is_ascii_hexdigit()) {
        return Err(ApiError::BadRequest(
            "raw_transaction must be 0x-prefixed hex".to_string(),
        ));
    }
    let transaction_hash = state.providers.broadcast_transaction(chain, raw).await?;
    Ok(Json(BroadcastResponse { transaction_hash }))
}

#[derive(Serialize)]
pub struct TransactionStatusResponse {
    status: TransactionStatus,
}

fn validate_tx_hash(hash: &str) -> Result<(), ApiError> {
    let is_hex_hash = hash.len() == 66
        && hash.starts_with("0x")
        && hash[2..].chars().all(|c| c.is_ascii_hexdigit());
    if !is_hex_hash {
        return Err(ApiError::BadRequest("invalid transaction hash format".to_string()));
    }
    Ok(())
}

#[worker::send]
pub async fn transaction_status(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, hash)): Path<(String, String)>,
) -> Result<Json<TransactionStatusResponse>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "transaction_status")
        .await?;
    let chain = parse_chain(&chain)?;
    validate_tx_hash(&hash)?;
    let status = state.providers.transaction_status(chain, &hash).await?;
    Ok(Json(TransactionStatusResponse { status }))
}

#[worker::send]
pub async fn transaction_fee(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, hash)): Path<(String, String)>,
) -> Result<Json<TransactionFee>, ApiError> {
    let chain = parse_chain(&chain)?;
    validate_tx_hash(&hash)?;
    Ok(Json(
        state
            .providers
            .transaction_fee(chain, &hash, client_ip(&headers))
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct TxPrepQuery {
    to: String,
    /// Decimal wei string.
    value: String,
    data: Option<String>,
}

#[worker::send]
pub async fn transaction_prep(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path((chain, from)): Path<(String, String)>,
    axum::extract::Query(query): axum::extract::Query<TxPrepQuery>,
) -> Result<Json<TransactionPrep>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "transaction_prep")
        .await?;
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
pub struct AllowanceQuery {
    token: String,
    owner: String,
    spender: String,
}

#[worker::send]
pub async fn allowance(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
    axum::extract::Query(query): axum::extract::Query<AllowanceQuery>,
) -> Result<Json<AllowanceResponse>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "allowance")
        .await?;
    let chain = parse_chain(&chain)?;
    validate_address(&query.token)?;
    validate_address(&query.owner)?;
    validate_address(&query.spender)?;
    let amount = state
        .providers
        .allowance(chain, &query.token, &query.owner, &query.spender)
        .await?;
    Ok(Json(AllowanceResponse { amount }))
}

#[derive(Serialize)]
pub struct AllowanceResponse {
    amount: String,
}

#[derive(Deserialize)]
pub struct SwapQuoteQuery {
    sell_token: String,
    buy_token: String,
    /// Decimal wei string.
    sell_amount: String,
    taker_address: String,
}

#[worker::send]
pub async fn swap_quote(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
    axum::extract::Query(query): axum::extract::Query<SwapQuoteQuery>,
) -> Result<Json<SwapQuote>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "swap_quote")
        .await?;
    let chain = parse_chain(&chain)?;
    validate_address(&query.taker_address)?;
    if query.sell_token.is_empty()
        || query.buy_token.is_empty()
        || query.sell_token.len() > 64
        || query.buy_token.len() > 64
    {
        return Err(ApiError::BadRequest(
            "sell_token/buy_token must be a token address or symbol".to_string(),
        ));
    }
    Ok(Json(
        state
            .providers
            .swap_quote(
                chain,
                &query.sell_token,
                &query.buy_token,
                &query.sell_amount,
                &query.taker_address,
            )
            .await?,
    ))
}

#[derive(Deserialize)]
pub struct BridgeQuoteQuery {
    from_chain: String,
    to_chain: String,
    /// Token address, or a symbol for the aggregator to resolve (how a
    /// bridged send names "the same token" on the destination chain).
    from_token: String,
    to_token: String,
    /// Decimal wei string.
    from_amount: String,
    from_address: String,
    to_address: String,
}

fn validate_token(token: &str) -> Result<(), ApiError> {
    let ok = !token.is_empty() && token.len() <= 64 && token.chars().all(|c| c.is_ascii_alphanumeric() || c == '.');
    if !ok {
        return Err(ApiError::BadRequest("token must be a token address or symbol".to_string()));
    }
    Ok(())
}

#[worker::send]
pub async fn bridge_quote(
    State(state): State<AppState>,
    headers: HeaderMap,
    axum::extract::Query(query): axum::extract::Query<BridgeQuoteQuery>,
) -> Result<Json<BridgeQuote>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "bridge_quote")
        .await?;
    let from_chain = parse_chain(&query.from_chain)?;
    let to_chain = parse_chain(&query.to_chain)?;
    validate_address(&query.from_address)?;
    validate_address(&query.to_address)?;
    validate_token(&query.from_token)?;
    validate_token(&query.to_token)?;
    if query.from_amount.is_empty() || !query.from_amount.chars().all(|c| c.is_ascii_digit()) {
        return Err(ApiError::BadRequest("from_amount must be a decimal wei string".to_string()));
    }
    let request = BridgeQuoteRequest {
        from_chain,
        to_chain,
        from_token: &query.from_token,
        to_token: &query.to_token,
        from_amount_wei: &query.from_amount,
        from_address: &query.from_address,
        to_address: &query.to_address,
    };
    Ok(Json(state.providers.bridge_quote(&request).await?))
}

/// The chains are optional: a transaction's details pane looks a hash up
/// without knowing whether it's a bridge at all, let alone which end.
#[derive(Deserialize)]
pub struct BridgeStatusQuery {
    tx_hash: String,
    from_chain: Option<String>,
    to_chain: Option<String>,
}

#[worker::send]
pub async fn bridge_status(
    State(state): State<AppState>,
    headers: HeaderMap,
    axum::extract::Query(query): axum::extract::Query<BridgeStatusQuery>,
) -> Result<Json<BridgeStatus>, ApiError> {
    state
        .providers
        .check_rate_limit(client_ip(&headers), "bridge_status")
        .await?;
    let from_chain = query.from_chain.as_deref().map(parse_chain).transpose()?;
    let to_chain = query.to_chain.as_deref().map(parse_chain).transpose()?;
    let is_hash = query.tx_hash.len() == 66
        && query.tx_hash.starts_with("0x")
        && query.tx_hash[2..].chars().all(|c| c.is_ascii_hexdigit());
    if !is_hash {
        return Err(ApiError::BadRequest("invalid transaction hash".to_string()));
    }
    Ok(Json(state.providers.bridge_status(&query.tx_hash, from_chain, to_chain).await?))
}

#[derive(Deserialize)]
pub struct FxQuery {
    base: Option<String>,
    /// "YYYY-MM-DD" for that day's rates instead of today's.
    date: Option<String>,
}

fn validate_iso_date(date: &str) -> Result<(), ApiError> {
    let b = date.as_bytes();
    let ok = b.len() == 10
        && b[4] == b'-'
        && b[7] == b'-'
        && b.iter().enumerate().all(|(i, c)| i == 4 || i == 7 || c.is_ascii_digit());
    if !ok {
        return Err(ApiError::BadRequest("date must be YYYY-MM-DD".to_string()));
    }
    Ok(())
}

#[derive(Deserialize)]
pub struct HistoricalPriceQuery {
    /// Token contract; omitted for the chain's native coin.
    token: Option<String>,
    /// Unix seconds.
    timestamp: i64,
}

/// Before Ethereum's genesis block — no price can exist.
const EARLIEST_TIMESTAMP: i64 = 1_438_269_973;

#[worker::send]
pub async fn historical_price(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(chain): Path<String>,
    axum::extract::Query(query): axum::extract::Query<HistoricalPriceQuery>,
) -> Result<Json<HistoricalPrice>, ApiError> {
    let chain = parse_chain(&chain)?;
    if let Some(token) = &query.token {
        validate_address(token)?;
    }
    let now = (worker::Date::now().as_millis() / 1000) as i64;
    if query.timestamp < EARLIEST_TIMESTAMP || query.timestamp > now + 3600 {
        return Err(ApiError::BadRequest("timestamp out of range".to_string()));
    }
    Ok(Json(
        state
            .providers
            .historical_price(chain, query.token.as_deref(), query.timestamp, client_ip(&headers))
            .await?,
    ))
}

#[worker::send]
pub async fn fx_rates(
    State(state): State<AppState>,
    headers: HeaderMap,
    axum::extract::Query(query): axum::extract::Query<FxQuery>,
) -> Result<Json<FxRates>, ApiError> {
    let base = query.base.unwrap_or_else(|| "USD".to_string());
    if base.len() != 3 || !base.chars().all(|c| c.is_ascii_alphabetic()) {
        return Err(ApiError::BadRequest(
            "base must be a 3-letter currency code".to_string(),
        ));
    }
    if let Some(date) = &query.date {
        validate_iso_date(date)?;
        return Ok(Json(state.providers.fx_rates_on(&base, date, client_ip(&headers)).await?));
    }
    Ok(Json(state.providers.fx_rates(&base, client_ip(&headers)).await?))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn iso_date_validation() {
        assert!(validate_iso_date("2025-03-15").is_ok());
        assert!(validate_iso_date("2025-3-15").is_err());
        assert!(validate_iso_date("2025-03-15T00").is_err());
        assert!(validate_iso_date("../latest").is_err());
    }

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

    #[test]
    fn validate_tx_hash_accepts_well_formed_and_rejects_malformed_hashes() {
        let hash = format!("0x{}", "a".repeat(64));
        assert!(validate_tx_hash(&hash).is_ok());
        assert!(validate_tx_hash("0x123").is_err());
        assert!(validate_tx_hash(&"a".repeat(66)).is_err());
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
