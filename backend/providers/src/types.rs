use serde::{Deserialize, Serialize};

use crate::chain::ChainId;

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

/// Just enough to tell whether an address has ever been used on a chain —
/// see `ActivityProvider::address_presence`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddressPresence {
    /// The native coin's balance in its smallest unit, as a decimal string.
    pub native_balance: String,
    /// How many transactions this address has sent (its nonce).
    pub transaction_count: u64,
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

/// A chain's native currency price (ETH, POL, ...) in USD. See coingecko.rs.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NativePrice {
    pub usd: f64,
}

/// How many points `PriceHistory::points` is downsampled to (give or take
/// the final one) — plenty for a sparkline, without shipping all ~288
/// five-minute samples a day's history arrives as.
const SPARKLINE_POINTS: usize = 48;

/// An asset's USD price over the past 24 hours: the latest price, its change
/// across the window, and a downsampled series for a sparkline. See
/// PriceHistoryProvider.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriceHistory {
    pub usd: f64,
    /// Percent change from the window's first sample to its last.
    pub change_24h_pct: f64,
    /// Oldest first, evenly spaced; the last one is always `usd`.
    pub points: Vec<f64>,
}

impl PriceHistory {
    /// Builds one from a provider's raw, oldest-first price series. None when
    /// there's too little usable data to say anything about a change.
    pub fn from_series(series: &[f64]) -> Option<Self> {
        let series: Vec<f64> = series.iter().copied().filter(|p| p.is_finite() && *p > 0.0).collect();
        if series.len() < 2 {
            return None;
        }
        let first = series[0];
        let last = series[series.len() - 1];
        let step = series.len().div_ceil(SPARKLINE_POINTS);
        let mut points: Vec<f64> = series.iter().copied().step_by(step).collect();
        if !(series.len() - 1).is_multiple_of(step) {
            points.push(last);
        }
        Some(Self {
            usd: last,
            change_24h_pct: (last - first) / first * 100.0,
            points,
        })
    }
}

/// What a mined transaction cost in network fees, from its receipt.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionFee {
    /// Decimal wei string: gas used × effective gas price, plus the L1 data
    /// fee that OP-stack chains (Base, Optimism, World Chain, Ink, Unichain,
    /// Celo) and Scroll report separately. Arbitrum and its Orbit chains
    /// (Robinhood) already count their L1 share in gas used.
    pub fee_wei: String,
    /// The account that paid it — the transaction's sender, which for a
    /// received token transfer is someone else entirely.
    pub payer: String,
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
    /// Who quoted it, by name: "0x", or "LI.FI" on a chain 0x doesn't
    /// cover. Shown as the swap's route.
    pub provider: String,
    /// Aggregator/integrator fees charged on top of network gas, listed so
    /// the client can show them separately. 0x's are already taken out of
    /// `buy_amount`; LI.FI's are too, or else paid on top, in `value`.
    /// Empty when the quote carries no such fees.
    #[serde(default)]
    pub fees: Vec<SwapFee>,
}

/// One non-gas fee charged by a swap quote, in the token it is taken in.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SwapFee {
    /// Whose fee: `"zero_ex"` (0x's own) or `"integrator"` (an integrator's)
    /// on a 0x quote; `"lifi"` (LI.FI's own) or `"protocol"` (the DEX's or
    /// relayer's) on a LI.FI one.
    pub kind: String,
    /// Token contract address the fee is denominated in.
    pub token: String,
    /// Raw (undecimalized) amount, decimal string.
    pub amount: String,
}

/// A ready-to-sign cross-chain transfer (a plain bridge, or a bridge with a
/// swap on either side) from a bridge aggregator. Unlike `SwapQuote`, the
/// tokens on each side are echoed back as the aggregator resolved them —
/// a destination token may be requested by symbol, so the client can't know
/// its address or decimals until the quote says.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BridgeQuote {
    pub to: String,
    pub data: String,
    /// Decimal wei strings, converted from the aggregator's own hex.
    pub value: String,
    pub gas_price: String,
    pub gas_limit: String,
    pub from_amount: String,
    /// Expected amount delivered on the destination chain, raw units.
    pub to_amount: String,
    /// Least that can arrive after slippage — the transfer reverts below it.
    pub to_amount_min: String,
    /// ERC-20 spender to approve first; None when sending the native coin.
    pub approval_address: Option<String>,
    pub from_token: BridgeToken,
    pub to_token: BridgeToken,
    pub fees: Vec<BridgeFee>,
    /// Source-chain network fee, as the aggregator priced it.
    pub gas_cost_usd: Option<f64>,
    /// Typical time from source confirmation to arrival.
    pub execution_duration_secs: u64,
    /// The bridge (or DEX) the route runs through, for display.
    pub tool: String,
    pub tool_logo_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BridgeToken {
    pub address: String,
    pub symbol: String,
    pub decimals: u8,
    pub logo_url: Option<String>,
    pub usd_price: Option<f64>,
}

/// One non-gas fee charged by a bridge route.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BridgeFee {
    pub name: String,
    pub symbol: String,
    /// Raw (undecimalized) amount, decimal string.
    pub amount: String,
    pub decimals: u8,
    pub amount_usd: Option<f64>,
    /// True when already taken out of `to_amount`; false when charged on top
    /// (added to the transaction's `value`).
    pub included: bool,
}

/// Where a cross-chain transfer is, once its source transaction is sent.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BridgeStatus {
    /// `"pending"`, `"done"` or `"failed"`. A transfer the aggregator hasn't
    /// indexed yet is reported as pending.
    pub status: String,
    /// e.g. `"COMPLETED"`, `"PARTIAL"` (arrived as a different token), `"REFUNDED"`.
    pub substatus: Option<String>,
    pub receiving_tx_hash: Option<String>,
    pub sending_tx_hash: Option<String>,
    /// The accounts at either end — the one that sent it on the source
    /// chain and the one it was for on the destination chain — rather than
    /// the bridge contracts and relayers each leg's own transaction shows
    /// as its counterparty. None until the aggregator has indexed it.
    pub from_address: Option<String>,
    pub to_address: Option<String>,
    /// None when that end is a chain this wallet doesn't support (or isn't
    /// known yet).
    pub from_chain: Option<ChainId>,
    pub to_chain: Option<ChainId>,
}

impl BridgeStatus {
    /// What the aggregator reports for a transaction it hasn't indexed —
    /// one just broadcast, or one that was never a bridge in the first place.
    pub fn not_indexed() -> Self {
        Self {
            status: "pending".into(),
            substatus: None,
            receiving_tx_hash: None,
            sending_tx_hash: None,
            from_address: None,
            to_address: None,
            from_chain: None,
            to_chain: None,
        }
    }
}

/// An asset's USD price at a past moment — see `usd_price_at`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoricalPrice {
    pub usd: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FxRates {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
    pub as_of_unix: i64,
}

/// One hit from a free-text coin search (any coin the price source lists,
/// not only the EVM chains this wallet holds) — see CoinSearchProvider.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoinSearchResult {
    /// The price source's own coin id (e.g. CoinGecko's "solana") — what the
    /// coin price-history route takes.
    pub id: String,
    /// Upper-case ticker, e.g. "SOL".
    pub symbol: String,
    pub name: String,
    pub logo_url: Option<String>,
    /// Lower is bigger; None when the source doesn't rank it.
    pub market_cap_rank: Option<u32>,
}

/// A currency pair's recent daily reference rates. Daily, not 24h like
/// PriceHistory: the ECB publishes one rate per business day.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FxHistory {
    pub base: String,
    pub quote: String,
    /// Units of `quote` per one `base`, as of the latest business day.
    pub rate: f64,
    /// Percent change from the previous business day's rate.
    pub change_1d_pct: f64,
    /// One per business day over roughly the past month, oldest first; the
    /// last one is always `rate`.
    pub points: Vec<f64>,
}

impl FxHistory {
    /// From an oldest-first daily rate series; None with fewer than two days.
    pub fn from_series(base: &str, quote: &str, series: &[f64]) -> Option<Self> {
        let series: Vec<f64> = series.iter().copied().filter(|r| r.is_finite() && *r > 0.0).collect();
        if series.len() < 2 {
            return None;
        }
        let last = series[series.len() - 1];
        let previous = series[series.len() - 2];
        Some(Self {
            base: base.to_string(),
            quote: quote.to_string(),
            rate: last,
            change_1d_pct: (last - previous) / previous * 100.0,
            points: series,
        })
    }
}

/// Where an NFT's picture can be loaded from. Only ever an image host the
/// provider itself runs (see `NftProvider`), never the NFT's own metadata
/// URL — that can point anywhere, including somewhere that logs who looked.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct NftImage {
    /// Small, for grids.
    pub thumbnail: Option<String>,
    /// Full size, for a single NFT's own view.
    pub full: Option<String>,
}

/// One NFT contract an address holds tokens of.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NftCollection {
    pub contract_address: String,
    pub name: Option<String>,
    pub symbol: Option<String>,
    /// "ERC721" or "ERC1155"; anything else can't be sent through the
    /// standard interfaces.
    pub token_type: String,
    /// How many distinct tokens of it the address holds.
    pub owned_count: u64,
    /// The provider's spam verdict; None where it doesn't classify a chain.
    pub is_spam: Option<bool>,
    /// The collection has a marketplace's verified badge. Display only: most
    /// legitimate collections never ask for one.
    pub verified: bool,
    /// Lowest listed price on the marketplace the provider reads, in the
    /// chain's native coin.
    pub floor_price: Option<f64>,
    pub image: NftImage,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NftCollectionPage {
    pub collections: Vec<NftCollection>,
    /// Pass back as `page_key` for the next page; None on the last one.
    pub next_page_key: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NftAttribute {
    pub trait_type: Option<String>,
    pub value: String,
}

/// One NFT an address holds.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Nft {
    pub contract_address: String,
    /// Decimal. Token ids are 256-bit, so this is never parsed into a
    /// machine integer.
    pub token_id: String,
    pub token_type: String,
    pub name: Option<String>,
    pub description: Option<String>,
    /// How many of it the address holds: always 1 for ERC-721.
    pub balance: String,
    pub image: NftImage,
    pub attributes: Vec<NftAttribute>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NftPage {
    pub nfts: Vec<Nft>,
    pub next_page_key: Option<String>,
}

/// One movement of a single NFT into or out of an address.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NftTransfer {
    pub hash: String,
    pub from: String,
    pub to: String,
    pub block_number: Option<u64>,
    pub timestamp: Option<String>,
    /// How many copies moved, decimal: always 1 for ERC-721.
    pub amount: String,
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
    fn price_history_downsamples_and_keeps_the_latest_price() {
        let series: Vec<f64> = (1..=288).map(f64::from).collect();
        let history = PriceHistory::from_series(&series).unwrap();
        assert_eq!(history.usd, 288.0);
        assert_eq!(history.points.first(), Some(&1.0));
        assert_eq!(history.points.last(), Some(&288.0));
        assert!(history.points.len() <= SPARKLINE_POINTS + 1);
        assert!((history.change_24h_pct - 28_700.0).abs() < 1e-9);
    }

    #[test]
    fn price_history_needs_two_usable_samples() {
        assert!(PriceHistory::from_series(&[]).is_none());
        assert!(PriceHistory::from_series(&[2.0, f64::NAN, 0.0]).is_none());
        let falling = PriceHistory::from_series(&[2.0, f64::NAN, 1.0]).unwrap();
        assert_eq!(falling.points, vec![2.0, 1.0]);
        assert!((falling.change_24h_pct + 50.0).abs() < 1e-9);
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

    #[test]
    fn fx_history_change_is_day_over_day_and_keeps_every_point() {
        let history = FxHistory::from_series("EUR", "USD", &[1.10, 1.12, 1.0, 1.05]).unwrap();
        assert_eq!(history.rate, 1.05);
        assert!((history.change_1d_pct - 5.0).abs() < 1e-9);
        assert_eq!(history.points, vec![1.10, 1.12, 1.0, 1.05]);
        assert!(FxHistory::from_series("EUR", "USD", &[1.1]).is_none());
    }

}
