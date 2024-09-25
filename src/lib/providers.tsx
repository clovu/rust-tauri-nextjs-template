'use client'

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'next-theme'

import store from '@/store'
import { WinDisplayController } from '@/components/win-display-controller'
import { useFeignDesktop } from './feign-desktop'

export function Providers({ children }: React.PropsWithChildren) {
  useFeignDesktop()

  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
        <WinDisplayController />
      </ThemeProvider>
    </ReduxProvider>
  )
}
