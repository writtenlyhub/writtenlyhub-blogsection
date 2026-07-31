import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "blogs_search_document_idx";
  DROP INDEX IF EXISTS "_blogs_v_version_version_search_document_idx";
  DROP INDEX IF EXISTS "_blogs_v_autosave_idx";
  CREATE INDEX IF NOT EXISTS "blogs_published_at_idx" ON "blogs" USING btree ("published_at");
  CREATE INDEX IF NOT EXISTS "_blogs_v_version_version_published_at_idx" ON "_blogs_v" USING btree ("version_published_at");
  ALTER TABLE "_blogs_v" DROP COLUMN IF EXISTS "autosave";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blogs_published_at_idx";
  DROP INDEX "_blogs_v_version_version_published_at_idx";
  ALTER TABLE "_blogs_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "blogs_search_document_idx" ON "blogs" USING btree ("search_document");
  CREATE INDEX "_blogs_v_version_version_search_document_idx" ON "_blogs_v" USING btree ("version_search_document");
  CREATE INDEX "_blogs_v_autosave_idx" ON "_blogs_v" USING btree ("autosave");`)
}
