import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum TaskStatus {
  Todo, Done, Cancel, Trash
}

export interface Task {
  id: number
  name: string
  status: TaskStatus
}

const taskSlice = createSlice({
  name: "task",
  initialState: {
    list: [] as Task[],
  },
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, "id">>) {
      const { name, status } = action.payload
      state.list.push({ name, status, id: state.list.length + 1 })
    },
    setTaskList(state, action: PayloadAction<Task[]>) {
      state.list = action.payload
    },
    removeTaskById(state, action: PayloadAction<number>) {
      const taskIndex = state.list.findIndex(task => task.id === action.payload)
      if (taskIndex < 0) return

      state.list.splice(taskIndex, 1)
    },
    updateTask(state, action: PayloadAction<Partial<Omit<Task, "id">> & { id: number }>) {
      const taskIndex = state.list.findIndex(task => task.id === action.payload.id)
      if (taskIndex < 0) return

      const task = state.list[taskIndex]

      state.list[taskIndex] = {
        ...task,
        name: action.payload.name ?? task.name,
        status: action.payload.status ?? task.status,
      }
    },
  },
})

export const { addTask, setTaskList, removeTaskById, updateTask } = taskSlice.actions

export default taskSlice.reducer
