import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { CSSProperties, ReactNode } from 'react'

import { CmsLink } from '@/components/cms/CmsLink'
import { Media } from '@/components/cms/Media'
import { BackgroundPaths } from '@/components/effects/BackgroundPaths'
import MicroSlats from '@/components/effects/MicroSlats'
import { roundIconClasses } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { resolveLink, type ResolvedLink } from '@/lib/links'
import type { Page } from '@/payload-types'

import { HeroChannels } from './HeroChannels'

type HeroData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

/** Setzt den gepflegten Teil des Titels farbig ab; Wörter steigen beim Laden aus der Maske. */
function Title({
  title,
  highlight,
  animate,
}: {
  title: string
  highlight?: string | null
  animate: boolean
}) {
  const idx = highlight ? title.indexOf(highlight) : -1
  const parts: { text: string; hl: boolean }[] =
    idx >= 0 && highlight
      ? [
          { text: title.slice(0, idx), hl: false },
          { text: highlight, hl: true },
          { text: title.slice(idx + highlight.length), hl: false },
        ].filter((p) => p.text)
      : [{ text: title, hl: false }]

  if (!animate) {
    return (
      <>
        {parts.map((p, i) =>
          p.hl ? (
            <span key={i} className="text-signal">
              {p.text}
            </span>
          ) : (
            p.text
          ),
        )}
      </>
    )
  }

  let n = 0
  const out: ReactNode[] = []
  parts.forEach((p, pi) => {
    p.text
      .split(/(\s+)/)
      .filter(Boolean)
      .forEach((w, wi) => {
        if (/^\s+$/.test(w)) {
          out.push(' ')
          return
        }
        out.push(
          <span
            key={`${pi}-${wi}`}
            className="inline-block overflow-hidden pb-[0.1em] align-bottom"
          >
            <span
              className={cn('cut-in inline-block', p.hl && 'text-signal')}
              style={{ '--i': n++ } as CSSProperties}
            >
              {w}
            </span>
          </span>,
        )
      })
  })
  return <>{out}</>
}

export function Hero({
  block,
  locale,
  homeId,
  isFirst,
}: {
  block: HeroData
  locale: Locale
  homeId?: number
  isFirst: boolean
}) {
  const dark = block.variant !== 'light'
  const lines = block.variant === 'lines'
  const channels = lines && block.visual === 'channels' && !block.image
  const Heading = isFirst ? 'h1' : 'h2'
  const actions = (block.actions ?? [])
    .map((a) => resolveLink(a.link, locale, homeId))
    .filter(Boolean)
  const quickLinks = dark
    ? (block.quickLinks ?? [])
        .map((a) => resolveLink(a.link, locale, homeId))
        .filter((l): l is ResolvedLink => l !== null)
    : []

  return (
    <section
      className={cn(
        'panel mt-4 flex flex-col',
        dark ? 'bg-blue-950 text-white' : 'bg-surface-muted',
      )}
    >
      {block.variant === 'slats' ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <MicroSlats />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 from-35% via-blue-950/70 to-transparent"
          />
        </>
      ) : null}
      {lines ? (
        <>
          <BackgroundPaths className="-z-10 text-blue-300" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-950 from-25% via-blue-950/40 to-transparent"
          />
        </>
      ) : null}
      <div
        className={cn(
          'container-page grid flex-1 gap-12',
          lines ? 'py-16 md:py-24' : 'py-14 md:py-20',
          block.image
            ? 'md:grid-cols-[1.1fr_1fr] md:items-center'
            : channels
              ? 'min-h-[min(80dvh,48rem)] items-end lg:grid-cols-[1.3fr_1fr]'
              : lines
                ? 'min-h-[min(78dvh,46rem)] content-end'
                : dark
                  ? 'min-h-[min(60dvh,36rem)] content-end'
                  : '',
        )}
      >
        <div className={cn('flex flex-col gap-6', lines ? 'max-w-5xl' : 'max-w-3xl')}>
          {block.eyebrow ? (
            <p className={cn('eyebrow', dark && 'eyebrow-dark')}>{block.eyebrow}</p>
          ) : null}
          <Heading className={cn('font-light', lines ? 'text-display' : 'text-h1')}>
            <Title
              title={block.title}
              highlight={block.titleHighlight}
              animate={lines && isFirst}
            />
          </Heading>
          {block.lead ? (
            <p
              className={cn(
                'max-w-[60ch] text-lead font-light',
                dark ? 'text-blue-100' : 'text-muted',
              )}
            >
              {block.lead}
            </p>
          ) : null}
          {actions.length ? (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {actions.map((link, i) => (
                <CmsLink
                  key={i}
                  link={link}
                  appearance={i === 0 ? 'button' : 'line'}
                  variant={dark ? 'signal' : 'primary'}
                  size={lines ? 'lg' : undefined}
                  tone={dark ? 'light' : 'dark'}
                />
              ))}
            </div>
          ) : null}
        </div>
        {channels ? <HeroChannels tags={(block.visualTags ?? []).map((t) => t.label)} /> : null}
        {block.image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Media
              media={block.image}
              fill
              priority={isFirst}
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        ) : null}
      </div>
      {quickLinks.length ? (
        <nav aria-label={block.title} className="relative border-t border-white/10">
          <ul
            className="container-page grid sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
            style={{ '--n': quickLinks.length } as CSSProperties}
          >
            {quickLinks.map((link, i) => (
              <li
                key={link.href}
                className="border-b border-white/10 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <a
                  href={link.href}
                  className="group flex items-center justify-between gap-4 py-6 transition-colors hover:text-teal-200 lg:px-6 lg:group-first:pl-0"
                >
                  <span className="flex items-baseline gap-3 text-h4 font-light">
                    <span className="font-mono text-caption text-teal-300">0{i + 1}</span>
                    {link.label}
                  </span>
                  <span className={roundIconClasses('light', 'group-hover:bg-signal')}>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  )
}
