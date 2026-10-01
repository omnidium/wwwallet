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

impl TokenMetadata {
    /// Nothing resolved yet — the starting point when the primary source has
    /// nothing at all to say about a token, for later sources to fill in.
    pub fn unresolved(address: &str) -> Self {
        Self {
            address: address.to_string(),
            name: None,
            symbol: None,
            decimals: None,
            logo_url: None,
            usd_price: None,
        }
    }

    /// Whether any field other than the price is still unknown.
    pub fn lacks_descriptive_fields(&self) -> bool {
        self.name.is_none() || self.symbol.is_none() || self.decimals.is_none() || self.logo_url.is_none()
    }

    pub fn is_unresolved(&self) -> bool {
        self.name.is_none()
            && self.symbol.is_none()
            && self.decimals.is_none()
            && self.logo_url.is_none()
            && self.usd_price.is_none()
    }

    /// Fills only the fields this one is still missing — anything already
    /// resolved by an earlier (preferred) source is never overwritten.
    pub fn fill_missing_from(&mut self, other: TokenMetadata) {
        self.name = self.name.take().or(other.name);
        self.symbol = self.symbol.take().or(other.symbol);
        self.decimals = self.decimals.or(other.decimals);
        self.logo_url = self.logo_url.take().or(other.logo_url);
        self.usd_price = self.usd_price.or(other.usd_price);
    }
}

/// One entry from a chain's token list, used for symbol/name search (the
/// swap panel's token picker). See tokenlist.rs.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenListItem {
    pub address: String,
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub logo_url: Option<String>,
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
    /// Aggregator/integrator fees charged on top of network gas. Already
    /// reflected in `buy_amount` for display purposes — listed so the client
    /// can show them separately. Empty when the quote carries no such fees.
    #[serde(default)]
    pub fees: Vec<SwapFee>,
}

/// One non-gas fee charged by a swap quote, in the token it is taken in.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SwapFee {
    /// `"zero_ex"` or `"integrator"`.
    pub kind: String,
    /// Token contract address the fee is denominated in.
    pub token: String,
    /// Raw (undecimalized) amount, decimal string.
    pub amount: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FxRates {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
    pub as_of_unix: i64,
}

#[cfg(test)]
mod tests {
    use super::*;

    fn metadata(name: Option<&str>, logo: Option<&str>, usd_price: Option<f64>) -> TokenMetadata {
        TokenMetadata {
            address: "0xtoken".to_string(),
            name: name.map(str::to_string),
            symbol: None,
            decimals: None,
            logo_url: logo.map(str::to_string),
            usd_price,
        }
    }

    #[test]
    fn fill_missing_from_only_fills_gaps_and_never_overwrites() {
        let mut primary = metadata(Some("Primary"), None, Some(1.5));
        primary.fill_missing_from(metadata(Some("Fallback"), Some("https://logo"), Some(9.0)));

        assert_eq!(primary.name.as_deref(), Some("Primary"));
        assert_eq!(primary.logo_url.as_deref(), Some("https://logo"));
        assert_eq!(primary.usd_price, Some(1.5));
    }

    #[test]
    fn unresolved_reports_true_until_any_field_is_known() {
        let mut token = TokenMetadata::unresolved("0xtoken");
        assert!(token.is_unresolved());
        assert!(token.lacks_descriptive_fields());

        token.usd_price = Some(1.0);
        assert!(!token.is_unresolved());
        assert!(token.lacks_descriptive_fields(), "a price alone isn't a name/symbol/decimals/logo");
    }
}
