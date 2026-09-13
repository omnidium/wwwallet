use std::sync::Arc;

use moka::future::Cache;

use crate::alchemy::AlchemyProvider;
use crate::cache::{self, ADDRESS_ACTIVITY_TTL, CONTRACT_ABI_TTL, FX_RATES_TTL, TOKEN_METADATA_TTL};
use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::etherscan::EtherscanProvider;
use crate::ethplorer::EthplorerProvider;
use crate::fxrate::FrankfurterProvider;
use crate::traits::{AbiProvider, ActivityProvider, FxRateProvider, TokenMetadataProvider};
use crate::types::{AddressActivity, ContractAbi, FxRates, TokenMetadata};

pub struct ProviderConfig {
    pub alchemy_api_key: String,
    pub ethplorer_api_key: String,
    pub etherscan_api_key: String,
}

/// Aggregates every provider behind cached, single-call methods the backend's
/// HTTP handlers can call directly. This is the one place fallback-between-providers
/// logic would be added as more providers come online.
pub struct ProviderRegistry {
    activity: Arc<dyn ActivityProvider>,
    tokens: Arc<dyn TokenMetadataProvider>,
    abi: Arc<dyn AbiProvider>,
    fx: Arc<dyn FxRateProvider>,

    activity_cache: Cache<(ChainId, String), AddressActivity>,
    token_cache: Cache<(ChainId, String), TokenMetadata>,
    abi_cache: Cache<(ChainId, String), ContractAbi>,
    fx_cache: Cache<String, FxRates>,
}

impl ProviderRegistry {
    pub fn new(config: ProviderConfig) -> Self {
        Self {
            activity: Arc::new(AlchemyProvider::new(config.alchemy_api_key)),
            tokens: Arc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Arc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Arc::new(FrankfurterProvider::new()),

            activity_cache: cache::build(ADDRESS_ACTIVITY_TTL, 10_000),
            token_cache: cache::build(TOKEN_METADATA_TTL, 10_000),
            abi_cache: cache::build(CONTRACT_ABI_TTL, 10_000),
            fx_cache: cache::build(FX_RATES_TTL, 100),
        }
    }

    pub async fn address_activity(&self, chain: ChainId, address: &str) -> ProviderResult<AddressActivity> {
        let key = (chain, address.to_lowercase());
        if let Some(hit) = self.activity_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.activity.address_activity(chain, address).await?;
        self.activity_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }

    pub async fn token_metadata(&self, chain: ChainId, contract_address: &str) -> ProviderResult<TokenMetadata> {
        let key = (chain, contract_address.to_lowercase());
        if let Some(hit) = self.token_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.tokens.token_metadata(chain, contract_address).await?;
        self.token_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }

    pub async fn contract_abi(&self, chain: ChainId, contract_address: &str) -> ProviderResult<ContractAbi> {
        let key = (chain, contract_address.to_lowercase());
        if let Some(hit) = self.abi_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.abi.contract_abi(chain, contract_address).await?;
        self.abi_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }

    pub async fn fx_rates(&self, base: &str) -> ProviderResult<FxRates> {
        let key = base.to_uppercase();
        if let Some(hit) = self.fx_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.fx.latest_rates(&key).await?;
        self.fx_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }
}
