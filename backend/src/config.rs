use std::env;

pub struct Config {
    pub database_url: String,
    pub bind_addr: String,
    pub cors_allowed_origins: Vec<String>,
    pub alchemy_api_key: String,
    pub ethplorer_api_key: String,
    pub etherscan_api_key: String,
}

impl Config {
    pub fn from_env() -> anyhow::Result<Self> {
        Ok(Self {
            database_url: env::var("DATABASE_URL")?,
            bind_addr: env::var("BIND_ADDR").unwrap_or_else(|_| "0.0.0.0:8080".to_string()),
            cors_allowed_origins: env::var("CORS_ALLOWED_ORIGINS")
                .unwrap_or_default()
                .split(',')
                .map(str::trim)
                .filter(|s| !s.is_empty())
                .map(str::to_string)
                .collect(),
            alchemy_api_key: env::var("ALCHEMY_API_KEY")?,
            ethplorer_api_key: env::var("ETHPLORER_API_KEY").unwrap_or_else(|_| "freekey".to_string()),
            etherscan_api_key: env::var("ETHERSCAN_API_KEY")?,
        })
    }
}
