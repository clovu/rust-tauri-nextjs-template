"use client"
import { TaskList } from "@/components/task-list"
import { Button, Input } from "@/components/ui"
import { ScrollArea } from "@/components/ui/scroll-area"
import { invoke } from "@tauri-apps/api/core"
import React from "react"

export default function Home() {
  const inpRef = React.useRef("")

  async function addTask() {
    await invoke("add_task", { task: { name: inpRef.current, status: 1 } })
  }

  return <ScrollArea>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Task name" onChange={e => inpRef.current = e.target.value} />
        <Button type="submit" onClick={addTask}>Add</Button>
      </div>
      <TaskList />
    </main>
  </ScrollArea>
}
