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

  return (
    <main className="flex h-screen overflow-hidden flex-col items-center space-y-2 p-4 pt-0
            box-border">
      <div className="flex w-full items-center space-x-2 pb-2 pt-4 bg-white flex-grow-0">
        <Input placeholder="Task name" onChange={e => inpRef.current = e.target.value} />
        <Button type="submit" onClick={addTaskToDb}>Add</Button>
      </div>
      <ScrollArea className="w-full flex-grow">
        <TaskList />
      </ScrollArea>
    </main>
  )
}
