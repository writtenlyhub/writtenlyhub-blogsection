import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TYPE "public"."enum_blogs_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TYPE "public"."enum__blogs_v_version_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TYPE "public"."enum_site_settings_default_twitter_card" AS ENUM('summary', 'summary_large_image');
  CREATE TYPE "public"."enum_site_settings_default_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  ALTER TYPE "public"."enum_subscribers_status" ADD VALUE 'pending' BEFORE 'unsubscribed';
  CREATE TABLE "categories_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "categories_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "blogs_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "blogs_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "blogs_previous_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "_blogs_v_version_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v_version_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v_version_previous_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "site_settings_organization_schema_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  -- ALTER TABLE "subscribers" ALTER COLUMN "status" SET DEFAULT 'pending';
  ALTER TABLE "site_settings" ALTER COLUMN "newsletter_popup_button_link" SET DEFAULT '#newsletter';
  ALTER TABLE "categories" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_og_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_og_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "seo_twitter_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_twitter_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_twitter_image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_index" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_noindex" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_follow" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_nofollow" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_noarchive" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_nosnippet" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_noimageindex" boolean;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_max_snippet" numeric;
  ALTER TABLE "categories" ADD COLUMN "seo_robots_max_image_preview" "enum_categories_seo_robots_max_image_preview";
  ALTER TABLE "categories" ADD COLUMN "seo_robots_max_video_preview" numeric;
  ALTER TABLE "categories" ADD COLUMN "seo_json_ld_how_to_name" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_json_ld_how_to_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_json_ld_advanced_override" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_og_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_og_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "seo_twitter_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_twitter_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_twitter_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_index" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_noindex" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_follow" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_nofollow" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_noarchive" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_nosnippet" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_noimageindex" boolean;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_max_snippet" numeric;
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_max_image_preview" "enum_blogs_seo_robots_max_image_preview";
  ALTER TABLE "blogs" ADD COLUMN "seo_robots_max_video_preview" numeric;
  ALTER TABLE "blogs" ADD COLUMN "seo_json_ld_how_to_name" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_json_ld_how_to_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_json_ld_advanced_override" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_meta_title" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_meta_description" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_og_title" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_og_description" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_og_image_id" integer;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_twitter_title" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_twitter_description" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_twitter_image_id" integer;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_index" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_noindex" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_follow" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_nofollow" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_noarchive" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_nosnippet" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_noimageindex" boolean;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_max_snippet" numeric;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_max_image_preview" "enum__blogs_v_version_seo_robots_max_image_preview";
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_robots_max_video_preview" numeric;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_json_ld_how_to_name" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_json_ld_how_to_description" varchar;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_seo_json_ld_advanced_override" varchar;
  ALTER TABLE "subscribers" ADD COLUMN "first_name" varchar;
  ALTER TABLE "subscribers" ADD COLUMN "subscribed_at" timestamp(3) with time zone;
  ALTER TABLE "subscribers" ADD COLUMN "confirmation_token" varchar;
  ALTER TABLE "subscribers" ADD COLUMN "confirmation_token_expires_at" timestamp(3) with time zone;
  ALTER TABLE "subscribers" ADD COLUMN "confirmed_at" timestamp(3) with time zone;
  ALTER TABLE "site_settings" ADD COLUMN "site_title" varchar DEFAULT 'WrittenlyHub';
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_twitter_card" "enum_site_settings_default_twitter_card" DEFAULT 'summary_large_image';
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_index" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_noindex" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_follow" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_nofollow" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_noarchive" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_nosnippet" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_noimageindex" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_max_snippet" numeric;
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_max_image_preview" "enum_site_settings_default_robots_max_image_preview";
  ALTER TABLE "site_settings" ADD COLUMN "default_robots_max_video_preview" numeric;
  ALTER TABLE "site_settings" ADD COLUMN "verification_tags_google" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "verification_tags_bing" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_schema_name" varchar DEFAULT 'WrittenlyHub';
  ALTER TABLE "site_settings" ADD COLUMN "organization_schema_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_schema_logo_id" integer;
  ALTER TABLE "categories_seo_json_ld_faq" ADD CONSTRAINT "categories_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_seo_json_ld_how_to_step" ADD CONSTRAINT "categories_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_seo_json_ld_how_to_step" ADD CONSTRAINT "categories_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_seo_json_ld_faq" ADD CONSTRAINT "blogs_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_seo_json_ld_how_to_step" ADD CONSTRAINT "blogs_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_seo_json_ld_how_to_step" ADD CONSTRAINT "blogs_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_previous_slugs" ADD CONSTRAINT "blogs_previous_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_seo_json_ld_faq" ADD CONSTRAINT "_blogs_v_version_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_seo_json_ld_how_to_step" ADD CONSTRAINT "_blogs_v_version_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_seo_json_ld_how_to_step" ADD CONSTRAINT "_blogs_v_version_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_previous_slugs" ADD CONSTRAINT "_blogs_v_version_previous_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_organization_schema_same_as" ADD CONSTRAINT "site_settings_organization_schema_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_seo_json_ld_faq_order_idx" ON "categories_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "categories_seo_json_ld_faq_parent_id_idx" ON "categories_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "categories_seo_json_ld_how_to_step_order_idx" ON "categories_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "categories_seo_json_ld_how_to_step_parent_id_idx" ON "categories_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "categories_seo_json_ld_how_to_step_image_idx" ON "categories_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE INDEX "blogs_seo_json_ld_faq_order_idx" ON "blogs_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "blogs_seo_json_ld_faq_parent_id_idx" ON "blogs_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "blogs_seo_json_ld_how_to_step_order_idx" ON "blogs_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "blogs_seo_json_ld_how_to_step_parent_id_idx" ON "blogs_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "blogs_seo_json_ld_how_to_step_image_idx" ON "blogs_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE INDEX "blogs_previous_slugs_order_idx" ON "blogs_previous_slugs" USING btree ("_order");
  CREATE INDEX "blogs_previous_slugs_parent_id_idx" ON "blogs_previous_slugs" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_seo_json_ld_faq_order_idx" ON "_blogs_v_version_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_seo_json_ld_faq_parent_id_idx" ON "_blogs_v_version_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_seo_json_ld_how_to_step_order_idx" ON "_blogs_v_version_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_seo_json_ld_how_to_step_parent_id_idx" ON "_blogs_v_version_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_seo_json_ld_how_to_step_image_idx" ON "_blogs_v_version_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE INDEX "_blogs_v_version_previous_slugs_order_idx" ON "_blogs_v_version_previous_slugs" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_previous_slugs_parent_id_idx" ON "_blogs_v_version_previous_slugs" USING btree ("_parent_id");
  CREATE INDEX "site_settings_organization_schema_same_as_order_idx" ON "site_settings_organization_schema_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_organization_schema_same_as_parent_id_idx" ON "site_settings_organization_schema_same_as" USING btree ("_parent_id");
  ALTER TABLE "categories" ADD CONSTRAINT "categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("version_seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_organization_schema_logo_id_media_id_fk" FOREIGN KEY ("organization_schema_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_seo_seo_og_image_idx" ON "categories" USING btree ("seo_og_image_id");
  CREATE INDEX "categories_seo_seo_twitter_image_idx" ON "categories" USING btree ("seo_twitter_image_id");
  CREATE INDEX "blogs_seo_seo_og_image_idx" ON "blogs" USING btree ("seo_og_image_id");
  CREATE INDEX "blogs_seo_seo_twitter_image_idx" ON "blogs" USING btree ("seo_twitter_image_id");
  CREATE INDEX "_blogs_v_version_seo_version_seo_og_image_idx" ON "_blogs_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blogs_v_version_seo_version_seo_twitter_image_idx" ON "_blogs_v" USING btree ("version_seo_twitter_image_id");
  CREATE INDEX "site_settings_organization_schema_organization_schema_lo_idx" ON "site_settings" USING btree ("organization_schema_logo_id");
  ALTER TABLE "site_settings" DROP COLUMN "default_title";
  ALTER TABLE "site_settings" DROP COLUMN "default_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_previous_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_previous_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_organization_schema_same_as" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories_seo_json_ld_faq" CASCADE;
  DROP TABLE "categories_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "blogs_seo_json_ld_faq" CASCADE;
  DROP TABLE "blogs_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "blogs_previous_slugs" CASCADE;
  DROP TABLE "_blogs_v_version_seo_json_ld_faq" CASCADE;
  DROP TABLE "_blogs_v_version_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "_blogs_v_version_previous_slugs" CASCADE;
  DROP TABLE "site_settings_organization_schema_same_as" CASCADE;
  ALTER TABLE "categories" DROP CONSTRAINT "categories_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_seo_twitter_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_twitter_image_id_media_id_fk";
  
  ALTER TABLE "_blogs_v" DROP CONSTRAINT "_blogs_v_version_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "_blogs_v" DROP CONSTRAINT "_blogs_v_version_seo_twitter_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_organization_schema_logo_id_media_id_fk";
  
  ALTER TABLE "subscribers" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "subscribers" ALTER COLUMN "status" SET DEFAULT 'active'::text;
  DROP TYPE "public"."enum_subscribers_status";
  CREATE TYPE "public"."enum_subscribers_status" AS ENUM('active', 'unsubscribed');
  ALTER TABLE "subscribers" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."enum_subscribers_status";
  ALTER TABLE "subscribers" ALTER COLUMN "status" SET DATA TYPE "public"."enum_subscribers_status" USING "status"::"public"."enum_subscribers_status";
  DROP INDEX "categories_seo_seo_og_image_idx";
  DROP INDEX "categories_seo_seo_twitter_image_idx";
  DROP INDEX "blogs_seo_seo_og_image_idx";
  DROP INDEX "blogs_seo_seo_twitter_image_idx";
  DROP INDEX "_blogs_v_version_seo_version_seo_og_image_idx";
  DROP INDEX "_blogs_v_version_seo_version_seo_twitter_image_idx";
  DROP INDEX "site_settings_organization_schema_organization_schema_lo_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "newsletter_popup_button_link" SET DEFAULT '/newsletter';
  ALTER TABLE "site_settings" ADD COLUMN "default_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_description" varchar;
  ALTER TABLE "categories" DROP COLUMN "seo_meta_title";
  ALTER TABLE "categories" DROP COLUMN "seo_meta_description";
  ALTER TABLE "categories" DROP COLUMN "seo_og_title";
  ALTER TABLE "categories" DROP COLUMN "seo_og_description";
  ALTER TABLE "categories" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "categories" DROP COLUMN "seo_twitter_title";
  ALTER TABLE "categories" DROP COLUMN "seo_twitter_description";
  ALTER TABLE "categories" DROP COLUMN "seo_twitter_image_id";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_index";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_noindex";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_follow";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_nofollow";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_noarchive";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_nosnippet";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_noimageindex";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_max_snippet";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_max_image_preview";
  ALTER TABLE "categories" DROP COLUMN "seo_robots_max_video_preview";
  ALTER TABLE "categories" DROP COLUMN "seo_json_ld_how_to_name";
  ALTER TABLE "categories" DROP COLUMN "seo_json_ld_how_to_description";
  ALTER TABLE "categories" DROP COLUMN "seo_json_ld_advanced_override";
  ALTER TABLE "blogs" DROP COLUMN "seo_meta_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_meta_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_og_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_og_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "blogs" DROP COLUMN "seo_twitter_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_twitter_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_twitter_image_id";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_index";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_noindex";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_follow";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_nofollow";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_noarchive";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_nosnippet";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_noimageindex";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_max_snippet";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_max_image_preview";
  ALTER TABLE "blogs" DROP COLUMN "seo_robots_max_video_preview";
  ALTER TABLE "blogs" DROP COLUMN "seo_json_ld_how_to_name";
  ALTER TABLE "blogs" DROP COLUMN "seo_json_ld_how_to_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_json_ld_advanced_override";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_meta_title";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_meta_description";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_og_title";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_og_description";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_og_image_id";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_twitter_title";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_twitter_description";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_twitter_image_id";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_index";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_noindex";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_follow";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_nofollow";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_noarchive";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_nosnippet";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_noimageindex";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_max_snippet";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_max_image_preview";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_robots_max_video_preview";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_json_ld_how_to_name";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_json_ld_how_to_description";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_seo_json_ld_advanced_override";
  ALTER TABLE "subscribers" DROP COLUMN "first_name";
  ALTER TABLE "subscribers" DROP COLUMN "subscribed_at";
  ALTER TABLE "subscribers" DROP COLUMN "confirmation_token";
  ALTER TABLE "subscribers" DROP COLUMN "confirmation_token_expires_at";
  ALTER TABLE "subscribers" DROP COLUMN "confirmed_at";
  ALTER TABLE "site_settings" DROP COLUMN "site_title";
  ALTER TABLE "site_settings" DROP COLUMN "site_description";
  ALTER TABLE "site_settings" DROP COLUMN "default_twitter_card";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_index";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_noindex";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_follow";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_nofollow";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_noarchive";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_nosnippet";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_noimageindex";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_max_snippet";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_max_image_preview";
  ALTER TABLE "site_settings" DROP COLUMN "default_robots_max_video_preview";
  ALTER TABLE "site_settings" DROP COLUMN "verification_tags_google";
  ALTER TABLE "site_settings" DROP COLUMN "verification_tags_bing";
  ALTER TABLE "site_settings" DROP COLUMN "organization_schema_name";
  ALTER TABLE "site_settings" DROP COLUMN "organization_schema_url";
  ALTER TABLE "site_settings" DROP COLUMN "organization_schema_logo_id";
  DROP TYPE "public"."enum_categories_seo_robots_max_image_preview";
  DROP TYPE "public"."enum_blogs_seo_robots_max_image_preview";
  DROP TYPE "public"."enum__blogs_v_version_seo_robots_max_image_preview";
  DROP TYPE "public"."enum_site_settings_default_twitter_card";
  DROP TYPE "public"."enum_site_settings_default_robots_max_image_preview";`)
}
