import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Task {
  id: number
  name: string
  status: number
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
  },
})

export const { addTask, setTaskList } = taskSlice.actions

export default taskSlice.reducer
