'use client'

import { List, X } from '@phosphor-icons/react'
import { useRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import type { NavItem } from './nav'

/** Mobilmenü als natives <dialog>: Fokusfalle, Escape und Fokus-Rückgabe liefert der Browser. */
export function MobileMenu({
  items,
  current,
  labels,
  footer,
}: {
  items: NavItem[]
  current: string
  labels: { open: string; close: string; nav: string }
  footer?: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="grid size-11 place-items-center rounded-sm text-ink hover:bg-n-100 lg:hidden"
        aria-haspopup="dialog"
      >
        <List aria-hidden="true" className="size-6" />
        <span className="sr-only">{labels.open}</span>
      </button>
      <dialog
        ref={ref}
        aria-label={labels.nav}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(24rem,100%)] max-w-none bg-surface p-0 text-ink backdrop:bg-petrol-950/50 open:flex open:flex-col"
      >
        <div className="flex items-center justify-end border-b border-line p-4">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="grid size-11 place-items-center rounded-sm hover:bg-n-100"
          >
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">{labels.close}</span>
          </button>
        </div>
        <nav aria-label={labels.nav} className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  aria-current={item.href === current ? 'page' : undefined}
                  className={cn(
                    'block py-4 text-h4',
                    item.href === current && 'text-accent-strong',
                  )}
                >
                  {item.label}
                </a>
                {item.children.length ? (
                  <ul className="flex flex-col pb-3 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          aria-current={child.href === current ? 'page' : undefined}
                          className={cn(
                            'block py-2 text-small text-muted',
                            child.href === current && 'text-accent-strong',
                          )}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        {footer ? <div className="border-t border-line p-4">{footer}</div> : null}
      </dialog>
    </>
  )
}
