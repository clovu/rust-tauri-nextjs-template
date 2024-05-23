"use client"

import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import store from "@/store"

export function Providers({ children }: React.PropsWithChildren) {
  return <ReduxProvider store={store}>
    {children}
  </ReduxProvider>
}
