#![allow(unexpected_cfgs)]

use std::{error, fs, ops::Add, sync::Mutex};

use serde::{Deserialize, Serialize};
use sqlx::{migrate::MigrateDatabase, Pool, Sqlite};
use tauri::Manager;

static DB_URL: Mutex<String> = Mutex::new(String::new());

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

#[derive(Deserialize)]
struct UpdateTask {
  id: i32,
  name: Option<String>,
  status: Option<i32>,
}

#[tauri::command]
async fn set_task_by_id(task: UpdateTask) -> Result<(), String> {
  let task_raw = update_task_by_id(task.id, task.status, task.name).await;

  match task_raw {
    Ok(_) => Ok(()),
    Err(err) => Err(format!("{}", err).to_string()),
  }
}

async fn update_task_by_id(
  id: i32,
  status: Option<i32>,
  name: Option<String>,
) -> Result<(), Box<dyn error::Error>> {
  let db = create_db().await;
  let db = db.unwrap();

  let task_raw: Task = sqlx::query_as(format!("select * from task where id = {}", id).as_str())
    .fetch_one(&db)
    .await?;

  let sql = format!(
    "update task set status = {} , name = '{}' where id = {}",
    status.unwrap_or(task_raw.status),
    name.unwrap_or(task_raw.name),
    id
  );

  println!("update sql = {}", sql);

  sqlx::query(sql.as_str()).execute(&db).await?;

  Ok(())
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

/// create a sqlite connect
async fn create_db() -> Result<Pool<Sqlite>, Box<dyn error::Error>> {
  let url = DB_URL.lock().unwrap().clone();
  let url = url.as_str();

  println!("db url: {}", url);
  if !sqlx::Sqlite::database_exists(url).await.unwrap_or(false) {
    sqlx::Sqlite::create_database(url).await?;
  }

  let db = sqlx::SqlitePool::connect(url).await?;

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
    .setup(|app| {
      let app_data_dir = app.path().app_data_dir().unwrap();
      let app_data_dir = app_data_dir.to_str().unwrap();

      // create a app-data directory if not exists
      if let Err(error) = fs::create_dir_all(app_data_dir) {
        println!("create_dir_all error {}", error);
      }

      let app_data_dir = String::from("sqlite:").add(app_data_dir).add("/cache.db");

      *DB_URL.lock().unwrap() = app_data_dir;

      Ok(())
    })
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![
      get_tasks,
      add_task,
      set_task_by_id
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
