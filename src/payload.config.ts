import { postgresAdapter } from '@payloadcms/db-postgres'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Documents } from './collections/Documents'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Navigation } from './globals/Navigation'
import { Settings } from './globals/Settings'
import { revalidateRedirects, revalidateRedirectsDelete } from './hooks/revalidate'
import { defaultLocale, locales } from './i18n/routing'
import { indexLocaleParents } from './lib/db-schema'
import { hasS3, parseEnv } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const env = parseEnv(process.env)

const localeLabels = { de: 'Deutsch', en: 'English', fr: 'Français' } as const

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' – HC Medical Solutions CMS',
    },
  },
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: 'de',
  },
  localization: {
    locales: locales.map((code) => ({ code, label: localeLabels[code] })),
    defaultLocale,
    // Briefing: fehlende Übersetzungen dürfen nicht durch andere Sprachen ersetzt werden.
    fallback: false,
  },
  collections: [Pages, Media, Documents, Users],
  globals: [Navigation, Footer, Settings],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
    // Eigenes Schema statt `public`: Supabase stellt nur `public` über die REST-API bereit.
    // So sind Payload-Daten (inkl. Benutzer und Passwort-Hashes) nie über den API-Key erreichbar.
    schemaName: 'payload',
    afterSchemaInit: [indexLocaleParents],
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema-Änderungen laufen außerhalb der Entwicklung ausschließlich über Migrationen.
    push: process.env.NODE_ENV === 'development',
  }),
  sharp,
  plugins: [
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => String(doc.title ?? ''),
      // Pfad ohne Sprachpräfix, z. B. /unternehmen/vorgehensweise
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${String(doc.slug ?? '')}`, ''),
    }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        doc?.title ? `${doc.title} | HC Medical Solutions` : 'HC Medical Solutions',
    }),
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        labels: { singular: 'Weiterleitung', plural: 'Weiterleitungen' },
        admin: { group: 'Website' },
        hooks: { afterChange: [revalidateRedirects], afterDelete: [revalidateRedirectsDelete] },
      },
      redirectTypes: ['301', '302'],
    }),
    s3Storage({
      enabled: hasS3(env),
      collections: {
        media: { prefix: 'media' },
        documents: { prefix: 'documents' },
      },
      bucket: 'uploads',
      config: {
        endpoint: env.S3_ENDPOINT,
        region: env.S3_REGION ?? 'local',
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
  ],
})
