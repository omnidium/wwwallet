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
                    });
                }
            }
        }
        transactions.sort_by_key(|t| std::cmp::Reverse(t.block_number));
        transactions.dedup_by(|a, b| a.hash == b.hash);

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
}
