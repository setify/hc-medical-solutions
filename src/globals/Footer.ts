import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { linkField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Website' },
  access: { read: anyone, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'columns',
      label: 'Spalten',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', label: 'Überschrift', type: 'text', localized: true },
        { name: 'links', label: 'Links', type: 'array', fields: [linkField] },
      ],
    },
    {
      name: 'legalLinks',
      label: 'Rechtliches (Impressum, Datenschutz, AGB)',
      type: 'array',
      fields: [linkField],
    },
  ],
}
