use std::rc::Rc;

use worker::RateLimiter;

use crate::alchemy::AlchemyProvider;
use crate::chain::ChainId;
use crate::coingecko::CoinGeckoProvider;
use crate::error::{ProviderError, ProviderResult};
use crate::etherscan::EtherscanProvider;
use crate::ethplorer::EthplorerProvider;
use crate::fxrate::FrankfurterProvider;
use crate::lifi::LifiProvider;
use crate::public_cache::{self, Ttl};
use crate::public_rpc::PublicRpcProvider;
use crate::tokenlist::TokenListProvider;
use crate::traits::{
    AbiProvider, ActivityProvider, AllowanceProvider, BridgeProvider, BridgeQuoteRequest,
    CoinPriceHistoryProvider,
    CoinSearchProvider, FxHistoryProvider, FxRateProvider, NativePriceProvider,
    PriceHistoryProvider, SwapQuoteProvider, TokenMetadataProvider, TokenPriceProvider,
    TransactionBroadcaster, TransactionFeeProvider, TransactionPrepProvider,
    TransactionStatusProvider,
};
use crate::types::{
    AddressActivity, AddressPresence, BridgeQuote, BridgeStatus, CoinSearchResult, HistoricalPrice, ContractAbi, FxHistory, FxRates, NativePrice, PriceHistory,
    SwapQuote, TokenListItem,
    TokenMetadata, TransactionFee, TransactionPage, TransactionPrep, TransactionStatus,
};
use crate::zerox::ZeroExProvider;

// Shared-cache lifetimes for public market data (see public_cache.rs):
// fresh = served without an upstream call; stale = still served if the
// upstream call fails. Prices move, so their fresh windows are short;
// slower data (daily FX, search results) keeps longer.
const NATIVE_PRICE_TTL: Ttl = Ttl { fresh_secs: 60, stale_secs: 60 * 60 };
const PRICE_HISTORY_TTL: Ttl = Ttl { fresh_secs: 5 * 60, stale_secs: 6 * 60 * 60 };
const TOKEN_METADATA_TTL: Ttl = Ttl { fresh_secs: 10 * 60, stale_secs: 24 * 60 * 60 };
const FX_RATES_TTL: Ttl = Ttl { fresh_secs: 10 * 60, stale_secs: 24 * 60 * 60 };
const FX_HISTORY_TTL: Ttl = Ttl { fresh_secs: 60 * 60, stale_secs: 3 * 24 * 60 * 60 };
// A past price or day's FX rate never changes — kept for as long as the
// cache will hold it.
const HISTORICAL_TTL: Ttl = Ttl { fresh_secs: 30 * 24 * 60 * 60, stale_secs: 30 * 24 * 60 * 60 };
const COIN_SEARCH_TTL: Ttl = Ttl { fresh_secs: 60 * 60, stale_secs: 24 * 60 * 60 };

pub struct ProviderConfig {
    pub alchemy_api_key: String,
    pub ethplorer_api_key: String,
    pub etherscan_api_key: String,
    pub zerox_api_key: String,
    /// Optional: LI.FI quotes without one, at a lower rate limit.
    pub lifi_api_key: Option<String>,
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
    swap_fallback: Rc<dyn SwapQuoteProvider>,
    bridge: Rc<dyn BridgeProvider>,
    native_price: Rc<dyn NativePriceProvider>,
    native_price_fallback: Rc<dyn NativePriceProvider>,
    price_history: Rc<dyn PriceHistoryProvider>,
    price_history_fallback: Rc<dyn PriceHistoryProvider>,
    coin_search: Rc<dyn CoinSearchProvider>,
    coin_price_history: Rc<dyn CoinPriceHistoryProvider>,
    coin_price_history_fallback: Rc<dyn CoinPriceHistoryProvider>,
    fx_history: Rc<dyn FxHistoryProvider>,
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
        let lifi = Rc::new(LifiProvider::new(config.lifi_api_key));
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
            coin_price_history_fallback: alchemy.clone(),
            native_price_fallback: alchemy,
            coin_search: Rc::new(CoinGeckoProvider::new()),
            coin_price_history: Rc::new(CoinGeckoProvider::new()),
            fx_history: Rc::new(FrankfurterProvider::new()),
            price_history_fallback: Rc::new(CoinGeckoProvider::new()),
            tokens: Rc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Rc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Rc::new(FrankfurterProvider::new()),
            swap: Rc::new(ZeroExProvider::new(config.zerox_api_key)),
            swap_fallback: lifi.clone(),
            bridge: lifi,
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

    pub async fn address_presence(
        &self,
        chain: ChainId,
        address: &str,
        client_ip: &str,
    ) -> ProviderResult<AddressPresence> {
        self.check_rate_limit(client_ip, "address_presence").await?;
        self.activity.address_presence(chain, address).await
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
        let key = format!("token:{}:{}", chain.alchemy_slug(), contract_address.to_lowercase());
        public_cache::get_or_fetch(&key, TOKEN_METADATA_TTL, || self.fetch_token_metadata(chain, contract_address)).await
    }

    async fn fetch_token_metadata(&self, chain: ChainId, contract_address: &str) -> ProviderResult<TokenMetadata> {
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
        let base = base.to_uppercase();
        public_cache::get_or_fetch(&format!("fx-rates:{base}"), FX_RATES_TTL, || self.fx.latest_rates(&base)).await
    }

    /// Rates as published on a past date — see FxRateProvider::rates_on.
    pub async fn fx_rates_on(&self, base: &str, date: &str, client_ip: &str) -> ProviderResult<FxRates> {
        self.check_rate_limit(client_ip, "fx_rates").await?;
        let base = base.to_uppercase();
        public_cache::get_or_fetch(&format!("fx-rates:{base}:{date}"), HISTORICAL_TTL, || self.fx.rates_on(&base, date))
            .await
    }

    /// An asset's USD price when a transaction was mined. Bucketed by the
    /// hour (the finest sample available), so every transaction in the same
    /// hour shares one cached lookup.
    pub async fn historical_price(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
        unix_secs: i64,
        client_ip: &str,
    ) -> ProviderResult<HistoricalPrice> {
        self.check_rate_limit(client_ip, "historical_price").await?;
        let hour = unix_secs.div_euclid(3600);
        let asset = match contract_address {
            Some(address) => format!("{}:{}", chain.alchemy_slug(), address.to_lowercase()),
            // Same as native_price: one entry per coin, not per chain.
            None => format!("native:{}", chain.native_symbol()),
        };
        public_cache::get_or_fetch(&format!("price-at:{asset}:{hour}"), HISTORICAL_TTL, || async {
            let usd = self.price_history.usd_price_at(chain, contract_address, hour * 3600 + 1800).await?;
            Ok(HistoricalPrice { usd })
        })
        .await
    }

    pub async fn search_coins(&self, query: &str, client_ip: &str) -> ProviderResult<Vec<CoinSearchResult>> {
        self.check_rate_limit(client_ip, "coin_search").await?;
        let key = format!("coin-search:{}", query.to_lowercase());
        public_cache::get_or_fetch(&key, COIN_SEARCH_TTL, || self.coin_search.search_coins(query)).await
    }

    /// CoinGecko by id first, then Alchemy by ticker — the same pairing (and
    /// for the same keyless-rate-limit reason) as native_price.
    pub async fn coin_price_history(
        &self,
        id: &str,
        symbol: &str,
        client_ip: &str,
    ) -> ProviderResult<PriceHistory> {
        self.check_rate_limit(client_ip, "coin_price_history").await?;
        public_cache::get_or_fetch(&format!("coin-history:{id}"), PRICE_HISTORY_TTL, || async {
            match self.coin_price_history.coin_price_history_24h(id, symbol).await {
                Ok(history) => Ok(history),
                Err(_) => self.coin_price_history_fallback.coin_price_history_24h(id, symbol).await,
            }
        })
        .await
    }

    pub async fn fx_history(&self, base: &str, quote: &str, client_ip: &str) -> ProviderResult<FxHistory> {
        self.check_rate_limit(client_ip, "fx_history").await?;
        let (base, quote) = (base.to_uppercase(), quote.to_uppercase());
        public_cache::get_or_fetch(&format!("fx-history:{base}/{quote}"), FX_HISTORY_TTL, || {
            self.fx_history.fx_history(&base, &quote)
        })
        .await
    }

    pub async fn native_price(&self, chain: ChainId, client_ip: &str) -> ProviderResult<NativePrice> {
        self.check_rate_limit(client_ip, "native_price").await?;
        // By symbol, not chain: Ethereum and the ETH L2s share one entry.
        public_cache::get_or_fetch(&format!("native-price:{}", chain.native_symbol()), NATIVE_PRICE_TTL, || async {
            match self.native_price.native_price(chain).await {
                Ok(price) => Ok(price),
                Err(_) => self.native_price_fallback.native_price(chain).await,
            }
        })
        .await
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
        let key = match contract_address {
            Some(address) => format!("price-history:{}:{}", chain.alchemy_slug(), address.to_lowercase()),
            // Same as native_price: one entry per coin, not per chain.
            None => format!("price-history:native:{}", chain.native_symbol()),
        };
        public_cache::get_or_fetch(&key, PRICE_HISTORY_TTL, || async {
            match self.price_history.price_history_24h(chain, contract_address).await {
                Ok(history) => Ok(history),
                Err(err) if contract_address.is_some() => Err(err),
                Err(_) => self.price_history_fallback.price_history_24h(chain, None).await,
            }
        })
        .await
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
        let mut quote = swap_provider_for(chain, &self.swap, &self.swap_fallback)
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

    /// A cross-chain transfer's route, fees and ready-to-sign transaction.
    pub async fn bridge_quote(&self, request: &BridgeQuoteRequest<'_>) -> ProviderResult<BridgeQuote> {
        self.bridge.quote(request).await
    }

    pub async fn bridge_status(
        &self,
        transaction_hash: &str,
        from_chain: Option<ChainId>,
        to_chain: Option<ChainId>,
    ) -> ProviderResult<BridgeStatus> {
        self.bridge.status(transaction_hash, from_chain, to_chain).await
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
/// 0x wherever it covers the chain; LI.FI's same-chain routing elsewhere.
fn swap_provider_for<'a>(
    chain: ChainId,
    primary: &'a Rc<dyn SwapQuoteProvider>,
    fallback: &'a Rc<dyn SwapQuoteProvider>,
) -> &'a Rc<dyn SwapQuoteProvider> {
    if primary.supports(chain) { primary } else { fallback }
}

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn swaps_go_to_0x_where_it_covers_the_chain_and_lifi_elsewhere() {
        let zerox: Rc<dyn SwapQuoteProvider> = Rc::new(ZeroExProvider::new(String::new()));
        let lifi: Rc<dyn SwapQuoteProvider> = Rc::new(LifiProvider::new(None));
        let by_lifi: Vec<ChainId> = ChainId::ALL
            .into_iter()
            .filter(|&chain| swap_provider_for(chain, &zerox, &lifi).name() == "lifi")
            .collect();
        assert_eq!(by_lifi, [ChainId::Gnosis, ChainId::Celo, ChainId::ZkSync, ChainId::Ronin]);
    }
}
