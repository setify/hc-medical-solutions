import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'

import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

/** Rich Text aus dem CMS in der Typografie .prose-hc; interne Links zeigen auf die Seite der aktuellen Sprache. */
export function RichText({
  data,
  locale,
  className,
}: {
  data: SerializedEditorState | null | undefined
  locale: Locale
  className?: string
}) {
  if (!data) return null

  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({
      internalDocToHref: ({ linkNode }) => {
        const doc = linkNode.fields.doc?.value
        const path = typeof doc === 'object' && doc && 'path' in doc ? String(doc.path ?? '') : ''
        return `/${locale}${path}`
      },
    }),
  })

  return (
    <LexicalRichText data={data} converters={converters} className={cn('prose-hc', className)} />
  )
}
