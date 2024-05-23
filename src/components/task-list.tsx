"use client"
import React from "react"

import { Task } from "./task"
import { useSelector } from "@/store"


export function TaskList() {

  const dataSource = useSelector(state => state.task.list)

  return dataSource.map(task =>
    <Task name={task.name} status={task.status} id={task.id} key={task.id} />,
  )
}
