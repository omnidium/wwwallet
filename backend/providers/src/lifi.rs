use async_trait::async_trait;
use serde::Deserialize;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::{BridgeProvider, BridgeQuoteRequest, SwapQuoteProvider};
use crate::types::{BridgeFee, BridgeQuote, BridgeStatus, BridgeToken, SwapFee, SwapQuote};

/// LI.FI aggregates bridges (Across, Stargate, CCTP, …) and DEXs behind one
/// quote endpoint, picking the best route itself — one call covers a plain
/// bridge, a cross-chain swap, and the fees and timing of each.
const LIFI_BASE_URL: &str = "https://li.quest/v1";

/// Identifies this app to LI.FI (required on every quote; no fee is set up
/// against it, so it only labels traffic).
const INTEGRATOR: &str = "wwwallet";

/// LI.FI's "nothing can carry this transfer" answer to a quote, rather than
/// a real failure.
const NO_ROUTE_CODE: u64 = 1002;
/// Not found: on a quote, a token it doesn't know on one of the chains
/// ("Could not find token 'WLD' on chain '137'"); on a status lookup, a
/// transaction it hasn't indexed (yet).
const NOT_FOUND_CODE: u64 = 1003;

#[derive(Deserialize)]
struct LifiToken {
    address: String,
    symbol: String,
    decimals: u8,
    #[serde(rename = "logoURI")]
    logo_uri: Option<String>,
    #[serde(rename = "priceUSD")]
    price_usd: Option<String>,
}

#[derive(Deserialize)]
struct LifiAction {
    #[serde(rename = "fromToken")]
    from_token: LifiToken,
    #[serde(rename = "toToken")]
    to_token: LifiToken,
}

#[derive(Deserialize)]
struct LifiFeeCost {
    name: String,
    token: LifiToken,
    amount: String,
    #[serde(rename = "amountUSD")]
    amount_usd: Option<String>,
    #[serde(default)]
    included: bool,
}

#[derive(Deserialize)]
struct LifiGasCost {
    #[serde(rename = "amountUSD")]
    amount_usd: Option<String>,
}

#[derive(Deserialize)]
struct LifiEstimate {
    #[serde(rename = "approvalAddress")]
    approval_address: Option<String>,
    #[serde(rename = "fromAmount")]
    from_amount: String,
    #[serde(rename = "toAmount")]
    to_amount: String,
    #[serde(rename = "toAmountMin")]
    to_amount_min: String,
    #[serde(rename = "feeCosts", default)]
    fee_costs: Vec<LifiFeeCost>,
    #[serde(rename = "gasCosts", default)]
    gas_costs: Vec<LifiGasCost>,
    #[serde(rename = "executionDuration", default)]
    execution_duration: f64,
}

#[derive(Deserialize)]
struct LifiToolDetails {
    name: String,
    #[serde(rename = "logoURI")]
    logo_uri: Option<String>,
}

#[derive(Deserialize)]
struct LifiTransactionRequest {
    to: String,
    data: String,
    value: Option<String>,
    #[serde(rename = "gasPrice")]
    gas_price: Option<String>,
    #[serde(rename = "gasLimit")]
    gas_limit: Option<String>,
}

#[derive(Deserialize)]
struct LifiQuoteResponse {
    #[serde(rename = "toolDetails")]
    tool_details: LifiToolDetails,
    action: LifiAction,
    estimate: LifiEstimate,
    #[serde(rename = "transactionRequest")]
    transaction_request: Option<LifiTransactionRequest>,
}

/// One leg of a transfer in a status response — `sending` on the source
/// chain, `receiving` on the destination.
#[derive(Deserialize)]
struct LifiTransferLeg {
    #[serde(rename = "txHash")]
    tx_hash: Option<String>,
    #[serde(rename = "chainId")]
    chain_id: Option<u64>,
}

#[derive(Deserialize)]
struct LifiStatusResponse {
    status: String,
    substatus: Option<String>,
    sending: Option<LifiTransferLeg>,
    receiving: Option<LifiTransferLeg>,
    #[serde(rename = "fromAddress")]
    from_address: Option<String>,
    #[serde(rename = "toAddress")]
    to_address: Option<String>,
}

#[derive(Deserialize)]
struct LifiErrorBody {
    code: Option<u64>,
}

pub struct LifiProvider {
    /// Optional — LI.FI works keyless, just with a tighter rate limit.
    api_key: Option<String>,
}

impl LifiProvider {
    pub fn new(api_key: Option<String>) -> Self {
        Self { api_key: api_key.filter(|k| !k.is_empty()) }
    }

    async fn get<T: serde::de::DeserializeOwned>(&self, url: &str) -> ProviderResult<T> {
        match &self.api_key {
            Some(key) => http::get_json_with_headers(url, &[("x-lifi-api-key", key)]).await,
            None => http::get_json(url).await,
        }
    }

    /// One quote, as LI.FI returns it — a bridge when the chains differ, a
    /// same-chain swap through its DEX aggregators when they don't.
    async fn raw_quote(&self, request: &BridgeQuoteRequest<'_>) -> ProviderResult<LifiQuoteResponse> {
        let mut url = url::Url::parse(&format!("{LIFI_BASE_URL}/quote"))
            .map_err(|e| ProviderError::InvalidInput(e.to_string()))?;
        url.query_pairs_mut()
            .append_pair("fromChain", &request.from_chain.eip155_id().to_string())
            .append_pair("toChain", &request.to_chain.eip155_id().to_string())
            .append_pair("fromToken", lifi_token(request.from_chain, request.from_token))
            .append_pair("toToken", lifi_token(request.to_chain, request.to_token))
            .append_pair("fromAmount", request.from_amount_wei)
            .append_pair("fromAddress", request.from_address)
            .append_pair("toAddress", request.to_address)
            .append_pair("integrator", INTEGRATOR);

        self.get(url.as_str()).await.map_err(|err| match error_code(&err) {
            Some(NO_ROUTE_CODE) => ProviderError::NoLiquidity,
            Some(NOT_FOUND_CODE) => ProviderError::TokenNotOnChain,
            _ => err,
        })
    }
}

/// The LI.FI error code in an upstream error body, if it is one.
fn error_code(err: &ProviderError) -> Option<u64> {
    match err {
        ProviderError::Upstream(body) => serde_json::from_str::<LifiErrorBody>(body).ok()?.code,
        _ => None,
    }
}

#[async_trait(?Send)]
impl BridgeProvider for LifiProvider {
    fn name(&self) -> &'static str {
        "lifi"
    }

    async fn quote(&self, request: &BridgeQuoteRequest<'_>) -> ProviderResult<BridgeQuote> {
        extract_quote(self.raw_quote(request).await?)
    }

    /// Either leg's hash finds the transfer. The chains are optional hints:
    /// without them LI.FI searches every chain, which is what a lookup from
    /// a transaction's details needs — it can't know which end it's at.
    async fn status(
        &self,
        transaction_hash: &str,
        from_chain: Option<ChainId>,
        to_chain: Option<ChainId>,
    ) -> ProviderResult<BridgeStatus> {
        let mut url = url::Url::parse(&format!("{LIFI_BASE_URL}/status"))
            .map_err(|e| ProviderError::InvalidInput(e.to_string()))?;
        {
            let mut query = url.query_pairs_mut();
            query.append_pair("txHash", transaction_hash);
            if let Some(chain) = from_chain {
                query.append_pair("fromChain", &chain.eip155_id().to_string());
            }
            if let Some(chain) = to_chain {
                query.append_pair("toChain", &chain.eip155_id().to_string());
            }
        }

        match self.get::<LifiStatusResponse>(url.as_str()).await {
            Ok(response) => Ok(extract_status(response)),
            // Just broadcast — LI.FI picks it up once mined. Or never a
            // LI.FI transfer at all, for a lookup from a transaction's details.
            Err(err) if error_code(&err) == Some(NOT_FOUND_CODE) => Ok(BridgeStatus::not_indexed()),
            Err(err) => Err(err),
        }
    }
}

/// Same-chain swaps on the chains 0x doesn't cover (see ZeroExProvider's
/// `supports`): a LI.FI quote with both ends on one chain, in the same shape
/// as 0x's, so the swap flow can't tell the two apart.
#[async_trait(?Send)]
impl SwapQuoteProvider for LifiProvider {
    fn name(&self) -> &'static str {
        "lifi"
    }

    async fn quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote> {
        let request = BridgeQuoteRequest {
            from_chain: chain,
            to_chain: chain,
            from_token: sell_token,
            to_token: buy_token,
            from_amount_wei: sell_amount_wei,
            from_address: taker_address,
            to_address: taker_address,
        };
        extract_swap_quote(chain, self.raw_quote(&request).await?)
    }
}

/// The 0xEeee… address the app (and 0x) uses for the native coin, where
/// LI.FI answers with the zero address.
const NATIVE_PSEUDO_ADDRESS: &str = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

/// LI.FI knows Celo's native coin only by its ERC-20 view (0x471E…) and
/// rejects the native addresses there; everywhere else it takes 0xEeee….
fn lifi_token(chain: ChainId, address: &str) -> &str {
    match chain {
        ChainId::Celo if is_native(address) => chain.native_token_contract().unwrap_or(address),
        _ => address,
    }
}

fn extract_swap_quote(chain: ChainId, response: LifiQuoteResponse) -> ProviderResult<SwapQuote> {
    let tx = response
        .transaction_request
        .ok_or_else(|| ProviderError::Upstream("quote response missing transactionRequest".into()))?;
    let estimate = response.estimate;
    // Selling the native coin needs no approval, whatever the quote says —
    // except CELO, which LI.FI sells as its ERC-20 (see lifi_token), so the
    // approval the quote asks for stands.
    let allowance_target = if is_native(&response.action.from_token.address) {
        String::new()
    } else {
        estimate.approval_address.unwrap_or_default()
    };
    // All of them: those `included` are already out of the amount bought,
    // the rest are paid on top, in `value`.
    let fees = estimate
        .fee_costs
        .into_iter()
        .map(|f| {
            let lower = f.token.address.to_ascii_lowercase();
            let native = is_native(&lower) || chain.native_token_contract() == Some(lower.as_str());
            SwapFee {
                kind: if is_lifi_fee(&f.name) { "lifi" } else { "protocol" }.to_string(),
                token: if native { NATIVE_PSEUDO_ADDRESS.to_string() } else { f.token.address },
                amount: f.amount,
            }
        })
        .collect();
    Ok(SwapQuote {
        to: tx.to,
        data: tx.data,
        value: hex_to_decimal(tx.value.as_deref())?,
        gas_price: hex_to_decimal(tx.gas_price.as_deref())?,
        estimated_gas: hex_to_decimal(tx.gas_limit.as_deref())?,
        buy_amount: estimate.to_amount,
        sell_amount: estimate.from_amount,
        allowance_target,
        // Filled in by the registry from both tokens' decimals.
        price: String::new(),
        provider: "LI.FI".to_string(),
        fees,
    })
}

fn to_bridge_token(token: LifiToken) -> BridgeToken {
    BridgeToken {
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals,
        logo_url: token.logo_uri,
        usd_price: token.price_usd.and_then(|p| p.parse().ok()),
    }
}

/// LI.FI's transaction fields are 0x-hex; everything else on this API is
/// decimal, which is what the client's signer and fee maths expect.
fn hex_to_decimal(value: Option<&str>) -> ProviderResult<String> {
    let Some(value) = value else { return Ok("0".to_string()) };
    let digits = value.trim_start_matches("0x");
    if digits.is_empty() {
        return Ok("0".to_string());
    }
    u128::from_str_radix(digits, 16)
        .map(|n| n.to_string())
        .map_err(|_| ProviderError::Upstream(format!("unparseable hex quantity '{value}'")))
}

/// LI.FI's own fee ("LIFI Fixed Fee"), as opposed to a DEX's or bridge's.
fn is_lifi_fee(name: &str) -> bool {
    name.to_ascii_lowercase().replace('.', "").contains("lifi")
}

fn is_native(address: &str) -> bool {
    let lower = address.to_ascii_lowercase();
    lower == "0x0000000000000000000000000000000000000000"
        || lower == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
}

fn extract_quote(response: LifiQuoteResponse) -> ProviderResult<BridgeQuote> {
    let tx = response
        .transaction_request
        .ok_or_else(|| ProviderError::Upstream("quote response missing transactionRequest".into()))?;
    let estimate = response.estimate;
    // Selling the native coin needs no approval, whatever the quote says.
    let approval_address = if is_native(&response.action.from_token.address) {
        None
    } else {
        estimate.approval_address
    };
    let gas_cost_usd = estimate
        .gas_costs
        .iter()
        .filter_map(|g| g.amount_usd.as_deref()?.parse::<f64>().ok())
        .reduce(|a, b| a + b);
    let fees = estimate
        .fee_costs
        .into_iter()
        .map(|f| BridgeFee {
            name: f.name,
            symbol: f.token.symbol,
            amount: f.amount,
            decimals: f.token.decimals,
            amount_usd: f.amount_usd.and_then(|a| a.parse().ok()),
            included: f.included,
        })
        .collect();

    Ok(BridgeQuote {
        to: tx.to,
        data: tx.data,
        value: hex_to_decimal(tx.value.as_deref())?,
        gas_price: hex_to_decimal(tx.gas_price.as_deref())?,
        gas_limit: hex_to_decimal(tx.gas_limit.as_deref())?,
        from_amount: estimate.from_amount,
        to_amount: estimate.to_amount,
        to_amount_min: estimate.to_amount_min,
        approval_address,
        from_token: to_bridge_token(response.action.from_token),
        to_token: to_bridge_token(response.action.to_token),
        fees,
        gas_cost_usd,
        execution_duration_secs: estimate.execution_duration.max(0.0).round() as u64,
        tool: response.tool_details.name,
        tool_logo_url: response.tool_details.logo_uri,
    })
}

fn extract_status(response: LifiStatusResponse) -> BridgeStatus {
    let status = match response.status.as_str() {
        "DONE" => "done",
        "FAILED" | "INVALID" => "failed",
        _ => "pending",
    };
    let (sending_tx_hash, sending_chain) = leg_parts(response.sending);
    let (receiving_tx_hash, receiving_chain) = leg_parts(response.receiving);
    BridgeStatus {
        status: status.to_string(),
        substatus: response.substatus,
        receiving_tx_hash,
        sending_tx_hash,
        from_address: response.from_address,
        to_address: response.to_address,
        from_chain: sending_chain.and_then(ChainId::from_eip155_id),
        to_chain: receiving_chain.and_then(ChainId::from_eip155_id),
    }
}

fn leg_parts(leg: Option<LifiTransferLeg>) -> (Option<String>, Option<u64>) {
    leg.map(|l| (l.tx_hash, l.chain_id)).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    const QUOTE_JSON: &str = r#"{
        "tool": "across",
        "toolDetails": { "key": "across", "name": "Across", "logoURI": "https://example/across.svg" },
        "action": {
            "fromToken": { "address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "symbol": "USDC", "decimals": 6, "priceUSD": "1.0" },
            "toToken": { "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", "symbol": "USDC", "decimals": 6, "logoURI": "https://example/usdc.png", "priceUSD": "0.9999" }
        },
        "estimate": {
            "approvalAddress": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE",
            "fromAmount": "10000000", "toAmount": "9975000", "toAmountMin": "9925000",
            "feeCosts": [
                { "name": "LIFI Fixed Fee", "token": { "address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "symbol": "USDC", "decimals": 6 }, "amount": "25000", "amountUSD": "0.0250", "included": true }
            ],
            "gasCosts": [ { "amountUSD": "0.0040" }, { "amountUSD": "0.0010" } ],
            "executionDuration": 4.4
        },
        "transactionRequest": { "to": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", "data": "0xabcdef", "value": "0x0", "gasPrice": "0x57bcf1", "gasLimit": "0xb2089" }
    }"#;

    #[test]
    fn quote_converts_hex_and_keeps_every_field() {
        let response: LifiQuoteResponse = serde_json::from_str(QUOTE_JSON).unwrap();
        let quote = extract_quote(response).unwrap();
        assert_eq!(quote.value, "0");
        assert_eq!(quote.gas_price, "5750001");
        assert_eq!(quote.gas_limit, "729225");
        assert_eq!(quote.to_amount, "9975000");
        assert_eq!(quote.to_token.decimals, 6);
        assert_eq!(quote.to_token.usd_price, Some(0.9999));
        assert_eq!(quote.approval_address.as_deref(), Some("0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE"));
        assert_eq!(quote.fees.len(), 1);
        assert!(quote.fees[0].included);
        assert!((quote.gas_cost_usd.unwrap() - 0.005).abs() < 1e-9);
        assert_eq!(quote.execution_duration_secs, 4);
        assert_eq!(quote.tool, "Across");
    }

    #[test]
    fn native_sell_never_needs_approval() {
        let json = QUOTE_JSON.replace(
            r#""address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "symbol": "USDC", "decimals": 6, "priceUSD": "1.0""#,
            r#""address": "0x0000000000000000000000000000000000000000", "symbol": "ETH", "decimals": 18"#,
        );
        let response: LifiQuoteResponse = serde_json::from_str(&json).unwrap();
        assert!(extract_quote(response).unwrap().approval_address.is_none());
    }

    #[test]
    fn missing_transaction_request_is_an_upstream_error() {
        let mut response: LifiQuoteResponse = serde_json::from_str(QUOTE_JSON).unwrap();
        response.transaction_request = None;
        assert!(matches!(extract_quote(response), Err(ProviderError::Upstream(_))));
    }

    #[test]
    fn no_route_error_body_is_recognised() {
        let err = ProviderError::Upstream(r#"{"message":"No available quotes","code":1002}"#.into());
        assert_eq!(error_code(&err), Some(1002));
        assert_eq!(error_code(&ProviderError::Upstream("<html>".into())), None);
    }

    #[test]
    fn status_maps_to_three_states() {
        let done: LifiStatusResponse = serde_json::from_str(
            r#"{"status":"DONE","substatus":"COMPLETED","receiving":{"txHash":"0xabc"}}"#,
        )
        .unwrap();
        let s = extract_status(done);
        assert_eq!(s.status, "done");
        assert_eq!(s.receiving_tx_hash.as_deref(), Some("0xabc"));
        let pending: LifiStatusResponse = serde_json::from_str(r#"{"status":"PENDING"}"#).unwrap();
        assert_eq!(extract_status(pending).status, "pending");
        let failed: LifiStatusResponse = serde_json::from_str(r#"{"status":"FAILED"}"#).unwrap();
        assert_eq!(extract_status(failed).status, "failed");
    }

    #[test]
    fn status_keeps_both_ends_of_the_transfer() {
        // Trimmed from a real Base → Solana transfer.
        let response: LifiStatusResponse = serde_json::from_str(
            r#"{
                "status": "DONE",
                "fromAddress": "0x1e87d6ef0c6bc53434ce54ebc98a823ba319d9f2",
                "toAddress": "6GJ5pQb8xR3Wn3aUBH2uDvo4mYdUQ1mpkeUH37hn9pQx",
                "sending": { "txHash": "0x4f5d", "chainId": 8453 },
                "receiving": { "txHash": "2dEvHG6x", "chainId": 1151111081099710 }
            }"#,
        )
        .unwrap();
        let s = extract_status(response);
        assert_eq!(s.sending_tx_hash.as_deref(), Some("0x4f5d"));
        assert_eq!(s.receiving_tx_hash.as_deref(), Some("2dEvHG6x"));
        assert_eq!(s.from_address.as_deref(), Some("0x1e87d6ef0c6bc53434ce54ebc98a823ba319d9f2"));
        assert_eq!(s.to_address.as_deref(), Some("6GJ5pQb8xR3Wn3aUBH2uDvo4mYdUQ1mpkeUH37hn9pQx"));
        assert_eq!(s.from_chain, Some(ChainId::Base));
        // Solana: a chain this wallet doesn't support.
        assert_eq!(s.to_chain, None);
    }

    #[test]
    fn same_chain_quote_becomes_a_swap_quote() {
        // Trimmed from a real Gnosis xDAI → USDC quote.
        let response: LifiQuoteResponse = serde_json::from_str(
            r#"{
                "toolDetails": { "name": "1inch" },
                "action": {
                    "fromToken": { "address": "0x0000000000000000000000000000000000000000", "symbol": "XDAI", "decimals": 18 },
                    "toToken": { "address": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", "symbol": "USDC", "decimals": 6 }
                },
                "estimate": {
                    "approvalAddress": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE",
                    "fromAmount": "5000000000000000000", "toAmount": "4986694", "toAmountMin": "4981707",
                    "feeCosts": [{
                        "name": "LIFI Fixed Fee", "amount": "12500000000000000", "included": true,
                        "token": { "address": "0x0000000000000000000000000000000000000000", "symbol": "XDAI", "decimals": 18 }
                    }]
                },
                "transactionRequest": {
                    "to": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", "data": "0xabc",
                    "value": "0x4563918244f40000", "gasLimit": "0x7e976", "gasPrice": "0xbebc200"
                }
            }"#,
        )
        .unwrap();
        let quote = extract_swap_quote(ChainId::Gnosis, response).unwrap();
        assert_eq!(quote.value, "5000000000000000000");
        assert_eq!(quote.estimated_gas, "518518");
        assert_eq!(quote.buy_amount, "4986694");
        assert_eq!(quote.sell_amount, "5000000000000000000");
        // Selling the native coin: nothing to approve.
        assert_eq!(quote.allowance_target, "");
        assert_eq!(quote.provider, "LI.FI");
        assert_eq!(quote.fees.len(), 1);
        assert_eq!(quote.fees[0].kind, "lifi");
        assert_eq!(quote.fees[0].token, NATIVE_PSEUDO_ADDRESS);
    }

    #[test]
    fn celo_is_quoted_as_its_erc20_and_reported_back_as_native() {
        assert_eq!(lifi_token(ChainId::Celo, NATIVE_PSEUDO_ADDRESS), "0x471ece3750da237f93b8e339c536989b8978a438");
        assert_eq!(lifi_token(ChainId::Gnosis, NATIVE_PSEUDO_ADDRESS), NATIVE_PSEUDO_ADDRESS);
        assert_eq!(lifi_token(ChainId::Celo, "0xcebA9300f2b948710d2653dD7B07f33A8B32118C"), "0xcebA9300f2b948710d2653dD7B07f33A8B32118C");

        // Trimmed from a real CELO → USDC quote: an ERC-20 sell, so it
        // needs an approval and sends no value.
        let response: LifiQuoteResponse = serde_json::from_str(
            r#"{
                "toolDetails": { "name": "SushiSwap" },
                "action": {
                    "fromToken": { "address": "0x471EcE3750Da237f93B8E339c536989b8978a438", "symbol": "CELO", "decimals": 18 },
                    "toToken": { "address": "0xcebA9300f2b948710d2653dD7B07f33A8B32118C", "symbol": "USDC", "decimals": 6 }
                },
                "estimate": {
                    "approvalAddress": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE",
                    "fromAmount": "1000000000000000000", "toAmount": "92000", "toAmountMin": "91540",
                    "feeCosts": [
                        { "name": "LIFI Fixed Fee", "amount": "2500000000000000", "included": true,
                          "token": { "address": "0x471EcE3750Da237f93B8E339c536989b8978a438", "symbol": "CELO", "decimals": 18 } },
                        { "name": "Relayer Fee", "amount": "1000", "included": false,
                          "token": { "address": "0xcebA9300f2b948710d2653dD7B07f33A8B32118C", "symbol": "USDC", "decimals": 6 } }
                    ]
                },
                "transactionRequest": {
                    "to": "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", "data": "0xabc",
                    "value": "0x0", "gasLimit": "0x7e976", "gasPrice": "0xbebc200"
                }
            }"#,
        )
        .unwrap();
        let quote = extract_swap_quote(ChainId::Celo, response).unwrap();
        assert_eq!(quote.value, "0");
        assert_eq!(quote.allowance_target, "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE");
        assert_eq!(quote.fees.len(), 2);
        assert_eq!((quote.fees[0].kind.as_str(), quote.fees[0].token.as_str()), ("lifi", NATIVE_PSEUDO_ADDRESS));
        assert_eq!(quote.fees[1].kind, "protocol");
    }
}
