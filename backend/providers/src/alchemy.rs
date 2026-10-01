use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::{
    ActivityProvider, AllowanceProvider, NativePriceProvider, TokenMetadataProvider,
    TokenPriceProvider, TransactionBroadcaster, TransactionPrepProvider, TransactionStatusProvider,
};
use crate::types::{
    AddressActivity, Balance, NativePrice, TokenMetadata, Transaction, TransactionPage,
    TransactionPrep, TransactionStatus,
};

/// How many raw transfers to ask Alchemy for per direction (sent/received) on
/// each page fetch. Kept modest (rather than the 1000-per-call ceiling used
/// pre-pagination) because a page's leftover, not-yet-returned transfers ride
/// along inside the opaque cursor sent back to the client — a huge per-fetch
/// size would make that cursor huge too.
const TRANSACTION_PAGE_SIZE: usize = 25;

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

    async fn rpc_call(&self, chain: ChainId, method: &str, params: Value) -> ProviderResult<Value> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params,
        });
        let resp: Value = http::post_json(&self.rpc_url(chain), &body).await?;
        if let Some(err) = resp.get("error") {
            return Err(ProviderError::Upstream(err.to_string()));
        }
        resp.get("result")
            .cloned()
            .ok_or_else(|| ProviderError::Upstream("missing result field".into()))
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
                cursor.buffer.extend(transfers.iter().map(Self::parse_transfer));
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
/// ranges Workers' outbound fetches come from. Alchemy accepts "MATIC" as an
/// alias for POL, so `native_symbol` works as-is for every chain.
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
}
