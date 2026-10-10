use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

mod nft;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::fxrate::unix_from_iso_date;
use crate::http;
use crate::traits::{
    ActivityProvider, AllowanceProvider, CoinPriceHistoryProvider, NativePriceProvider,
    PriceHistoryProvider,
    TokenMetadataProvider, TokenPriceProvider, TransactionBroadcaster, TransactionFeeProvider,
    TransactionPrepProvider, TransactionStatusProvider,
};
use crate::types::{
    AddressActivity, AddressPresence, Balance, NativePrice, PriceHistory, TokenMetadata, Transaction,
    TransactionFee, TransactionPage, TransactionPrep, TransactionStatus,
};

/// How many raw transfers to ask Alchemy for per direction (sent/received) on
/// each page fetch. Kept modest (rather than the 1000-per-call ceiling used
/// pre-pagination) because a page's leftover, not-yet-returned transfers ride
/// along inside the opaque cursor sent back to the client — a huge per-fetch
/// size would make that cursor huge too.
const TRANSACTION_PAGE_SIZE: usize = 25;

/// ZKsync's bootloader, which every transaction there pays its gas fee to.
const ZKSYNC_BOOTLOADER: &str = "0x0000000000000000000000000000000000008001";

/// Upper bound on how many pages `fetch_all_token_balances` will fetch for a
/// single address, so a wallet that's been flooded with thousands of
/// spam-airdropped contracts over the years can't turn one `address_activity`
/// call into unbounded upstream requests. Comfortably above what we've
/// observed on real, heavily-airdropped addresses (100-200 distinct
/// contracts) — this would need many times that before it started silently
/// truncating again the way the unpaginated version always did.
const TOKEN_BALANCE_PAGE_CAP: usize = 10;

/// Per-direction (sent/received) pagination state threaded through Alchemy's
/// own `pageKey` continuation token.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
struct DirectionCursor {
    page_key: Option<String>,
    /// True once Alchemy stopped returning a `pageKey` for this direction —
    /// i.e. every transfer that direction will ever have is already either in
    /// `buffer` or already handed to the client.
    exhausted: bool,
}

/// Alchemy-specific continuation token round-tripped opaquely through
/// `AddressActivity::next_cursor` / `TransactionPage::next_cursor`. Not part
/// of the public API contract — the HTTP layer and other providers only ever
/// see this as a `serde_json::Value` blob.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
struct ActivityCursor {
    from: DirectionCursor,
    to: DirectionCursor,
    /// Raw transfers already fetched from Alchemy but not yet handed to the
    /// client (sorted newest-first, not yet swap-merged) — carried across
    /// page requests so a swap's two legs (one from each direction) have a
    /// chance to land in the buffer together before either is returned. A
    /// swap whose two legs end up split across a page boundary anyway (rare —
    /// needs the address's sent- and received-transfer histories to be
    /// heavily imbalanced in volume) simply renders as two separate,
    /// unmerged entries instead of one combined row.
    buffer: Vec<Transaction>,
    /// The block height resolved on the very first page fetch, reused as
    /// every later page's `toBlock` instead of a live "latest" — without
    /// this, new blocks mined while the user scrolls would shift every
    /// direction's pagination window, causing skipped or duplicated
    /// transactions at page seams.
    pinned_to_block: Option<String>,
}

impl ActivityCursor {
    /// `None` once every direction is exhausted and nothing is left buffered
    /// — i.e. the client has now seen this address's entire history.
    fn into_next_cursor(self) -> Option<Value> {
        if self.buffer.is_empty() && self.from.exhausted && self.to.exhausted {
            None
        } else {
            serde_json::to_value(&self).ok()
        }
    }
}

pub struct AlchemyProvider {
    api_key: String,
}

impl AlchemyProvider {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }

    fn rpc_url(&self, chain: ChainId) -> String {
        format!(
            "https://{}.g.alchemy.com/v2/{}",
            chain.alchemy_slug(),
            self.api_key
        )
    }

    fn prices_url(&self, path: &str) -> String {
        format!("https://api.g.alchemy.com/prices/v1/{}/{path}", self.api_key)
    }

    /// The Prices API returns one entry per requested token, each carrying a
    /// list of per-currency prices as decimal strings (or an `error` and an
    /// empty list when it has no market for that token).
    fn first_usd_price(resp: &Value) -> Option<f64> {
        resp.get("data")?
            .as_array()?
            .first()?
            .get("prices")?
            .as_array()?
            .iter()
            .find(|p| p.get("currency").and_then(Value::as_str) == Some("usd"))?
            .get("value")?
            .as_str()?
            .parse()
            .ok()
    }

    /// The historical sample nearest `target` (Unix seconds), from a
    /// historical Prices API response.
    fn nearest_sample(resp: &Value, target: i64) -> Option<f64> {
        resp.get("data")?
            .as_array()?
            .iter()
            .filter_map(|s| {
                let value: f64 = s.get("value")?.as_str()?.parse().ok()?;
                let at = unix_from_iso_timestamp(s.get("timestamp")?.as_str()?)?;
                Some((value, (at - target).abs()))
            })
            .min_by_key(|(_, distance)| *distance)
            .map(|(value, _)| value)
    }

    /// The historical Prices API's `data` is an oldest-first list of
    /// `{ value, timestamp }` samples, `value` a decimal string.
    fn historical_series(resp: &Value) -> Vec<f64> {
        resp.get("data")
            .and_then(Value::as_array)
            .map(|samples| {
                samples
                    .iter()
                    .filter_map(|s| s.get("value")?.as_str()?.parse().ok())
                    .collect()
            })
            .unwrap_or_default()
    }

    async fn rpc_call(&self, chain: ChainId, method: &str, params: Value) -> ProviderResult<Value> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params,
        });
        let resp: Value = http::post_json(&self.rpc_url(chain), &body).await.map_err(not_enabled)?;
        if let Some(err) = resp.get("error") {
            return Err(not_enabled(ProviderError::Upstream(err.to_string())));
        }
        resp.get("result")
            .cloned()
            .ok_or_else(|| ProviderError::Upstream("missing result field".into()))
    }

    /// Several JSON-RPC calls in one HTTP request, which spends one call of
    /// the upstream budget however many it carries. Results come back in the
    /// order the calls were given.
    async fn rpc_batch(&self, chain: ChainId, calls: &[(&str, Value)]) -> ProviderResult<Vec<Value>> {
        let body: Vec<Value> = calls
            .iter()
            .enumerate()
            .map(|(id, (method, params))| {
                json!({ "jsonrpc": "2.0", "id": id, "method": method, "params": params })
            })
            .collect();
        let resp: Value = http::post_json(&self.rpc_url(chain), &body).await.map_err(not_enabled)?;
        Self::batch_results(&resp, calls.len()).map_err(not_enabled)
    }

    /// Each reply in a batch response carries its call's id; they can arrive
    /// in any order. A batch refused outright is a single error object.
    fn batch_results(resp: &Value, count: usize) -> ProviderResult<Vec<Value>> {
        if let Some(err) = resp.get("error") {
            return Err(ProviderError::Upstream(err.to_string()));
        }
        let replies = resp
            .as_array()
            .ok_or_else(|| ProviderError::Upstream("batch response isn't a list".into()))?;
        let mut results = vec![None; count];
        for reply in replies {
            if let Some(err) = reply.get("error") {
                return Err(ProviderError::Upstream(err.to_string()));
            }
            let slot = reply
                .get("id")
                .and_then(Value::as_u64)
                .and_then(|id| results.get_mut(id as usize))
                .ok_or_else(|| ProviderError::Upstream("batch reply with an unknown id".into()))?;
            *slot = reply.get("result").cloned();
        }
        results
            .into_iter()
            .map(|r| r.ok_or_else(|| ProviderError::Upstream("batch reply missing".into())))
            .collect()
    }

    /// A swap emits two transfer legs (token sold, token bought) under one tx
    /// hash. Groups by hash and merges an exact one-sent/one-received pair of
    /// different assets into a single Transaction carrying both legs;
    /// anything else (a plain single-leg transfer, or a multi-hop swap with
    /// more than two legs) is left as separate entries rather than guessing
    /// which legs belong together.
    fn merge_swap_legs(transactions: Vec<Transaction>, address: &str) -> Vec<Transaction> {
        let address_lower = address.to_lowercase();
        let mut by_hash: std::collections::HashMap<String, Vec<Transaction>> =
            std::collections::HashMap::new();
        for t in transactions {
            by_hash.entry(t.hash.clone()).or_default().push(t);
        }
        let mut merged = Vec::new();
        for (_, legs) in by_hash {
            if let [a, b] = &legs[..] {
                let a_sent = a.from.to_lowercase() == address_lower;
                let b_sent = b.from.to_lowercase() == address_lower;
                let a_received = a.to.as_deref().map(str::to_lowercase).as_deref() == Some(&address_lower);
                let b_received = b.to.as_deref().map(str::to_lowercase).as_deref() == Some(&address_lower);
                if a_sent && b_received && !b_sent && a.asset != b.asset {
                    let mut outgoing = a.clone();
                    outgoing.counter_asset = Some(b.asset.clone());
                    outgoing.counter_value = Some(b.value.clone());
                    outgoing.counter_contract_address = b.contract_address.clone();
                    merged.push(outgoing);
                    continue;
                }
                if b_sent && a_received && !a_sent && a.asset != b.asset {
                    let mut outgoing = b.clone();
                    outgoing.counter_asset = Some(a.asset.clone());
                    outgoing.counter_value = Some(a.value.clone());
                    outgoing.counter_contract_address = a.contract_address.clone();
                    merged.push(outgoing);
                    continue;
                }
            }
            merged.extend(legs);
        }
        merged.sort_by_key(|t| std::cmp::Reverse(t.block_number));
        merged
    }

    fn hex_to_decimal_string(hex: &str) -> String {
        let trimmed = hex.trim_start_matches("0x");
        u128::from_str_radix(trimmed, 16)
            .map(|v| v.to_string())
            .unwrap_or_else(|_| "0".to_string())
    }

    fn decimal_to_hex_quantity(decimal: &str) -> ProviderResult<String> {
        let value: u128 = decimal
            .parse()
            .map_err(|_| ProviderError::InvalidInput("invalid decimal wei value".into()))?;
        Ok(format!("0x{value:x}"))
    }

    fn pad_address_for_abi(address: &str) -> ProviderResult<String> {
        let trimmed = address.trim_start_matches("0x").to_lowercase();
        if trimmed.len() != 40 || !trimmed.chars().all(|c| c.is_ascii_hexdigit()) {
            return Err(ProviderError::InvalidInput(format!(
                "invalid address: {address}"
            )));
        }
        Ok(format!("{trimmed:0>64}"))
    }

    fn parse_transfer(t: &Value) -> Transaction {
        Transaction {
            hash: t.get("hash").and_then(Value::as_str).unwrap_or_default().to_string(),
            from: t.get("from").and_then(Value::as_str).unwrap_or_default().to_string(),
            to: t.get("to").and_then(Value::as_str).map(str::to_string),
            value: t.get("value").map(|v| v.to_string()).unwrap_or_else(|| "0".to_string()),
            asset: t.get("asset").and_then(Value::as_str).unwrap_or("").to_string(),
            contract_address: t
                .get("rawContract")
                .and_then(|c| c.get("address"))
                .and_then(Value::as_str)
                .map(str::to_string),
            block_number: t
                .get("blockNum")
                .and_then(Value::as_str)
                .and_then(|h| u64::from_str_radix(h.trim_start_matches("0x"), 16).ok()),
            timestamp: t
                .get("metadata")
                .and_then(|m| m.get("blockTimestamp"))
                .and_then(Value::as_str)
                .map(str::to_string),
            status: TransactionStatus::Success,
            counter_asset: None,
            counter_value: None,
            counter_contract_address: None,
        }
    }

    /// A chain whose native coin is also an ERC-20 (see
    /// `ChainId::native_token_contract`) can report one movement twice: as
    /// the native transfer and as the token contract's Transfer event — every
    /// ETH transfer on ZKsync does. The token copy is dropped; one with no
    /// native twin (CELO moved through its ERC-20 interface, ETH a ZKsync
    /// contract sent) is shown as the native coin it is. ZKsync's payments
    /// to its bootloader are dropped too: they're the gas fee, not a transfer.
    fn fold_native_token_legs(chain: ChainId, transfers: Vec<Transaction>) -> Vec<Transaction> {
        let Some(contract) = chain.native_token_contract() else { return transfers };
        let leg = |t: &Transaction| (t.hash.clone(), t.from.to_lowercase(), t.to.as_deref().map(str::to_lowercase));
        let native_legs: std::collections::HashSet<_> =
            transfers.iter().filter(|t| t.contract_address.is_none()).map(leg).collect();
        transfers
            .into_iter()
            .filter_map(|mut t| {
                if !t.contract_address.as_deref().is_some_and(|c| c.eq_ignore_ascii_case(contract)) {
                    return Some(t);
                }
                let to_bootloader = t.to.as_deref().is_some_and(|to| to.eq_ignore_ascii_case(ZKSYNC_BOOTLOADER));
                if to_bootloader || native_legs.contains(&leg(&t)) {
                    return None;
                }
                t.contract_address = None;
                t.asset = chain.native_symbol().to_string();
                Some(t)
            })
            .collect()
    }

    /// `alchemy_getTokenBalances` in "erc20" mode returns every ERC-20
    /// contract this address has ever held a balance of (including long-dead
    /// dust), sorted by contract address — not by balance or relevance. Past
    /// `TOKEN_BALANCE_PAGE_CAP` distinct contracts, Alchemy paginates that
    /// list via its own `pageKey` (unrelated to this file's transaction-page
    /// cursor). Reading only the first page silently dropped every token
    /// whose contract address sorted past the cutoff — real, valuable
    /// tokens included, not just spam (e.g. USDC's `0xa0b8...` address
    /// sorting after a page full of lower addresses).
    async fn fetch_all_token_balances(&self, chain: ChainId, address: &str) -> ProviderResult<Vec<Value>> {
        let mut all = Vec::new();
        let mut page_key: Option<String> = None;
        for _ in 0..TOKEN_BALANCE_PAGE_CAP {
            let params = match &page_key {
                Some(key) => json!([address, "erc20", { "pageKey": key }]),
                None => json!([address, "erc20"]),
            };
            let resp = self.rpc_call(chain, "alchemy_getTokenBalances", params).await?;
            if let Some(entries) = resp.get("tokenBalances").and_then(Value::as_array) {
                all.extend(entries.iter().cloned());
            }
            page_key = resp.get("pageKey").and_then(Value::as_str).map(str::to_string);
            if page_key.is_none() {
                break;
            }
        }
        Ok(all)
    }

    /// Tops up whichever direction(s) aren't yet exhausted with one more page
    /// of raw transfers each, then extracts the newest `TRANSACTION_PAGE_SIZE`
    /// (post swap-merge) as the page to hand back, leaving the remainder
    /// buffered in the returned cursor for the next call.
    ///
    /// A single one-shot fetch per direction is always enough to make
    /// progress: fetching `TRANSACTION_PAGE_SIZE` raw transfers from even one
    /// still-active direction already meets that size on its own (before
    /// accounting for anything merged away or already buffered), so there's
    /// no need for a top-up loop.
    async fn fetch_transaction_page(
        &self,
        chain: ChainId,
        address: &str,
        mut cursor: ActivityCursor,
    ) -> ProviderResult<(Vec<Transaction>, ActivityCursor)> {
        if cursor.pinned_to_block.is_none() {
            let latest = self.rpc_call(chain, "eth_blockNumber", json!([])).await?;
            cursor.pinned_to_block = latest.as_str().map(str::to_string);
        }
        let to_block = cursor.pinned_to_block.clone().unwrap_or_else(|| "latest".to_string());

        for (direction, state) in [("fromAddress", &mut cursor.from), ("toAddress", &mut cursor.to)] {
            if state.exhausted {
                continue;
            }
            let mut params = json!({
                "fromBlock": "0x0",
                "toBlock": to_block,
                direction: address,
                "category": ["external", "erc20"],
                "withMetadata": true,
                "order": "desc",
                "maxCount": format!("0x{TRANSACTION_PAGE_SIZE:x}"),
            });
            if let Some(page_key) = &state.page_key {
                params["pageKey"] = json!(page_key);
            }
            let resp = self
                .rpc_call(chain, "alchemy_getAssetTransfers", json!([params]))
                .await?;
            if let Some(transfers) = resp.get("transfers").and_then(Value::as_array) {
                let parsed = transfers.iter().map(Self::parse_transfer).collect();
                cursor.buffer.extend(Self::fold_native_token_legs(chain, parsed));
            }
            state.page_key = resp.get("pageKey").and_then(Value::as_str).map(str::to_string);
            state.exhausted = state.page_key.is_none();
        }

        let (page, leftover) = Self::extract_page(std::mem::take(&mut cursor.buffer), address);
        cursor.buffer = leftover;

        Ok((page, cursor))
    }

    /// Swap-merges `buffer`, then splits it into the newest
    /// `TRANSACTION_PAGE_SIZE` (the page to return) and everything else (to
    /// keep buffered for the next page). A merged swap's two raw legs share
    /// one hash, so filtering leftover by "hash not in the page" correctly
    /// drops both legs together even though they only count once toward
    /// `TRANSACTION_PAGE_SIZE`.
    fn extract_page(buffer: Vec<Transaction>, address: &str) -> (Vec<Transaction>, Vec<Transaction>) {
        let merged = Self::merge_swap_legs(buffer, address);
        let page: Vec<Transaction> = merged.iter().take(TRANSACTION_PAGE_SIZE).cloned().collect();
        let page_hashes: std::collections::HashSet<&str> =
            page.iter().map(|t| t.hash.as_str()).collect();
        let leftover = merged
            .into_iter()
            .filter(|t| !page_hashes.contains(t.hash.as_str()))
            .collect();
        (page, leftover)
    }
}

#[async_trait(?Send)]
impl ActivityProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn address_activity(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressActivity> {
        let native_balance_hex = self
            .rpc_call(chain, "eth_getBalance", json!([address, "latest"]))
            .await?;
        let native_balance = Balance {
            symbol: chain.native_symbol().to_string(),
            contract_address: None,
            balance: Self::hex_to_decimal_string(native_balance_hex.as_str().unwrap_or("0x0")),
            decimals: 18,
        };

        let token_balance_entries = self.fetch_all_token_balances(chain, address).await?;
        let mut balances = vec![native_balance];
        // Defends against a page boundary in fetch_all_token_balances handing
        // back the same contract twice (e.g. an inclusive pageKey cursor) —
        // otherwise a single held token would be summed into the account's
        // total twice over.
        let mut seen_contracts = std::collections::HashSet::new();
        for entry in &token_balance_entries {
            let Some(contract) = entry.get("contractAddress").and_then(Value::as_str) else {
                continue;
            };
            if !seen_contracts.insert(contract.to_lowercase()) {
                continue;
            }
            // Already counted, as the native balance above.
            if chain.native_token_contract() == Some(contract.to_lowercase().as_str()) {
                continue;
            }
            let raw = entry
                .get("tokenBalance")
                .and_then(Value::as_str)
                .unwrap_or("0x0");
            if raw == "0x0" {
                continue;
            }
            balances.push(Balance {
                symbol: "ERC20".to_string(),
                contract_address: Some(contract.to_string()),
                balance: Self::hex_to_decimal_string(raw),
                decimals: 18,
            });
        }

        let (transactions, cursor) = self
            .fetch_transaction_page(chain, address, ActivityCursor::default())
            .await?;

        Ok(AddressActivity {
            balances,
            transactions,
            next_cursor: cursor.into_next_cursor(),
        })
    }

    async fn address_presence(
        &self,
        chain: ChainId,
        address: &str,
    ) -> ProviderResult<AddressPresence> {
        let results = self
            .rpc_batch(
                chain,
                &[
                    ("eth_getBalance", json!([address, "latest"])),
                    ("eth_getTransactionCount", json!([address, "latest"])),
                ],
            )
            .await?;
        let nonce_hex = results[1].as_str().unwrap_or("0x0");
        let transaction_count = u64::from_str_radix(nonce_hex.trim_start_matches("0x"), 16)
            .map_err(|_| ProviderError::Upstream(format!("unreadable nonce '{nonce_hex}'")))?;
        Ok(AddressPresence {
            native_balance: Self::hex_to_decimal_string(results[0].as_str().unwrap_or("0x0")),
            transaction_count,
        })
    }

    async fn transaction_page(
        &self,
        chain: ChainId,
        address: &str,
        cursor: Value,
    ) -> ProviderResult<TransactionPage> {
        let cursor: ActivityCursor = serde_json::from_value(cursor)
            .map_err(|_| ProviderError::InvalidInput("invalid pagination cursor".into()))?;
        let (transactions, cursor) = self.fetch_transaction_page(chain, address, cursor).await?;
        Ok(TransactionPage {
            transactions,
            next_cursor: cursor.into_next_cursor(),
        })
    }
}

/// Covers every chain this backend supports (unlike Ethplorer), straight from
/// the token contract itself plus Alchemy's own logo index — so a logo is the
/// field most often left empty here.
#[async_trait(?Send)]
impl TokenMetadataProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn token_metadata(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<TokenMetadata> {
        let resp = self
            .rpc_call(chain, "alchemy_getTokenMetadata", json!([contract_address]))
            .await?;
        let non_empty = |field: &str| {
            resp.get(field)
                .and_then(Value::as_str)
                .filter(|s| !s.trim().is_empty())
                .map(str::to_string)
        };
        Ok(TokenMetadata {
            address: contract_address.to_string(),
            name: non_empty("name"),
            symbol: non_empty("symbol"),
            decimals: resp
                .get("decimals")
                .and_then(Value::as_u64)
                .and_then(|d| u8::try_from(d).ok()),
            logo_url: non_empty("logo"),
            usd_price: None,
        })
    }
}

#[async_trait(?Send)]
impl TokenPriceProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn usd_price(&self, chain: ChainId, contract_address: &str) -> ProviderResult<f64> {
        let body = json!({
            "addresses": [{ "network": chain.alchemy_slug(), "address": contract_address }],
        });
        let resp: Value = http::post_json(&self.prices_url("tokens/by-address"), &body).await?;
        Self::first_usd_price(&resp).ok_or(ProviderError::Unavailable)
    }
}

/// Fallback for CoinGecko's keyless endpoint, which rate-limits the shared IP
/// ranges Workers' outbound fetches come from. Looked up by ticker, so this
/// relies on `native_symbol` matching Alchemy's symbol for every chain.
#[async_trait(?Send)]
impl NativePriceProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn native_price(&self, chain: ChainId) -> ProviderResult<NativePrice> {
        let url = format!(
            "{}?symbols={}",
            self.prices_url("tokens/by-symbol"),
            chain.native_symbol()
        );
        let resp: Value = http::get_json(&url).await?;
        Self::first_usd_price(&resp)
            .map(|usd| NativePrice { usd })
            .ok_or(ProviderError::Unavailable)
    }
}

#[async_trait(?Send)]
impl PriceHistoryProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn price_history_24h(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
    ) -> ProviderResult<PriceHistory> {
        let end = worker::Date::now().as_millis() / 1000;
        let start = end - 24 * 60 * 60;
        let mut body = json!({ "startTime": start, "endTime": end, "interval": "5m" });
        match contract_address {
            Some(address) => {
                body["network"] = json!(chain.alchemy_slug());
                body["address"] = json!(address);
            }
            None => body["symbol"] = json!(chain.native_symbol()),
        }
        let resp: Value = http::post_json(&self.prices_url("tokens/historical"), &body).await?;
        PriceHistory::from_series(&Self::historical_series(&resp)).ok_or(ProviderError::Unavailable)
    }

    /// Hourly samples first (the closer reading); daily ones for whatever
    /// the hourly series doesn't reach back to.
    async fn usd_price_at(
        &self,
        chain: ChainId,
        contract_address: Option<&str>,
        unix_secs: i64,
    ) -> ProviderResult<f64> {
        let now = (worker::Date::now().as_millis() / 1000) as i64;
        for (interval, half_window) in [("1h", 2 * 3600), ("1d", 2 * 86_400)] {
            let mut body = json!({
                "startTime": unix_secs - half_window,
                "endTime": (unix_secs + half_window).min(now),
                "interval": interval,
            });
            match contract_address {
                Some(address) => {
                    body["network"] = json!(chain.alchemy_slug());
                    body["address"] = json!(address);
                }
                None => body["symbol"] = json!(chain.native_symbol()),
            }
            let Ok(resp) = http::post_json::<_, Value>(&self.prices_url("tokens/historical"), &body).await else {
                continue;
            };
            if let Some(price) = Self::nearest_sample(&resp, unix_secs) {
                return Ok(price);
            }
        }
        Err(ProviderError::Unavailable)
    }
}

/// Alchemy turns away a network that isn't switched on for this app's key
/// (a 403: "LINEA_MAINNET is not enabled for this app"), and one it serves
/// only plain RPC on when an enhanced API is asked of it ("EAPIs not
/// enabled on specified network"). Either way the chain can't be served.
fn not_enabled(err: ProviderError) -> ProviderError {
    match &err {
        ProviderError::Upstream(body)
            if body.contains("not enabled for this app") || body.contains("EAPIs not enabled") =>
        {
            ProviderError::ChainNotEnabled
        }
        _ => err,
    }
}

/// Unix seconds of an ISO-8601 UTC timestamp like "2026-09-28T06:00:00Z" —
/// the only shape the Prices API returns.
fn unix_from_iso_timestamp(ts: &str) -> Option<i64> {
    let (date, time) = ts.trim_end_matches('Z').split_once('T')?;
    let mut hms = time.split(':').map(|p| p.split('.').next()?.parse::<i64>().ok());
    let (h, m, s) = (hms.next()??, hms.next()??, hms.next().flatten().unwrap_or(0));
    Some(unix_from_iso_date(date)? + h * 3600 + m * 60 + s)
}

/// Fallback for CoinGecko's coin history (same keyless rate limits as its
/// native-price endpoint). By ticker, so a ticker several coins share gets
/// whichever one Alchemy picks — acceptable for a fallback.
#[async_trait(?Send)]
impl CoinPriceHistoryProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn coin_price_history_24h(&self, _id: &str, symbol: &str) -> ProviderResult<PriceHistory> {
        let end = worker::Date::now().as_millis() / 1000;
        let start = end - 24 * 60 * 60;
        let body = json!({ "symbol": symbol, "startTime": start, "endTime": end, "interval": "5m" });
        let resp: Value = http::post_json(&self.prices_url("tokens/historical"), &body).await?;
        PriceHistory::from_series(&Self::historical_series(&resp)).ok_or(ProviderError::Unavailable)
    }
}

#[async_trait(?Send)]
impl TransactionBroadcaster for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn broadcast(&self, chain: ChainId, raw_transaction_hex: &str) -> ProviderResult<String> {
        let result = self
            .rpc_call(
                chain,
                "eth_sendRawTransaction",
                json!([raw_transaction_hex]),
            )
            .await?;
        result
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| ProviderError::Upstream("unexpected broadcast response shape".into()))
    }
}

#[async_trait(?Send)]
impl TransactionStatusProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn transaction_status(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionStatus> {
        let receipt = self
            .rpc_call(chain, "eth_getTransactionReceipt", json!([transaction_hash]))
            .await?;
        // No receipt yet means not yet mined, not an error — eth_getTransactionReceipt
        // returns a JSON-RPC `null` result (not a missing field) while pending.
        if receipt.is_null() {
            return Ok(TransactionStatus::Pending);
        }
        let status_hex = receipt.get("status").and_then(Value::as_str).unwrap_or("0x1");
        Ok(if status_hex == "0x0" {
            TransactionStatus::Failed
        } else {
            TransactionStatus::Success
        })
    }
}

/// Total network fee from an `eth_getTransactionReceipt` result, in wei —
/// None if a field it needs is missing or isn't a hex quantity, or if the
/// fee wasn't paid in the native coin at all.
fn receipt_fee_wei(receipt: &Value) -> Option<u128> {
    // Celo's fee-currency transactions (CIP-64, and CIP-66/CIP-42 before
    // and after it) pay gas in a token such as USDC, at a gas price in that
    // token's units — read as CELO wei it would be a wrong fee, so none.
    if matches!(receipt.get("type").and_then(Value::as_str), Some("0x7a" | "0x7b" | "0x7c")) {
        return None;
    }
    let quantity = |field: &str| -> Option<u128> {
        let hex = receipt.get(field)?.as_str()?.strip_prefix("0x")?;
        u128::from_str_radix(hex, 16).ok()
    };
    let execution = quantity("gasUsed")?.checked_mul(quantity("effectiveGasPrice")?)?;
    // The L1 data fee, which OP-stack chains (Base, Optimism, World Chain,
    // Ink, Unichain, Celo) and Scroll charge on top; elsewhere absent, and
    // Arbitrum and its Orbit chains (Robinhood) count it in gas used.
    let l1 = if receipt.get("l1Fee").is_some() { quantity("l1Fee")? } else { 0 };
    execution.checked_add(l1)
}

#[async_trait(?Send)]
impl TransactionFeeProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn transaction_fee(
        &self,
        chain: ChainId,
        transaction_hash: &str,
    ) -> ProviderResult<TransactionFee> {
        let receipt = self
            .rpc_call(chain, "eth_getTransactionReceipt", json!([transaction_hash]))
            .await?;
        let fee_wei = receipt_fee_wei(&receipt).ok_or(ProviderError::Unavailable)?;
        let payer = receipt
            .get("from")
            .and_then(Value::as_str)
            .ok_or(ProviderError::Unavailable)?
            .to_string();
        Ok(TransactionFee { fee_wei: fee_wei.to_string(), payer })
    }
}

#[async_trait(?Send)]
impl TransactionPrepProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn prepare(
        &self,
        chain: ChainId,
        from: &str,
        to: &str,
        value_wei: &str,
        data: Option<&str>,
    ) -> ProviderResult<TransactionPrep> {
        let value_hex = Self::decimal_to_hex_quantity(value_wei)?;
        let mut estimate_params = json!({ "from": from, "to": to, "value": value_hex });
        if let Some(d) = data {
            estimate_params["data"] = json!(d);
        }

        let nonce_hex = self
            .rpc_call(chain, "eth_getTransactionCount", json!([from, "pending"]))
            .await?;
        let gas_price_hex = self.rpc_call(chain, "eth_gasPrice", json!([])).await?;
        // Unlike the two calls above (genuine infra failures if they error),
        // an estimateGas error means the transaction as constructed would
        // revert on-chain — a property of these specific inputs, not the
        // network — so it's reclassified into its own error the API layer
        // maps to a clear "this would fail" response instead of a generic 502.
        let gas_limit_hex = self
            .rpc_call(chain, "eth_estimateGas", json!([estimate_params]))
            .await
            .map_err(|e| match e {
                ProviderError::Upstream(reason) => ProviderError::TransactionWouldRevert(reason),
                other => other,
            })?;

        let nonce = u64::from_str_radix(
            nonce_hex.as_str().unwrap_or("0x0").trim_start_matches("0x"),
            16,
        )
        .unwrap_or(0);

        Ok(TransactionPrep {
            nonce,
            gas_price: Self::hex_to_decimal_string(gas_price_hex.as_str().unwrap_or("0x0")),
            gas_limit: Self::hex_to_decimal_string(gas_limit_hex.as_str().unwrap_or("0x0")),
            chain_id: chain.eip155_id(),
        })
    }
}

#[async_trait(?Send)]
impl AllowanceProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn allowance(
        &self,
        chain: ChainId,
        token: &str,
        owner: &str,
        spender: &str,
    ) -> ProviderResult<String> {
        // ERC-20 allowance(address,address) selector 0xdd62ed3e.
        let call_data = format!(
            "0xdd62ed3e{}{}",
            Self::pad_address_for_abi(owner)?,
            Self::pad_address_for_abi(spender)?,
        );
        let result = self
            .rpc_call(
                chain,
                "eth_call",
                json!([{ "to": token, "data": call_data }, "latest"]),
            )
            .await?;
        let hex = result.as_str().unwrap_or("0x0");
        let value = u128::from_str_radix(hex.trim_start_matches("0x"), 16).unwrap_or(u128::MAX);
        Ok(value.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hex_to_decimal_string_converts_wei_values() {
        assert_eq!(AlchemyProvider::hex_to_decimal_string("0x0"), "0");
        assert_eq!(
            AlchemyProvider::hex_to_decimal_string("0xde0b6b3a7640000"),
            "1000000000000000000"
        );
    }

    #[test]
    fn hex_to_decimal_string_falls_back_to_zero_on_garbage_input() {
        assert_eq!(AlchemyProvider::hex_to_decimal_string("not hex"), "0");
    }

    #[test]
    fn pad_address_for_abi_produces_a_64_char_hex_word() {
        let padded =
            AlchemyProvider::pad_address_for_abi("0x0BfAfCEF10B1F2911F36149e66378A2d9Fdf27eC")
                .unwrap();
        assert_eq!(padded.len(), 64);
        assert!(padded.ends_with("0bfafcef10b1f2911f36149e66378a2d9fdf27ec"));
    }

    #[test]
    fn pad_address_for_abi_rejects_malformed_addresses() {
        assert!(AlchemyProvider::pad_address_for_abi("0x123").is_err());
    }

    #[test]
    fn receipt_fee_adds_the_op_stack_l1_fee_when_present() {
        let mainnet = json!({ "gasUsed": "0x5208", "effectiveGasPrice": "0x3b9aca00" });
        assert_eq!(receipt_fee_wei(&mainnet), Some(21_000 * 1_000_000_000));

        let base = json!({ "gasUsed": "0x5208", "effectiveGasPrice": "0x10", "l1Fee": "0x64" });
        assert_eq!(receipt_fee_wei(&base), Some(21_000 * 16 + 100));

        assert_eq!(receipt_fee_wei(&Value::Null), None, "pending: no receipt yet");
        assert_eq!(receipt_fee_wei(&json!({ "gasUsed": "0x1", "effectiveGasPrice": "zz" })), None);
    }

    #[test]
    fn nearest_sample_picks_the_closest_timestamp() {
        let resp = json!({ "data": [
            { "value": "100.0", "timestamp": "2026-09-28T06:00:00Z" },
            { "value": "200.0", "timestamp": "2026-09-28T07:00:00Z" },
            { "value": "300.0", "timestamp": "2026-09-28T08:00:00Z" },
        ] });
        let at_0710 = unix_from_iso_timestamp("2026-09-28T07:10:00Z").unwrap();
        assert_eq!(AlchemyProvider::nearest_sample(&resp, at_0710), Some(200.0));
        assert_eq!(AlchemyProvider::nearest_sample(&json!({ "data": [] }), at_0710), None);
    }

    #[test]
    fn iso_timestamp_parses_to_unix_seconds() {
        assert_eq!(unix_from_iso_timestamp("1970-01-02T01:00:05Z"), Some(86_400 + 3600 + 5));
        assert_eq!(unix_from_iso_timestamp("2026-09-28T06:00:00.000Z"), unix_from_iso_timestamp("2026-09-28T06:00:00Z"));
        assert_eq!(unix_from_iso_timestamp("garbage"), None);
    }

    #[test]
    fn historical_series_reads_sample_values_in_order() {
        let resp = json!({ "symbol": "ETH", "currency": "usd", "data": [
            { "value": "1900.5", "timestamp": "2024-01-01T00:00:00Z" },
            { "value": "bogus", "timestamp": "2024-01-01T00:05:00Z" },
            { "value": "1901", "timestamp": "2024-01-01T00:10:00Z" },
        ]});
        assert_eq!(AlchemyProvider::historical_series(&resp), vec![1900.5, 1901.0]);
        assert!(AlchemyProvider::historical_series(&json!({ "error": "x" })).is_empty());
    }

    #[test]
    fn first_usd_price_reads_the_usd_entry_of_a_prices_api_response() {
        let priced = json!({ "data": [{
            "network": "base-mainnet",
            "prices": [
                { "currency": "eur", "value": "0.92" },
                { "currency": "usd", "value": "1.0005" },
            ],
        }]});
        assert_eq!(AlchemyProvider::first_usd_price(&priced), Some(1.0005));

        let unpriced = json!({ "data": [{
            "prices": [],
            "error": { "message": "Price not found" },
        }]});
        assert_eq!(AlchemyProvider::first_usd_price(&unpriced), None);
    }

    fn sample_leg(hash: &str, from: &str, to: &str, asset: &str) -> Transaction {
        Transaction {
            hash: hash.to_string(),
            from: from.to_string(),
            to: Some(to.to_string()),
            value: "1".to_string(),
            asset: asset.to_string(),
            contract_address: None,
            block_number: Some(1),
            timestamp: None,
            status: TransactionStatus::Success,
            counter_asset: None,
            counter_value: None,
            counter_contract_address: None,
        }
    }

    #[test]
    fn merge_swap_legs_combines_a_matching_sent_and_received_pair() {
        const ME: &str = "0xMe";
        const ROUTER: &str = "0xRouter";
        let legs = vec![
            sample_leg("0xhash1", ME, ROUTER, "USDC"),
            sample_leg("0xhash1", ROUTER, ME, "ETH"),
        ];

        let merged = AlchemyProvider::merge_swap_legs(legs, ME);

        assert_eq!(merged.len(), 1);
        assert_eq!(merged[0].asset, "USDC");
        assert_eq!(merged[0].counter_asset.as_deref(), Some("ETH"));
    }

    #[test]
    fn merge_swap_legs_leaves_a_single_leg_transfer_unchanged() {
        const ME: &str = "0xMe";
        let legs = vec![sample_leg("0xhash1", ME, "0xSomeoneElse", "ETH")];

        let merged = AlchemyProvider::merge_swap_legs(legs, ME);

        assert_eq!(merged.len(), 1);
        assert!(merged[0].counter_asset.is_none());
    }

    #[test]
    fn merge_swap_legs_leaves_same_asset_pairs_and_multi_leg_hashes_unmerged() {
        const ME: &str = "0xMe";
        // Same asset both legs (e.g. an internal transfer quirk, not a swap).
        let same_asset = vec![
            sample_leg("0xhash1", ME, "0xA", "ETH"),
            sample_leg("0xhash1", "0xA", ME, "ETH"),
        ];
        assert!(AlchemyProvider::merge_swap_legs(same_asset, ME)
            .iter()
            .all(|t| t.counter_asset.is_none()));

        // Three legs under one hash — not a simple one-out/one-in pair.
        let three_legs = vec![
            sample_leg("0xhash2", ME, "0xA", "USDC"),
            sample_leg("0xhash2", "0xA", ME, "ETH"),
            sample_leg("0xhash2", "0xA", ME, "DAI"),
        ];
        let merged = AlchemyProvider::merge_swap_legs(three_legs, ME);
        assert_eq!(merged.len(), 3);
        assert!(merged.iter().all(|t| t.counter_asset.is_none()));
    }

    fn sample_leg_at_block(hash: &str, from: &str, to: &str, asset: &str, block: u64) -> Transaction {
        Transaction {
            block_number: Some(block),
            ..sample_leg(hash, from, to, asset)
        }
    }

    #[test]
    fn extract_page_returns_the_newest_page_size_items_and_buffers_the_rest() {
        const ME: &str = "0xMe";
        let buffer: Vec<Transaction> = (0..TRANSACTION_PAGE_SIZE as u64 + 10)
            .map(|i| sample_leg_at_block(&format!("0xhash{i}"), "0xA", ME, "ETH", i))
            .collect();

        let (page, leftover) = AlchemyProvider::extract_page(buffer, ME);

        assert_eq!(page.len(), TRANSACTION_PAGE_SIZE);
        assert_eq!(leftover.len(), 10);
        // Newest (highest block number) first, and none of the returned
        // page's hashes should reappear in the leftover.
        assert!(page.windows(2).all(|w| w[0].block_number >= w[1].block_number));
        let page_hashes: std::collections::HashSet<&str> =
            page.iter().map(|t| t.hash.as_str()).collect();
        assert!(leftover.iter().all(|t| !page_hashes.contains(t.hash.as_str())));
    }

    #[test]
    fn extract_page_keeps_a_merged_swaps_two_legs_together() {
        const ME: &str = "0xMe";
        const ROUTER: &str = "0xRouter";
        let swap_block = TRANSACTION_PAGE_SIZE as u64 + 100;
        let mut buffer = vec![
            sample_leg_at_block("0xswap", ME, ROUTER, "USDC", swap_block),
            sample_leg_at_block("0xswap", ROUTER, ME, "ETH", swap_block),
        ];
        // Pad past the page size with older, unrelated transfers so the swap
        // pair's shared hash is the only thing standing between "both legs
        // returned" and "both legs dropped as leftover".
        buffer.extend((0..TRANSACTION_PAGE_SIZE as u64).map(|i| {
            sample_leg_at_block(&format!("0xpad{i}"), "0xA", ME, "ETH", i)
        }));

        let (page, leftover) = AlchemyProvider::extract_page(buffer, ME);

        assert_eq!(page.first().unwrap().hash, "0xswap");
        assert_eq!(page.first().unwrap().counter_asset.as_deref(), Some("ETH"));
        assert!(leftover.iter().all(|t| t.hash != "0xswap"));
    }

    #[test]
    fn cursor_reports_done_only_once_both_directions_are_exhausted_and_drained() {
        let mut cursor = ActivityCursor::default();
        assert!(cursor.clone().into_next_cursor().is_some(), "fresh cursor still has work to do");

        cursor.from.exhausted = true;
        cursor.to.exhausted = true;
        assert!(
            cursor.clone().into_next_cursor().is_none(),
            "both directions exhausted and buffer empty means there's nothing left"
        );

        cursor.buffer.push(sample_leg("0xleftover", "0xA", "0xMe", "ETH"));
        assert!(
            cursor.into_next_cursor().is_some(),
            "still-buffered leftover means there's more to hand out even once both directions are exhausted"
        );
    }

    #[test]
    fn a_network_not_switched_on_is_reported_as_such() {
        let not_enabled_app = ProviderError::Upstream(
            r#"{"error":{"code":-32600,"message":"LINEA_MAINNET is not enabled for this app."}}"#.into(),
        );
        assert!(matches!(not_enabled(not_enabled_app), ProviderError::ChainNotEnabled));
        let no_enhanced_apis =
            ProviderError::Upstream(r#"{"code":-32600,"message":"EAPIs not enabled on specified network: [MANTLE_MAINNET]."}"#.into());
        assert!(matches!(not_enabled(no_enhanced_apis), ProviderError::ChainNotEnabled));
        let other = ProviderError::Upstream("execution reverted".into());
        assert!(matches!(not_enabled(other), ProviderError::Upstream(_)));
    }

    #[test]
    fn a_native_coin_reported_twice_is_listed_once_as_native() {
        let leg = |hash: &str, from: &str, to: &str, contract: Option<&str>| Transaction {
            hash: hash.into(),
            from: from.into(),
            to: Some(to.into()),
            value: "0.1".into(),
            asset: "ETH".into(),
            contract_address: contract.map(str::to_string),
            block_number: Some(1),
            timestamp: None,
            status: TransactionStatus::Success,
            counter_asset: None,
            counter_value: None,
            counter_contract_address: None,
        };
        const ZK_ETH: &str = "0x000000000000000000000000000000000000800A";
        let folded = AlchemyProvider::fold_native_token_legs(
            ChainId::ZkSync,
            vec![
                leg("0xa", "0xSender", "0xMe", None),
                leg("0xa", "0xsender", "0xme", Some(ZK_ETH)), // its twin
                leg("0xb", "0xContract", "0xMe", Some(ZK_ETH)), // sent by a contract: no twin
                leg("0xc", "0xMe", ZKSYNC_BOOTLOADER, Some(ZK_ETH)), // the gas fee
                leg("0xd", "0xMe", "0xOther", Some("0xusdc")),
            ],
        );
        let summary: Vec<_> = folded.iter().map(|t| (t.hash.as_str(), t.contract_address.as_deref())).collect();
        assert_eq!(summary, [("0xa", None), ("0xb", None), ("0xd", Some("0xusdc"))]);

        let celo = AlchemyProvider::fold_native_token_legs(
            ChainId::Celo,
            vec![leg("0xe", "0xMe", "0xOther", Some("0x471EcE3750Da237f93B8E339c536989b8978a438"))],
        );
        assert_eq!((celo[0].contract_address.as_deref(), celo[0].asset.as_str()), (None, "CELO"));

        let base = vec![leg("0xf", "0xMe", "0xOther", Some(ZK_ETH))];
        assert_eq!(AlchemyProvider::fold_native_token_legs(ChainId::Base, base)[0].contract_address.as_deref(), Some(ZK_ETH));
    }

    #[test]
    fn a_fee_paid_in_another_currency_is_not_read_as_native() {
        // A real Celo CIP-64 receipt's fields: gas priced in the fee currency.
        let cip64 = json!({ "type": "0x7b", "gasUsed": "0x2eed7", "effectiveGasPrice": "0x459ef9d53", "l1Fee": "0x0" });
        assert_eq!(receipt_fee_wei(&cip64), None);
        let plain = json!({ "type": "0x2", "gasUsed": "0x5208", "effectiveGasPrice": "0x1", "l1Fee": "0x0" });
        assert_eq!(receipt_fee_wei(&plain), Some(21_000));
    }

    #[test]
    fn batch_replies_are_put_back_in_call_order() {
        let resp = json!([
            { "jsonrpc": "2.0", "id": 1, "result": "0x5" },
            { "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" },
        ]);
        assert_eq!(
            AlchemyProvider::batch_results(&resp, 2).unwrap(),
            vec![json!("0xde0b6b3a7640000"), json!("0x5")]
        );
    }

    #[test]
    fn a_batch_with_a_failed_or_missing_reply_fails_whole() {
        let one_failed = json!([
            { "jsonrpc": "2.0", "id": 0, "result": "0x0" },
            { "jsonrpc": "2.0", "id": 1, "error": { "code": -32000, "message": "boom" } },
        ]);
        assert!(AlchemyProvider::batch_results(&one_failed, 2).is_err());
        let one_missing = json!([{ "jsonrpc": "2.0", "id": 0, "result": "0x0" }]);
        assert!(AlchemyProvider::batch_results(&one_missing, 2).is_err());
        let refused = json!({ "jsonrpc": "2.0", "id": null, "error": { "code": -32600, "message": "no" } });
        assert!(AlchemyProvider::batch_results(&refused, 2).is_err());
    }
}
