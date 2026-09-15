use async_trait::async_trait;
use serde::Deserialize;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::SwapQuoteProvider;
use crate::types::SwapQuote;

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
struct ZeroExQuoteResponse {
    transaction: ZeroExTransaction,
    #[serde(rename = "buyAmount")]
    buy_amount: String,
    #[serde(rename = "sellAmount")]
    sell_amount: String,
    #[serde(rename = "allowanceTarget")]
    allowance_target: String,
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

        let price = quote_price(&quote.buy_amount, &quote.sell_amount);
        Ok(SwapQuote {
            to: quote.transaction.to,
            data: quote.transaction.data,
            value: quote.transaction.value,
            gas_price: quote.transaction.gas_price,
            estimated_gas: quote.transaction.gas,
            buy_amount: quote.buy_amount,
            sell_amount: quote.sell_amount,
            allowance_target: quote.allowance_target,
            price,
        })
    }
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
