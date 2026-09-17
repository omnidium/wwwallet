use async_trait::async_trait;
use serde_json::{json, Value};

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::{
    ActivityProvider, AllowanceProvider, TransactionBroadcaster, TransactionPrepProvider,
    TransactionStatusProvider,
};
use crate::types::{AddressActivity, Balance, Transaction, TransactionPrep, TransactionStatus};

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

        let token_balances_resp = self
            .rpc_call(chain, "alchemy_getTokenBalances", json!([address, "erc20"]))
            .await?;
        let mut balances = vec![native_balance];
        if let Some(entries) = token_balances_resp
            .get("tokenBalances")
            .and_then(Value::as_array)
        {
            for entry in entries {
                let Some(contract) = entry.get("contractAddress").and_then(Value::as_str) else {
                    continue;
                };
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
        }

        let transfers_params = |direction: &str| {
            json!([{
                "fromBlock": "0x0",
                "toBlock": "latest",
                direction: address,
                "category": ["external", "erc20"],
                "withMetadata": true,
                "maxCount": "0x19",
            }])
        };

        let mut transactions = Vec::new();
        for direction in ["fromAddress", "toAddress"] {
            let resp = self
                .rpc_call(
                    chain,
                    "alchemy_getAssetTransfers",
                    transfers_params(direction),
                )
                .await?;
            if let Some(transfers) = resp.get("transfers").and_then(Value::as_array) {
                for t in transfers {
                    transactions.push(Transaction {
                        hash: t
                            .get("hash")
                            .and_then(Value::as_str)
                            .unwrap_or_default()
                            .to_string(),
                        from: t
                            .get("from")
                            .and_then(Value::as_str)
                            .unwrap_or_default()
                            .to_string(),
                        to: t.get("to").and_then(Value::as_str).map(str::to_string),
                        value: t
                            .get("value")
                            .map(|v| v.to_string())
                            .unwrap_or_else(|| "0".to_string()),
                        asset: t
                            .get("asset")
                            .and_then(Value::as_str)
                            .unwrap_or("")
                            .to_string(),
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
                    });
                }
            }
        }
        let transactions = Self::merge_swap_legs(transactions, address);

        Ok(AddressActivity {
            balances,
            transactions,
        })
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
        let gas_limit_hex = self
            .rpc_call(chain, "eth_estimateGas", json!([estimate_params]))
            .await?;

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
}
