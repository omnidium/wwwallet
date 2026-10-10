use serde::{Deserialize, Serialize};

/// The EVM chains wwwallet supports: Ethereum and the L2s with the most
/// value on them (by L2BEAT's ranking) that every provider here can serve.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ChainId {
    Ethereum,
    Polygon,
    Arbitrum,
    Base,
    Optimism,
    Robinhood,
    WorldChain,
    Ink,
    Linea,
    Gnosis,
    Celo,
    ZkSync,
    Ronin,
    Unichain,
    Scroll,
}

impl ChainId {
    pub const ALL: [ChainId; 15] = [
        ChainId::Ethereum,
        ChainId::Polygon,
        ChainId::Arbitrum,
        ChainId::Base,
        ChainId::Optimism,
        ChainId::Robinhood,
        ChainId::WorldChain,
        ChainId::Ink,
        ChainId::Linea,
        ChainId::Gnosis,
        ChainId::Celo,
        ChainId::ZkSync,
        ChainId::Ronin,
        ChainId::Unichain,
        ChainId::Scroll,
    ];

    /// EVM numeric chain id (mainnet).
    pub fn eip155_id(self) -> u64 {
        match self {
            ChainId::Ethereum => 1,
            ChainId::Polygon => 137,
            ChainId::Arbitrum => 42161,
            ChainId::Base => 8453,
            ChainId::Optimism => 10,
            ChainId::Robinhood => 4663,
            ChainId::WorldChain => 480,
            ChainId::Ink => 57073,
            ChainId::Linea => 59144,
            ChainId::Gnosis => 100,
            ChainId::Celo => 42220,
            ChainId::ZkSync => 324,
            ChainId::Ronin => 2020,
            ChainId::Unichain => 130,
            ChainId::Scroll => 534352,
        }
    }

    /// The inverse of `eip155_id`; None for any chain this wallet doesn't support.
    pub fn from_eip155_id(id: u64) -> Option<Self> {
        Self::ALL.into_iter().find(|chain| chain.eip155_id() == id)
    }

    /// Also how price sources look the native coin up — and the key it's
    /// cached under, so chains sharing a coin (every ETH L2) share one entry.
    pub fn native_symbol(self) -> &'static str {
        match self {
            ChainId::Polygon => "POL",
            ChainId::Gnosis => "XDAI",
            ChainId::Celo => "CELO",
            ChainId::Ronin => "RON",
            ChainId::Ethereum
            | ChainId::Arbitrum
            | ChainId::Base
            | ChainId::Optimism
            | ChainId::Robinhood
            | ChainId::WorldChain
            | ChainId::Ink
            | ChainId::Linea
            | ChainId::ZkSync
            | ChainId::Unichain
            | ChainId::Scroll => "ETH",
        }
    }

    /// A contract that also holds this chain's native coin, as an ERC-20 view
    /// of the same balance (Celo's CELO token, ZKsync's L2BaseToken,
    /// Polygon's POL predeploy). Token balance lookups can list it, which
    /// would count the native coin twice.
    pub fn native_token_contract(self) -> Option<&'static str> {
        match self {
            ChainId::Polygon => Some("0x0000000000000000000000000000000000001010"),
            ChainId::Celo => Some("0x471ece3750da237f93b8e339c536989b8978a438"),
            ChainId::ZkSync => Some("0x000000000000000000000000000000000000800a"),
            ChainId::Ethereum
            | ChainId::Arbitrum
            | ChainId::Base
            | ChainId::Optimism
            | ChainId::Robinhood
            | ChainId::WorldChain
            | ChainId::Ink
            | ChainId::Linea
            | ChainId::Gnosis
            | ChainId::Ronin
            | ChainId::Unichain
            | ChainId::Scroll => None,
        }
    }

    /// Alchemy's network slug for this chain, used to build API URLs.
    pub fn alchemy_slug(self) -> &'static str {
        match self {
            ChainId::Ethereum => "eth-mainnet",
            ChainId::Polygon => "polygon-mainnet",
            ChainId::Arbitrum => "arb-mainnet",
            ChainId::Base => "base-mainnet",
            ChainId::Optimism => "opt-mainnet",
            ChainId::Robinhood => "robinhood-mainnet",
            ChainId::WorldChain => "worldchain-mainnet",
            ChainId::Ink => "ink-mainnet",
            ChainId::Linea => "linea-mainnet",
            ChainId::Gnosis => "gnosis-mainnet",
            ChainId::Celo => "celo-mainnet",
            ChainId::ZkSync => "zksync-mainnet",
            ChainId::Ronin => "ronin-mainnet",
            ChainId::Unichain => "unichain-mainnet",
            ChainId::Scroll => "scroll-mainnet",
        }
    }

    /// The URL slug — the same name the variant serializes as (`worldchain`, `zksync`).
    pub fn from_slug(slug: &str) -> Option<Self> {
        Self::ALL.into_iter().find(|chain| chain.slug() == slug)
    }

    pub fn slug(self) -> &'static str {
        match self {
            ChainId::Ethereum => "ethereum",
            ChainId::Polygon => "polygon",
            ChainId::Arbitrum => "arbitrum",
            ChainId::Base => "base",
            ChainId::Optimism => "optimism",
            ChainId::Robinhood => "robinhood",
            ChainId::WorldChain => "worldchain",
            ChainId::Ink => "ink",
            ChainId::Linea => "linea",
            ChainId::Gnosis => "gnosis",
            ChainId::Celo => "celo",
            ChainId::ZkSync => "zksync",
            ChainId::Ronin => "ronin",
            ChainId::Unichain => "unichain",
            ChainId::Scroll => "scroll",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ALL_CHAINS: [ChainId; 15] = ChainId::ALL;

    #[test]
    fn every_chain_round_trips_through_its_url_slug() {
        for chain in ALL_CHAINS {
            assert_eq!(ChainId::from_slug(chain.slug()), Some(chain));
        }
    }

    #[test]
    fn slug_is_what_the_chain_serializes_as() {
        for chain in ALL_CHAINS {
            assert_eq!(serde_json::to_string(&chain).unwrap(), format!("\"{}\"", chain.slug()));
        }
    }

    #[test]
    fn every_chain_round_trips_through_its_eip155_id() {
        for chain in ALL_CHAINS {
            assert_eq!(ChainId::from_eip155_id(chain.eip155_id()), Some(chain));
        }
        assert_eq!(ChainId::from_eip155_id(56), None);
    }

    #[test]
    fn unknown_slug_is_rejected() {
        assert_eq!(ChainId::from_slug("bitcoin"), None);
    }

    #[test]
    fn native_token_contracts_are_lowercase_addresses() {
        // Compared against a lowercased contract address in alchemy.rs.
        for contract in ALL_CHAINS.iter().filter_map(|c| c.native_token_contract()) {
            assert_eq!(contract, contract.to_lowercase());
            assert_eq!(contract.len(), 42);
        }
    }

    #[test]
    fn every_chain_has_a_distinct_eip155_id() {
        let ids: std::collections::HashSet<u64> =
            ALL_CHAINS.iter().map(|c| c.eip155_id()).collect();
        assert_eq!(ids.len(), ALL_CHAINS.len());
    }
}
