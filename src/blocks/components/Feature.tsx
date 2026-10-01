import {
  ArrowsClockwise,
  CalendarCheck,
  Certificate,
  ChartBar,
  Clock,
  Compass,
  Desktop,
  Eye,
  House,
  Lightbulb,
  ListMagnifyingGlass,
  MagnifyingGlass,
  Package,
  Path,
  PiggyBank,
  Quotes,
  SealCheck,
  Stack,
  Thermometer,
  TrendUp,
  Truck,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

import { CmsLink } from '@/components/cms/CmsLink'
import { Media } from '@/components/cms/Media'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { resolveLink } from '@/lib/links'
import type { Page } from '@/payload-types'

type Block<T extends string> = Extract<NonNullable<Page['layout']>[number], { blockType: T }>
type Ctx = { locale: Locale; homeId?: number }

const icons: Record<string, typeof SealCheck> = {
  original: SealCheck,
  savings: PiggyBank,
  stock: Package,
  transparency: Eye,
  traceability: ListMagnifyingGlass,
  decision: ChartBar,
  calendar: CalendarCheck,
  temperature: Thermometer,
  inventory: Stack,
  delivery: Truck,
  certificate: Certificate,
  check: MagnifyingGlass,
  recall: ArrowsClockwise,
  idea: Lightbulb,
  route: Path,
  freedom: Compass,
  growth: TrendUp,
  clock: Clock,
  home: House,
  family: UsersThree,
  equipment: Desktop,
}

/** Absätze aus einem Textfeld (Leerzeile oder Zeilenumbruch trennt). */
function Paragraphs({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null
  return (
    <>
      {text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className={className}>
            {p}
          </p>
        ))}
    </>
  )
}

/** Kopf eines Abschnitts: Kennzeichnung, Überschrift, Einleitung – links, Einleitung rechts daneben. */
function Head({
  eyebrow,
  title,
  intro,
  dark,
}: {
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  dark?: boolean
}) {
  if (!eyebrow && !title && !intro) return null
  return (
    <header className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
      <div className="flex flex-col gap-5">
        {eyebrow ? <p className={cn('eyebrow', dark && 'eyebrow-dark')}>{eyebrow}</p> : null}
        {title ? <h2 className="text-h1 font-light">{title}</h2> : null}
      </div>
      {intro ? (
        <p
          className={cn('max-w-[52ch] text-lead font-light', dark ? 'text-teal-100' : 'text-muted')}
        >
          {intro}
        </p>
      ) : null}
    </header>
  )
}

/** Symbol im Kreis (Kundenvorlage) – nur als Kennung einer Kachel. */
function IconRing({ name, dark }: { name?: string | null; dark?: boolean }) {
  const I = icons[name ?? ''] ?? SealCheck
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-14 shrink-0 place-items-center rounded-full border transition-colors duration-500',
        dark
          ? 'border-white/15 bg-white/5 text-teal-300'
          : 'border-line bg-surface text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-white',
      )}
    >
      <I weight="light" className="size-6" />
    </span>
  )
}

/** Zwei bis drei Aussagen als große Karten nebeneinander (z. B. Startseite unter dem Hero). */
export function Columns({ block }: { block: Block<'columns'> } & Ctx) {
  const items = block.items ?? []
  if (block.layout === 'alternating') return <ColumnsAlternating block={block} />
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Head eyebrow={block.eyebrow} title={block.title} />
        <div
          className={cn(
            'grid gap-4',
            items.length > 1 && 'md:grid-cols-2',
            items.length > 2 && 'lg:grid-cols-3',
          )}
        >
          {items.map((item, i) => (
            <article
              key={item.id ?? i}
              className="relative flex flex-col gap-6 overflow-hidden rounded-xl bg-surface p-8 ring-1 ring-line/60 ring-inset md:p-12"
            >
              {/* Dekorative Ziffer als CSS-Inhalt: kein Text für Screenreader und Kontrastprüfung. */}
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, '0')}
                className="pointer-events-none absolute -top-4 right-4 text-[9rem] leading-none font-extralight tracking-tighter text-frost-100 select-none before:content-[attr(data-n)]"
              />
              <span aria-hidden="true" className="relative h-10 w-px bg-signal" />
              <h2 className="relative max-w-[18ch] text-h2 font-light">{item.title}</h2>
              <div className="relative flex flex-col gap-4">
                <Paragraphs text={item.text} className="max-w-[52ch] text-body text-muted" />
              </div>
              {item.highlight ? (
                <p className="relative mt-auto rounded-lg bg-blue-950 px-6 py-5 text-h4 font-light text-white">
                  {item.highlight}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Kacheln mit Symbol im Kreis; optional eine dunkle Aktionskachel, die das Raster schließt. */
export function Features({ block, locale, homeId }: { block: Block<'features'> } & Ctx) {
  const items = block.items ?? []
  const teal = block.tone === 'teal'
  const muted = block.tone === 'muted'
  const cta = block.cta?.enabled ? block.cta : null
  const ctaLink = cta ? resolveLink(cta.link, locale, homeId) : null
  const count = items.length + (cta ? 1 : 0)

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        (teal || muted) && 'panel my-4',
        teal && 'bg-teal-900 text-white',
        muted && 'bg-surface-muted',
      )}
    >
      <div className="container-page">
        <Head eyebrow={block.eyebrow} title={block.title} intro={block.intro} dark={teal} />
        <ul
          className={cn(
            'grid gap-4',
            count > 1 && 'sm:grid-cols-2',
            count % 3 === 0 || count > 4 ? 'lg:grid-cols-3' : count === 4 && 'lg:grid-cols-2',
          )}
        >
          {items.map((item, i) => (
            <li
              key={item.id ?? i}
              className={cn(
                'group flex flex-col gap-10 rounded-lg p-7 transition-colors duration-500 md:p-8',
                teal
                  ? 'bg-white/5 ring-1 ring-white/10 ring-inset'
                  : 'bg-surface ring-1 ring-line/70 ring-inset hover:ring-blue-300',
              )}
            >
              <IconRing name={item.icon} dark={teal} />
              <div className="flex flex-col gap-3">
                <h3 className="text-h4">{item.title}</h3>
                {item.text ? (
                  <p className={cn('text-small', teal ? 'text-teal-100' : 'text-muted')}>
                    {item.text}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
          {cta ? (
            <li
              className={cn(
                'relative isolate flex flex-col justify-between gap-8 overflow-hidden rounded-lg p-7 text-white md:p-8',
                teal ? 'bg-blue-950' : 'bg-blue-950',
              )}
            >
              <span
                aria-hidden="true"
                className="bg-slats absolute inset-0 -z-10 [--pattern:rgb(86_219_209/0.08)]"
              />
              <div className="flex flex-col gap-3">
                {cta.title ? <h3 className="text-h3 font-light">{cta.title}</h3> : null}
                {cta.text ? <p className="text-small text-blue-100">{cta.text}</p> : null}
              </div>
              {ctaLink ? (
                <div>
                  <CmsLink link={ctaLink} variant="signal" />
                </div>
              ) : null}
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  )
}

/** Großes Statement mit Text und Stichworten als Pillen. */
export function Statement({ block }: { block: Block<'statement'> } & Ctx) {
  const teal = block.tone === 'teal'
  const dark = block.tone === 'dark'
  const onDark = teal || dark
  const tags = block.tags ?? []

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        onDark && 'panel my-4 md:py-28',
        teal && 'bg-teal-900 text-white',
        dark && 'bg-blue-950 text-white',
      )}
    >
      {onDark ? (
        <span
          aria-hidden="true"
          className="bg-slats pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 [mask-image:linear-gradient(90deg,transparent,#000)] [--pattern:rgb(255_255_255/0.04)]"
        />
      ) : null}
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          {block.eyebrow ? (
            <p className={cn('eyebrow', onDark && 'eyebrow-dark')}>{block.eyebrow}</p>
          ) : null}
          <h2 className="text-h1 font-light">{block.title}</h2>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            {(block.text ?? '')
              .split(/\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, i) => (
                <p
                  key={i}
                  className={cn(
                    i === 0 ? 'text-h3 font-light' : 'text-lead font-light',
                    i === 0
                      ? onDark
                        ? 'text-white'
                        : 'text-ink'
                      : onDark
                        ? 'text-teal-100'
                        : 'text-muted',
                  )}
                >
                  {p}
                </p>
              ))}
          </div>
          {tags.length ? (
            <ul className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <li
                  key={t.id ?? i}
                  className={cn(
                    'inline-flex h-10 items-center gap-2.5 rounded-full px-4 text-small',
                    onDark
                      ? 'bg-white/8 text-white ring-1 ring-white/15 ring-inset'
                      : 'bg-surface text-ink ring-1 ring-line ring-inset',
                  )}
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                  {t.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** Personen im Zickzack: Porträt, Funktion, Biografie und optional ein großes Zitat. */
export function Team({ block }: { block: Block<'team'> } & Ctx) {
  const members = block.members ?? []
  return (
    <section className="panel my-4 bg-surface-muted py-16 md:py-24">
      <div className="container-page">
        <Head eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="flex flex-col gap-6">
          {members.map((m, i) => (
            <article
              key={m.id ?? i}
              className="grid overflow-hidden rounded-xl bg-surface md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <div
                className={cn(
                  'relative min-h-72 bg-frost-200 md:min-h-[26rem]',
                  i % 2 === 1 && 'md:order-2',
                )}
              >
                <Media
                  media={m.image}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-[50%_30%]"
                />
              </div>
              <div className="flex flex-col gap-6 p-8 md:p-12">
                <div className="flex flex-col gap-3">
                  {m.role ? (
                    <p className="inline-flex self-start rounded-full bg-teal-50 px-3 py-1 text-caption text-teal-800 ring-1 ring-teal-100 ring-inset">
                      {m.role}
                    </p>
                  ) : null}
                  <h3 className="text-h2 font-light">{m.name}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <Paragraphs text={m.bio} className="max-w-[58ch] text-body text-muted" />
                </div>
                {m.quote ? (
                  <figure className="mt-4 flex flex-col gap-4 rounded-lg bg-blue-950 p-6 text-white md:p-8">
                    <Quotes aria-hidden="true" weight="fill" className="size-8 text-signal" />
                    <blockquote className="text-lead font-light">{m.quote}</blockquote>
                    <figcaption className="text-caption text-blue-200">{m.name}</figcaption>
                  </figure>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Aussagen als Bild-Text-Paare im Wechsel (Vorlage VL6 der Sektionsbibliothek). */
function ColumnsAlternating({ block }: { block: Block<'columns'> }) {
  const items = block.items ?? []
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Head eyebrow={block.eyebrow} title={block.title} />
        <div className="flex flex-col gap-20 md:gap-28">
          {items.map((item, i) => (
            <article
              key={item.id ?? i}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div
                className={cn(
                  'relative aspect-[5/4] overflow-hidden rounded-xl bg-surface-sunken',
                  i % 2 === 1 && 'md:order-2',
                )}
              >
                <Media media={item.image} fill sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
              <div className="flex flex-col gap-6">
                <span aria-hidden="true" className="h-10 w-px bg-signal" />
                <h2 className="text-h1 font-light">{item.title}</h2>
                <div className="flex flex-col gap-4">
                  <Paragraphs text={item.text} className="max-w-[52ch] text-body text-muted" />
                </div>
                {item.highlight ? (
                  <p className="max-w-[46ch] border-l-2 border-signal pl-5 text-h4 font-light text-ink">
                    {item.highlight}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
