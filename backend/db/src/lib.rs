use sqlx::mysql::MySqlPoolOptions;
use sqlx::MySqlPool;

pub mod reference;

pub async fn create_pool(database_url: &str) -> sqlx::Result<MySqlPool> {
    MySqlPoolOptions::new()
        .max_connections(10)
        .connect(database_url)
        .await
}

pub async fn run_migrations(pool: &MySqlPool) -> Result<(), sqlx::migrate::MigrateError> {
    sqlx::migrate!("./migrations").run(pool).await
}
