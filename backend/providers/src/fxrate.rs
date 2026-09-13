use async_trait::async_trait;
use serde::Deserialize;

use crate::error::ProviderResult;
use crate::http;
use crate::traits::FxRateProvider;
use crate::types::FxRates;

#[derive(Deserialize)]
struct FrankfurterResponse {
    base: String,
    rates: std::collections::HashMap<String, f64>,
}

/// Frankfurter (https://frankfurter.dev) is free, keyless, and backed by ECB reference rates.
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
        let url = format!("https://api.frankfurter.app/latest?from={base}");
        let resp: FrankfurterResponse = http::get_json(&url).await?;
        let as_of_unix = (worker::Date::now().as_millis() / 1000) as i64;
        Ok(FxRates {
            base: resp.base,
            rates: resp.rates,
            as_of_unix,
        })
    }
}
