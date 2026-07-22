import * as migration_20260721_192912 from './20260721_192912';
import * as migration_20260722_103918 from './20260722_103918';
import * as migration_20260722_132039 from './20260722_132039';

export const migrations = [
  {
    up: migration_20260721_192912.up,
    down: migration_20260721_192912.down,
    name: '20260721_192912',
  },
  {
    up: migration_20260722_103918.up,
    down: migration_20260722_103918.down,
    name: '20260722_103918',
  },
  {
    up: migration_20260722_132039.up,
    down: migration_20260722_132039.down,
    name: '20260722_132039'
  },
];
