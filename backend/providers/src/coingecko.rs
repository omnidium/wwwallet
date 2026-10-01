use async_trait::async_trait;
use serde::Deserialize;
use std::collections::HashMap;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::NativePriceProvider;
use crate::types::NativePrice;

/// Every EVM chain here settles in ETH except Polygon (MATIC) — see
/// ChainId::native_symbol. CoinGecko's `/simple/price` takes coin ids, not
/// ticker symbols.
fn coingecko_id(chain: ChainId) -> &'static str {
    match chain {
        ChainId::Ethereum | ChainId::Arbitrum | ChainId::Base | ChainId::Optimism => "ethereum",
        ChainId::Polygon => "matic-network",
    }
}

#[derive(Deserialize)]
struct SimplePriceEntry {
    usd: f64,
}

/// CoinGecko's free, keyless `/simple/price` endpoint. It rate-limits the
/// shared IP ranges Workers' outbound fetches come from fairly readily, so
/// the registry falls back to Alchemy's Prices API whenever this fails.
#[derive(Default)]
pub struct CoinGeckoProvider;

impl CoinGeckoProvider {
    pub fn new() -> Self {
        Self
    }
}

#[async_trait(?Send)]
impl NativePriceProvider for CoinGeckoProvider {
    fn name(&self) -> &'static str {
        "coingecko"
    }

    async fn native_price(&self, chain: ChainId) -> ProviderResult<NativePrice> {
        let id = coingecko_id(chain);
        let url =
            format!("https://api.coingecko.com/api/v3/simple/price?ids={id}&vs_currencies=usd");
        // CoinGecko's public API 403s any request without a descriptive
        // User-Agent (Workers' fetch sends none by default) — see
        // https://www.coingecko.com/en/api/pricing.
        let resp: HashMap<String, SimplePriceEntry> =
            http::get_json_with_headers(&url, &[("User-Agent", "wwwallet/1.0 (+https://wwwallet.me)")])
                .await?;
        let entry = resp
            .get(id)
            .ok_or_else(|| ProviderError::Upstream(format!("no price returned for {id}")))?;
        Ok(NativePrice { usd: entry.usd })
    }
}
