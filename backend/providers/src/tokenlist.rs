use serde::Deserialize;

use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::http;
use crate::types::TokenListItem;

/// CoinGecko mirrors the standard "Token Lists" format
/// (https://tokenlists.org) per chain, under its own domain — same shape
/// Uniswap's own default list uses, just covering every chain this backend
/// supports (Uniswap's own list is Ethereum-only).
fn list_url(chain: ChainId) -> &'static str {
    match chain {
        ChainId::Ethereum => "https://tokens.coingecko.com/uniswap/all.json",
        ChainId::Polygon => "https://tokens.coingecko.com/polygon-pos/all.json",
        ChainId::Arbitrum => "https://tokens.coingecko.com/arbitrum-one/all.json",
        ChainId::Base => "https://tokens.coingecko.com/base/all.json",
        ChainId::Optimism => "https://tokens.coingecko.com/optimistic-ethereum/all.json",
        ChainId::Robinhood => "https://tokens.coingecko.com/robinhood/all.json",
        ChainId::WorldChain => "https://tokens.coingecko.com/world-chain/all.json",
        ChainId::Ink => "https://tokens.coingecko.com/ink/all.json",
        ChainId::Linea => "https://tokens.coingecko.com/linea/all.json",
        ChainId::Gnosis => "https://tokens.coingecko.com/xdai/all.json",
        ChainId::Celo => "https://tokens.coingecko.com/celo/all.json",
        ChainId::ZkSync => "https://tokens.coingecko.com/zksync/all.json",
        ChainId::Ronin => "https://tokens.coingecko.com/ronin/all.json",
        ChainId::Unichain => "https://tokens.coingecko.com/unichain/all.json",
        ChainId::Scroll => "https://tokens.coingecko.com/scroll/all.json",
    }
}

#[derive(Deserialize)]
struct RawTokenList {
    tokens: Vec<RawTokenListEntry>,
}

#[derive(Deserialize)]
struct RawTokenListEntry {
    address: String,
    name: String,
    symbol: String,
    decimals: u8,
    #[serde(rename = "logoURI")]
    logo_uri: Option<String>,
}

pub struct TokenListProvider;

impl TokenListProvider {
    pub fn new() -> Self {
        Self
    }

    /// Fetches the whole per-chain list. Searching it (the swap picker) and
    /// looking tokens up in it (a metadata gap-filler) both happen
    /// client-side, against the client's own stored copy.
    pub async fn fetch_list(&self, chain: ChainId) -> ProviderResult<Vec<TokenListItem>> {
        let raw: RawTokenList = http::get_json(list_url(chain)).await?;
        Ok(raw
            .tokens
            .into_iter()
            .map(|t| TokenListItem {
                address: t.address,
                name: t.name,
                symbol: t.symbol,
                decimals: t.decimals,
                logo_url: t.logo_uri,
            })
            .collect())
    }
}

impl Default for TokenListProvider {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_chain_has_a_distinct_list_url() {
        let chains = ChainId::ALL;
        let urls: std::collections::HashSet<&str> = chains.iter().map(|c| list_url(*c)).collect();
        assert_eq!(urls.len(), chains.len());
    }
}
