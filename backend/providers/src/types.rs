use serde::{Deserialize, Serialize};

/// A native or token balance, kept as a decimal string to avoid float precision loss.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Balance {
    pub symbol: String,
    pub contract_address: Option<String>,
    pub balance: String,
    pub decimals: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub hash: String,
    pub from: String,
    pub to: Option<String>,
    pub value: String,
    pub asset: String,
    /// The ERC-20 contract this transfer moved, or None for a native transfer.
    pub contract_address: Option<String>,
    pub block_number: Option<u64>,
    pub timestamp: Option<String>,
    pub status: TransactionStatus,
    /// Set when this transaction is a same-hash swap (one leg sent, one leg
    /// received): the asset/value/contract of the *received* leg, alongside
    /// the fields above describing the *sent* leg.
    #[serde(default)]
    pub counter_asset: Option<String>,
    #[serde(default)]
    pub counter_value: Option<String>,
    #[serde(default)]
    pub counter_contract_address: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum TransactionStatus {
    Success,
    Failed,
    Pending,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddressActivity {
    pub balances: Vec<Balance>,
    pub transactions: Vec<Transaction>,
    /// Opaque continuation token for fetching older transactions past this
    /// batch — pass back verbatim to the transactions-page endpoint. `None`
    /// means this is the address's entire history. Callers must not inspect
    /// or construct this value; its shape is a private implementation detail
    /// of whichever ActivityProvider produced it.
    #[serde(default)]
    pub next_cursor: Option<serde_json::Value>,
}

/// One page of older transactions, fetched via `ActivityProvider::transaction_page`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionPage {
    pub transactions: Vec<Transaction>,
    #[serde(default)]
    pub next_cursor: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenMetadata {
    pub address: String,
    pub name: Option<String>,
    pub symbol: Option<String>,
    pub decimals: Option<u8>,
    pub logo_url: Option<String>,
    /// USD price per token, when the metadata source has market data for it
    /// (Ethplorer only returns this for tokens with a live market — see
    /// ethplorer.rs). `None` rather than 0 for "no price available", since a
    /// real zero-value token is a different thing from an unpriced one.
    pub usd_price: Option<f64>,
}

/// A chain's native currency price (ETH, MATIC, ...) in USD. See coingecko.rs.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NativePrice {
    pub usd: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContractAbi {
    pub address: String,
    pub abi_json: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionPrep {
    pub nonce: u64,
    /// Decimal-string wei values, to avoid float/u64 precision loss in JSON.
    pub gas_price: String,
    pub gas_limit: String,
    pub chain_id: u64,
}

/// A ready-to-sign swap transaction from a DEX aggregator, plus the ERC-20
/// spender address the client must have approved (for a non-native sell token)
/// before this transaction will succeed.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SwapQuote {
    pub to: String,
    pub data: String,
    /// Decimal wei string — non-zero only when selling the native currency.
    pub value: String,
    pub gas_price: String,
    pub estimated_gas: String,
    pub buy_amount: String,
    pub sell_amount: String,
    pub allowance_target: String,
    pub price: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FxRates {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
    pub as_of_unix: i64,
}
