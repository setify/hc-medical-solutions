import * as migration_20260930_075526_initial from './20260930_075526_initial'

export const migrations = [
  {
    up: migration_20260930_075526_initial.up,
    down: migration_20260930_075526_initial.down,
    name: '20260930_075526_initial',
  },
]
