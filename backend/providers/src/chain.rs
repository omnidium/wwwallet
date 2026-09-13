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

    pub fn native_symbol(self) -> &'static str {
        match self {
            ChainId::Ethereum | ChainId::Arbitrum | ChainId::Base | ChainId::Optimism => "ETH",
            ChainId::Polygon => "MATIC",
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
