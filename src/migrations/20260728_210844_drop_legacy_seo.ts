import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_seo_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_image_id_media_id_fk";
  
  ALTER TABLE "_blogs_v" DROP CONSTRAINT "_blogs_v_version_seo_image_id_media_id_fk";
  
  DROP INDEX "categories_seo_seo_image_idx";
  DROP INDEX "blogs_seo_seo_image_idx";
  DROP INDEX "_blogs_v_version_seo_version_seo_image_idx";
  ALTER TABLE "categories" DROP COLUMN "seo_title";
  ALTER TABLE "categories" DROP COLUMN "seo_description";
  ALTER TABLE "categories" DROP COLUMN "seo_image_id";
  ALTER TABLE "categories" DROP COLUMN "seo_no_index";
  ALTER TABLE "blogs" DROP COLUMN "seo_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_image_id";
  ALTER TABLE "blogs" DROP COLUMN "seo_no_index";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_image_id";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_no_index";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "blogs" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_image_id" integer;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_no_index" boolean DEFAULT false;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_seo_seo_image_idx" ON "categories" USING btree ("seo_image_id");
  CREATE INDEX "blogs_seo_seo_image_idx" ON "blogs" USING btree ("seo_image_id");
  CREATE INDEX "_blogs_v_version_seo_version_seo_image_idx" ON "_blogs_v" USING btree ("version_seo_image_id");`)
}
