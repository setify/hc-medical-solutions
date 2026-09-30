import { DownloadSimple } from '@phosphor-icons/react/dist/ssr'

import { CmsLink } from '@/components/cms/CmsLink'
import { Media } from '@/components/cms/Media'
import { RichText } from '@/components/cms/RichText'
import { LogoLoop } from '@/components/effects/LogoLoop'
import { CountUp } from '@/components/text/CountUp'
import { ServiceCard } from '@/components/ui/Card'
import { Accordion, ProcessSteps } from '@/components/ui/Feedback'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { resolveLink } from '@/lib/links'
import type { Page } from '@/payload-types'

import { Section } from './Section'

type Block<T extends string> = Extract<NonNullable<Page['layout']>[number], { blockType: T }>
type Ctx = { locale: Locale; homeId?: number }

export function RichTextSection({ block, locale }: { block: Block<'richText'> } & Ctx) {
  return (
    <Section>
      <RichText data={block.content} locale={locale} />
    </Section>
  )
}

export function TextImage({ block, locale }: { block: Block<'textImage'> } & Ctx) {
  const imageLeft = block.imagePosition === 'left'
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={cn('flex flex-col gap-6', imageLeft && 'md:order-2')}>
          {block.title ? <h2 className="text-h2">{block.title}</h2> : null}
          <RichText data={block.content} locale={locale} />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Media media={block.image} fill sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
      </div>
    </Section>
  )
}

export function TeaserGrid({ block, locale, homeId }: { block: Block<'teaserGrid'> } & Ctx) {
  const items = (block.items ?? []).filter(
    (item) => typeof item.page === 'object' && item.page?.title,
  )
  if (!items.length) return null
  return (
    <Section title={block.title} intro={block.intro}>
      <div
        className={cn(
          'grid gap-4',
          items.length > 1 && 'md:grid-cols-2',
          items.length > 3 && 'lg:grid-cols-[1.2fr_1fr]',
        )}
      >
        {items.map((item, i) => {
          const page = item.page as Exclude<typeof item.page, number>
          const link = resolveLink({ type: 'page', page, label: page.title }, locale, homeId)
          return (
            <ServiceCard
              key={item.id ?? i}
              index={String(i + 1).padStart(2, '0')}
              title={page.title}
              text={item.text ?? ''}
              href={link?.href}
            />
          )
        })}
      </div>
    </Section>
  )
}

export function ProcessStepsSection({ block }: { block: Block<'processSteps'> } & Ctx) {
  return (
    <Section title={block.title} intro={block.intro}>
      <ProcessSteps
        steps={(block.steps ?? []).map((s) => ({ title: s.title, text: s.text ?? '' }))}
      />
    </Section>
  )
}

export function Faq({ block }: { block: Block<'faq'> } & Ctx) {
  return (
    <Section title={block.title}>
      <div className="max-w-4xl">
        <Accordion items={(block.items ?? []).map((i) => ({ q: i.question, a: i.answer }))} />
      </div>
    </Section>
  )
}

export function Quote({ block }: { block: Block<'quote'> } & Ctx) {
  return (
    <Section>
      <figure className="flex max-w-4xl flex-col gap-6 border-l border-accent pl-6 md:pl-10">
        <blockquote className="text-h3 font-light">„{block.quote}“</blockquote>
        {block.author ? (
          <figcaption className="text-small text-muted">
            <span className="text-ink">{block.author}</span>
            {block.role ? `, ${block.role}` : null}
          </figcaption>
        ) : null}
      </figure>
    </Section>
  )
}

export function Stats({ block }: { block: Block<'stats'> } & Ctx) {
  return (
    <Section title={block.title}>
      <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {(block.items ?? []).map((item, i) => (
          <div
            key={item.id ?? i}
            className="flex flex-col gap-2 border-line py-8 odd:pr-6 even:pl-6 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <dt className="order-2 text-small text-muted">{item.label}</dt>
            <dd className="text-h1 font-extralight">
              <CountUp
                to={item.value}
                decimals={item.decimals ?? 0}
                suffix={item.suffix ? ` ${item.suffix}` : ''}
              />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function CallToAction({ block, locale, homeId }: { block: Block<'callToAction'> } & Ctx) {
  const dark = block.variant !== 'light'
  const link = resolveLink(block.link, locale, homeId)
  return (
    <Section tone={dark ? 'dark' : 'muted'}>
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 font-light">{block.title}</h2>
          {block.text ? (
            <p className={cn('text-lead font-light', dark ? 'text-blue-100' : 'text-muted')}>
              {block.text}
            </p>
          ) : null}
        </div>
        <div className="md:justify-self-end">
          <CmsLink link={link} variant={dark ? 'inverse' : 'primary'} />
        </div>
      </div>
    </Section>
  )
}

export function Downloads({ block }: { block: Block<'downloads'> } & Ctx) {
  const docs = (block.documents ?? []).filter((d) => typeof d === 'object' && d?.url)
  return (
    <Section title={block.title}>
      <ul className="divide-y divide-line border-y border-line">
        {docs.map((doc) => {
          if (typeof doc !== 'object') return null
          const kb = doc.filesize ? Math.round(doc.filesize / 1024) : null
          return (
            <li key={doc.id}>
              <a
                href={doc.url ?? '#'}
                download
                className="group/dl flex items-center justify-between gap-6 py-5 transition-colors hover:text-accent-strong"
              >
                <span className="text-h4">{doc.title}</span>
                <span className="flex shrink-0 items-center gap-3 text-small text-muted group-hover/dl:text-accent-strong">
                  PDF{kb ? ` · ${kb.toLocaleString('de-DE')} KB` : ''}
                  <DownloadSimple aria-hidden="true" className="size-5" />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export function PartnerLogos({ block }: { block: Block<'partnerLogos'> } & Ctx) {
  const logos = (block.logos ?? []).filter((l) => typeof l === 'object' && l?.url)
  if (!logos.length) return null
  return (
    <Section title={block.title}>
      <LogoLoop
        label={block.title ?? 'Partner'}
        items={logos.map((logo) => {
          const m = logo as Exclude<typeof logo, number>
          return {
            name: m.alt,
            // eslint-disable-next-line @next/next/no-img-element
            mark: <img src={m.url ?? ''} alt="" className="size-8 object-contain" />,
          }
        })}
      />
    </Section>
  )
}
