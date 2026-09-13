use async_trait::async_trait;
use serde_json::{json, Value};

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::traits::ActivityProvider;
use crate::types::{AddressActivity, Balance, Transaction, TransactionStatus};

pub struct AlchemyProvider {
    http: reqwest::Client,
    api_key: String,
}

impl AlchemyProvider {
    pub fn new(api_key: String) -> Self {
        Self {
            http: reqwest::Client::new(),
            api_key,
        }
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
        let resp: Value = self
            .http
            .post(self.rpc_url(chain))
            .json(&body)
            .send()
            .await?
            .json()
            .await?;
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
}

#[async_trait]
impl ActivityProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    async fn address_activity(&self, chain: ChainId, address: &str) -> ProviderResult<AddressActivity> {
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
            .rpc_call(
                chain,
                "alchemy_getTokenBalances",
                json!([address, "erc20"]),
            )
            .await?;
        let mut balances = vec![native_balance];
        if let Some(entries) = token_balances_resp.get("tokenBalances").and_then(Value::as_array) {
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
                .rpc_call(chain, "alchemy_getAssetTransfers", transfers_params(direction))
                .await?;
            if let Some(transfers) = resp.get("transfers").and_then(Value::as_array) {
                for t in transfers {
                    transactions.push(Transaction {
                        hash: t.get("hash").and_then(Value::as_str).unwrap_or_default().to_string(),
                        from: t.get("from").and_then(Value::as_str).unwrap_or_default().to_string(),
                        to: t.get("to").and_then(Value::as_str).map(str::to_string),
                        value: t
                            .get("value")
                            .map(|v| v.to_string())
                            .unwrap_or_else(|| "0".to_string()),
                        asset: t.get("asset").and_then(Value::as_str).unwrap_or("").to_string(),
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
