use async_trait::async_trait;
use serde::Deserialize;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::SwapQuoteProvider;
use crate::types::{SwapFee, SwapQuote};

/// 0x Swap API v2 uses a single base URL for every chain — the chain is
/// selected via the `chainId` query parameter instead of a per-chain subdomain
/// (the old v1 layout, which 0x has since decommissioned).
const ZEROX_BASE_URL: &str = "https://api.0x.org";

#[derive(Deserialize)]
struct ZeroExTransaction {
    to: String,
    data: String,
    value: String,
    gas: String,
    #[serde(rename = "gasPrice")]
    gas_price: String,
}

#[derive(Deserialize)]
struct ZeroExFee {
    amount: String,
    token: String,
}

#[derive(Deserialize, Default)]
struct ZeroExFees {
    #[serde(rename = "zeroExFee")]
    zero_ex_fee: Option<ZeroExFee>,
    #[serde(rename = "integratorFee")]
    integrator_fee: Option<ZeroExFee>,
}

/// 0x's `/quote` always returns 200, even when it can't quote the requested
/// pair at all (an unrecognized/untradeable token, most commonly) — that case
/// comes back as just `{"liquidityAvailable": false, "zid": "..."}`, with
/// none of the normal quote fields present. Confirmed live against 0x's own
/// API with a scam-token contract address as sellToken.
#[derive(Deserialize)]
struct ZeroExQuoteResponse {
    #[serde(rename = "liquidityAvailable")]
    liquidity_available: bool,
    transaction: Option<ZeroExTransaction>,
    #[serde(rename = "buyAmount")]
    buy_amount: Option<String>,
    #[serde(rename = "sellAmount")]
    sell_amount: Option<String>,
    #[serde(rename = "allowanceTarget")]
    allowance_target: Option<String>,
    #[serde(default)]
    fees: Option<ZeroExFees>,
}

pub struct ZeroExProvider {
    api_key: String,
}

impl ZeroExProvider {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }
}

#[async_trait(?Send)]
impl SwapQuoteProvider for ZeroExProvider {
    fn name(&self) -> &'static str {
        "0x"
    }

    /// Of the chains wwwallet supports, the ones 0x's Swap API covers
    /// (its `GET /swap/chains`) — not Gnosis, Celo, ZKsync Era or Ronin.
    fn supports(&self, chain: ChainId) -> bool {
        matches!(
            chain,
            ChainId::Ethereum
                | ChainId::Polygon
                | ChainId::Arbitrum
                | ChainId::Base
                | ChainId::Optimism
                | ChainId::Robinhood
                | ChainId::WorldChain
                | ChainId::Ink
                | ChainId::Linea
                | ChainId::Unichain
                | ChainId::Scroll
        )
    }

    async fn quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote> {
        let mut url = url::Url::parse(&format!("{ZEROX_BASE_URL}/swap/allowance-holder/quote"))
            .map_err(|e| ProviderError::InvalidInput(e.to_string()))?;
        url.query_pairs_mut()
            .append_pair("chainId", &chain.eip155_id().to_string())
            .append_pair("sellToken", sell_token)
            .append_pair("buyToken", buy_token)
            .append_pair("sellAmount", sell_amount_wei)
            .append_pair("taker", taker_address);

        let quote: ZeroExQuoteResponse = http::get_json_with_headers(
            url.as_str(),
            &[("0x-api-key", &self.api_key), ("0x-version", "v2")],
        )
        .await?;

        extract_quote(quote)
    }
}

fn extract_quote(quote: ZeroExQuoteResponse) -> ProviderResult<SwapQuote> {
    if !quote.liquidity_available {
        return Err(ProviderError::NoLiquidity);
    }
    let missing_field = || ProviderError::Upstream("quote response missing expected field".into());
    let transaction = quote.transaction.ok_or_else(missing_field)?;
    let buy_amount = quote.buy_amount.ok_or_else(missing_field)?;
    let sell_amount = quote.sell_amount.ok_or_else(missing_field)?;
    let allowance_target = quote.allowance_target.ok_or_else(missing_field)?;

    let price = quote_price(&buy_amount, &sell_amount);
    let fees = quote.fees.unwrap_or_default();
    let fees = [("zero_ex", fees.zero_ex_fee), ("integrator", fees.integrator_fee)]
        .into_iter()
        .filter_map(|(kind, fee)| {
            fee.map(|f| SwapFee { kind: kind.to_string(), token: f.token, amount: f.amount })
        })
        .collect();
    Ok(SwapQuote {
        to: transaction.to,
        data: transaction.data,
        value: transaction.value,
        gas_price: transaction.gas_price,
        estimated_gas: transaction.gas,
        buy_amount,
        sell_amount,
        allowance_target,
        price,
        provider: "0x".to_string(),
        fees,
    })
}

/// Buy/sell ratio in raw (undecimalized) units, for rough display purposes only —
/// the v2 API no longer returns a `price` field directly (v1 did).
fn quote_price(buy_amount: &str, sell_amount: &str) -> String {
    let buy: f64 = buy_amount.parse().unwrap_or(0.0);
    let sell: f64 = sell_amount.parse().unwrap_or(0.0);
    if sell == 0.0 {
        return "0".to_string();
    }
    (buy / sell).to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn liquid_response() -> ZeroExQuoteResponse {
        ZeroExQuoteResponse {
            liquidity_available: true,
            transaction: Some(ZeroExTransaction {
                to: "0xrouter".to_string(),
                data: "0xdata".to_string(),
                value: "0".to_string(),
                gas: "21000".to_string(),
                gas_price: "1000000000".to_string(),
            }),
            buy_amount: Some("200".to_string()),
            sell_amount: Some("100".to_string()),
            allowance_target: Some("0xallowance".to_string()),
            fees: Some(ZeroExFees {
                zero_ex_fee: Some(ZeroExFee { amount: "3".to_string(), token: "0xbuy".to_string() }),
                integrator_fee: None,
            }),
        }
    }

    #[test]
    fn no_liquidity_response_is_reported_as_no_liquidity_error() {
        let response = ZeroExQuoteResponse {
            liquidity_available: false,
            transaction: None,
            buy_amount: None,
            sell_amount: None,
            allowance_target: None,
            fees: None,
        };
        assert!(matches!(extract_quote(response), Err(ProviderError::NoLiquidity)));
    }

    #[test]
    fn liquid_response_extracts_every_field() {
        let quote = extract_quote(liquid_response()).unwrap();
        assert_eq!(quote.to, "0xrouter");
        assert_eq!(quote.buy_amount, "200");
        assert_eq!(quote.sell_amount, "100");
        assert_eq!(quote.allowance_target, "0xallowance");
        assert_eq!(quote.price, "2");
        assert_eq!(quote.provider, "0x");
        assert_eq!(quote.fees.len(), 1);
        assert_eq!(quote.fees[0].kind, "zero_ex");
        assert_eq!(quote.fees[0].amount, "3");
    }

    #[test]
    fn liquid_but_missing_a_field_is_an_upstream_error_not_a_panic() {
        let mut response = liquid_response();
        response.transaction = None;
        assert!(matches!(extract_quote(response), Err(ProviderError::Upstream(_))));
    }

    #[test]
    fn leaves_the_chains_0x_lacks_to_the_fallback() {
        let zerox = ZeroExProvider::new(String::new());
        assert!(zerox.supports(ChainId::Linea));
        for chain in [ChainId::Gnosis, ChainId::Celo, ChainId::ZkSync, ChainId::Ronin] {
            assert!(!zerox.supports(chain));
        }
    }
}
