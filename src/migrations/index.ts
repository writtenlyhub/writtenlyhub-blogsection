import * as migration_20260721_192912 from './20260721_192912';
import * as migration_20260722_103918 from './20260722_103918';
import * as migration_20260722_132039 from './20260722_132039';
import * as migration_20260727_151513 from './20260727_151513';
import * as migration_20260728_164841_seo_refactor_fix from './20260728_164841_seo_refactor_fix';
import * as migration_20260728_173908_seo_refactor_fix from './20260728_173908_seo_refactor_fix';
import * as migration_20260728_205210_readability_update from './20260728_205210_readability_update';
import * as migration_20260728_210844_drop_legacy_seo from './20260728_210844_drop_legacy_seo';
import * as migration_20260728_234937_search_document_index from './20260728_234937_search_document_index';
import * as migration_20260731_052321 from './20260731_052321';
import * as migration_20260904_054127_success_stories from './20260904_054127_success_stories';
import * as migration_20260904_122133_success_stories_fields from './20260904_122133_success_stories_fields';

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
    name: '20260722_132039',
  },
  {
    up: migration_20260727_151513.up,
    down: migration_20260727_151513.down,
    name: '20260727_151513',
  },
  {
    up: migration_20260728_164841_seo_refactor_fix.up,
    down: migration_20260728_164841_seo_refactor_fix.down,
    name: '20260728_164841_seo_refactor_fix',
  },
  {
    up: migration_20260728_173908_seo_refactor_fix.up,
    down: migration_20260728_173908_seo_refactor_fix.down,
    name: '20260728_173908_seo_refactor_fix',
  },
  {
    up: migration_20260728_205210_readability_update.up,
    down: migration_20260728_205210_readability_update.down,
    name: '20260728_205210_readability_update',
  },
  {
    up: migration_20260728_210844_drop_legacy_seo.up,
    down: migration_20260728_210844_drop_legacy_seo.down,
    name: '20260728_210844_drop_legacy_seo',
  },
  {
    up: migration_20260728_234937_search_document_index.up,
    down: migration_20260728_234937_search_document_index.down,
    name: '20260728_234937_search_document_index',
  },
  {
    up: migration_20260731_052321.up,
    down: migration_20260731_052321.down,
    name: '20260731_052321',
  },
  {
    up: migration_20260904_054127_success_stories.up,
    down: migration_20260904_054127_success_stories.down,
    name: '20260904_054127_success_stories',
  },
  {
    up: migration_20260904_122133_success_stories_fields.up,
    down: migration_20260904_122133_success_stories_fields.down,
    name: '20260904_122133_success_stories_fields'
  },
];
