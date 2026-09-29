import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { linkField } from '@/fields/link'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Website' },
  access: { read: anyone, update: isLoggedIn },
  fields: [
    {
      name: 'items',
      label: 'Menüpunkte',
      type: 'array',
      localized: true,
      maxRows: 10,
      fields: [linkField],
    },
  ],
}
