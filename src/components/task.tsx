"use client"
import { CheckIcon, Cross2Icon, TrashIcon } from "@radix-ui/react-icons"

import { Button, Card, CardHeader, Popover, PopoverContent, PopoverTrigger } from "./ui"
import { TaskStatus, type Task } from "@/store/task"

interface TaskProps extends Task {
  /**
   * move the task to trash
   */
  onMoveToTrash?: () => void
  /**
   * cancel the task
   */
  onCancel?: () => void
  /**
   * done the task
   */
  onDone?: () => void
}

export function Task(props: TaskProps) {
  const statusClass = props.status === TaskStatus.Cancel ?
    "border-red-400" : props.status === TaskStatus.Done ? "border-lime-400" : ""

  return (
    <Card className={`flex w-full mb-2 ${statusClass}`}>
      <CardHeader className="p-3 justify-between flex w-full flex-row items-center">
        <p>{props.name}</p>

        <div>
          <Button variant="ghost" className="w-9 h-9 p-0" onClick={props.onDone}>
            <CheckIcon color="#2ed573" height={18} width={18} />
          </Button>
          <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0" onClick={props.onCancel}>
            <Cross2Icon height={16} width={16} />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0">
                <TrashIcon color="red" height={16} width={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Are you sure you want to delete it?</p>
              <div className="flex">
                <div className="flex-grow"></div>
                <Button size={"sm"} variant="ghost" onClick={props.onMoveToTrash}>DEL</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
    </Card>
  )
}
