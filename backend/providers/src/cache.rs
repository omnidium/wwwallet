use std::time::Duration;

use moka::future::Cache;

/// Builds a short-TTL, size-bounded cache. Defaults are sized conservatively
/// around free-tier provider quotas: short enough to stay fresh, long enough
/// to absorb bursts of repeat requests (e.g. a user re-opening the same screen).
pub fn build<K, V>(ttl: Duration, max_capacity: u64) -> Cache<K, V>
where
    K: std::hash::Hash + Eq + Send + Sync + 'static,
    V: Clone + Send + Sync + 'static,
{
    Cache::builder()
        .time_to_live(ttl)
        .max_capacity(max_capacity)
        .build()
}

pub const ADDRESS_ACTIVITY_TTL: Duration = Duration::from_secs(20);
pub const TOKEN_METADATA_TTL: Duration = Duration::from_secs(60 * 60);
pub const CONTRACT_ABI_TTL: Duration = Duration::from_secs(60 * 60 * 24);
pub const FX_RATES_TTL: Duration = Duration::from_secs(60 * 30);
