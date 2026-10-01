'use client'

import { X } from '@phosphor-icons/react'
import { useId, useRef, type ReactNode } from 'react'

import { Button, type ButtonVariant } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/**
 * Modaler Dialog auf Basis des nativen <dialog>-Elements: Fokusfalle, Escape und
 * Fokus-Rückgabe liefert der Browser. Ein- und Ausblenden per CSS (@starting-style).
 * Buttons im `footer` schließen den Dialog nativ (form method="dialog").
 */
export function Dialog({
  triggerLabel,
  triggerVariant = 'primary',
  title,
  description,
  children,
  footer,
  size = 'md',
}: {
  triggerLabel: string
  triggerVariant?: ButtonVariant
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  return (
    <>
      <Button variant={triggerVariant} onClick={() => ref.current?.showModal()}>
        {triggerLabel}
      </Button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClick={(e) => {
          // Klick auf den Hintergrund schließt den Dialog
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className={cn(
          'm-auto w-[calc(100%-2rem)] rounded-xl bg-surface p-0 text-ink shadow-lg',
          'translate-y-6 scale-[0.98] opacity-0 transition-[opacity,transform,overlay,display] transition-discrete duration-500 ease-out-expo',
          'open:translate-y-0 open:scale-100 open:opacity-100 starting:open:translate-y-6 starting:open:scale-[0.98] starting:open:opacity-0',
          'backdrop:bg-blue-950/0 backdrop:transition-[background-color,overlay,display] backdrop:transition-discrete backdrop:duration-500',
          'open:backdrop:bg-blue-950/55 starting:open:backdrop:bg-blue-950/0',
          { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' }[size],
        )}
      >
        <div className="relative flex flex-col gap-6 p-8 sm:p-10">
          <span
            aria-hidden="true"
            className="absolute top-0 left-8 h-10 w-px bg-accent sm:left-10"
          />
          <div className="flex items-start justify-between gap-6 pt-4">
            <div className="flex flex-col gap-2">
              <h2 id={titleId} className="text-h3">
                {title}
              </h2>
              {description ? <p className="text-small text-muted">{description}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="-mt-1 -mr-2 grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Schließen</span>
            </button>
          </div>
          {children}
          {footer ? (
            <form method="dialog" className="flex flex-wrap justify-end gap-3 pt-2">
              {footer}
            </form>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
