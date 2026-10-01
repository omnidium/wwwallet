use async_trait::async_trait;
use serde::Deserialize;
use std::collections::HashMap;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::{NativePriceProvider, PriceHistoryProvider};
use crate::types::{NativePrice, PriceHistory};

/// Every EVM chain here settles in ETH except Polygon (POL) — see
/// ChainId::native_symbol. CoinGecko's `/simple/price` takes coin ids, not
/// ticker symbols. Not "matic-network": that id still tracks the legacy MATIC
/// token, whose price has drifted away from POL's since the migration.
fn coingecko_id(chain: ChainId) -> &'static str {
    match chain {
        ChainId::Ethereum | ChainId::Arbitrum | ChainId::Base | ChainId::Optimism => "ethereum",
        ChainId::Polygon => "polygon-ecosystem-token",
    }
}

/// CoinGecko's public API 403s any request without a descriptive
/// User-Agent (Workers' fetch sends none by default) — see
/// https://www.coingecko.com/en/api/pricing.
const USER_AGENT: (&str, &str) = ("User-Agent", "wwwallet/1.0 (+https://wwwallet.me)");

#[derive(Deserialize)]
struct SimplePriceEntry {
    usd: f64,
}

/// `/market_chart`'s `prices` is a list of `[unix_millis, usd]` pairs.
#[derive(Deserialize)]
struct MarketChart {
    prices: Vec<(f64, f64)>,
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
        let resp: HashMap<String, SimplePriceEntry> =
            http::get_json_with_headers(&url, &[USER_AGENT]).await?;
        let entry = resp
            .get(id)
            .ok_or_else(|| ProviderError::Upstream(format!("no price returned for {id}")))?;
        Ok(NativePrice { usd: entry.usd })
    }
}

/// Native currencies only — the registry only falls back to this for those,
/// since mapping an arbitrary contract to a CoinGecko coin is its own lookup.
#[async_trait(?Send)]
impl PriceHistoryProvider for CoinGeckoProvider {
    fn name(&self) -> &'static str {
        "coingecko"
    }

    async fn price_history_24h(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
    ) -> ProviderResult<PriceHistory> {
        if contract_address.is_some() {
            return Err(ProviderError::Unavailable);
        }
        let id = coingecko_id(chain);
        let url = format!("https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=1");
        let chart: MarketChart = http::get_json_with_headers(&url, &[USER_AGENT]).await?;
        let series: Vec<f64> = chart.prices.into_iter().map(|(_, usd)| usd).collect();
        PriceHistory::from_series(&series).ok_or(ProviderError::Unavailable)
    }
}
