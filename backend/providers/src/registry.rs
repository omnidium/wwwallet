use std::rc::Rc;

use worker::RateLimiter;

use crate::alchemy::AlchemyProvider;
use crate::chain::ChainId;
use crate::coingecko::CoinGeckoProvider;
use crate::error::{ProviderError, ProviderResult};
use crate::etherscan::EtherscanProvider;
use crate::ethplorer::EthplorerProvider;
use crate::fxrate::FrankfurterProvider;
use crate::public_rpc::PublicRpcProvider;
use crate::tokenlist::TokenListProvider;
use crate::traits::{
    AbiProvider, ActivityProvider, AllowanceProvider, FxRateProvider, NativePriceProvider,
    PriceHistoryProvider, SwapQuoteProvider, TokenMetadataProvider, TokenPriceProvider,
    TransactionBroadcaster, TransactionFeeProvider, TransactionPrepProvider,
    TransactionStatusProvider,
};
use crate::types::{
    AddressActivity, ContractAbi, FxRates, NativePrice, PriceHistory, SwapQuote, TokenListItem,
    TokenMetadata, TransactionFee, TransactionPage, TransactionPrep, TransactionStatus,
};
use crate::zerox::ZeroExProvider;

pub struct ProviderConfig {
    pub alchemy_api_key: String,
    pub ethplorer_api_key: String,
    pub etherscan_api_key: String,
    pub zerox_api_key: String,
}

/// Aggregates every provider behind single-call methods the backend's HTTP
/// handlers can call directly. This is the one place fallback-between-providers
/// logic lives.
///
/// Nothing here is cached — every call goes straight to its upstream provider.
/// The client keeps its own persistent cache (see the frontend's chainData
/// store) and is the only place provider data is ever stored.
///
/// Constructed fresh per request (Workers doesn't guarantee an isolate stays
/// warm between requests, so there's no long-lived singleton to hold this) —
/// that's cheap, since it's just a handful of small structs holding API keys.
pub struct ProviderRegistry {
    activity: Rc<dyn ActivityProvider>,
    tokens: Rc<dyn TokenMetadataProvider>,
    /// Fills whatever `tokens` couldn't — see `token_metadata`.
    token_fallback: Rc<dyn TokenMetadataProvider>,
    token_price: Rc<dyn TokenPriceProvider>,
    abi: Rc<dyn AbiProvider>,
    fx: Rc<dyn FxRateProvider>,
    broadcaster: Rc<dyn TransactionBroadcaster>,
    // Concrete (not just the trait object above) so prepare_transaction can
    // also reach its transaction_count method — see that method's own docs
    // for why the nonce has to come from here rather than from Alchemy.
    public_rpc: Rc<PublicRpcProvider>,
    tx_status: Rc<dyn TransactionStatusProvider>,
    tx_fee: Rc<dyn TransactionFeeProvider>,
    tx_prep: Rc<dyn TransactionPrepProvider>,
    allowance: Rc<dyn AllowanceProvider>,
    swap: Rc<dyn SwapQuoteProvider>,
    native_price: Rc<dyn NativePriceProvider>,
    native_price_fallback: Rc<dyn NativePriceProvider>,
    price_history: Rc<dyn PriceHistoryProvider>,
    price_history_fallback: Rc<dyn PriceHistoryProvider>,
    token_list: Rc<TokenListProvider>,
    rate_limiter_default: RateLimiter,
    rate_limiter_broadcast: RateLimiter,
}

impl ProviderRegistry {
    pub fn new(
        config: ProviderConfig,
        rate_limiter_default: RateLimiter,
        rate_limiter_broadcast: RateLimiter,
    ) -> Self {
        let alchemy = Rc::new(AlchemyProvider::new(config.alchemy_api_key));
        let public_rpc = Rc::new(PublicRpcProvider::new());
        Self {
            activity: alchemy.clone(),
            // Deliberately not Alchemy — see PublicRpcProvider's docs.
            broadcaster: public_rpc.clone(),
            public_rpc,
            tx_status: alchemy.clone(),
            tx_fee: alchemy.clone(),
            allowance: alchemy.clone(),
            tx_prep: alchemy.clone(),
            token_fallback: alchemy.clone(),
            token_price: alchemy.clone(),
            price_history: alchemy.clone(),
            native_price_fallback: alchemy,
            price_history_fallback: Rc::new(CoinGeckoProvider::new()),
            tokens: Rc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Rc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Rc::new(FrankfurterProvider::new()),
            swap: Rc::new(ZeroExProvider::new(config.zerox_api_key)),
            native_price: Rc::new(CoinGeckoProvider::new()),
            token_list: Rc::new(TokenListProvider::new()),
            rate_limiter_default,
            rate_limiter_broadcast,
        }
    }

    /// Every route on this backend proxies to a metered third-party API paid
    /// for by this deployment's own keys, and CORS (checked below, in the
    /// router) only stops *browsers* on other origins from reading the
    /// response — it does nothing to stop a direct HTTP client, so without
    /// this, anyone who finds the Worker URL could run up the provider bill
    /// or exhaust free-tier quotas for every real user.
    ///
    /// Uses Cloudflare's Rate Limiting binding rather than a KV-backed
    /// counter deliberately: KV is only eventually consistent (~60s
    /// propagation), and an earlier version of this confirmed a rapid burst
    /// of reads can each see the same pre-write count and never throttle at
    /// all. This binding is built for exactly this instead — Cloudflare
    /// documents it as itself "permissive, eventually consistent, and
    /// intentionally...not an accurate accounting system" (local per-colo
    /// counters, not a global atomic one), confirmed live: a slow trickle of
    /// requests never tripped it, but a genuinely concurrent burst reliably
    /// did. That's the right tradeoff for deterring scripted abuse — it isn't
    /// trying to be a precise quota.
    pub async fn check_rate_limit(&self, client_ip: &str, route: &str) -> ProviderResult<()> {
        let outcome = self.rate_limiter_default.limit(format!("{route}:{client_ip}")).await?;
        if !outcome.success {
            return Err(ProviderError::RateLimited);
        }
        Ok(())
    }

    /// Broadcasting costs real gas-network RPC quota and, unlike the read
    /// routes, turns this backend into a relay for transactions that have
    /// nothing to do with wwwallet — kept on its own, much tighter budget.
    pub async fn check_broadcast_rate_limit(&self, client_ip: &str) -> ProviderResult<()> {
        let outcome = self.rate_limiter_broadcast.limit(client_ip.to_string()).await?;
        if !outcome.success {
            return Err(ProviderError::RateLimited);
        }
        Ok(())
    }

    pub async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
        client_ip: &str,
    ) -> ProviderResult<AddressActivity> {
        self.check_rate_limit(client_ip, "address_activity").await?;
        self.activity.address_activity(chain, address).await
    }

    /// Each call continues a specific client's own in-progress scroll via its
    /// opaque cursor.
    pub async fn transaction_page(
        &self,
        chain: ChainId,
        address: &str,
        cursor: serde_json::Value,
        client_ip: &str,
    ) -> ProviderResult<TransactionPage> {
        self.check_rate_limit(client_ip, "transaction_page").await?;
        self.activity.transaction_page(chain, address, cursor).await
    }

    /// Merges up to three sources, each only filling what the ones before it
    /// left empty: Ethplorer first (Ethereum only, but it carries a live USD
    /// price alongside name/symbol/decimals/logo), then Alchemy's metadata
    /// for whatever's still missing (every other chain, a token Ethplorer
    /// hasn't indexed or is rate-limiting, or one it has no logo for), then
    /// Alchemy's Prices API if the token is still unpriced. A failing source
    /// is skipped rather than failing the whole lookup — partial metadata is
    /// still returned, and the client keeps its own last-known value for
    /// any field that comes back empty, so a gap here never blanks one out.
    pub async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
        client_ip: &str,
    ) -> ProviderResult<TokenMetadata> {
        self.check_rate_limit(client_ip, "token_metadata").await?;
        let mut metadata = self
            .tokens
            .token_metadata(chain, contract_address)
            .await
            .unwrap_or_else(|_| TokenMetadata::unresolved(contract_address));
        if metadata.lacks_descriptive_fields() {
            if let Ok(fallback) = self.token_fallback.token_metadata(chain, contract_address).await {
                metadata.fill_missing_from(fallback);
            }
        }
        if metadata.usd_price.is_none() {
            if let Ok(price) = self.token_price.usd_price(chain, contract_address).await {
                metadata.usd_price = Some(price);
            }
        }
        if metadata.is_unresolved() {
            return Err(ProviderError::Unavailable);
        }
        Ok(metadata)
    }

    pub async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
        client_ip: &str,
    ) -> ProviderResult<ContractAbi> {
        self.check_rate_limit(client_ip, "contract_abi").await?;
        self.abi.contract_abi(chain, contract_address).await
    }

    pub async fn fx_rates(&self, base: &str, client_ip: &str) -> ProviderResult<FxRates> {
        self.check_rate_limit(client_ip, "fx_rates").await?;
        self.fx.latest_rates(&base.to_uppercase()).await
    }

    pub async fn native_price(&self, chain: ChainId, client_ip: &str) -> ProviderResult<NativePrice> {
        self.check_rate_limit(client_ip, "native_price").await?;
        match self.native_price.native_price(chain).await {
            Ok(price) => Ok(price),
            Err(_) => self.native_price_fallback.native_price(chain).await,
        }
    }

    /// Alchemy first — it covers tokens on every chain as well as native
    /// currencies, and isn't subject to CoinGecko's keyless rate limits —
    /// with CoinGecko behind it for native currencies only.
    pub async fn price_history(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
        client_ip: &str,
    ) -> ProviderResult<PriceHistory> {
        self.check_rate_limit(client_ip, "price_history").await?;
        match self.price_history.price_history_24h(chain, contract_address).await {
            Ok(history) => Ok(history),
            Err(err) if contract_address.is_some() => Err(err),
            Err(_) => self.price_history_fallback.price_history_24h(chain, None).await,
        }
    }

    /// The chain's whole token list, for the swap picker's search. Searching
    /// happens client-side against the client's own stored copy, which it
    /// refreshes from here at most once per app session — so this is fetched
    /// once per session per chain rather than once per keystroke.
    pub async fn token_list(&self, chain: ChainId, client_ip: &str) -> ProviderResult<Vec<TokenListItem>> {
        self.check_rate_limit(client_ip, "token_list").await?;
        self.token_list.fetch_list(chain).await
    }

    pub async fn broadcast_transaction(
        &self,
        chain: ChainId,
        raw_transaction_hex: &str,
    ) -> ProviderResult<String> {
        self.broadcaster.broadcast(chain, raw_transaction_hex).await
    }

    pub async fn transaction_status(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionStatus> {
        self.tx_status.transaction_status(chain, transaction_hash).await
    }

    pub async fn transaction_fee(
        &self,
        chain: ChainId,
        transaction_hash: &str,
        client_ip: &str,
    ) -> ProviderResult<TransactionFee> {
        self.check_rate_limit(client_ip, "transaction_fee").await?;
        self.tx_fee.transaction_fee(chain, transaction_hash).await
    }

    pub async fn prepare_transaction(
        &self,
        chain: ChainId,
        from: &str,
        to: &str,
        value_wei: &str,
        data: Option<&str>,
    ) -> ProviderResult<TransactionPrep> {
        let mut prep = self.tx_prep.prepare(chain, from, to, value_wei, data).await?;
        // Overrides Alchemy's own nonce — see PublicRpcProvider::transaction_count's docs.
        prep.nonce = self.public_rpc.transaction_count(chain, from).await?;
        Ok(prep)
    }

    pub async fn allowance(
        &self,
        chain: ChainId,
        token: &str,
        owner: &str,
        spender: &str,
    ) -> ProviderResult<String> {
        self.allowance.allowance(chain, token, owner, spender).await
    }

    pub async fn swap_quote(
        &self,
        chain: ChainId,
        sell_token: &str,
        buy_token: &str,
        sell_amount_wei: &str,
        taker_address: &str,
    ) -> ProviderResult<SwapQuote> {
        let mut quote = self
            .swap
            .quote(chain, sell_token, buy_token, sell_amount_wei, taker_address)
            .await?;

        let sell_decimals = self.token_decimals(chain, sell_token).await;
        let buy_decimals = self.token_decimals(chain, buy_token).await;
        quote.price = human_readable_price(
            &quote.sell_amount,
            sell_decimals,
            &quote.buy_amount,
            buy_decimals,
        );
        Ok(quote)
    }

    /// Resolves an ERC-20's decimals, special-cased for the pseudo-address DEX
    /// aggregators use to mean "the chain's native currency" (never a real
    /// contract, so it has no on-chain metadata to look up). Falls back to 18
    /// (the overwhelmingly common case) if metadata lookup fails — this only
    /// feeds a display estimate, so it's not worth failing the whole quote over.
    /// Asks Alchemy directly rather than going through `token_metadata`:
    /// decimals are all that's needed, and Alchemy reads them straight from
    /// the contract on every chain in a single call.
    async fn token_decimals(&self, chain: ChainId, token_address: &str) -> u8 {
        const NATIVE_PSEUDO_ADDRESS: &str = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        if token_address.eq_ignore_ascii_case(NATIVE_PSEUDO_ADDRESS) {
            return 18;
        }
        self.token_fallback
            .token_metadata(chain, token_address)
            .await
            .ok()
            .and_then(|meta| meta.decimals)
            .unwrap_or(18)
    }
}

/// Decimals-adjusted buy/sell ratio (buy tokens received per one sell token),
/// for display purposes only.
fn human_readable_price(sell_amount_wei: &str, sell_decimals: u8, buy_amount_wei: &str, buy_decimals: u8) -> String {
    let sell_raw: f64 = sell_amount_wei.parse().unwrap_or(0.0);
    let buy_raw: f64 = buy_amount_wei.parse().unwrap_or(0.0);
    let sell = sell_raw / 10f64.powi(sell_decimals as i32);
    let buy = buy_raw / 10f64.powi(buy_decimals as i32);
    if sell == 0.0 {
        return "0".to_string();
    }
    (buy / sell).to_string()
}
