'use client'

import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useRef, useState } from 'react'

import { Alert } from '@/components/ui/Feedback'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Field'
import { issueFormToken, submitContact } from '@/lib/contact-action'
import { CONTACT_MESSAGE_MAX, type ContactField, type ContactState } from '@/lib/contact-schema'

const ORDER: ContactField[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'topic',
  'message',
  'consent',
]

export function ContactForm({
  locale,
  topics,
  privacyText,
  successText,
}: {
  locale: string
  topics: string[]
  privacyText: string
  successText?: string | null
}) {
  const t = useTranslations('Contact')
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: 'idle',
  })
  const [token, setToken] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    issueFormToken()
      .then(setToken)
      .catch(() => setToken(''))
  }, [])

  const fields = state.status === 'error' ? (state.fields ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}
  const err = (f: ContactField) =>
    fields[f] ? t(`errors.${fields[f]}` as 'errors.required') : undefined

  // Nach dem Absenden: Fokus auf erstes fehlerhaftes Feld bzw. auf die Statusmeldung.
  useEffect(() => {
    if (state.status === 'error' && state.fields) {
      const first = ORDER.find((f) => state.fields?.[f])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    } else if (state.status !== 'idle') {
      statusRef.current?.focus()
    }
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex max-w-2xl items-start gap-4 border-l-2 border-success-700 bg-success-50 p-6 focus-visible:outline-none"
      >
        <CheckCircle
          aria-hidden="true"
          weight="fill"
          className="mt-0.5 size-6 shrink-0 text-success-700"
        />
        <p className="text-body text-ink">{successText || t('success')}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={action} noValidate className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="token" value={token} />
      {/* Honeypot: für Menschen unsichtbar, von Screenreadern ignoriert */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {state.status === 'error' ? (
        <div ref={statusRef} tabIndex={-1} className="focus-visible:outline-none sm:col-span-2">
          <Alert tone="danger" title={t(`errors.${state.code}`)} />
        </div>
      ) : null}

      <Field label={t('firstName')} required error={err('firstName')}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            name="firstName"
            autoComplete="given-name"
            required
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.firstName}
          />
        )}
      </Field>
      <Field label={t('lastName')} required error={err('lastName')}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            name="lastName"
            autoComplete="family-name"
            required
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.lastName}
          />
        )}
      </Field>
      <Field label={t('email')} required error={err('email')} className="sm:col-span-2">
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.email}
          />
        )}
      </Field>
      <Field label={t('phone')} optionalLabel={t('optional')} error={err('phone')}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.phone}
          />
        )}
      </Field>
      <Field label={t('topic')} required error={err('topic')}>
        {({ id, describedBy, invalid }) => (
          <Select
            id={id}
            name="topic"
            required
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.topic ?? ''}
          >
            <option value="" disabled>
              {t('topicPlaceholder')}
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field
        label={t('message')}
        required
        hint={t('messageHint')}
        error={err('message')}
        className="sm:col-span-2"
      >
        {({ id, describedBy, invalid }) => (
          <Textarea
            id={id}
            name="message"
            required
            maxLength={CONTACT_MESSAGE_MAX}
            aria-describedby={describedBy}
            invalid={invalid}
            defaultValue={values.message}
          />
        )}
      </Field>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Checkbox
          name="consent"
          required
          aria-invalid={Boolean(fields.consent) || undefined}
          label={
            <>
              {privacyText}
              <span aria-hidden="true" className="text-danger">
                {' '}
                *
              </span>
            </>
          }
        />
        {fields.consent ? <p className="text-caption text-danger">{err('consent')}</p> : null}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-caption text-muted">* {t('required')}</p>
        <Button
          type="submit"
          loading={pending}
          disabled={!token}
          iconRight={<ArrowRight className="size-4" />}
        >
          {pending ? t('sending') : t('submit')}
        </Button>
      </div>
    </form>
  )
}
