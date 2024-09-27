'use client'

import { useEffect } from 'react'
import { getCurrent } from '@tauri-apps/api/window'

/**
 * Fix tauri window startup white screen.
 * When creating a window, should hidden it first e.g.
 * ```ts
 * import { getCurrent, Window } from '@tauri-apps/api/window'
 * new Window('main', { visible: false })
 * ```
 */
export function WinDisplayController() {
  useEffect(() => {
    setTimeout(getCurrent().show, 30)
  }, [])

  return undefined
}
