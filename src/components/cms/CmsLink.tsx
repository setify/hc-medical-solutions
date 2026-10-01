import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { ButtonLink, type ButtonSize, type ButtonVariant } from '@/components/ui/Button'
import { LineButton } from '@/components/ui/LineButton'
import type { ResolvedLink } from '@/lib/links'

/** Rendert einen aufgelösten CMS-Link als Button oder Linien-Link. */
export function CmsLink({
  link,
  appearance = 'button',
  variant = 'primary',
  size,
  tone = 'dark',
}: {
  link: ResolvedLink | null
  appearance?: 'button' | 'line'
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: 'dark' | 'light'
}) {
  if (!link) return null
  const target =
    link.newTab || link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const label = (
    <>
      {link.label}
      {link.newTab || link.external ? (
        <span className="sr-only"> (öffnet neues Fenster)</span>
      ) : null}
    </>
  )

  if (appearance === 'line') {
    return (
      <LineButton href={link.href} tone={tone} {...target}>
        {label}
      </LineButton>
    )
  }
  return (
    <ButtonLink
      href={link.href}
      variant={variant}
      size={size}
      iconRight={
        link.external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />
      }
      {...target}
    >
      {label}
    </ButtonLink>
  )
}
