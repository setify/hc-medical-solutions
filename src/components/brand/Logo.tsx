import { hoch, quer } from './logo-shapes'

type LogoProps = {
  /** Querformat (Standard) oder Hochformat. */
  format?: 'quer' | 'hoch'
  /** Hausfarbe, Strichversion (dunkel) oder Weiß (auf dunklem Grund). */
  variant?: 'hausfarbe' | 'strich' | 'weiss'
  className?: string
  /** Dekorativ (z. B. neben ausgeschriebenem Firmennamen) → für Screenreader ausblenden. */
  decorative?: boolean
}

const variantClass = {
  hausfarbe: 'text-logo',
  strich: 'text-logo-strich',
  weiss: 'text-white',
} as const

/** HC-Logo als Inline-SVG (Vektordaten aus dem Logoblatt). Farbe über `currentColor`. */
export function Logo({ format = 'quer', variant = 'hausfarbe', className, decorative }: LogoProps) {
  const shape = format === 'quer' ? quer : hoch

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={shape.viewBox}
      fill="currentColor"
      className={[variantClass[variant], className].filter(Boolean).join(' ')}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': 'HC Medical Solutions' })}
      focusable="false"
    >
      {shape.paths.map((path, index) => (
        <path key={index} fillRule={path.fillRule} transform={path.transform} d={path.d} />
      ))}
    </svg>
  )
}
