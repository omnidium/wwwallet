//! Caps on how fast this backend as a whole may call each upstream
//! provider — not per client, but per provider: a ceiling on spend that holds
//! however many IPs (or, later, sessions) an abuser spreads requests across.
//! The per-IP limits in registry.rs stop one client hogging the backend;
//! these stop the backend as a whole from burning through a provider's
//! free-tier quota, and make the worst case "slow for a while" rather than
//! "out of quota until the month resets".
//!
//! Enforced in http.rs, right before each outgoing request, so it covers
//! every provider (current and future) without each registry method having
//! to remember, and never counts a public-cache hit (public_cache.rs) —
//! only calls that would actually reach the provider. When a budget is
//! spent, the call fails with `ProviderError::Busy`; a cached route then
//! serves its stale value instead (see public_cache.rs), anything else
//! returns 503, which the app retries with backoff.
//!
//! Counted with Cloudflare's Rate Limiting binding, keyed by provider. Like
//! the per-IP limits, its counters are per Cloudflare location rather than
//! global, so the effective ceiling is this limit times the number of
//! locations actively serving traffic — still a hard bound on burn rate.

use std::cell::RefCell;
use std::rc::Rc;

use worker::RateLimiter;

use crate::error::{ProviderError, ProviderResult};

/// Which binding (and so which limit, set in wrangler.toml) a provider's
/// calls are counted against.
#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum Budget {
    /// Price APIs with tight quotas: Alchemy's Prices API (300 lookups an
    /// hour on the free tier) and CoinGecko's keyless API.
    Prices,
    /// Everything else, each provider in its own bucket.
    Default,
}

struct Limiters {
    prices: Rc<RateLimiter>,
    default: Rc<RateLimiter>,
}

thread_local! {
    // Workers run each isolate single-threaded; the bindings are the same
    // for every request, so whichever request installed them last is fine.
    static LIMITERS: RefCell<Option<Limiters>> = const { RefCell::new(None) };
}

/// Called once per request (see the backend's lib.rs) with this Worker's
/// RATE_LIMITER_UPSTREAM_PRICES / RATE_LIMITER_UPSTREAM bindings. Until it
/// is (unit tests), budgets aren't enforced.
pub fn install(prices: RateLimiter, default: RateLimiter) {
    LIMITERS.with(|l| {
        *l.borrow_mut() = Some(Limiters { prices: Rc::new(prices), default: Rc::new(default) })
    });
}

/// Which budget a URL's provider spends, and the bucket key within it. Keys
/// name the provider, never anything from the request (addresses, queries).
pub fn classify(url: &str) -> (Budget, String) {
    let parsed = url::Url::parse(url).ok();
    let host = parsed.as_ref().and_then(|u| u.host_str()).unwrap_or("unknown").to_string();
    let path = parsed.as_ref().map(|u| u.path().to_string()).unwrap_or_default();
    if host == "api.g.alchemy.com" && path.starts_with("/prices/") {
        return (Budget::Prices, "alchemy-prices".to_string());
    }
    if host == "api.coingecko.com" {
        return (Budget::Prices, "coingecko".to_string());
    }
    // Every Alchemy network shares one compute-unit quota.
    if host.ends_with(".g.alchemy.com") {
        return (Budget::Default, "alchemy-rpc".to_string());
    }
    if host.ends_with(".publicnode.com") {
        return (Budget::Default, "public-rpc".to_string());
    }
    (Budget::Default, host)
}

/// Spends one call from `url`'s provider budget, or fails with `Busy`.
pub async fn spend(url: &str) -> ProviderResult<()> {
    let (budget, key) = classify(url);
    let limiter = LIMITERS.with(|l| {
        l.borrow().as_ref().map(|l| match budget {
            Budget::Prices => l.prices.clone(),
            Budget::Default => l.default.clone(),
        })
    });
    let Some(limiter) = limiter else { return Ok(()) };
    let outcome = limiter.limit(format!("upstream:{key}")).await?;
    if outcome.success {
        Ok(())
    } else {
        worker::console_warn!("upstream budget spent for {key}");
        Err(ProviderError::Busy)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classifies_by_provider_never_by_request_contents() {
        assert_eq!(
            classify("https://api.g.alchemy.com/prices/v1/KEY/tokens/by-symbol?symbols=ETH"),
            (Budget::Prices, "alchemy-prices".to_string())
        );
        assert_eq!(
            classify("https://api.coingecko.com/api/v3/search?query=sol"),
            (Budget::Prices, "coingecko".to_string())
        );
        assert_eq!(
            classify("https://base-mainnet.g.alchemy.com/v2/KEY"),
            (Budget::Default, "alchemy-rpc".to_string())
        );
        assert_eq!(
            classify("https://eth-mainnet.g.alchemy.com/v2/KEY"),
            (Budget::Default, "alchemy-rpc".to_string())
        );
        assert_eq!(
            classify("https://base-rpc.publicnode.com"),
            (Budget::Default, "public-rpc".to_string())
        );
        assert_eq!(
            classify("https://api.ethplorer.io/getTokenInfo/0xabc?apiKey=KEY"),
            (Budget::Default, "api.ethplorer.io".to_string())
        );
    }
}
