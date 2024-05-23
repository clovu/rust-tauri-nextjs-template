#![allow(unexpected_cfgs)]

use std::error;

use serde::{Deserialize, Serialize};
use sqlx::{migrate::MigrateDatabase, Pool, Sqlite};

const DB_URL: &str = "sqlite://../sqlite.db";

const CREATE_TASK_SCRIPT: &str = r#"
CREATE TABLE if NOT EXISTS task (
    id INTEGER PRIMARY key NOT NULL,
    name VARCHAR(100) NOT NULL,
    status INTEGER
)
"#;

#[derive(sqlx::FromRow, Serialize)]
struct Task {
  id: i32,
  name: String,
  status: i32,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn get_tasks() -> Result<Vec<Task>, String> {
  let tasks = get_task_list().await;

  match tasks {
    Ok(list) => Ok(list),
    Err(err) => Err(format!("{}", err).to_string()),
  }
}

#[derive(Deserialize, Debug)]
struct AddTask {
  name: String,
  status: i32,
}

#[tauri::command]
async fn add_task(task: AddTask) -> Result<(), String> {
  match add_task_to_db(task.name, task.status).await {
    Err(err) => Err(format!("{}", err).to_string()),
    _ => Ok(()),
  }
}

async fn add_task_to_db(name: String, status: i32) -> Result<(), Box<dyn error::Error>> {
  let db = create_db().await?;

  let sql = format!(
    "insert into task(name, status) values('{}', {})",
    name, status
  );

  sqlx::query(sql.as_str()).execute(&db).await?;

  Ok(())
}

async fn create_db() -> Result<Pool<Sqlite>, Box<dyn error::Error>> {
  if !sqlx::Sqlite::database_exists(DB_URL).await.unwrap_or(false) {
    sqlx::Sqlite::create_database(DB_URL).await?;
  }

  let db = sqlx::SqlitePool::connect(DB_URL).await?;

  sqlx::query(CREATE_TASK_SCRIPT).execute(&db).await?;

  Ok(db)
}

async fn get_task_list() -> Result<Vec<Task>, Box<dyn error::Error>> {
  let db = create_db().await?;
  let tasks: Vec<Task> = sqlx::query_as("select * from task").fetch_all(&db).await?;

  Ok(tasks)
}

// the following cfg clippy throw error with clippy in before git commit
#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![get_tasks, add_task])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
