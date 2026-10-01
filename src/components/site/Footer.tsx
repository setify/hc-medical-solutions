import { getTranslations } from 'next-intl/server'

import { Logo } from '@/components/brand/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { Locale } from '@/i18n/routing'
import { type Globals, homePageId } from '@/lib/cms'
import { resolveLink, type ResolvedLink } from '@/lib/links'

export async function Footer({
  locale,
  globals,
  alternates,
}: {
  locale: Locale
  globals: Globals
  alternates: Partial<Record<Locale, string>>
}) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const homeId = homePageId(globals.settings)
  const org = globals.settings.organization
  const columns = (globals.footer.columns ?? []).map((col) => ({
    title: col.title,
    links: (col.links ?? [])
      .map((l) => resolveLink(l.link, locale, homeId))
      .filter((l): l is ResolvedLink => l !== null),
  }))
  const legal = (globals.footer.legalLinks ?? [])
    .map((l) => resolveLink(l.link, locale, homeId))
    .filter((l): l is ResolvedLink => l !== null)

  return (
    <footer className="px-3 pt-16 pb-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-xl bg-blue-950 text-white">
        <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-6">
            <Logo variant="weiss" className="h-10 w-auto self-start" />
            {org?.name ? (
              <address className="text-small text-blue-100 not-italic">
                <span className="text-white">{org.name}</span>
                {org.street ? (
                  <>
                    <br />
                    {org.street}
                  </>
                ) : null}
                {org.postalCode || org.city ? (
                  <>
                    <br />
                    {[org.postalCode, org.city].filter(Boolean).join(' ')}
                  </>
                ) : null}
                {org.country ? (
                  <>
                    <br />
                    {org.country}
                  </>
                ) : null}
                {org.phone ? (
                  <>
                    <br />
                    <a
                      href={`tel:${org.phone.replace(/[^+\d]/g, '')}`}
                      className="hover:text-white"
                    >
                      {org.phone}
                    </a>
                  </>
                ) : null}
                {org.email ? (
                  <>
                    <br />
                    <a href={`mailto:${org.email}`} className="hover:text-white">
                      {org.email}
                    </a>
                  </>
                ) : null}
              </address>
            ) : null}
          </div>
          {columns.map((col, i) => (
            <nav key={i} aria-label={col.title ?? t('footerNav')} className="flex flex-col gap-4">
              {col.title ? <p className="text-small text-blue-200">{col.title}</p> : null}
              <ul className="flex flex-wrap gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex h-10 items-center rounded-full bg-white/5 px-4 text-small text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="container-page" aria-hidden="true">
          <Logo
            variant="weiss"
            decorative
            className="h-auto w-full border-t border-white/10 pt-10 opacity-[0.12]"
          />
        </div>
        <div className="mt-10 border-t border-white/10">
          <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label={t('legal')}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-caption text-blue-200">
                <li>
                  © {new Date().getFullYear()} {org?.name || 'HC Medical Solutions'}
                </li>
                {legal.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageSwitcher locale={locale} alternates={alternates} tone="light" />
          </div>
        </div>
      </div>
    </footer>
  )
}
