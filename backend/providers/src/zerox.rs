use async_trait::async_trait;
use serde::Deserialize;

use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::http;
use crate::traits::SwapQuoteProvider;
use crate::types::SwapQuote;

#[derive(Deserialize)]
struct ZeroExQuoteResponse {
    to: String,
    data: String,
    value: String,
    #[serde(rename = "gasPrice")]
    gas_price: String,
    #[serde(rename = "estimatedGas")]
    estimated_gas: String,
    #[serde(rename = "buyAmount")]
    buy_amount: String,
    #[serde(rename = "sellAmount")]
    sell_amount: String,
    #[serde(rename = "allowanceTarget")]
    allowance_target: String,
    price: String,
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
        let url = format!(
            "{}/swap/v1/quote?sellToken={sell_token}&buyToken={buy_token}&sellAmount={sell_amount_wei}&takerAddress={taker_address}",
            chain.zerox_base_url(),
        );

        let quote: ZeroExQuoteResponse =
            http::get_json_with_headers(&url, &[("0x-api-key", &self.api_key)]).await?;
        Ok(SwapQuote {
            to: quote.to,
            data: quote.data,
            value: quote.value,
            gas_price: quote.gas_price,
            estimated_gas: quote.estimated_gas,
            buy_amount: quote.buy_amount,
            sell_amount: quote.sell_amount,
            allowance_target: quote.allowance_target,
            price: quote.price,
        })
    }
}
