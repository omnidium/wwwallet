use async_trait::async_trait;

use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::types::{
    AddressActivity, ContractAbi, FxRates, NativePrice, SwapQuote, TokenMetadata, TransactionPrep,
};

/// Fetches native + token balances and recent transactions for an address.
/// Backed by Alchemy today; any other indexer API can implement this.
///
/// `?Send`: these futures wrap JS-bound `worker` types that aren't `Send`,
/// which is fine — Workers run single-threaded, so `Send` was never load-bearing.
#[async_trait(?Send)]
pub trait ActivityProvider {
    fn name(&self) -> &'static str;
    async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressActivity>;
}

/// Fetches ERC-20 token metadata (name/symbol/decimals/logo). Backed by Ethplorer.
#[async_trait(?Send)]
pub trait TokenMetadataProvider {
    fn name(&self) -> &'static str;
    async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata>;
}

/// Fetches verified contract ABIs. Backed by Etherscan (and its per-chain siblings).
#[async_trait(?Send)]
pub trait AbiProvider {
    fn name(&self) -> &'static str;
    async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<ContractAbi>;
}

/// Fetches fiat exchange rates. Backed by a free fx-rate API.
#[async_trait(?Send)]
pub trait FxRateProvider {
    fn name(&self) -> &'static str;
    async fn latest_rates(&self, base: &str) -> ProviderResult<FxRates>;
}

/// Fetches a chain's native currency price in USD. Backed by CoinGecko.
/// Deliberately separate from FxRateProvider: that's fiat-to-fiat only (via
/// Frankfurter), which has no notion of a crypto asset price at all.
#[async_trait(?Send)]
pub trait NativePriceProvider {
    fn name(&self) -> &'static str;
    async fn native_price(&self, chain: ChainId) -> ProviderResult<NativePrice>;
}

/// Relays an already-signed raw transaction to the network. The backend never
/// sees a private key — the client signs locally and only hands over the
/// resulting raw transaction bytes for broadcast.
#[async_trait(?Send)]
pub trait TransactionBroadcaster {
    fn name(&self) -> &'static str;
    async fn broadcast(&self, chain: ChainId, raw_transaction_hex: &str) -> ProviderResult<String>;
}

/// Supplies everything the client needs to build and sign a transaction
/// locally (nonce, gas price, gas limit, chain id) without exposing an RPC
/// key to the browser.
#[async_trait(?Send)]
pub trait TransactionPrepProvider {
    fn name(&self) -> &'static str;
    async fn prepare(
        &self,
        chain: ChainId,
        from: &str,
        to: &str,
        value_wei: &str,
        data: Option<&str>,
    ) -> ProviderResult<TransactionPrep>;
}

/// Fetches a ready-to-sign swap transaction from a DEX aggregator. Backed by
/// the 0x Swap API.
#[async_trait(?Send)]
pub trait SwapQuoteProvider {
    fn name(&self) -> &'static str;
    async fn quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote>;
}

/// Reads an ERC-20 `allowance(owner, spender)` value. Used to decide whether
/// the client needs to send an approval transaction before a swap.
#[async_trait(?Send)]
pub trait AllowanceProvider {
    fn name(&self) -> &'static str;
    async fn allowance(
        &self,
        chain: ChainId,
        token: &str,
        owner: &str,
        spender: &str,
    ) -> ProviderResult<String>;
}
