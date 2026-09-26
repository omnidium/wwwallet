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
}

pub type ProviderResult<T> = Result<T, ProviderError>;
