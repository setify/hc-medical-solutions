import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { linkField } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Website' },
  access: { read: anyone, update: isLoggedIn },
  fields: [
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      localized: true,
      fields: [linkField],
    },
    {
      name: 'legalLinks',
      label: 'Rechtliches (Impressum, Datenschutz, AGB)',
      type: 'array',
      localized: true,
      fields: [linkField],
    },
  ],
}
