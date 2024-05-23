"use client"

import React from "react"
import { useDispatch } from "react-redux"

import { TaskList } from "@/components/task-list"
import { Button, Input } from "@/components/ui"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task } from "@/store/task"
import { invoke } from "@tauri-apps/api/core"
import { setTaskList, addTask } from "@/store/task"

export default function Home() {
  const inpRef = React.useRef("")

  async function addTaskToDb() {
    await invoke("add_task", { task: { name: inpRef.current, status: 1 } })
    dispatch(addTask({ name: inpRef.current, status: 1 }))
  }

  const dispatch = useDispatch()

  async function loadTaskList() {
    const tasks = await invoke<Task[]>("get_tasks")
    console.log(tasks)

    dispatch(setTaskList(tasks))
  }

  React.useEffect(() => {
    loadTaskList()
  }, [])

  return <ScrollArea>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Task name" onChange={e => inpRef.current = e.target.value} />
        <Button type="submit" onClick={addTaskToDb}>Add</Button>
      </div>
      <TaskList />
    </main>
  </ScrollArea>
}
