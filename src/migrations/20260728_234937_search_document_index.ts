import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ADD COLUMN "search_document" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_search_document" varchar;
  CREATE INDEX "blogs_search_document_idx" ON "blogs" USING btree ("search_document");
  CREATE INDEX "_blogs_v_version_version_search_document_idx" ON "_blogs_v" USING btree ("version_search_document");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blogs_search_document_idx";
  DROP INDEX "_blogs_v_version_version_search_document_idx";
  ALTER TABLE "blogs" DROP COLUMN "search_document";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_search_document";`)
}
