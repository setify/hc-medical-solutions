import { z } from 'zod'

/*
 * Validierung des Kontaktformulars – gemeinsam für Browser und Server.
 * Fehlermeldungen sind Schlüssel (z. B. "required"), die Übersetzung liegt in src/messages/*.json → Contact.errors.
 */

export const CONTACT_MESSAGE_MAX = 2000

const required = (max = 200) => z.string().trim().min(1, 'required').max(max, 'tooLong')

export const contactSchema = z.object({
  firstName: required(),
  lastName: required(),
  email: z.string().trim().min(1, 'required').pipe(z.email('email')),
  phone: z.string().trim().max(50, 'tooLong').optional().default(''),
  topic: z.string().trim().min(1, 'topic').max(200, 'tooLong'),
  message: required(CONTACT_MESSAGE_MAX),
  consent: z.literal('on', { error: 'consent' }),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput
export type ContactErrors = Partial<Record<ContactField, string>>

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      code: 'form' | 'spam' | 'rate' | 'send'
      fields?: ContactErrors
      values?: Partial<Record<ContactField, string>>
    }

/** Validiert Formulardaten und liefert Feldfehler als Schlüssel. */
export function validateContact(
  input: Record<string, unknown>,
): { ok: true; data: ContactInput } | { ok: false; fields: ContactErrors } {
  const result = contactSchema.safeParse(input)
  if (result.success) return { ok: true, data: result.data }
  const fields: ContactErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField
    if (!fields[key]) fields[key] = issue.message
  }
  return { ok: false, fields }
}
