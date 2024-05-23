"use client"
import { CheckIcon, Cross2Icon, TrashIcon } from "@radix-ui/react-icons"

import { Button, Card, CardHeader } from "./ui"
import { TaskType } from "./type"

export function Task(props: TaskType) {
  return (
    <Card className="flex w-full max-w-sm items-center space-x-2">
      {/* <Button onClick={() => setTaskList(Date.now().toString())}> set </Button> */}
      <CardHeader className="p-3 justify-between flex w-full flex-row items-center">
        <p>{props.name}</p>

        <div>
          <Button variant="ghost" className="w-9 h-9 p-0">
            <CheckIcon color="#2ed573" height={18} width={18} />
          </Button>
          <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0">
            <Cross2Icon height={16} width={16} />
          </Button>
          <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0">
            <TrashIcon color="red" height={16} width={16} />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
