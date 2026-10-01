use std::future::Future;

use serde::de::DeserializeOwned;
use serde::Serialize;
use worker::kv::KvStore;

use crate::error::ProviderResult;

// Short TTLs, sized conservatively around free-tier provider quotas. KV is
// eventually consistent (~60s propagation across the edge), which is fine
// here — these caches exist to reduce upstream calls, not for correctness.
pub const ADDRESS_ACTIVITY_TTL: u64 = 20;
pub const TOKEN_METADATA_TTL: u64 = 60 * 60;
pub const CONTRACT_ABI_TTL: u64 = 60 * 60 * 24;
pub const FX_RATES_TTL: u64 = 60 * 30;
// Much shorter than FX_RATES_TTL: crypto prices move far faster than forex.
pub const NATIVE_PRICE_TTL: u64 = 60 * 5;
// How long a last-known-good price stays eligible as a fallback once its
// normal TTL above has lapsed and a fresh fetch then fails (CoinGecko's and
// Frankfurter's free tiers both do this occasionally, e.g. rate-limiting the
// shared IP ranges Workers' outbound fetches come from) — see
// `get_or_fetch_with_stale_fallback`. A day-old price is still far more
// useful to show than a hard error breaking every fiat figure in the UI.
pub const FX_RATES_STALE_TTL: u64 = 60 * 60 * 24;
pub const NATIVE_PRICE_STALE_TTL: u64 = 60 * 60 * 24;
// Token metadata (name/symbol/decimals/logo) essentially never changes once
// resolved, and Ethplorer's free tier is the flakiest upstream this backend
// calls — a week-old fallback is still correct almost always, and far better
// than a bare 429/502 breaking a whole account card's token list.
pub const TOKEN_METADATA_STALE_TTL: u64 = 60 * 60 * 24 * 7;
// A chain's token list (address/symbol/name/decimals/logo for every listed
// token) changes on the order of days, not minutes — a full day between
// refetches is plenty fresh, and a stale week-old list is still far better
// than search results going empty over a transient fetch failure.
/// Workers KV rejects expiration_ttl below 60s.
pub const DEGRADED_TTL: u64 = 60;
pub const TOKEN_LIST_TTL: u64 = 60 * 60 * 24;
pub const TOKEN_LIST_STALE_TTL: u64 = 60 * 60 * 24 * 7;

/// Reads `key` from KV; on a miss, calls `fetch`, stores the result with the
/// given TTL (best-effort — a KV write failure doesn't fail the request),
/// and returns it.
///
/// Round-trips through an explicit JSON string via `serde_json` rather than
/// `KvStore`'s own `put`/`json` convenience methods — those go through
/// `serde_wasm_bindgen`, which serializes a Rust `HashMap` field as a JS
/// `Map` rather than a plain object. That `Map` then collapses to `{}`
/// wherever the value is later turned into text (e.g. by miniflare's local
/// KV backing store), so any cached type with a map field — `FxRates::rates`
/// among them — silently lost that field's contents on every cache hit.
/// Passing an already-serialized string sidesteps that conversion entirely.
pub async fn get_or_fetch<T, F, Fut>(
    kv: &KvStore,
    key: &str,
    ttl_secs: u64,
    fetch: F,
) -> ProviderResult<T>
where
    T: Serialize + DeserializeOwned,
    F: FnOnce() -> Fut,
    Fut: Future<Output = ProviderResult<T>>,
{
    if let Ok(Some(text)) = kv.get(key).text().await {
        if let Ok(cached) = serde_json::from_str::<T>(&text) {
            return Ok(cached);
        }
    }
    let fresh = fetch().await?;
    if let Ok(json) = serde_json::to_string(&fresh) {
        if let Ok(builder) = kv.put(key, json.as_str()) {
            let _ = builder.expiration_ttl(ttl_secs).execute().await;
        }
    }
    Ok(fresh)
}

/// Like `get_or_fetch`, but on a fetch failure falls back to the last
/// successfully-fetched value instead of propagating the error, as long as
/// one was stored within `stale_ttl_secs` (tracked separately from `key`
/// under its own, longer-lived entry so it survives past the normal TTL).
/// Only worth the extra KV entry for feeds where "slightly stale" is clearly
/// better than "briefly broken" — a price, not a balance or a transaction
/// list, where staleness would actively mislead.
pub async fn get_or_fetch_with_stale_fallback<T, F, Fut>(
    kv: &KvStore,
    key: &str,
    ttl_secs: u64,
    stale_ttl_secs: u64,
    fetch: F,
) -> ProviderResult<T>
where
    T: Serialize + DeserializeOwned,
    F: FnOnce() -> Fut,
    Fut: Future<Output = ProviderResult<T>>,
{
    get_or_fetch_with_stale_fallback_degradable(kv, key, ttl_secs, stale_ttl_secs, |_| false, fetch).await
}

/// Like `get_or_fetch_with_stale_fallback`, but `is_degraded` marks a
/// successful-but-lesser result (e.g. metadata from a fallback source that
/// lacks a price because the primary source briefly failed). Those are cached
/// only for `DEGRADED_TTL` and never overwrite the long-lived stale entry, so a
/// transient primary failure can't pin the degraded value for the full TTL.
pub async fn get_or_fetch_with_stale_fallback_degradable<T, F, Fut>(
    kv: &KvStore,
    key: &str,
    ttl_secs: u64,
    stale_ttl_secs: u64,
    is_degraded: impl Fn(&T) -> bool,
    fetch: F,
) -> ProviderResult<T>
where
    T: Serialize + DeserializeOwned,
    F: FnOnce() -> Fut,
    Fut: Future<Output = ProviderResult<T>>,
{
    if let Ok(Some(text)) = kv.get(key).text().await {
        if let Ok(cached) = serde_json::from_str::<T>(&text) {
            return Ok(cached);
        }
    }
    let stale_key = format!("{key}:stale");
    match fetch().await {
        Ok(fresh) => {
            let degraded = is_degraded(&fresh);
            if let Ok(json) = serde_json::to_string(&fresh) {
                let ttl = if degraded { DEGRADED_TTL } else { ttl_secs };
                if let Ok(builder) = kv.put(key, json.as_str()) {
                    let _ = builder.expiration_ttl(ttl).execute().await;
                }
                if !degraded {
                    if let Ok(builder) = kv.put(&stale_key, json.as_str()) {
                        let _ = builder.expiration_ttl(stale_ttl_secs).execute().await;
                    }
                }
            }
            Ok(fresh)
        }
        Err(err) => {
            if let Ok(Some(text)) = kv.get(&stale_key).text().await {
                if let Ok(cached) = serde_json::from_str::<T>(&text) {
                    return Ok(cached);
                }
            }
            Err(err)
        }
    }
}
