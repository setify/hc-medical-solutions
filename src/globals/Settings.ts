import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Einstellungen',
  admin: { group: 'Verwaltung' },
  access: { read: anyone, update: isAdmin },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontaktformular',
          fields: [
            {
              name: 'contactRecipient',
              label: 'Empfänger-E-Mail',
              type: 'email',
              admin: {
                description: 'Anfragen werden nur per E-Mail versendet, nicht gespeichert.',
              },
              access: { read: ({ req: { user } }) => Boolean(user) },
            },
          ],
        },
        {
          label: 'Matomo',
          fields: [
            { name: 'matomoUrl', label: 'Matomo-URL', type: 'text' },
            { name: 'matomoSiteId', label: 'Site-ID', type: 'text' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultOgImage',
              label: 'Standard-Vorschaubild (Open Graph)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
