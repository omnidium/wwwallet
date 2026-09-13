use async_trait::async_trait;

use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::types::{AddressActivity, ContractAbi, FxRates, TokenMetadata};

/// Fetches native + token balances and recent transactions for an address.
/// Backed by Alchemy today; any other indexer API can implement this.
#[async_trait]
pub trait ActivityProvider: Send + Sync {
    fn name(&self) -> &'static str;
    async fn address_activity(&self, chain: ChainId, address: &str) -> ProviderResult<AddressActivity>;
}

/// Fetches ERC-20 token metadata (name/symbol/decimals/logo). Backed by Ethplorer.
#[async_trait]
pub trait TokenMetadataProvider: Send + Sync {
    fn name(&self) -> &'static str;
    async fn token_metadata(&self, chain: ChainId, contract_address: &str) -> ProviderResult<TokenMetadata>;
}

/// Fetches verified contract ABIs. Backed by Etherscan (and its per-chain siblings).
#[async_trait]
pub trait AbiProvider: Send + Sync {
    fn name(&self) -> &'static str;
    async fn contract_abi(&self, chain: ChainId, contract_address: &str) -> ProviderResult<ContractAbi>;
}

/// Fetches fiat exchange rates. Backed by a free fx-rate API.
#[async_trait]
pub trait FxRateProvider: Send + Sync {
    fn name(&self) -> &'static str;
    async fn latest_rates(&self, base: &str) -> ProviderResult<FxRates>;
}
