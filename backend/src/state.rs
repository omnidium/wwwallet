use std::sync::Arc;

use sqlx::MySqlPool;
use wwwallet_providers::ProviderRegistry;

#[derive(Clone)]
pub struct AppState {
    pub db: MySqlPool,
    pub providers: Arc<ProviderRegistry>,
}
