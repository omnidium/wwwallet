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

    /// Fetches the whole per-chain list — filtering happens afterward, in
    /// `search`, against whatever `cache::get_or_fetch` handed back (fresh or
    /// cached), so a search never itself costs an extra upstream call.
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

/// Looks up a single token by contract address — used as a `TokenMetadata`
/// fallback (see registry.rs) for chains whose primary metadata provider
/// can't help, where a list entry's name/symbol/decimals/logo is the only
/// source available at all.
pub fn find_by_address<'a>(list: &'a [TokenListItem], address: &str) -> Option<&'a TokenListItem> {
    let address = address.to_lowercase();
    list.iter().find(|item| item.address.to_lowercase() == address)
}

/// Ranks symbol-exact matches first, then symbol-prefix, then a substring hit
/// on either symbol or name — the order a user typing "usd" would expect
/// (USDC/USDT before "Fake USD Token"), capped to `limit` results.
pub fn search(list: &[TokenListItem], query: &str, limit: usize) -> Vec<TokenListItem> {
    let query = query.trim().to_lowercase();
    if query.is_empty() {
        return Vec::new();
    }

    let mut ranked: Vec<(u8, usize, &TokenListItem)> = list
        .iter()
        .enumerate()
        .filter_map(|(i, item)| {
            let symbol = item.symbol.to_lowercase();
            let name = item.name.to_lowercase();
            let rank = if symbol == query {
                0
            } else if symbol.starts_with(&query) {
                1
            } else if symbol.contains(&query) || name.contains(&query) {
                2
            } else {
                return None;
            };
            Some((rank, i, item))
        })
        .collect();
    ranked.sort_by_key(|(rank, i, _)| (*rank, *i));
    ranked.into_iter().take(limit).map(|(_, _, item)| item.clone()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn item(symbol: &str, name: &str) -> TokenListItem {
        TokenListItem {
            address: format!("0x{symbol}"),
            name: name.to_string(),
            symbol: symbol.to_string(),
            decimals: 18,
            logo_url: None,
        }
    }

    #[test]
    fn every_chain_has_a_distinct_list_url() {
        let chains = [
            ChainId::Ethereum,
            ChainId::Polygon,
            ChainId::Arbitrum,
            ChainId::Base,
            ChainId::Optimism,
        ];
        let urls: std::collections::HashSet<&str> = chains.iter().map(|c| list_url(*c)).collect();
        assert_eq!(urls.len(), chains.len());
    }

    #[test]
    fn exact_symbol_match_ranks_above_prefix_and_substring() {
        let list = vec![
            item("FUSDC", "Fake USDC Token"),
            item("USDCX", "USDC Extended"),
            item("USDC", "USD Coin"),
        ];
        let results = search(&list, "usdc", 10);
        assert_eq!(results[0].symbol, "USDC");
        assert_eq!(results[1].symbol, "USDCX");
        assert_eq!(results[2].symbol, "FUSDC");
    }

    #[test]
    fn search_is_case_insensitive_and_respects_limit() {
        let list = vec![item("USDC", "USD Coin"), item("USDT", "Tether")];
        assert_eq!(search(&list, "USD", 1).len(), 1);
        assert_eq!(search(&list, "usd", 10).len(), 2);
    }

    #[test]
    fn blank_query_returns_nothing() {
        let list = vec![item("USDC", "USD Coin")];
        assert!(search(&list, "   ", 10).is_empty());
    }

    #[test]
    fn find_by_address_matches_case_insensitively() {
        let list = vec![item("USDC", "USD Coin")];
        assert_eq!(find_by_address(&list, "0XUSDC").unwrap().symbol, "USDC");
        assert!(find_by_address(&list, "0xnope").is_none());
    }
}
