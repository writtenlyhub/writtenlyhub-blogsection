import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "seo_focus_keyword" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_focus_keyword" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_focus_keyword" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP COLUMN "seo_focus_keyword";
  ALTER TABLE "blogs" DROP COLUMN "seo_focus_keyword";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_focus_keyword";`)
}
