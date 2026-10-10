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
/// chain-team-operated, no API key) skip that layer entirely — publicnode's
/// where it covers the chain, otherwise the one the chain's own docs list
/// (World Chain's non-Alchemy one).
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
            ChainId::Robinhood => "https://robinhood-rpc.publicnode.com",
            ChainId::WorldChain => "https://worldchain-mainnet.gateway.tenderly.co",
            ChainId::Ink => "https://ink-rpc.publicnode.com",
            ChainId::Linea => "https://linea-rpc.publicnode.com",
            ChainId::Gnosis => "https://gnosis-rpc.publicnode.com",
            ChainId::Celo => "https://celo-rpc.publicnode.com",
            ChainId::ZkSync => "https://mainnet.era.zksync.io",
            ChainId::Ronin => "https://api.roninchain.com/rpc",
            ChainId::Unichain => "https://unichain-rpc.publicnode.com",
            ChainId::Scroll => "https://scroll-rpc.publicnode.com",
        }
    }

    async fn rpc_call(chain: ChainId, method: &str, params: Value) -> ProviderResult<Value> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params,
        });
        let resp: Value = http::post_json(Self::rpc_url(chain), &body).await?;
        if let Some(err) = resp.get("error") {
            return Err(ProviderError::Upstream(err.to_string()));
        }
        resp.get("result")
            .cloned()
            .ok_or_else(|| ProviderError::Upstream("missing result field".into()))
    }

    /// The pending-inclusive transaction count (nonce) for `address`, read
    /// from the same network transactions actually get broadcast to.
    ///
    /// This deliberately does *not* go through Alchemy, even though that's
    /// otherwise this crate's read-side provider for everything else:
    /// Alchemy's own "pending" view includes transactions sitting in its
    /// private MEV-protection relay (see this module's own docs) — including
    /// ones that relay will never actually get included and that the public
    /// network has never seen. Computing a nonce from that view counts a
    /// transaction that's permanently stuck as "already used," which pushes
    /// every subsequent transaction to a nonce that can never be mined
    /// either (Ethereum requires strictly sequential nonces), permanently
    /// blocking the account from sending anything else at all. Reading the
    /// nonce from the same public network the broadcast actually reaches
    /// keeps the two consistent, and lets a new transaction reuse — and so
    /// legitimately replace — a nonce that only ever existed in a private
    /// relay no public node ever saw.
    pub async fn transaction_count(&self, chain: ChainId, address: &str) -> ProviderResult<u64> {
        let result = Self::rpc_call(chain, "eth_getTransactionCount", json!([address, "pending"])).await?;
        let hex = result
            .as_str()
            .ok_or_else(|| ProviderError::Upstream("unexpected transaction count response shape".into()))?;
        parse_hex_u64(hex)
    }
}

fn parse_hex_u64(hex: &str) -> ProviderResult<u64> {
    u64::from_str_radix(hex.trim_start_matches("0x"), 16)
        .map_err(|_| ProviderError::Upstream(format!("invalid transaction count hex: {hex}")))
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
        // A node rejects eth_sendRawTransaction outright for reasons specific
        // to this transaction (insufficient funds, a stale/reused nonce, a
        // duplicate already in the mempool, ...) — not an upstream/network
        // failure, so it's reclassified the same way estimateGas reverts are
        // (see alchemy.rs's prepare()), giving a clear response instead of a
        // generic 502.
        let result = Self::rpc_call(chain, "eth_sendRawTransaction", json!([raw_transaction_hex]))
            .await
            .map_err(|e| match e {
                ProviderError::Upstream(reason) => ProviderError::TransactionWouldRevert(reason),
                other => other,
            })?;
        result
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| ProviderError::Upstream("unexpected broadcast response shape".into()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_chain_has_a_distinct_rpc_url() {
        let chains = ChainId::ALL;
        let urls: std::collections::HashSet<&str> =
            chains.iter().map(|c| PublicRpcProvider::rpc_url(*c)).collect();
        assert_eq!(urls.len(), chains.len());
    }

    #[test]
    fn parse_hex_u64_reads_transaction_count_responses() {
        assert_eq!(parse_hex_u64("0x0").unwrap(), 0);
        assert_eq!(parse_hex_u64("0x2a").unwrap(), 42);
    }

    #[test]
    fn parse_hex_u64_rejects_malformed_input() {
        assert!(parse_hex_u64("not-hex").is_err());
    }
}
