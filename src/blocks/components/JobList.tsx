import { getTranslations } from 'next-intl/server'

import { EmptyState } from '@/components/ui/Feedback'
import { JobCard } from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { getJoinJobs, workplaceKey } from '@/lib/join'
import type { Locale } from '@/i18n/routing'
import type { Page, Setting } from '@/payload-types'

import { Section } from './Section'

type Block = Extract<NonNullable<Page['layout']>[number], { blockType: 'jobList' }>

/** Offene Stellen aus JOIN – serverseitig geladen, im HC-Design dargestellt. */
export async function JobList({
  block,
  locale,
  settings,
}: {
  block: Block
  locale: Locale
  settings: Setting
}) {
  const t = await getTranslations({ locale, namespace: 'Jobs' })
  const jobs = await getJoinJobs(settings.joinWidgetToken)
  const companyUrl = settings.joinCompanyUrl || 'https://join.com'

  return (
    <Section title={block.title} intro={block.intro}>
      {jobs === null ? (
        <EmptyState
          title={t('error')}
          text=""
          action={
            <ButtonLink
              href={companyUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('errorLink')}
              <span className="sr-only"> ({t('opensJoin')})</span>
            </ButtonLink>
          }
        />
      ) : jobs.length === 0 ? (
        <EmptyState title={block.emptyText || t('empty')} text="" />
      ) : (
        <div>
          <p className="mb-4 text-small text-muted" aria-live="polite">
            {t('count', { count: jobs.length })}
          </p>
          <div className="border-t border-line">
            {jobs.map((job) => {
              const wp = workplaceKey(job.workplaceType)
              const meta = [
                job.city?.cityName ? { icon: 'location' as const, text: job.city.cityName } : null,
                wp ? { icon: 'workplace' as const, text: t(`workplace.${wp}`) } : null,
                job.employmentType ? { icon: 'type' as const, text: job.employmentType } : null,
              ].filter((m): m is NonNullable<typeof m> => m !== null)
              return (
                <JobCard
                  key={job.url}
                  title={job.title}
                  href={job.url}
                  meta={meta}
                  actionLabel={t('apply')}
                  external
                  externalHint={t('opensJoin')}
                />
              )
            })}
          </div>
        </div>
      )}
    </Section>
  )
}
