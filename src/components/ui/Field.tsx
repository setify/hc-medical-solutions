import { Check, WarningCircle } from '@phosphor-icons/react/dist/ssr'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { useId } from 'react'

import { cn } from '@/lib/cn'

/*
 * Formularbausteine nach Briefing: Label über dem Feld, Pflichtfeld-Kennzeichnung,
 * Hilfetext und verständliche Fehlermeldung darunter (per aria-describedby verknüpft).
 */

type FieldProps = {
  label: string
  hint?: string
  error?: string
  success?: string
  required?: boolean
  optionalLabel?: string
  className?: string
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

export function Field({
  label,
  hint,
  error,
  success,
  required,
  optionalLabel,
  className,
  children,
}: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const msgId = error || success ? `${id}-msg` : undefined
  const describedBy = [hintId, msgId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-4 text-small font-normal text-ink"
      >
        <span>
          {label}
          {required ? (
            <span className="text-danger" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </span>
        {!required && optionalLabel ? (
          <span className="text-caption text-muted">{optionalLabel}</span>
        ) : null}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint ? (
        <p id={hintId} className="text-caption text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={msgId} className="flex items-center gap-1.5 text-caption text-danger">
          <WarningCircle aria-hidden="true" weight="bold" className="size-4 shrink-0" />
          {error}
        </p>
      ) : success ? (
        <p id={msgId} className="flex items-center gap-1.5 text-caption text-success-700">
          <Check aria-hidden="true" weight="bold" className="size-4 shrink-0" />
          {success}
        </p>
      ) : null}
    </div>
  )
}

const control =
  'w-full rounded-md border bg-surface px-4 text-body text-ink font-light shadow-xs transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-n-500 hover:border-n-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-n-50 disabled:text-n-500 read-only:bg-n-25'

const stateClass = (invalid?: boolean) =>
  invalid ? 'border-red-600 focus:border-red-600 focus:ring-red-100' : 'border-line-strong'

export function Input({
  invalid,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(control, 'h-12', stateClass(invalid), className)}
      {...rest}
    />
  )
}

export function Textarea({
  invalid,
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        control,
        'min-h-36 resize-y py-3 leading-relaxed',
        stateClass(invalid),
        className,
      )}
      {...rest}
    />
  )
}

export function Select({
  invalid,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(control, 'h-12 appearance-none pr-11', stateClass(invalid), className)}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m4 6 4 4 4-4" />
      </svg>
    </div>
  )
}

export function Checkbox({
  label,
  description,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; description?: string }) {
  const id = useId()
  return (
    <div className={cn('flex gap-3', className)}>
      <span className="relative mt-0.5 flex size-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer size-5 appearance-none rounded-[5px] border border-line-strong bg-surface transition-colors duration-200 checked:border-primary checked:bg-primary focus-visible:ring-4 focus-visible:ring-blue-100"
          aria-describedby={description ? `${id}-d` : undefined}
          {...rest}
        />
        <Check
          aria-hidden="true"
          weight="bold"
          className="pointer-events-none absolute inset-0.5 size-4 scale-50 text-white opacity-0 transition-[opacity,transform] duration-200 ease-out-back peer-checked:scale-100 peer-checked:opacity-100"
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-small text-ink">
          {label}
        </label>
        {description ? (
          <span id={`${id}-d`} className="text-caption text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </div>
  )
}

export function Radio({
  label,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <input
        id={id}
        type="radio"
        className="grid size-5 shrink-0 appearance-none place-content-center rounded-full border border-line-strong bg-surface transition-colors before:size-2.5 before:scale-0 before:rounded-full before:bg-primary before:transition-transform before:duration-200 before:content-[''] checked:border-primary checked:before:scale-100 focus-visible:ring-4 focus-visible:ring-blue-100"
        {...rest}
      />
      <label htmlFor={id} className="text-small text-ink">
        {label}
      </label>
    </div>
  )
}

export function Switch({
  label,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-n-300 transition-colors duration-300 before:absolute before:top-0.5 before:left-0.5 before:size-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-300 before:ease-out-back before:content-[''] checked:bg-primary checked:before:translate-x-5 focus-visible:ring-4 focus-visible:ring-blue-100"
        {...rest}
      />
      <label htmlFor={id} className="text-small text-ink">
        {label}
      </label>
    </div>
  )
}
