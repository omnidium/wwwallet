use std::rc::Rc;

use worker::send::SendWrapper;
use wwwallet_providers::ProviderRegistry;

/// `ProviderRegistry` holds `Rc`s and a `KvStore`, neither of which are `Send` —
/// fine, since Workers are single-threaded, but axum's `State` extractor still
/// requires it at the type level. `SendWrapper` (from the `worker` crate) is
/// the documented way to bridge that gap safely.
#[derive(Clone)]
pub struct AppState {
    pub providers: SendWrapper<Rc<ProviderRegistry>>,
}
