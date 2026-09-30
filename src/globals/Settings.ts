import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

const loggedInOnly = ({ req: { user } }: { req: { user: unknown } }) => Boolean(user)

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Einstellungen',
  admin: { group: 'Verwaltung' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allgemein',
          fields: [
            {
              name: 'homePage',
              label: 'Startseite',
              type: 'relationship',
              relationTo: 'pages',
              admin: { description: 'Diese Seite wird unter /de, /en und /fr angezeigt.' },
            },
            {
              name: 'organization',
              label: 'Unternehmen (Footer, Suchmaschinen)',
              type: 'group',
              fields: [
                { name: 'name', label: 'Firmenname', type: 'text' },
                { name: 'street', label: 'Straße und Nr.', type: 'text' },
                { name: 'postalCode', label: 'PLZ', type: 'text' },
                { name: 'city', label: 'Ort', type: 'text' },
                { name: 'country', label: 'Land', type: 'text', localized: true },
                { name: 'phone', label: 'Telefon', type: 'text' },
                { name: 'email', label: 'E-Mail', type: 'email' },
              ],
            },
          ],
        },
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
              access: { read: loggedInOnly },
            },
          ],
        },
        {
          label: 'Karriere (JOIN)',
          fields: [
            {
              name: 'joinWidgetToken',
              label: 'JOIN Widget-Token',
              type: 'textarea',
              admin: {
                description:
                  'Aus dem JOIN-Widget-Code (accessToken). Stellen werden serverseitig abgerufen und stündlich aktualisiert.',
              },
              access: { read: loggedInOnly },
            },
            { name: 'joinCompanyUrl', label: 'JOIN-Firmenseite', type: 'text' },
          ],
        },
        {
          label: 'Matomo',
          fields: [
            { name: 'matomoUrl', label: 'Matomo-URL', type: 'text' },
            { name: 'matomoSiteId', label: 'Site-ID', type: 'text' },
            {
              name: 'matomoRespectDnt',
              label: '„Do Not Track“ des Browsers respektieren',
              type: 'checkbox',
              defaultValue: true,
            },
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
