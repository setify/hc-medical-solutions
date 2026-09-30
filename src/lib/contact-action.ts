'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/cms'
import { type ContactField, type ContactState, validateContact } from '@/lib/contact-schema'
import { sendContactMail } from '@/lib/mail'
import { allowRequest, checkFormToken } from '@/lib/spam-guard'

const FIELDS: ContactField[] = ['firstName', 'lastName', 'email', 'phone', 'topic', 'message']

/** Server Action des Kontaktformulars. Anfragen werden nur per E-Mail versendet, nicht gespeichert. */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? '')]))

  // Honeypot und Zeitsperre
  if (String(formData.get('website') ?? '') !== '') return { status: 'error', code: 'spam' }
  if (checkFormToken(String(formData.get('token') ?? '')) !== 'ok')
    return { status: 'error', code: 'spam', values }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  // Rate-Limit nur in Produktion; lokal kommen alle Anfragen von localhost. Für E2E abschaltbar.
  const rateLimited =
    process.env.NODE_ENV === 'production' && process.env.CONTACT_RATE_LIMIT !== 'off'
  if (rateLimited && !allowRequest(ip)) {
    return { status: 'error', code: 'rate', values }
  }

  const validation = validateContact({ ...values, consent: formData.get('consent') ?? undefined })
  if (!validation.ok) return { status: 'error', code: 'form', fields: validation.fields, values }

  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings', depth: 0 })
  const recipient = settings.contactRecipient
  const locale = String(formData.get('locale') ?? 'de')
  if (!recipient) return { status: 'error', code: 'send', values }

  const sent = await sendContactMail(validation.data, recipient, locale)
  return sent ? { status: 'success' } : { status: 'error', code: 'send', values }
}

/**
 * Liefert das signierte Zeit-Token beim Laden des Formulars.
 * Nötig, weil Seiten statisch gecacht werden und ein Token im HTML veralten würde.
 */
export async function issueFormToken(): Promise<string> {
  const { createFormToken } = await import('@/lib/spam-guard')
  return createFormToken()
}
