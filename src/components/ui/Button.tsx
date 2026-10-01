import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ButtonVariant =
  'primary' | 'accent' | 'signal' | 'dark' | 'secondary' | 'ghost' | 'inverse' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-normal transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-strong',
  // Zweitfarbe Teal: auf hellem und dunklem Grund, Text immer tiefblau (Kontrast ≥ 7 : 1).
  accent: 'bg-signal text-blue-950 hover:bg-signal-strong',
  signal: 'bg-signal text-blue-950 hover:bg-signal-strong',
  // Tiefblau mit Teal-Schrift, z. B. in der Navigation.
  dark: 'bg-blue-950 text-teal-300 hover:bg-blue-900',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-primary hover:bg-blue-50',
  ghost: 'text-ink hover:bg-surface-muted',
  inverse: 'bg-white text-primary-strong hover:bg-blue-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-5 text-small',
  md: 'h-11 px-6 text-small',
  lg: 'h-14 px-8 text-body',
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

type Common = {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  loading?: boolean
}

function Content({ iconLeft, iconRight, loading, children }: Common & { children: ReactNode }) {
  return (
    <>
      {loading ? <LoadingDots /> : iconLeft}
      <span>{children}</span>
      {iconRight ? (
        <span className="transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5">
          {iconRight}
        </span>
      ) : null}
    </>
  )
}

function LoadingDots() {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-pulse rounded-full bg-current"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}

export function Button({
  variant,
  size,
  iconLeft,
  iconRight,
  loading,
  className,
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      aria-busy={loading || undefined}
      {...rest}
    >
      <Content iconLeft={iconLeft} iconRight={iconRight} loading={loading}>
        {children}
      </Content>
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}: Omit<Common, 'loading'> & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...rest}>
      <Content iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Content>
    </a>
  )
}

/**
 * Runder Pfeil-Button (Kundenvorlage): Tiefblau mit Teal-Pfeil, bzw. hell auf dunklem Grund.
 * Für Karten-Aktionen und Karussell-Steuerung. Braucht immer ein zugängliches Label.
 */
export function roundIconClasses(tone: 'dark' | 'light' | 'outline' = 'dark', className?: string) {
  return cn(
    'inline-grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-out-expo active:scale-95',
    tone === 'dark' && 'bg-blue-950 text-teal-300 hover:bg-primary hover:text-white',
    tone === 'light' && 'bg-white text-blue-950 hover:bg-signal',
    tone === 'outline' &&
      'border border-line-strong text-ink hover:border-primary hover:text-primary-strong',
    className,
  )
}
