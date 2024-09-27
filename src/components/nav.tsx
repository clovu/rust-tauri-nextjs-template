import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export interface NavLink {
  title: string
  id: string | number
  label?: string
}

interface NavProps {
  links: NavLink[]
  activeKey?: string | number
  onClick?: (link: NavLink) => void
}

export function Nav({ links, onClick, activeKey }: NavProps) {
  return (
    <nav className="w-full min-w-[160px]">
      <div className="w-full grid gap-1 px-2 ">
        {links.map((link) => (
          <Link
            key={link.id}
            draggable="false"
            href="#"
            className={cn(
              buttonVariants({ variant: link.id === activeKey ? 'default' : 'ghost', size: 'sm' }),
              link.id === activeKey &&
              'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start',
            )}
            onClick={() => onClick?.(link)}
          >
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.id === activeKey &&
                  'text-background dark:text-white',
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}
