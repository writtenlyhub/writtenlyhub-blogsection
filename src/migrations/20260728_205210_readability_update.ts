import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rule_id" varchar
  );
  
  CREATE TABLE "blogs_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rule_id" varchar
  );
  
  CREATE TABLE "_blogs_v_version_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rule_id" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "categories_seo_dismissed_warnings" ADD CONSTRAINT "categories_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_seo_dismissed_warnings" ADD CONSTRAINT "blogs_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_seo_dismissed_warnings" ADD CONSTRAINT "_blogs_v_version_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_seo_dismissed_warnings_order_idx" ON "categories_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "categories_seo_dismissed_warnings_parent_id_idx" ON "categories_seo_dismissed_warnings" USING btree ("_parent_id");
  CREATE INDEX "blogs_seo_dismissed_warnings_order_idx" ON "blogs_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "blogs_seo_dismissed_warnings_parent_id_idx" ON "blogs_seo_dismissed_warnings" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_seo_dismissed_warnings_order_idx" ON "_blogs_v_version_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_seo_dismissed_warnings_parent_id_idx" ON "_blogs_v_version_seo_dismissed_warnings" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "categories_seo_dismissed_warnings" CASCADE;
  DROP TABLE "blogs_seo_dismissed_warnings" CASCADE;
  DROP TABLE "_blogs_v_version_seo_dismissed_warnings" CASCADE;`)
}
