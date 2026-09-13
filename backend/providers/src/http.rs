use serde::de::DeserializeOwned;
use serde::Serialize;
use worker::{Fetch, Headers, Method, Request, RequestInit};

use crate::error::{ProviderError, ProviderResult};

pub async fn get_json<T: DeserializeOwned>(url: &str) -> ProviderResult<T> {
    get_json_with_headers(url, &[]).await
}

pub async fn get_json_with_headers<T: DeserializeOwned>(
    url: &str,
    headers: &[(&str, &str)],
) -> ProviderResult<T> {
    let mut init = RequestInit::new();
    init.with_method(Method::Get);
    if !headers.is_empty() {
        let h = Headers::new();
        for (name, value) in headers {
            h.set(name, value)?;
        }
        init.with_headers(h);
    }
    let request = Request::new_with_init(url, &init)?;
    let mut response = Fetch::Request(request).send().await?;

    if response.status_code() >= 400 {
        let body = response.text().await.unwrap_or_default();
        return Err(ProviderError::Upstream(body));
    }
    response.json::<T>().await.map_err(ProviderError::Request)
}

pub async fn post_json<B: Serialize, T: DeserializeOwned>(
    url: &str,
    body: &B,
) -> ProviderResult<T> {
    let payload =
        serde_json::to_string(body).map_err(|e| ProviderError::InvalidInput(e.to_string()))?;

    let headers = Headers::new();
    headers.set("Content-Type", "application/json")?;

    let mut init = RequestInit::new();
    init.with_method(Method::Post)
        .with_headers(headers)
        .with_body(Some(wasm_bindgen::JsValue::from_str(&payload)));

    let request = Request::new_with_init(url, &init)?;
    let mut response = Fetch::Request(request).send().await?;

    if response.status_code() >= 400 {
        let body = response.text().await.unwrap_or_default();
        return Err(ProviderError::Upstream(body));
    }
    response.json::<T>().await.map_err(ProviderError::Request)
}
