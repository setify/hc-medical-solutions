import type { postgresAdapter } from '@payloadcms/db-postgres'
import { index } from '@payloadcms/db-postgres/drizzle/pg-core'

type PostgresSchemaHook = NonNullable<
  Parameters<typeof postgresAdapter>[0]['afterSchemaInit']
>[number]

/**
 * Payload legt für `*_locales`-Tabellen nur einen kombinierten Unique-Index
 * (_locale, _parent_id) an. Der Fremdschlüssel auf _parent_id bleibt damit ohne
 * passenden Index (Supabase-Advisor: unindexed_foreign_keys). Joins und Cascade-Deletes
 * über die Elterntabelle profitieren von einem eigenen Index.
 */
export const indexLocaleParents: PostgresSchemaHook = ({ schema, extendTable }) => {
  for (const [name, table] of Object.entries(schema.tables)) {
    if (!name.endsWith('_locales') || !('_parentID' in table)) continue

    extendTable({
      table,
      extraConfig: (t) => ({
        [`${name}_parent_id_idx`]: index(`${name}_parent_id_idx`).on(t._parentID),
      }),
    })
  }
  return schema
}
