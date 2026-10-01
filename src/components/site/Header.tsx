import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import { getTranslations } from 'next-intl/server'

import { Logo } from '@/components/brand/Logo'
import { CmsLink } from '@/components/cms/CmsLink'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { Locale } from '@/i18n/routing'
import type { Globals } from '@/lib/cms'
import { cn } from '@/lib/cn'
import { homePageId } from '@/lib/cms'
import { resolveLink } from '@/lib/links'

import { MobileMenu } from './MobileMenu'
import { buildNav, isActive } from './nav'

export async function Header({
  locale,
  globals,
  current,
  alternates,
}: {
  locale: Locale
  globals: Globals
  current: string
  alternates: Partial<Record<Locale, string>>
}) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const homeId = homePageId(globals.settings)
  const items = buildNav(globals.navigation, locale, homeId)
  const cta = globals.navigation.cta?.enabled
    ? resolveLink(globals.navigation.cta.link, locale, homeId)
    : null

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4 lg:px-6">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 rounded-full border border-line/70 bg-surface/95 pr-2 pl-5 shadow-sm backdrop-blur-sm sm:pl-6">
        <a href={`/${locale}`} className="inline-block shrink-0 rounded-sm">
          <Logo className="h-9 w-auto" />
          <span className="sr-only">{t('home')}</span>
        </a>

        <nav aria-label={t('mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full bg-surface-muted p-1">
            {items.map((item) => {
              const active =
                isActive(item.href, current) || item.children.some((c) => isActive(c.href, current))
              const linkClass = cn(
                'relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-small transition-colors hover:text-ink',
                active
                  ? 'bg-surface text-ink shadow-xs before:size-1.5 before:rounded-full before:bg-signal before:content-[""]'
                  : 'text-muted hover:bg-surface/60',
              )
              if (!item.children.length) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={item.href === current ? 'page' : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              }
              return (
                <li key={item.href} className="relative">
                  <details className="group/sub [&_summary::-webkit-details-marker]:hidden">
                    <summary className={cn(linkClass, 'cursor-pointer list-none')}>
                      {item.label}
                      <CaretDown
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-open/sub:rotate-180"
                      />
                    </summary>
                    <ul
                      aria-label={t('submenu', { label: item.label })}
                      className="absolute top-full left-0 mt-3 min-w-64 rounded-lg border border-line bg-surface p-2 shadow-md"
                    >
                      <li>
                        <a
                          href={item.href}
                          className="block rounded-md px-4 py-2.5 text-small hover:bg-surface-muted"
                        >
                          {item.label}
                        </a>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            aria-current={child.href === current ? 'page' : undefined}
                            className={cn(
                              'block rounded-md px-4 py-2.5 text-small hover:bg-surface-muted',
                              child.href === current && 'text-accent-strong',
                            )}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} alternates={alternates} />
          </div>
          {cta ? (
            <div className="hidden lg:block">
              <CmsLink link={cta} variant="dark" />
            </div>
          ) : null}
          <MobileMenu
            items={cta ? [...items, { ...cta, children: [] }] : items}
            current={current}
            labels={{ open: t('menu'), close: t('closeMenu'), nav: t('mainNav') }}
            footer={<LanguageSwitcher locale={locale} alternates={alternates} />}
          />
        </div>
      </div>
    </header>
  )
}
