import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type Variant = 'default' | 'ghost'

export interface NavLink {
  title: string
  label?: string
  variant: Variant
}

interface NavProps {
  links: NavLink[]
}

export function Nav({ links }: NavProps) {
  return (
    <nav className="w-full min-w-[160px]">
      <div className="w-full grid gap-1 px-2 ">
        {links.map((link, index) => (
          <Link
            key={index}
            draggable="false"
            href="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              link.variant === 'default' && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start',
            )}
          >
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default' &&
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
