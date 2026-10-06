use serde::{Deserialize, Serialize};

/// EVM chains supported at launch.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ChainId {
    Ethereum,
    Polygon,
    Arbitrum,
    Base,
    Optimism,
}

impl ChainId {
    /// EVM numeric chain id (mainnet).
    pub fn eip155_id(self) -> u64 {
        match self {
            ChainId::Ethereum => 1,
            ChainId::Polygon => 137,
            ChainId::Arbitrum => 42161,
            ChainId::Base => 8453,
            ChainId::Optimism => 10,
        }
    }

    /// The inverse of `eip155_id`; None for any chain this wallet doesn't support.
    pub fn from_eip155_id(id: u64) -> Option<Self> {
        match id {
            1 => Some(ChainId::Ethereum),
            137 => Some(ChainId::Polygon),
            42161 => Some(ChainId::Arbitrum),
            8453 => Some(ChainId::Base),
            10 => Some(ChainId::Optimism),
            _ => None,
        }
    }

    pub fn native_symbol(self) -> &'static str {
        match self {
            ChainId::Ethereum | ChainId::Arbitrum | ChainId::Base | ChainId::Optimism => "ETH",
            ChainId::Polygon => "POL",
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
        }
    }

    pub fn from_slug(slug: &str) -> Option<Self> {
        match slug {
            "ethereum" => Some(ChainId::Ethereum),
            "polygon" => Some(ChainId::Polygon),
            "arbitrum" => Some(ChainId::Arbitrum),
            "base" => Some(ChainId::Base),
            "optimism" => Some(ChainId::Optimism),
            _ => None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ALL_CHAINS: [ChainId; 5] = [
        ChainId::Ethereum,
        ChainId::Polygon,
        ChainId::Arbitrum,
        ChainId::Base,
        ChainId::Optimism,
    ];

    #[test]
    fn every_chain_round_trips_through_its_url_slug() {
        for chain in ALL_CHAINS {
            let slug = format!("{:?}", chain).to_lowercase();
            assert_eq!(ChainId::from_slug(&slug), Some(chain));
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
    fn every_chain_has_a_distinct_eip155_id() {
        let ids: std::collections::HashSet<u64> =
            ALL_CHAINS.iter().map(|c| c.eip155_id()).collect();
        assert_eq!(ids.len(), ALL_CHAINS.len());
    }
}
