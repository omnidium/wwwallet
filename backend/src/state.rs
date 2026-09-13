use std::sync::Arc;

use wwwallet_providers::ProviderRegistry;

#[derive(Clone)]
pub struct AppState {
    pub providers: Arc<ProviderRegistry>,
}
