import * as migration_20260929_120511_initial from './20260929_120511_initial'

export const migrations = [
  {
    up: migration_20260929_120511_initial.up,
    down: migration_20260929_120511_initial.down,
    name: '20260929_120511_initial',
  },
]
