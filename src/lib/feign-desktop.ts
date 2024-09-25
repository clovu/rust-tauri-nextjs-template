import { useEffect } from 'react'

function contextmenuEventHandler(e: MouseEvent) {
  e.preventDefault()
}

export function useFeignDesktop() {
  if (process.env.NODE_ENV !== 'production')
    return

  useEffect(() => {
    if (!window) return

    window.addEventListener('contextmenu', contextmenuEventHandler)

    return () => {
      window.removeEventListener('contextmenu', contextmenuEventHandler)
    }
  }, [])
}
