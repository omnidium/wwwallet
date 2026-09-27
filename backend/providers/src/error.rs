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
    #[error("no liquidity available for this token pair")]
    NoLiquidity,
    /// An `eth_estimateGas` call reverted — the transaction as constructed
    /// can't succeed (insufficient balance/allowance, a require() failing,
    /// ...). Carries the node's raw revert reason for server-side logging
    /// only; never shown to the user as-is (see `ApiError::Unprocessable`).
    #[error("transaction would revert: {0}")]
    TransactionWouldRevert(String),
}

pub type ProviderResult<T> = Result<T, ProviderError>;
