import type { Locale } from '@/i18n/routing'
import type { Page, Setting } from '@/payload-types'

import { ContactForm } from './components/ContactForm'
import {
  CallToAction,
  Downloads,
  Faq,
  PartnerLogos,
  ProcessStepsSection,
  Quote,
  RichTextSection,
  Stats,
  TeaserGrid,
  TextImage,
} from './components/Content'
import { Columns, Features, Statement, Team } from './components/Feature'
import { Hero } from './components/Hero'
import { JobList } from './components/JobList'
import { Section } from './components/Section'

/** Rendert die Inhaltsblöcke einer Seite. Unbekannte Blocktypen werden übersprungen. */
export function RenderBlocks({
  blocks,
  locale,
  settings,
  homeId,
}: {
  blocks: Page['layout']
  locale: Locale
  settings: Setting
  homeId?: number
}) {
  if (!blocks?.length) return null
  const ctx = { locale, homeId }

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} isFirst={i === 0} {...ctx} />
          case 'columns':
            return <Columns key={key} block={block} {...ctx} />
          case 'features':
            return <Features key={key} block={block} {...ctx} />
          case 'statement':
            return <Statement key={key} block={block} {...ctx} />
          case 'team':
            return <Team key={key} block={block} {...ctx} />
          case 'richText':
            return <RichTextSection key={key} block={block} {...ctx} />
          case 'textImage':
            return <TextImage key={key} block={block} {...ctx} />
          case 'teaserGrid':
            return <TeaserGrid key={key} block={block} {...ctx} />
          case 'processSteps':
            return <ProcessStepsSection key={key} block={block} {...ctx} />
          case 'faq':
            return <Faq key={key} block={block} {...ctx} />
          case 'quote':
            return <Quote key={key} block={block} {...ctx} />
          case 'stats':
            return <Stats key={key} block={block} {...ctx} />
          case 'callToAction':
            return <CallToAction key={key} block={block} {...ctx} />
          case 'downloads':
            return <Downloads key={key} block={block} {...ctx} />
          case 'partnerLogos':
            return <PartnerLogos key={key} block={block} {...ctx} />
          case 'jobList':
            return <JobList key={key} block={block} locale={locale} settings={settings} />
          case 'contactForm':
            return (
              <Section key={key} title={block.title} intro={block.intro}>
                <div className="max-w-3xl rounded-xl bg-surface p-6 shadow-sm ring-1 ring-line/60 sm:p-10">
                  <ContactForm
                    locale={locale}
                    topics={(block.topics ?? []).map((t) => t.label)}
                    privacyText={block.privacyText}
                    successText={block.successText}
                  />
                </div>
              </Section>
            )
          default:
            return null
        }
      })}
    </>
  )
}
