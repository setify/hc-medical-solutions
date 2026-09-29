import { cn } from '@/lib/cn'

/**
 * Wörter färben sich beim Scrollen von Grau zur Textfarbe (nach reactbits „Scroll Reveal“).
 * Abweichung vom Original: keine Unschärfe/Transparenz, damit jeder Zustand WCAG AA erfüllt.
 * Umsetzung mit CSS Scroll-Driven Animations – kein JavaScript, ohne Browser-Support sofort lesbar.
 */
export function ScrollReveal({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn('text-h2 font-light text-ink', className)}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="reveal-word inline-block whitespace-pre">
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
