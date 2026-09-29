import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const roles = ['admin', 'editor'] as const
export type Role = (typeof roles)[number]

const hasRole = (user: unknown, role: Role): boolean =>
  Boolean(user && (user as User).role === role)

/** Nur Administratoren (Benutzerverwaltung, Einstellungen). */
export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/** Jede angemeldete Person im CMS (Admin oder Redaktion). */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

/** Öffentlich lesbar. */
export const anyone: Access = () => true

/** Öffentlich nur veröffentlichte Dokumente, angemeldet alles (inkl. Entwürfe). */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** Admins alles, sonst nur der eigene Benutzer. */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'admin')) return true
  return { id: { equals: user.id } }
}
