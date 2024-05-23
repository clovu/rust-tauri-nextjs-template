"use client"
import React from "react"

import { invoke } from "@tauri-apps/api/core"
import { Task } from "./task"
import { TaskType } from "./type"


export function TaskList() {

  const [dataSource, setDataSource] = React.useState<TaskType[]>([])

  async function loadTaskList() {
    const tasks = await invoke<TaskType[]>("get_tasks", { key: "tasks" })
    setDataSource(tasks)
  }

  React.useEffect(() => {
    loadTaskList()
  }, [])

  return dataSource.map(task =>
    <Task name={task.name} status={task.status} id={task.id} key={task.id} />,
  )
}
