use async_trait::async_trait;
use serde_json::Value;

use crate::chain::ChainId;
use crate::error::{ProviderError, ProviderResult};
use crate::http;
use crate::traits::AbiProvider;
use crate::types::ContractAbi;

/// Uses Etherscan's unified multichain v2 API (one key, `chainid` param),
/// which covers most chains here but not Ink, ZKsync Era, Ronin or Scroll —
/// a lookup there just fails, like one for an unverified contract. (Etherscan
/// runs ZKsync's and Scroll's explorers, but its v2 chain list leaves them
/// out: https://api.etherscan.io/v2/chainlist.)
pub struct EtherscanProvider {
    api_key: String,
}

impl EtherscanProvider {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }
}

#[async_trait(?Send)]
impl AbiProvider for EtherscanProvider {
    fn name(&self) -> &'static str {
        "etherscan"
    }

    async fn contract_abi(
        &self,
        chain: ChainId,
        contract_address: &str,
    ) -> ProviderResult<ContractAbi> {
        let url = format!(
            "https://api.etherscan.io/v2/api?chainid={}&module=contract&action=getabi&address={}&apikey={}",
            chain.eip155_id(),
            contract_address,
            self.api_key
        );
        let resp: Value = http::get_json(&url).await?;
        let status = resp.get("status").and_then(Value::as_str).unwrap_or("0");
        let result = resp.get("result").and_then(Value::as_str).unwrap_or("");
        if status != "1" {
            return Err(ProviderError::Upstream(result.to_string()));
        }
        Ok(ContractAbi {
            address: contract_address.to_string(),
            abi_json: result.to_string(),
        })
    }
}
