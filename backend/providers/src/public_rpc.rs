use async_trait::async_trait;
use serde_json::{json, Value};

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::TransactionBroadcaster;

/// Broadcasts signed transactions via each chain's own plain public RPC
/// endpoint rather than Alchemy's default one, which is what everything else
/// in this crate still uses for reads.
///
/// Alchemy silently auto-enrolls every `eth_sendRawTransaction` call on
/// Ethereum, Arbitrum and Base into its MEV Protection product — routed
/// through private order-flow-auction relays (partners Merkle and Blink)
/// instead of the public mempool, with no documented per-request opt-out.
/// A transaction those private builders don't want (e.g. one that would
/// revert) is then simply never included at all — no failed receipt, no
/// trace — unlike a normal public broadcast, where even a losing transaction
/// still gets mined and shows up as failed. That's indistinguishable from
/// wwwallet's own broadcast just not working. These endpoints (Foundation/
/// chain-team-operated, no API key) skip that layer entirely.
pub struct PublicRpcProvider;

impl PublicRpcProvider {
    pub fn new() -> Self {
        Self
    }

    fn rpc_url(chain: ChainId) -> &'static str {
        match chain {
            ChainId::Ethereum => "https://ethereum-rpc.publicnode.com",
            ChainId::Polygon => "https://polygon-bor-rpc.publicnode.com",
            ChainId::Arbitrum => "https://arbitrum-one-rpc.publicnode.com",
            ChainId::Base => "https://base-rpc.publicnode.com",
            ChainId::Optimism => "https://optimism-rpc.publicnode.com",
        }
    }
}

impl Default for PublicRpcProvider {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait(?Send)]
impl TransactionBroadcaster for PublicRpcProvider {
    fn name(&self) -> &'static str {
        "public-rpc"
    }

    async fn broadcast(&self, chain: ChainId, raw_transaction_hex: &str) -> ProviderResult<String> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_sendRawTransaction",
            "params": [raw_transaction_hex],
        });
        let resp: Value = http::post_json(Self::rpc_url(chain), &body).await?;
        if let Some(err) = resp.get("error") {
            return Err(ProviderError::Upstream(err.to_string()));
        }
        resp.get("result")
            .and_then(Value::as_str)
            .map(str::to_string)
            .ok_or_else(|| ProviderError::Upstream("unexpected broadcast response shape".into()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_chain_has_a_distinct_rpc_url() {
        let chains = [
            ChainId::Ethereum,
            ChainId::Polygon,
            ChainId::Arbitrum,
            ChainId::Base,
            ChainId::Optimism,
        ];
        let urls: std::collections::HashSet<&str> =
            chains.iter().map(|c| PublicRpcProvider::rpc_url(*c)).collect();
        assert_eq!(urls.len(), chains.len());
    }
}
