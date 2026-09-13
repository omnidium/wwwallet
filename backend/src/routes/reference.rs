use axum::extract::{Path, State};
use axum::Json;

use crate::error::ApiError;
use crate::state::AppState;

pub async fn currencies(
    State(state): State<AppState>,
    Path(language): Path<String>,
) -> Result<Json<Vec<wwwallet_db::reference::Currency>>, ApiError> {
    Ok(Json(wwwallet_db::reference::all_currencies(&state.db, &language).await?))
}

pub async fn languages(
    State(state): State<AppState>,
) -> Result<Json<Vec<wwwallet_db::reference::Language>>, ApiError> {
    Ok(Json(wwwallet_db::reference::all_languages(&state.db).await?))
}

pub async fn msg_codes(
    State(state): State<AppState>,
    Path(language): Path<String>,
) -> Result<Json<Vec<wwwallet_db::reference::MsgCode>>, ApiError> {
    Ok(Json(wwwallet_db::reference::all_msg_codes(&state.db, &language).await?))
}

pub async fn templates(
    State(state): State<AppState>,
    Path(language): Path<String>,
) -> Result<Json<Vec<wwwallet_db::reference::Template>>, ApiError> {
    Ok(Json(wwwallet_db::reference::all_templates(&state.db, &language).await?))
}
