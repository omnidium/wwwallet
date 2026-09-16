use async_trait::async_trait;
use serde_json::Value;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::TokenMetadataProvider;
use crate::types::TokenMetadata;

/// Ethplorer only indexes Ethereum mainnet.
pub struct EthplorerProvider {
    api_key: String,
}

impl EthplorerProvider {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }
}

#[async_trait(?Send)]
impl TokenMetadataProvider for EthplorerProvider {
    fn name(&self) -> &'static str {
        "ethplorer"
    }

    async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata> {
        if chain != ChainId::Ethereum {
            return Err(ProviderError::Unavailable);
        }
        let url = format!(
            "https://api.ethplorer.io/getTokenInfo/{}?apiKey={}",
            contract_address, self.api_key
        );
        let resp: Value = http::get_json(&url).await?;
        if let Some(err) = resp.get("error") {
            return Err(ProviderError::Upstream(err.to_string()));
        }
        Ok(TokenMetadata {
            address: contract_address.to_string(),
            name: resp.get("name").and_then(Value::as_str).map(str::to_string),
            symbol: resp
                .get("symbol")
                .and_then(Value::as_str)
                .map(str::to_string),
            decimals: resp
                .get("decimals")
                .and_then(Value::as_str)
                .and_then(|d| d.parse().ok()),
            logo_url: resp
                .get("image")
                .and_then(Value::as_str)
                .map(|p| format!("https://ethplorer.io{p}")),
            // Ethplorer returns `"price": false` when there's no market data —
            // `.as_f64()` on a JSON bool yields None for free, no extra branch needed.
            usd_price: resp
                .get("price")
                .and_then(|p| p.get("rate"))
                .and_then(Value::as_f64),
        })
    }
}
