use std::rc::Rc;

use worker::kv::KvStore;
use worker::RateLimiter;

use crate::alchemy::AlchemyProvider;
use crate::cache::{
    self, ADDRESS_ACTIVITY_TTL, CONTRACT_ABI_TTL, FX_RATES_STALE_TTL, FX_RATES_TTL,
    NATIVE_PRICE_STALE_TTL, NATIVE_PRICE_TTL, TOKEN_LIST_STALE_TTL, TOKEN_LIST_TTL,
    TOKEN_METADATA_STALE_TTL, TOKEN_METADATA_TTL,
};
use crate::chain::ChainId;
use crate::coingecko::CoinGeckoProvider;
use crate::error::{ProviderError, ProviderResult};
use crate::etherscan::EtherscanProvider;
use crate::ethplorer::EthplorerProvider;
use crate::fxrate::FrankfurterProvider;
use crate::public_rpc::PublicRpcProvider;
use crate::tokenlist::{self, TokenListProvider};
use crate::traits::{
    AbiProvider, ActivityProvider, AllowanceProvider, FxRateProvider, NativePriceProvider,
    SwapQuoteProvider, TokenMetadataProvider, TransactionBroadcaster, TransactionPrepProvider,
    TransactionStatusProvider,
};
use crate::types::{
    AddressActivity, ContractAbi, FxRates, NativePrice, SwapQuote, TokenListItem, TokenMetadata,
    TransactionPage, TransactionPrep, TransactionStatus,
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
///
/// Constructed fresh per request (Workers doesn't guarantee an isolate stays
/// warm between requests, so there's no long-lived singleton to hold this) —
/// that's cheap, since it's just a handful of small structs holding API keys.
pub struct ProviderRegistry {
    activity: Rc<dyn ActivityProvider>,
    tokens: Rc<dyn TokenMetadataProvider>,
    abi: Rc<dyn AbiProvider>,
    fx: Rc<dyn FxRateProvider>,
    broadcaster: Rc<dyn TransactionBroadcaster>,
    // Concrete (not just the trait object above) so prepare_transaction can
    // also reach its transaction_count method — see that method's own docs
    // for why the nonce has to come from here rather than from Alchemy.
    public_rpc: Rc<PublicRpcProvider>,
    tx_status: Rc<dyn TransactionStatusProvider>,
    tx_prep: Rc<dyn TransactionPrepProvider>,
    allowance: Rc<dyn AllowanceProvider>,
    swap: Rc<dyn SwapQuoteProvider>,
    native_price: Rc<dyn NativePriceProvider>,
    token_list: Rc<TokenListProvider>,
    kv: KvStore,
    rate_limiter_default: RateLimiter,
    rate_limiter_broadcast: RateLimiter,
}

impl ProviderRegistry {
    pub fn new(
        config: ProviderConfig,
        kv: KvStore,
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
            allowance: alchemy.clone(),
            tx_prep: alchemy,
            tokens: Rc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Rc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Rc::new(FrankfurterProvider::new()),
            swap: Rc::new(ZeroExProvider::new(config.zerox_api_key)),
            native_price: Rc::new(CoinGeckoProvider::new()),
            token_list: Rc::new(TokenListProvider::new()),
            kv,
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

    /// `client_ip` is only ever consulted inside the `get_or_fetch` closure
    /// below — i.e. only on an actual cache miss that's about to spend a
    /// metered upstream call. A cache hit costs the paid third-party API
    /// nothing, so it shouldn't spend any of this budget either; the
    /// original version rate-limited every incoming request regardless of
    /// whether it would hit the cache, which meant a wallet holding many
    /// tokens (each a distinct cache key, so no cache hit is possible on a
    /// first load) could exhaust the whole budget without a single one of
    /// those requests ever reaching Ethplorer.
    pub async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
        client_ip: &str,
    ) -> ProviderResult<AddressActivity> {
        let key = format!("activity:{chain:?}:{}", address.to_lowercase());
        cache::get_or_fetch(&self.kv, &key, ADDRESS_ACTIVITY_TTL, || async {
            self.check_rate_limit(client_ip, "address_activity").await?;
            self.activity.address_activity(chain, address).await
        })
        .await
    }

    /// Never cached — each call continues a specific client's own in-progress
    /// scroll via its opaque cursor, so there's no shared key to cache under
    /// the way there is for the first page. Always spends the rate-limit
    /// budget (unlike the cached methods above): every call here is by
    /// definition a fresh upstream fetch.
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

    /// Ethplorer (`self.tokens`, the primary source) only ever indexes
    /// Ethereum — every lookup on any other chain fails outright, and even on
    /// Ethereum it can miss a token it simply hasn't indexed yet. Either way,
    /// the same per-chain list `search_tokens` fetches for the swap picker
    /// doubles as a fallback here: no live USD price, but still enough of a
    /// symbol/decimals/logo to keep a real balance from rendering as
    /// "unknown" and getting hidden by AccountCard's default toggle.
    pub async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
        client_ip: &str,
    ) -> ProviderResult<TokenMetadata> {
        let key = format!("token:{chain:?}:{}", contract_address.to_lowercase());
        cache::get_or_fetch_with_stale_fallback(
            &self.kv,
            &key,
            TOKEN_METADATA_TTL,
            TOKEN_METADATA_STALE_TTL,
            || async {
                self.check_rate_limit(client_ip, "token_metadata").await?;
                match self.tokens.token_metadata(chain, contract_address).await {
                    Ok(metadata) => Ok(metadata),
                    Err(_) => self.token_list_metadata(chain, contract_address, client_ip).await,
                }
            },
        )
        .await
    }

    /// Fallback source for `token_metadata` — see its docs.
    async fn token_list_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
        client_ip: &str,
    ) -> ProviderResult<TokenMetadata> {
        let key = format!("tokenlist:{chain:?}");
        let list: Vec<TokenListItem> = cache::get_or_fetch_with_stale_fallback(
            &self.kv,
            &key,
            TOKEN_LIST_TTL,
            TOKEN_LIST_STALE_TTL,
            || async {
                self.check_rate_limit(client_ip, "token_list").await?;
                self.token_list.fetch_list(chain).await
            },
        )
        .await?;
        tokenlist::find_by_address(&list, contract_address)
            .map(|item| TokenMetadata {
                address: item.address.clone(),
                name: Some(item.name.clone()),
                symbol: Some(item.symbol.clone()),
                decimals: Some(item.decimals),
                logo_url: item.logo_url.clone(),
                usd_price: None,
            })
            .ok_or(ProviderError::Unavailable)
    }

    pub async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
        client_ip: &str,
    ) -> ProviderResult<ContractAbi> {
        let key = format!("abi:{chain:?}:{}", contract_address.to_lowercase());
        cache::get_or_fetch(&self.kv, &key, CONTRACT_ABI_TTL, || async {
            self.check_rate_limit(client_ip, "contract_abi").await?;
            self.abi.contract_abi(chain, contract_address).await
        })
        .await
    }

    pub async fn fx_rates(&self, base: &str, client_ip: &str) -> ProviderResult<FxRates> {
        let base = base.to_uppercase();
        let key = format!("fx:{base}");
        cache::get_or_fetch_with_stale_fallback(&self.kv, &key, FX_RATES_TTL, FX_RATES_STALE_TTL, || async {
            self.check_rate_limit(client_ip, "fx_rates").await?;
            self.fx.latest_rates(&base).await
        })
        .await
    }

    pub async fn native_price(&self, chain: ChainId, client_ip: &str) -> ProviderResult<NativePrice> {
        let key = format!("native-price:{chain:?}");
        cache::get_or_fetch_with_stale_fallback(&self.kv, &key, NATIVE_PRICE_TTL, NATIVE_PRICE_STALE_TTL, || async {
            self.check_rate_limit(client_ip, "native_price").await?;
            self.native_price.native_price(chain).await
        })
        .await
    }

    /// The full per-chain list is what's cached (rarely changes, one shared
    /// key for every query on that chain) — filtering by `query` happens
    /// in-memory on every call against whatever that returns, fresh or
    /// cached, so a search itself never spends an upstream fetch.
    pub async fn search_tokens(
        &self,
        chain: ChainId,
        query: &str,
        client_ip: &str,
    ) -> ProviderResult<Vec<TokenListItem>> {
        let key = format!("tokenlist:{chain:?}");
        let list: Vec<TokenListItem> = cache::get_or_fetch_with_stale_fallback(
            &self.kv,
            &key,
            TOKEN_LIST_TTL,
            TOKEN_LIST_STALE_TTL,
            || async {
                self.check_rate_limit(client_ip, "token_list").await?;
                self.token_list.fetch_list(chain).await
            },
        )
        .await?;
        Ok(tokenlist::search(&list, query, 20))
    }

    /// Never cached — this is a write, not a read.
    pub async fn broadcast_transaction(
        &self,
        chain: ChainId,
        raw_transaction_hex: &str,
    ) -> ProviderResult<String> {
        self.broadcaster.broadcast(chain, raw_transaction_hex).await
    }

    /// Never cached — polled repeatedly while a transaction is pending, so a
    /// cached "pending" would never let the client see it flip to mined.
    pub async fn transaction_status(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionStatus> {
        self.tx_status.transaction_status(chain, transaction_hash).await
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
        let mut prep = self.tx_prep.prepare(chain, from, to, value_wei, data).await?;
        // Overrides Alchemy's own nonce — see PublicRpcProvider::transaction_count's docs.
        prep.nonce = self.public_rpc.transaction_count(chain, from).await?;
        Ok(prep)
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
        client_ip: &str,
    ) -> ProviderResult<SwapQuote> {
        let mut quote = self
            .swap
            .quote(chain, sell_token, buy_token, sell_amount_wei, taker_address)
            .await?;

        let sell_decimals = self.token_decimals(chain, sell_token, client_ip).await;
        let buy_decimals = self.token_decimals(chain, buy_token, client_ip).await;
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
    async fn token_decimals(&self, chain: ChainId, token_address: &str, client_ip: &str) -> u8 {
        const NATIVE_PSEUDO_ADDRESS: &str = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        if token_address.eq_ignore_ascii_case(NATIVE_PSEUDO_ADDRESS) {
            return 18;
        }
        self.token_metadata(chain, token_address, client_ip)
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
