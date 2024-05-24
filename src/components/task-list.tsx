"use client"
import React from "react"

import { Task as TaskItem } from "./task"
import { useSelector } from "@/store"
import { TaskStatus, updateTask } from "@/store/task"
import { useDispatch } from "react-redux"
import { invoke } from "@tauri-apps/api/core"


export function TaskList() {
  const dataSource = useSelector(state => state.task.list)
  const dispatch = useDispatch()

  async function changeState(id: number, status: TaskStatus) {
    await invoke("set_task_by_id", { task: { id, status } })
    dispatch(updateTask({ id, status }))
  }

  return dataSource.filter(task => task.status != TaskStatus.Trash).map(task =>
    <TaskItem name={task.name} status={task.status} id={task.id} key={task.id}
      onMoveToTrash={() => changeState(task.id, TaskStatus.Trash)}
      onCancel={() => changeState(task.id, TaskStatus.Cancel)}
      onDone={() => changeState(task.id, TaskStatus.Done)} />,
  ).reverse()
}
