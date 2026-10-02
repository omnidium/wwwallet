//! A short-lived cache for public market data only — prices, price
//! histories, token metadata, coin search, FX — which is identical for every
//! user, so one upstream call can serve them all. Never anything tied to an
//! address or a user (balances, history, nonces, allowances): those stay
//! uncached, straight from upstream, as before.
//!
//! The free price APIs behind these routes have tight quotas (Alchemy:
//! 300 price lookups an hour; CoinGecko's keyless tier rate-limits shared
//! Worker IPs), and every browser refreshing its own prices would exhaust
//! them as soon as there's more than a handful of users.
//!
//! Two layers, both free:
//!  1. An in-memory map per Worker isolate. Works everywhere, including
//!     `*.workers.dev`; an isolate serves many requests in a row, so popular
//!     keys (ETH's price) are mostly hits.
//!  2. Cloudflare's Cache API, shared by every isolate in a data centre.
//!     It's a no-op on `*.workers.dev` and only takes effect once this
//!     Worker is served from a custom domain — reads and writes simply
//!     miss until then, at no cost.
//!
//! Workers KV isn't used: its free plan allows 1,000 writes a day, which a
//! one-minute price cache alone would exhaust.
//!
//! Entries are kept past their freshness window as a fallback: when the
//! upstream call fails (a 429, an outage), the last good value is served
//! instead of an error, until it's older than the stale window.

use std::cell::RefCell;
use std::collections::HashMap;
use std::future::Future;

use serde::de::DeserializeOwned;
use serde::Serialize;
use worker::{Cache, Headers, Response};

use crate::error::ProviderResult;

/// How long an entry is served without asking upstream, and how much longer
/// after that it's still served if upstream fails.
#[derive(Debug, Clone, Copy)]
pub struct Ttl {
    pub fresh_secs: u64,
    pub stale_secs: u64,
}

impl Ttl {
    fn fresh_ms(self) -> u64 {
        self.fresh_secs * 1000
    }

    fn usable_ms(self) -> u64 {
        (self.fresh_secs + self.stale_secs) * 1000
    }
}

#[derive(Debug, Clone, PartialEq)]
struct Entry {
    stored_at_ms: u64,
    json: String,
}

/// Bounded so an isolate's memory can't grow without limit on long-tail keys
/// (token metadata for every token anyone holds, free-text coin searches).
const MAX_MEMORY_ENTRIES: usize = 2_000;
/// Longest stale window of any caller — entries older than this are of no
/// use to anyone and are the first evicted.
const MAX_USABLE_MS: u64 = 3 * 24 * 60 * 60 * 1000;

#[derive(Default)]
struct MemoryStore {
    entries: HashMap<String, Entry>,
}

impl MemoryStore {
    fn get(&self, key: &str) -> Option<Entry> {
        self.entries.get(key).cloned()
    }

    fn put(&mut self, key: String, entry: Entry) {
        if self.entries.len() >= MAX_MEMORY_ENTRIES && !self.entries.contains_key(&key) {
            let now = entry.stored_at_ms;
            self.entries.retain(|_, e| now.saturating_sub(e.stored_at_ms) < MAX_USABLE_MS);
            if self.entries.len() >= MAX_MEMORY_ENTRIES {
                // Still full of live entries: drop the oldest tenth.
                let mut ages: Vec<u64> = self.entries.values().map(|e| e.stored_at_ms).collect();
                ages.sort_unstable();
                let cutoff = ages[MAX_MEMORY_ENTRIES / 10];
                self.entries.retain(|_, e| e.stored_at_ms > cutoff);
            }
        }
        self.entries.insert(key, entry);
    }
}

thread_local! {
    // Workers run each isolate single-threaded, so a thread-local is the
    // isolate's own memory.
    static MEMORY: RefCell<MemoryStore> = RefCell::new(MemoryStore::default());
}

/// Bumped whenever a cached type's JSON shape changes, so old entries are
/// simply never read again.
const CACHE_VERSION: &str = "v1";
const STORED_AT_HEADER: &str = "x-wwwallet-stored-at";

/// The Cache API keys entries by URL. This host is never fetched — it only
/// namespaces the keys — and is percent-safe for any key below.
fn cache_url(key: &str) -> String {
    let encoded: String = url::form_urlencoded::byte_serialize(key.as_bytes()).collect();
    format!("https://public-cache.wwwallet.internal/{CACHE_VERSION}/{encoded}")
}

async fn read(key: &str) -> Option<Entry> {
    if let Some(entry) = MEMORY.with(|m| m.borrow().get(key)) {
        return Some(entry);
    }
    // Any Cache API failure is just a miss.
    let mut response = Cache::default().get(cache_url(key), false).await.ok()??;
    let stored_at_ms = response.headers().get(STORED_AT_HEADER).ok()??.parse().ok()?;
    let json = response.text().await.ok()?;
    let entry = Entry { stored_at_ms, json };
    MEMORY.with(|m| m.borrow_mut().put(key.to_string(), entry.clone()));
    Some(entry)
}

async fn write(key: &str, entry: Entry, ttl: Ttl) {
    MEMORY.with(|m| m.borrow_mut().put(key.to_string(), entry.clone()));
    let headers = Headers::new();
    let ok = headers.set("content-type", "application/json").is_ok()
        && headers.set("cache-control", &format!("public, max-age={}", ttl.fresh_secs + ttl.stale_secs)).is_ok()
        && headers.set(STORED_AT_HEADER, &entry.stored_at_ms.to_string()).is_ok();
    if !ok {
        return;
    }
    if let Ok(response) = Response::ok(entry.json) {
        // Best effort: a failed (or, on workers.dev, no-op) put costs nothing.
        let _ = Cache::default().put(cache_url(key), response.with_headers(headers)).await;
    }
}

#[derive(Debug, PartialEq)]
enum Freshness {
    Fresh,
    /// Past fresh but inside the stale window: refetch, fall back to it on failure.
    Stale,
    Expired,
}

fn freshness(entry: &Entry, now_ms: u64, ttl: Ttl) -> Freshness {
    let age = now_ms.saturating_sub(entry.stored_at_ms);
    if age < ttl.fresh_ms() {
        Freshness::Fresh
    } else if age < ttl.usable_ms() {
        Freshness::Stale
    } else {
        Freshness::Expired
    }
}

/// The cached value under `key` while fresh; otherwise `fetch`'s result,
/// cached on success. If `fetch` fails, a still-usable stale value is served
/// in its place. Errors are never cached.
pub async fn get_or_fetch<T, F, Fut>(key: &str, ttl: Ttl, fetch: F) -> ProviderResult<T>
where
    T: Serialize + DeserializeOwned,
    F: FnOnce() -> Fut,
    Fut: Future<Output = ProviderResult<T>>,
{
    let now_ms = worker::Date::now().as_millis();
    let cached = read(key).await;
    let usable = cached.filter(|entry| freshness(entry, now_ms, ttl) != Freshness::Expired);
    if let Some(entry) = &usable {
        if freshness(entry, now_ms, ttl) == Freshness::Fresh {
            if let Ok(value) = serde_json::from_str(&entry.json) {
                return Ok(value);
            }
        }
    }
    match fetch().await {
        Ok(value) => {
            if let Ok(json) = serde_json::to_string(&value) {
                write(key, Entry { stored_at_ms: now_ms, json }, ttl).await;
            }
            Ok(value)
        }
        Err(err) => usable
            .and_then(|entry| serde_json::from_str(&entry.json).ok())
            .ok_or(err),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TTL: Ttl = Ttl { fresh_secs: 60, stale_secs: 3600 };

    fn entry(stored_at_ms: u64) -> Entry {
        Entry { stored_at_ms, json: "1".to_string() }
    }

    #[test]
    fn freshness_moves_from_fresh_to_stale_to_expired() {
        assert_eq!(freshness(&entry(1_000), 1_000 + 59_999, TTL), Freshness::Fresh);
        assert_eq!(freshness(&entry(1_000), 1_000 + 60_000, TTL), Freshness::Stale);
        assert_eq!(freshness(&entry(1_000), 1_000 + 3_659_999, TTL), Freshness::Stale);
        assert_eq!(freshness(&entry(1_000), 1_000 + 3_660_000, TTL), Freshness::Expired);
    }

    #[test]
    fn memory_store_stays_bounded_dropping_dead_then_oldest_entries() {
        let mut store = MemoryStore::default();
        for i in 0..MAX_MEMORY_ENTRIES as u64 {
            store.put(format!("k{i}"), entry(i));
        }
        // Full of live entries: the oldest tenth go to make room.
        store.put("new".to_string(), entry(MAX_MEMORY_ENTRIES as u64));
        assert!(store.entries.len() < MAX_MEMORY_ENTRIES);
        assert!(store.get("k0").is_none());
        assert!(store.get("new").is_some());
        assert!(store.get(&format!("k{}", MAX_MEMORY_ENTRIES - 1)).is_some());

        // Long after: everything is dead and is cleared out first.
        let mut fresh = MemoryStore::default();
        for i in 0..MAX_MEMORY_ENTRIES as u64 {
            fresh.put(format!("k{i}"), entry(i));
        }
        fresh.put("later".to_string(), entry(MAX_USABLE_MS * 2));
        assert_eq!(fresh.entries.len(), 1);
    }

    #[test]
    fn cache_urls_are_namespaced_and_encoded() {
        assert_eq!(
            cache_url("coin-search:sol ana/x"),
            "https://public-cache.wwwallet.internal/v1/coin-search%3Asol+ana%2Fx"
        );
    }
}
