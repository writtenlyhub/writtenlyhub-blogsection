import * as migration_20260721_192912 from './20260721_192912';

export const migrations = [
  {
    up: migration_20260721_192912.up,
    down: migration_20260721_192912.down,
    name: '20260721_192912'
  },
];
