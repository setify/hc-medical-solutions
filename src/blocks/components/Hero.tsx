import MicroSlats from '@/components/effects/MicroSlats'
import { CmsLink } from '@/components/cms/CmsLink'
import { Media } from '@/components/cms/Media'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { resolveLink } from '@/lib/links'
import type { Page } from '@/payload-types'

type HeroData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

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
  const Heading = isFirst ? 'h1' : 'h2'
  const actions = (block.actions ?? [])
    .map((a) => resolveLink(a.link, locale, homeId))
    .filter(Boolean)

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        dark ? 'bg-petrol-950 text-white' : 'bg-surface',
      )}
    >
      {block.variant === 'slats' ? (
        <>
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
            <MicroSlats />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-petrol-950 from-35% via-petrol-950/70 to-transparent"
          />
        </>
      ) : null}
      <div
        className={cn(
          'container-page grid gap-12 py-16 md:py-24',
          block.image
            ? 'md:grid-cols-[1.1fr_1fr] md:items-center'
            : 'min-h-[min(60dvh,36rem)] content-end',
        )}
      >
        <div className="flex max-w-3xl flex-col gap-6">
          {block.eyebrow ? (
            <p className={cn('eyebrow', dark && 'text-petrol-200 before:bg-blue-200')}>
              {block.eyebrow}
            </p>
          ) : null}
          <Heading className="text-h1 font-light">{block.title}</Heading>
          {block.lead ? (
            <p
              className={cn(
                'max-w-[56ch] text-lead font-light',
                dark ? 'text-petrol-100' : 'text-muted',
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
                  variant={dark ? 'inverse' : 'primary'}
                  tone={dark ? 'light' : 'dark'}
                />
              ))}
            </div>
          ) : null}
        </div>
        {block.image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Media
              media={block.image}
              fill
              priority={isFirst}
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
