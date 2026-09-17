use async_trait::async_trait;
use serde::Deserialize;

use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::FxRateProvider;
use crate::types::FxRates;

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
        // A 200 with no rates is a transient upstream hiccup, not a valid
        // result — letting it through would cache an empty map for the full
        // TTL, silently breaking currency conversion for everyone until it expires.
        if resp.rates.is_empty() {
            return Err(ProviderError::Upstream(
                "frankfurter returned no exchange rates".to_string(),
            ));
        }
        let as_of_unix = (worker::Date::now().as_millis() / 1000) as i64;
        Ok(FxRates {
            base: resp.base,
            rates: resp.rates,
            as_of_unix,
        })
    }
}
