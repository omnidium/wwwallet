#[derive(Debug, thiserror::Error)]
pub enum ProviderError {
    #[error("upstream request failed: {0}")]
    Request(#[from] worker::Error),
    #[error("upstream returned an error: {0}")]
    Upstream(String),
    #[error("no provider available for this operation")]
    Unavailable,
    #[error("invalid input: {0}")]
    InvalidInput(String),
    #[error("rate limit exceeded")]
    RateLimited,
    /// This backend's own budget for calling the provider is spent for now
    /// (see upstream_budget.rs) — no call was made.
    #[error("upstream budget exhausted for now")]
    Busy,
    #[error("no liquidity available for this token pair")]
    NoLiquidity,
    /// A bridge aggregator doesn't know the requested token on one of the
    /// two chains — nothing can route it there.
    #[error("token not supported on this chain")]
    TokenNotOnChain,
    /// An `eth_estimateGas` call reverted — the transaction as constructed
    /// can't succeed (insufficient balance/allowance, a require() failing,
    /// ...). Carries the node's raw revert reason for server-side logging
    /// only; never shown to the user as-is (see `ApiError::Unprocessable`).
    #[error("transaction would revert: {0}")]
    TransactionWouldRevert(String),
    /// The chain isn't switched on for this backend's account with the
    /// provider — nothing can be served for it until someone enables it.
    #[error("chain not enabled for this provider account")]
    ChainNotEnabled,
    /// The provider offers nothing of this kind on this chain at all (no
    /// NFT data on Ink, say) — not a fault, and not worth retrying.
    #[error("not supported on this chain")]
    Unsupported,
}

pub type ProviderResult<T> = Result<T, ProviderError>;
