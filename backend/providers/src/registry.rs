use std::rc::Rc;

use worker::kv::KvStore;

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
    tx_prep: Rc<dyn TransactionPrepProvider>,
    allowance: Rc<dyn AllowanceProvider>,
    swap: Rc<dyn SwapQuoteProvider>,
    kv: KvStore,
}

impl ProviderRegistry {
    pub fn new(config: ProviderConfig, kv: KvStore) -> Self {
        let alchemy = Rc::new(AlchemyProvider::new(config.alchemy_api_key));
        Self {
            activity: alchemy.clone(),
            broadcaster: alchemy.clone(),
            allowance: alchemy.clone(),
            tx_prep: alchemy,
            tokens: Rc::new(EthplorerProvider::new(config.ethplorer_api_key)),
            abi: Rc::new(EtherscanProvider::new(config.etherscan_api_key)),
            fx: Rc::new(FrankfurterProvider::new()),
            swap: Rc::new(ZeroExProvider::new(config.zerox_api_key)),
            kv,
        }
    }

    pub async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressActivity> {
        let key = format!("activity:{chain:?}:{}", address.to_lowercase());
        cache::get_or_fetch(&self.kv, &key, ADDRESS_ACTIVITY_TTL, || {
            self.activity.address_activity(chain, address)
        })
        .await
    }

    pub async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata> {
        let key = format!("token:{chain:?}:{}", contract_address.to_lowercase());
        cache::get_or_fetch(&self.kv, &key, TOKEN_METADATA_TTL, || {
            self.tokens.token_metadata(chain, contract_address)
        })
        .await
    }

    pub async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<ContractAbi> {
        let key = format!("abi:{chain:?}:{}", contract_address.to_lowercase());
        cache::get_or_fetch(&self.kv, &key, CONTRACT_ABI_TTL, || {
            self.abi.contract_abi(chain, contract_address)
        })
        .await
    }

    pub async fn fx_rates(&self, base: &str) -> ProviderResult<FxRates> {
        let base = base.to_uppercase();
        let key = format!("fx:{base}");
        cache::get_or_fetch(&self.kv, &key, FX_RATES_TTL, || self.fx.latest_rates(&base)).await
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
    async fn token_decimals(&self, chain: ChainId, token_address: &str) -> u8 {
        const NATIVE_PSEUDO_ADDRESS: &str = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        if token_address.eq_ignore_ascii_case(NATIVE_PSEUDO_ADDRESS) {
            return 18;
        }
        self.token_metadata(chain, token_address)
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
