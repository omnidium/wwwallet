use async_trait::async_trait;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::types::{
    AddressActivity, AddressPresence, BridgeQuote, BridgeStatus, CoinSearchResult, ContractAbi, FxHistory, FxRates,
    NativePrice, NftCollectionPage, NftPage, NftTransfer, PriceHistory,
    SwapQuote, TokenMetadata, TransactionFee, TransactionPage, TransactionPrep, TransactionStatus,
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

    /// The address's native balance and nonce: a fraction of what
    /// `address_activity` costs, for ruling out chains it has never used.
    async fn address_presence(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressPresence>;

    /// Continues transaction history past whatever `address_activity` (or a
    /// previous call to this method) already returned, using the opaque
    /// `cursor` it handed back as `next_cursor`. Does not re-fetch balances —
    /// callers already have those from the initial `address_activity` call.
    async fn transaction_page(
        &self,
        chain: ChainId,
        address: &str,
        cursor: serde_json::Value,
    ) -> ProviderResult<TransactionPage>;
}

/// Fetches ERC-20 token metadata (name/symbol/decimals/logo). Backed by
/// Ethplorer (Ethereum only, with a price), with Alchemy filling the gaps.
#[async_trait(?Send)]
pub trait TokenMetadataProvider {
    fn name(&self) -> &'static str;
    async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata>;
}

/// Fetches an ERC-20 token's USD price on its own — for tokens whose metadata
/// source carries no market data (every chain but Ethereum, for Ethplorer).
/// Backed by Alchemy's Prices API.
#[async_trait(?Send)]
pub trait TokenPriceProvider {
    fn name(&self) -> &'static str;
    async fn usd_price(&self, chain: ChainId, contract_address: &str) -> ProviderResult<f64>;
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
    /// Rates as published on `date` ("YYYY-MM-DD"), or the business day
    /// before it — for valuing a past transaction in the currency of the day.
    async fn rates_on(&self, _base: &str, _date: &str) -> ProviderResult<FxRates> {
        Err(ProviderError::Unavailable)
    }
}

/// Fetches a chain's native currency price in USD. Backed by CoinGecko.
/// Deliberately separate from FxRateProvider: that's fiat-to-fiat only (via
/// Frankfurter), which has no notion of a crypto asset price at all.
#[async_trait(?Send)]
pub trait NativePriceProvider {
    fn name(&self) -> &'static str;
    async fn native_price(&self, chain: ChainId) -> ProviderResult<NativePrice>;
}

/// Fetches an asset's past-24h USD price history — the chain's native
/// currency when `contract_address` is None, else that ERC-20. Backed by
/// Alchemy's Prices API, with CoinGecko as a native-currency fallback.
#[async_trait(?Send)]
pub trait PriceHistoryProvider {
    fn name(&self) -> &'static str;
    async fn price_history_24h(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
    ) -> ProviderResult<PriceHistory>;
    /// USD price at the sample nearest a past moment — what a transaction
    /// was worth when it was mined.
    async fn usd_price_at(
        &self,
        _chain: ChainId,
        _contract_address: Option<&str>,
        _unix_secs: i64,
    ) -> ProviderResult<f64> {
        Err(ProviderError::Unavailable)
    }
}

/// Free-text search over every coin a price source lists — chain-agnostic
/// (Bitcoin, Solana…), unlike everything else here. For favourites only;
/// none of these are holdable in this wallet. Backed by CoinGecko.
#[async_trait(?Send)]
pub trait CoinSearchProvider {
    fn name(&self) -> &'static str;
    async fn search_coins(&self, query: &str) -> ProviderResult<Vec<CoinSearchResult>>;
}

/// Past-24h USD price history for a coin from a CoinSearchProvider result.
/// Takes both its id and ticker: CoinGecko looks coins up by id, Alchemy
/// (the fallback) by ticker.
#[async_trait(?Send)]
pub trait CoinPriceHistoryProvider {
    fn name(&self) -> &'static str;
    async fn coin_price_history_24h(&self, id: &str, symbol: &str) -> ProviderResult<PriceHistory>;
}

/// Recent daily reference rates for one currency pair. Backed by Frankfurter.
#[async_trait(?Send)]
pub trait FxHistoryProvider {
    fn name(&self) -> &'static str;
    async fn fx_history(&self, base: &str, quote: &str) -> ProviderResult<FxHistory>;
}

/// Relays an already-signed raw transaction to the network. The backend never
/// sees a private key — the client signs locally and only hands over the
/// resulting raw transaction bytes for broadcast.
#[async_trait(?Send)]
pub trait TransactionBroadcaster {
    fn name(&self) -> &'static str;
    async fn broadcast(&self, chain: ChainId, raw_transaction_hex: &str) -> ProviderResult<String>;
}

/// Polls the network for whether a broadcast transaction has been mined yet,
/// and if so, whether it succeeded. Deliberately separate from
/// TransactionBroadcaster (one-shot write vs. repeated read) even though
/// Alchemy backs both today.
#[async_trait(?Send)]
pub trait TransactionStatusProvider {
    fn name(&self) -> &'static str;
    async fn transaction_status(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionStatus>;
}

/// Reads what a mined transaction paid in network fees. Unavailable while
/// it's still pending — there's no receipt to read yet.
#[async_trait(?Send)]
pub trait TransactionFeeProvider {
    fn name(&self) -> &'static str;
    async fn transaction_fee(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionFee>;
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
    /// Whether it can quote swaps on `chain` at all.
    fn supports(&self, _chain: ChainId) -> bool {
        true
    }
    async fn quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote>;
}

/// What a cross-chain transfer should do — tokens are an address (the zero or
/// 0xEeee… address for native) or a symbol the aggregator resolves itself.
pub struct BridgeQuoteRequest<'a> {
    pub from_chain: ChainId,
    pub to_chain: ChainId,
    pub from_token: &'a str,
    pub to_token: &'a str,
    pub from_amount_wei: &'a str,
    pub from_address: &'a str,
    pub to_address: &'a str,
}

/// Quotes and tracks cross-chain transfers. Backed by LI.FI.
#[async_trait(?Send)]
pub trait BridgeProvider {
    fn name(&self) -> &'static str;
    async fn quote(&self, request: &BridgeQuoteRequest<'_>) -> ProviderResult<BridgeQuote>;
    async fn status(
        &self,
        transaction_hash: &str,
        from_chain: Option<ChainId>,
        to_chain: Option<ChainId>,
    ) -> ProviderResult<BridgeStatus>;
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

/// The NFTs an address holds, by collection, and one NFT's movements. Backed
/// by Alchemy's NFT API. Pages are continued with the opaque `page_key` the
/// previous page returned.
#[async_trait(?Send)]
pub trait NftProvider {
    fn name(&self) -> &'static str;
    /// Whether it has NFT data for `chain` at all.
    fn supports(&self, chain: ChainId) -> bool;
    async fn collections(
        &self,
        chain: ChainId,
        owner: &str,
        page_key: Option<&str>,
    ) -> ProviderResult<NftCollectionPage>;
    async fn nfts(
        &self,
        chain: ChainId,
        owner: &str,
        contract_address: &str,
        page_key: Option<&str>,
    ) -> ProviderResult<NftPage>;
    /// Every transfer of one token into or out of `owner`, newest first.
    /// `token_id_hex` is 0x-prefixed hex.
    async fn transfers(
        &self,
        chain: ChainId,
        owner: &str,
        contract_address: &str,
        token_id_hex: &str,
    ) -> ProviderResult<Vec<NftTransfer>>;
}
