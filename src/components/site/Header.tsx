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
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <a href={`/${locale}`} className="inline-block shrink-0 rounded-sm">
          <Logo className="h-9 w-auto" />
          <span className="sr-only">{t('home')}</span>
        </a>

        <nav aria-label={t('mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => {
              const active =
                isActive(item.href, current) || item.children.some((c) => isActive(c.href, current))
              const linkClass = cn(
                'relative inline-flex items-center gap-1.5 py-6 text-small transition-colors hover:text-ink',
                active
                  ? 'text-ink after:absolute after:inset-x-0 after:bottom-4 after:h-px after:bg-accent'
                  : 'text-muted',
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
                      className="absolute top-full left-0 min-w-64 border border-line bg-surface py-2 shadow-md"
                    >
                      <li>
                        <a
                          href={item.href}
                          className="block px-5 py-2.5 text-small hover:bg-surface-muted"
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
                              'block px-5 py-2.5 text-small hover:bg-surface-muted',
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

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} alternates={alternates} />
          </div>
          {cta ? (
            <div className="hidden lg:block">
              <CmsLink link={cta} />
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
