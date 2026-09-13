use serde::Serialize;
use sqlx::{FromRow, MySqlPool};

#[derive(Debug, Clone, Serialize, FromRow)]
pub struct Currency {
    pub language: String,
    pub id: i32,
    pub key_word: String,
    pub name: Option<String>,
}

#[derive(Debug, Clone, Serialize, FromRow)]
pub struct Language {
    pub id: String,
    pub key_word: Option<String>,
    pub name: Option<String>,
}

#[derive(Debug, Clone, Serialize, FromRow)]
pub struct MsgCode {
    pub language: String,
    pub id: i32,
    pub key_word: String,
    pub name: Option<String>,
}

#[derive(Debug, Clone, Serialize, FromRow)]
pub struct Template {
    pub language: String,
    pub id: String,
    pub key_word: String,
    pub name: Option<String>,
}

pub async fn all_currencies(pool: &MySqlPool, language: &str) -> sqlx::Result<Vec<Currency>> {
    sqlx::query_as::<_, Currency>(
        "SELECT language, id, key_word, name FROM currencies WHERE language = ? ORDER BY id",
    )
    .bind(language)
    .fetch_all(pool)
    .await
}

pub async fn all_languages(pool: &MySqlPool) -> sqlx::Result<Vec<Language>> {
    sqlx::query_as::<_, Language>("SELECT id, key_word, name FROM languages ORDER BY name")
        .fetch_all(pool)
        .await
}

pub async fn all_msg_codes(pool: &MySqlPool, language: &str) -> sqlx::Result<Vec<MsgCode>> {
    sqlx::query_as::<_, MsgCode>(
        "SELECT language, id, key_word, name FROM msg_codes WHERE language = ? ORDER BY id",
    )
    .bind(language)
    .fetch_all(pool)
    .await
}

pub async fn all_templates(pool: &MySqlPool, language: &str) -> sqlx::Result<Vec<Template>> {
    sqlx::query_as::<_, Template>(
        "SELECT language, id, key_word, name FROM templates WHERE language = ? ORDER BY id",
    )
    .bind(language)
    .fetch_all(pool)
    .await
}
