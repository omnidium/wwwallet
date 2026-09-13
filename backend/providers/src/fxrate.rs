use async_trait::async_trait;
use serde::Deserialize;
use std::time::{SystemTime, UNIX_EPOCH};

use crate::error::ProviderResult;
use crate::traits::FxRateProvider;
use crate::types::FxRates;

#[derive(Deserialize)]
struct FrankfurterResponse {
    base: String,
    rates: std::collections::HashMap<String, f64>,
}

/// Frankfurter (https://frankfurter.dev) is free, keyless, and backed by ECB reference rates.
pub struct FrankfurterProvider {
    http: reqwest::Client,
}

impl FrankfurterProvider {
    pub fn new() -> Self {
        Self {
            http: reqwest::Client::new(),
        }
    }
}

impl Default for FrankfurterProvider {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl FxRateProvider for FrankfurterProvider {
    fn name(&self) -> &'static str {
        "frankfurter"
    }

    async fn latest_rates(&self, base: &str) -> ProviderResult<FxRates> {
        let url = format!("https://api.frankfurter.app/latest?from={base}");
        let resp: FrankfurterResponse = self.http.get(url).send().await?.json().await?;
        let as_of_unix = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs() as i64)
            .unwrap_or_default();
        Ok(FxRates {
            base: resp.base,
            rates: resp.rates,
            as_of_unix,
        })
    }
}
