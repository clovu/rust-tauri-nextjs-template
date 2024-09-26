'use client'
import { Button } from './ui'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  collapsed?: boolean
  onChangeSide?: () => void
}

export function Header({ className, collapsed, onChangeSide }: HeaderProps) {
  return <>
    <div style={{ width: '100%', height: 0 }}></div>
    <nav
      data-tauri-drag-region
      className={cn('h-head box-border flex items-center border-b-border border-b', className)}
    >
      <div className={cn(
        'fixed',
        't-0 left-[6rem]',
      )}>
        <Button variant="ghost" size="icon" onClick={onChangeSide}>
          <span className="icon-[f7--sidebar-left] w-5 h-5 text-muted-foreground"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <span className="icon-[carbon--add-large] w-5 h-5 text-muted-foreground"></span>
        </Button>
      </div>

      <div className={cn(collapsed ? 'w-[calc(6rem+72px)]' : 'w-0')} />

      <div className="pl-space">
        <h1 data-tauri-drag-region className="text-accent-foreground">Rust</h1>
      </div>

    </nav>
  </>
}
