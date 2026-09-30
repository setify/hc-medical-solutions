import nodemailer from 'nodemailer'

import type { ContactInput } from '@/lib/contact-schema'

/** SMTP-Versand. Zugangsdaten ausschließlich aus Umgebungsvariablen. */
function transport() {
  const host = process.env.SMTP_HOST
  if (!host) return null
  const port = Number(process.env.SMTP_PORT || 587)
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  })
}

const escapeHtml = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

/** Versendet eine Kontaktanfrage. Es wird nichts gespeichert oder protokolliert. */
export async function sendContactMail(
  data: ContactInput,
  recipient: string,
  locale: string,
): Promise<boolean> {
  const t = transport()
  if (!t) return false

  const rows: [string, string][] = [
    ['Name', `${data.firstName} ${data.lastName}`],
    ['E-Mail', data.email],
    ['Telefon', data.phone || '–'],
    ['Anliegen', data.topic],
    ['Sprache', locale.toUpperCase()],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}\n`
  const html = `<table cellpadding="4">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`

  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || 'Website <no-reply@hc-medical-solutions.com>',
      to: recipient,
      replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
      subject: `Kontaktanfrage (${locale.toUpperCase()}): ${data.topic}`,
      text,
      html,
    })
    return true
  } catch {
    return false
  }
}
