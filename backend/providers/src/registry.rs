use std::sync::Arc;

use moka::future::Cache;

use crate::alchemy::AlchemyProvider;
use crate::cache::{
    self, ADDRESS_ACTIVITY_TTL, CONTRACT_ABI_TTL, FX_RATES_TTL, TOKEN_METADATA_TTL,
};
use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::etherscan::EtherscanProvider;
use crate::ethplorer::EthplorerProvider;
use crate::fxrate::FrankfurterProvider;
use crate::traits::{
    AbiProvider, ActivityProvider, AllowanceProvider, FxRateProvider, SwapQuoteProvider,
    TokenMetadataProvider, TransactionBroadcaster, TransactionPrepProvider,
};
use crate::types::{
    AddressActivity, ContractAbi, FxRates, SwapQuote, TokenMetadata, TransactionPrep,
};
use crate::zerox::ZeroExProvider;

pub struct ProviderConfig {
    pub alchemy_api_key: String,
    pub ethplorer_api_key: String,
    pub etherscan_api_key: String,
    pub zerox_api_key: String,
}

/// Aggregates every provider behind cached, single-call methods the backend's
/// HTTP handlers can call directly. This is the one place fallback-between-providers
/// logic would be added as more providers come online.
pub struct ProviderRegistry {
    activity: Arc<dyn ActivityProvider>,
    tokens: Arc<dyn TokenMetadataProvider>,
    abi: Arc<dyn AbiProvider>,
    fx: Arc<dyn FxRateProvider>,
    broadcaster: Arc<dyn TransactionBroadcaster>,
    tx_prep: Arc<dyn TransactionPrepProvider>,
    allowance: Arc<dyn AllowanceProvider>,
    swap: Arc<dyn SwapQuoteProvider>,

    activity_cache: Cache<(ChainId, String), AddressActivity>,
    token_cache: Cache<(ChainId, String), TokenMetadata>,
    abi_cache: Cache<(ChainId, String), ContractAbi>,
    fx_cache: Cache<String, FxRates>,
}

impl ProviderRegistry {
    pub fn new(config: ProviderConfig) -> Self {
        let alchemy = Arc::new(AlchemyProvider::new(config.alchemy_api_key));
        Self {
            activity: alchemy.clone(),
            broadcaster: alchemy.clone(),
            allowance: alchemy.clone(),
            tx_prep: alchemy,
            tokens: Arc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Arc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Arc::new(FrankfurterProvider::new()),
            swap: Arc::new(ZeroExProvider::new(config.zerox_api_key)),

            activity_cache: cache::build(ADDRESS_ACTIVITY_TTL, 10_000),
            token_cache: cache::build(TOKEN_METADATA_TTL, 10_000),
            abi_cache: cache::build(CONTRACT_ABI_TTL, 10_000),
            fx_cache: cache::build(FX_RATES_TTL, 100),
        }
    }

    pub async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressActivity> {
        let key = (chain, address.to_lowercase());
        if let Some(hit) = self.activity_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.activity.address_activity(chain, address).await?;
        self.activity_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }

    pub async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata> {
        let key = (chain, contract_address.to_lowercase());
        if let Some(hit) = self.token_cache.get(&key).await {
            return Ok(hit);
        }
        let fresh = self.tokens.token_metadata(chain, contract_address).await?;
        self.token_cache.insert(key, fresh.clone()).await;
        Ok(fresh)
    }

    pub async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<ContractAbi> {
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

    /// Never cached — this is a write, not a read.
    pub async fn broadcast_transaction(
        &self,
        chain: ChainId,
        raw_transaction_hex: &str,
    ) -> ProviderResult<String> {
        self.broadcaster.broadcast(chain, raw_transaction_hex).await
    }

    /// Never cached — nonce/gas price must always be fresh.
    pub async fn prepare_transaction(
        &self,
        chain: ChainId,
        from: &str,
        to: &str,
        value_wei: &str,
        data: Option<&str>,
    ) -> ProviderResult<TransactionPrep> {
        self.tx_prep.prepare(chain, from, to, value_wei, data).await
    }

    /// Never cached — allowances can change at any time.
    pub async fn allowance(
        &self,
        chain: ChainId,
        token: &str,
        owner: &str,
        spender: &str,
    ) -> ProviderResult<String> {
        self.allowance.allowance(chain, token, owner, spender).await
    }

    /// Never cached — quotes are price/slippage-sensitive and time-limited.
    pub async fn swap_quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote> {
        self.swap
            .quote(chain, sell_token, buy_token, sell_amount_wei, taker_address)
            .await
    }
}
