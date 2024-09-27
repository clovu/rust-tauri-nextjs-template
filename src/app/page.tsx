'use client'

import React, { createRef, useState } from 'react'
import { Allotment, AllotmentHandle } from 'allotment'
import 'allotment/dist/style.css'

import { cn } from '@/lib/utils'

import { WinDisplayController } from '@/components/win-display-controller'
import { Header } from '@/components/header'
import { Nav, NavLink } from '@/components/nav'

let firstLoad = true

export default function Home() {
  const [isCollapsed, setCollapsed] = useState(false)
  const paneRef = createRef<AllotmentHandle>()
  const [items] = useState<NavLink[]>([
    { title: 'Java', variant: 'ghost' },
    { title: 'Rust', variant: 'default', label: '99' },
    { title: 'TypeScript', variant: 'ghost' },
    { title: 'Golang', variant: 'ghost' },
  ])
  const [trs, setTrs] = useState(false)

  return <>
    <main className="flex h-screen">
      <Allotment
        snap
        defaultSizes={[180]}
        ref={paneRef}
        onChange={([first]) => {
          if (firstLoad) {
            firstLoad = false
            return
          }

          if (isCollapsed && first)
            setCollapsed(false)
          else if (!isCollapsed && !first)
            setCollapsed(true)
        }}
      >
        <Allotment.Pane minSize={180} preferredSize={180} snap visible={!isCollapsed}>
          <div className="h-head w-full" data-tauri-drag-region></div>
          <Nav links={items} />
        </Allotment.Pane>
        <Allotment.Pane minSize={300} className={cn('flex-grow flex flex-col', trs && 'duration-150')} >
          <Header
            className="w-full flex-shrink"
            collapsed={isCollapsed}
            onChangeSide={() => {
              setCollapsed(!isCollapsed)
              setTrs(true)
            }}
            transition={trs}
            onTransitionEnd={() => {
              setTrs(false)
            }}
          />
          <div className="flex flex-grow w-full justify-center items-center">
            <p className="text-xs text-secondary-foreground whitespace-pre-wrap">Select an item</p>
          </div>
        </Allotment.Pane>
      </Allotment>
    </main >
    <WinDisplayController />
  </>
}
