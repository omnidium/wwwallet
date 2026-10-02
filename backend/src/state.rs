use std::rc::Rc;

use worker::send::SendWrapper;
use worker::RateLimiter;
use wwwallet_providers::ProviderRegistry;

use crate::session::{Mode, Sessions};

/// `ProviderRegistry` holds `Rc`s and rate-limiter bindings, neither of which are `Send` —
/// fine, since Workers are single-threaded, but axum's `State` extractor still
/// requires it at the type level. `SendWrapper` (from the `worker` crate) is
/// the documented way to bridge that gap safely.
#[derive(Clone)]
pub struct AppState {
    pub providers: SendWrapper<Rc<ProviderRegistry>>,
    pub sessions: SendWrapper<Rc<SessionGate>>,
}

/// Session-token settings and limits (see session.rs, routes/session.rs).
pub struct SessionGate {
    pub mode: Mode,
    /// None when SESSION_SECRET isn't set.
    pub sessions: Option<Sessions>,
    /// Requests per session token.
    pub limiter: RateLimiter,
    /// Tokens minted per IP.
    pub mint_limiter: RateLimiter,
}
