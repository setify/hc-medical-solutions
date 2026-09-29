import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { SecButtons, SecForms } from './_components/SecActions'
import { SecCards } from './_components/SecCards'
import { SecColor } from './_components/SecColor'
import { SecFeedback, SecNavigation } from './_components/SecFeedback'
import { SecAudit, SecBrand, SecPrinciples } from './_components/SecFoundation'
import { SecLayout } from './_components/SecLayout'
import { SecBackgrounds, SecOpen, SecText } from './_components/SecMotion'
import { SecType } from './_components/SecType'
import { SgHero } from './_components/SgHero'
import { SgNav } from './_components/SgNav'

/**
 * Interner Styleguide / Designsystem (nur Deutsch, nicht indexiert).
 * Grundlage: HC_Rebranding_Logoblatt_Hausfarben_1023.pdf (Honegger&Bregenzer, 09/2023).
 */
export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'de' }]
}

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const sections = [
  { id: 'audit', no: '00', label: 'Audit' },
  { id: 'prinzipien', no: '01', label: 'Prinzipien' },
  { id: 'marke', no: '02', label: 'Marke & Logo' },
  { id: 'farbe', no: '03', label: 'Farbe' },
  { id: 'typografie', no: '04', label: 'Typografie' },
  { id: 'raster', no: '05', label: 'Raster & Tiefe' },
  { id: 'buttons', no: '06', label: 'Buttons' },
  { id: 'formulare', no: '07', label: 'Formulare' },
  { id: 'cards', no: '08', label: 'Cards' },
  { id: 'dialoge', no: '09', label: 'Dialoge & Feedback' },
  { id: 'navigation', no: '10', label: 'Navigation' },
  { id: 'textanimation', no: '11', label: 'Text in Bewegung' },
  { id: 'hintergruende', no: '12', label: 'Hintergründe' },
  { id: 'offen', no: '13', label: 'Offene Punkte' },
]

export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <SgHero />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <aside>
          <SgNav sections={sections} />
        </aside>
        <div className="min-w-0">
          <SecAudit />
          <SecPrinciples />
          <SecBrand />
          <SecColor />
          <SecType />
          <SecLayout />
          <SecButtons />
          <SecForms />
          <SecCards />
          <SecFeedback />
          <SecNavigation />
          <SecText />
          <SecBackgrounds />
          <SecOpen />
        </div>
      </div>
    </>
  )
}
