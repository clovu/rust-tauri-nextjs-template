import { configureStore } from "@reduxjs/toolkit"
import { useSelector as useStore } from "react-redux"

import task from "./task"

const store = configureStore({
  reducer: { task },
})

type Store = ReturnType<typeof store.getState>

export function useSelector<S = unknown>(selector: (state: Store) => S) {
  return useStore(selector)
}

export default store
