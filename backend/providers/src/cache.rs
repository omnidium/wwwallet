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
