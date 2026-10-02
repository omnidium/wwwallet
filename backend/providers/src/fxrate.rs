use async_trait::async_trait;
use serde::Deserialize;

use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::{FxHistoryProvider, FxRateProvider};
use crate::types::{FxHistory, FxRates};

#[derive(Deserialize)]
struct FrankfurterResponse {
    base: String,
    rates: std::collections::HashMap<String, f64>,
}

/// Frankfurter (https://frankfurter.dev) is free, keyless, and backed by ECB reference rates.
/// The old `api.frankfurter.app` host now 301-redirects here — calling this
/// URL directly avoids depending on `fetch()` following that redirect
/// consistently (observed to be unreliable in local `wrangler dev`).
const FRANKFURTER_URL: &str = "https://api.frankfurter.dev/v1/latest";
const FRANKFURTER_BASE_URL: &str = "https://api.frankfurter.dev/v1";

/// How far back an FX favourite's sparkline reaches — about a month of
/// business days.
const FX_HISTORY_DAYS: i64 = 35;

/// A time series response: `rates` is keyed by ISO date ("2026-09-30"),
/// which sorts chronologically as a string, hence the BTreeMap.
#[derive(Deserialize)]
struct FrankfurterSeriesResponse {
    rates: std::collections::BTreeMap<String, std::collections::HashMap<String, f64>>,
}

/// "YYYY-MM-DD" for a count of days since the Unix epoch (Howard Hinnant's
/// civil_from_days) — the Worker runtime has no date formatting to lean on.
fn iso_date_from_unix_days(days: i64) -> String {
    let z = days + 719_468;
    let era = z.div_euclid(146_097);
    let doe = z - era * 146_097;
    let yoe = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let day = doy - (153 * mp + 2) / 5 + 1;
    let month = if mp < 10 { mp + 3 } else { mp - 9 };
    let year = yoe + era * 400 + i64::from(month <= 2);
    format!("{year:04}-{month:02}-{day:02}")
}

/// Midnight UTC of a "YYYY-MM-DD" date as Unix seconds (Hinnant's
/// days_from_civil, the inverse of the above).
pub(crate) fn unix_from_iso_date(date: &str) -> Option<i64> {
    let mut parts = date.splitn(3, '-').map(|p| p.parse::<i64>().ok());
    let (year, month, day) = (parts.next()??, parts.next()??, parts.next()??);
    if !(1..=12).contains(&month) || !(1..=31).contains(&day) {
        return None;
    }
    let y = if month <= 2 { year - 1 } else { year };
    let era = y.div_euclid(400);
    let yoe = y - era * 400;
    let mp = (month + 9) % 12;
    let doy = (153 * mp + 2) / 5 + day - 1;
    let doe = yoe * 365 + yoe / 4 - yoe / 100 + doy;
    Some((era * 146_097 + doe - 719_468) * 86_400)
}

#[derive(Default)]
pub struct FrankfurterProvider;

impl FrankfurterProvider {
    pub fn new() -> Self {
        Self
    }
}

#[async_trait(?Send)]
impl FxRateProvider for FrankfurterProvider {
    fn name(&self) -> &'static str {
        "frankfurter"
    }

    async fn latest_rates(&self, base: &str) -> ProviderResult<FxRates> {
        let url = format!("{FRANKFURTER_URL}?from={base}");
        let resp: FrankfurterResponse = http::get_json(&url).await?;
        Self::checked_rates(resp, (worker::Date::now().as_millis() / 1000) as i64)
    }

    /// A weekend or holiday date returns the last business day's rates.
    async fn rates_on(&self, base: &str, date: &str) -> ProviderResult<FxRates> {
        let url = format!("{FRANKFURTER_BASE_URL}/{date}?from={base}");
        let resp: FrankfurterResponse = http::get_json(&url).await?;
        let as_of_unix = unix_from_iso_date(date).unwrap_or(0);
        Self::checked_rates(resp, as_of_unix)
    }
}

impl FrankfurterProvider {
    fn checked_rates(resp: FrankfurterResponse, as_of_unix: i64) -> ProviderResult<FxRates> {
        // A 200 with no rates is a transient upstream hiccup, not a valid
        // result — letting it through would cache an empty map for the full
        // TTL, silently breaking currency conversion for everyone until it expires.
        if resp.rates.is_empty() {
            return Err(ProviderError::Upstream("frankfurter returned no exchange rates".to_string()));
        }
        Ok(FxRates { base: resp.base, rates: resp.rates, as_of_unix })
    }
}

#[async_trait(?Send)]
impl FxHistoryProvider for FrankfurterProvider {
    fn name(&self) -> &'static str {
        "frankfurter"
    }

    async fn fx_history(&self, base: &str, quote: &str) -> ProviderResult<FxHistory> {
        let today = (worker::Date::now().as_millis() / 1000 / 86_400) as i64;
        let start = iso_date_from_unix_days(today - FX_HISTORY_DAYS);
        let url = format!("{FRANKFURTER_BASE_URL}/{start}..?base={base}&symbols={quote}");
        let resp: FrankfurterSeriesResponse = http::get_json(&url).await?;
        let series: Vec<f64> = resp.rates.values().filter_map(|day| day.get(quote).copied()).collect();
        FxHistory::from_series(base, quote, &series).ok_or(ProviderError::Unavailable)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unix_from_iso_date_round_trips() {
        for days in [0, 19_000, 20_725, 11_016] {
            let date = iso_date_from_unix_days(days);
            assert_eq!(unix_from_iso_date(&date), Some(days * 86_400));
        }
        assert_eq!(unix_from_iso_date("2026-13-01"), None);
        assert_eq!(unix_from_iso_date("nope"), None);
    }

    #[test]
    fn iso_date_from_unix_days_matches_known_dates() {
        assert_eq!(iso_date_from_unix_days(0), "1970-01-01");
        assert_eq!(iso_date_from_unix_days(19_782), "2024-02-29");
        assert_eq!(iso_date_from_unix_days(20_728), "2026-10-02");
    }
}
