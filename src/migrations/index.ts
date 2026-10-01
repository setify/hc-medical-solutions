import * as migration_20260930_075526_initial from './20260930_075526_initial'
import * as migration_20261001_082446_content_blocks from './20261001_082446_content_blocks'
import * as migration_20261001_094313_columns_layout from './20261001_094313_columns_layout'

export const migrations = [
  {
    up: migration_20260930_075526_initial.up,
    down: migration_20260930_075526_initial.down,
    name: '20260930_075526_initial',
  },
  {
    up: migration_20261001_082446_content_blocks.up,
    down: migration_20261001_082446_content_blocks.down,
    name: '20261001_082446_content_blocks',
  },
  {
    up: migration_20261001_094313_columns_layout.up,
    down: migration_20261001_094313_columns_layout.down,
    name: '20261001_094313_columns_layout',
  },
]
