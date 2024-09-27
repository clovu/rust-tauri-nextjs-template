import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { activeAtom } from '@/store/language'
import { useAtomValue } from 'jotai'

export interface NavLink {
  title: string
  id: string | number
  label?: string
}

interface NavProps {
  links: NavLink[]
  onClick?: (link: NavLink) => void
}

export function Nav({ links, onClick }: NavProps) {
  const active = useAtomValue(activeAtom)

  return (
    <nav className="w-full min-w-[160px]">
      <div className="w-full grid gap-1 px-2 ">
        {links.map((link) => (
          <Link
            key={link.id}
            draggable="false"
            href="#"
            className={cn(
              buttonVariants({ variant: link.id === active?.id ? 'default' : 'ghost', size: 'sm' }),
              link.id === active?.id &&
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
                  link.id === active?.id &&
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
