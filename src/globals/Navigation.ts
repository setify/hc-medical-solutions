import type { GlobalConfig, GroupField } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { linkField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Website' },
  access: { read: anyone, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'items',
      label: 'Menüpunkte',
      type: 'array',
      maxRows: 8,
      fields: [
        linkField,
        {
          name: 'children',
          label: 'Unterpunkte',
          type: 'array',
          maxRows: 8,
          fields: [linkField],
        },
      ],
    },
    {
      name: 'cta',
      label: 'Button rechts (z. B. Kontakt)',
      type: 'group',
      fields: [
        { name: 'enabled', label: 'Anzeigen', type: 'checkbox', defaultValue: false },
        {
          ...(linkField as GroupField),
          admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
        },
      ],
    },
  ],
}
