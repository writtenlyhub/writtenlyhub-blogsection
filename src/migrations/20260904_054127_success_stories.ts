import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_success_stories_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TYPE "public"."enum_success_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__success_stories_v_version_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TYPE "public"."enum__success_stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_success_story_categories_seo_robots_max_image_preview" AS ENUM('none', 'standard', 'large');
  CREATE TABLE "success_stories_summary_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "success_stories_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"optional_visual_id" integer
  );
  
  CREATE TABLE "success_stories_problem_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "success_stories_solution_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body_copy" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "success_stories_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rule_id" varchar
  );
  
  CREATE TABLE "success_stories_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "success_stories_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "success_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"client_name" varchar,
  	"client_logo_id" integer,
  	"category_id" integer,
  	"short_description" varchar,
  	"featured_image_id" integer,
  	"summary_heading" varchar DEFAULT 'SUMMARY',
  	"problem_heading" varchar,
  	"problem_description" varchar,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"impact_heading" varchar,
  	"impact_description" varchar,
  	"testimonial_quote" varchar,
  	"testimonial_name" varchar,
  	"testimonial_role" varchar,
  	"testimonial_image_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_focus_keyword" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"seo_robots_index" boolean,
  	"seo_robots_noindex" boolean,
  	"seo_robots_follow" boolean,
  	"seo_robots_nofollow" boolean,
  	"seo_robots_noarchive" boolean,
  	"seo_robots_nosnippet" boolean,
  	"seo_robots_noimageindex" boolean,
  	"seo_robots_max_snippet" numeric,
  	"seo_robots_max_image_preview" "enum_success_stories_seo_robots_max_image_preview",
  	"seo_robots_max_video_preview" numeric,
  	"seo_json_ld_how_to_name" varchar,
  	"seo_json_ld_how_to_description" varchar,
  	"seo_json_ld_advanced_override" varchar,
  	"slug" varchar,
  	"published_date" timestamp(3) with time zone,
  	"last_updated" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_success_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_success_stories_v_version_summary_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"optional_visual_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_problem_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_solution_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body_copy" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rule_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_client_name" varchar,
  	"version_client_logo_id" integer,
  	"version_category_id" integer,
  	"version_short_description" varchar,
  	"version_featured_image_id" integer,
  	"version_summary_heading" varchar DEFAULT 'SUMMARY',
  	"version_problem_heading" varchar,
  	"version_problem_description" varchar,
  	"version_before_image_id" integer,
  	"version_after_image_id" integer,
  	"version_impact_heading" varchar,
  	"version_impact_description" varchar,
  	"version_testimonial_quote" varchar,
  	"version_testimonial_name" varchar,
  	"version_testimonial_role" varchar,
  	"version_testimonial_image_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_focus_keyword" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_id" integer,
  	"version_seo_robots_index" boolean,
  	"version_seo_robots_noindex" boolean,
  	"version_seo_robots_follow" boolean,
  	"version_seo_robots_nofollow" boolean,
  	"version_seo_robots_noarchive" boolean,
  	"version_seo_robots_nosnippet" boolean,
  	"version_seo_robots_noimageindex" boolean,
  	"version_seo_robots_max_snippet" numeric,
  	"version_seo_robots_max_image_preview" "enum__success_stories_v_version_seo_robots_max_image_preview",
  	"version_seo_robots_max_video_preview" numeric,
  	"version_seo_json_ld_how_to_name" varchar,
  	"version_seo_json_ld_how_to_description" varchar,
  	"version_seo_json_ld_advanced_override" varchar,
  	"version_slug" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__success_stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "success_story_categories_seo_dismissed_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rule_id" varchar
  );
  
  CREATE TABLE "success_story_categories_seo_json_ld_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "success_story_categories_seo_json_ld_how_to_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "success_story_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"color" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_focus_keyword" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"seo_robots_index" boolean,
  	"seo_robots_noindex" boolean,
  	"seo_robots_follow" boolean,
  	"seo_robots_nofollow" boolean,
  	"seo_robots_noarchive" boolean,
  	"seo_robots_nosnippet" boolean,
  	"seo_robots_noimageindex" boolean,
  	"seo_robots_max_snippet" numeric,
  	"seo_robots_max_image_preview" "enum_success_story_categories_seo_robots_max_image_preview",
  	"seo_robots_max_video_preview" numeric,
  	"seo_json_ld_how_to_name" varchar,
  	"seo_json_ld_how_to_description" varchar,
  	"seo_json_ld_advanced_override" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_trusted_brands_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "success_stories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "success_story_categories_id" integer;
  ALTER TABLE "success_stories_summary_bullets" ADD CONSTRAINT "success_stories_summary_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_metrics" ADD CONSTRAINT "success_stories_metrics_optional_visual_id_media_id_fk" FOREIGN KEY ("optional_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_metrics" ADD CONSTRAINT "success_stories_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_problem_points" ADD CONSTRAINT "success_stories_problem_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_solution_blocks" ADD CONSTRAINT "success_stories_solution_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_solution_blocks" ADD CONSTRAINT "success_stories_solution_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_seo_dismissed_warnings" ADD CONSTRAINT "success_stories_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_seo_json_ld_faq" ADD CONSTRAINT "success_stories_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_seo_json_ld_how_to_step" ADD CONSTRAINT "success_stories_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_seo_json_ld_how_to_step" ADD CONSTRAINT "success_stories_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_client_logo_id_media_id_fk" FOREIGN KEY ("client_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_category_id_success_story_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."success_story_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_testimonial_image_id_media_id_fk" FOREIGN KEY ("testimonial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_summary_bullets" ADD CONSTRAINT "_success_stories_v_version_summary_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_metrics" ADD CONSTRAINT "_success_stories_v_version_metrics_optional_visual_id_media_id_fk" FOREIGN KEY ("optional_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_metrics" ADD CONSTRAINT "_success_stories_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_problem_points" ADD CONSTRAINT "_success_stories_v_version_problem_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_solution_blocks" ADD CONSTRAINT "_success_stories_v_version_solution_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_solution_blocks" ADD CONSTRAINT "_success_stories_v_version_solution_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_seo_dismissed_warnings" ADD CONSTRAINT "_success_stories_v_version_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_seo_json_ld_faq" ADD CONSTRAINT "_success_stories_v_version_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_seo_json_ld_how_to_step" ADD CONSTRAINT "_success_stories_v_version_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_seo_json_ld_how_to_step" ADD CONSTRAINT "_success_stories_v_version_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_parent_id_success_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_client_logo_id_media_id_fk" FOREIGN KEY ("version_client_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_category_id_success_story_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."success_story_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_before_image_id_media_id_fk" FOREIGN KEY ("version_before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_after_image_id_media_id_fk" FOREIGN KEY ("version_after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_testimonial_image_id_media_id_fk" FOREIGN KEY ("version_testimonial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("version_seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_story_categories_seo_dismissed_warnings" ADD CONSTRAINT "success_story_categories_seo_dismissed_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_story_categories_seo_json_ld_faq" ADD CONSTRAINT "success_story_categories_seo_json_ld_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_story_categories_seo_json_ld_how_to_step" ADD CONSTRAINT "success_story_categories_seo_json_ld_how_to_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_story_categories_seo_json_ld_how_to_step" ADD CONSTRAINT "success_story_categories_seo_json_ld_how_to_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_story_categories" ADD CONSTRAINT "success_story_categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_story_categories" ADD CONSTRAINT "success_story_categories_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_trusted_brands_logos" ADD CONSTRAINT "site_settings_trusted_brands_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_trusted_brands_logos" ADD CONSTRAINT "site_settings_trusted_brands_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "success_stories_summary_bullets_order_idx" ON "success_stories_summary_bullets" USING btree ("_order");
  CREATE INDEX "success_stories_summary_bullets_parent_id_idx" ON "success_stories_summary_bullets" USING btree ("_parent_id");
  CREATE INDEX "success_stories_metrics_order_idx" ON "success_stories_metrics" USING btree ("_order");
  CREATE INDEX "success_stories_metrics_parent_id_idx" ON "success_stories_metrics" USING btree ("_parent_id");
  CREATE INDEX "success_stories_metrics_optional_visual_idx" ON "success_stories_metrics" USING btree ("optional_visual_id");
  CREATE INDEX "success_stories_problem_points_order_idx" ON "success_stories_problem_points" USING btree ("_order");
  CREATE INDEX "success_stories_problem_points_parent_id_idx" ON "success_stories_problem_points" USING btree ("_parent_id");
  CREATE INDEX "success_stories_solution_blocks_order_idx" ON "success_stories_solution_blocks" USING btree ("_order");
  CREATE INDEX "success_stories_solution_blocks_parent_id_idx" ON "success_stories_solution_blocks" USING btree ("_parent_id");
  CREATE INDEX "success_stories_solution_blocks_image_idx" ON "success_stories_solution_blocks" USING btree ("image_id");
  CREATE INDEX "success_stories_seo_dismissed_warnings_order_idx" ON "success_stories_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "success_stories_seo_dismissed_warnings_parent_id_idx" ON "success_stories_seo_dismissed_warnings" USING btree ("_parent_id");
  CREATE INDEX "success_stories_seo_json_ld_faq_order_idx" ON "success_stories_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "success_stories_seo_json_ld_faq_parent_id_idx" ON "success_stories_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "success_stories_seo_json_ld_how_to_step_order_idx" ON "success_stories_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "success_stories_seo_json_ld_how_to_step_parent_id_idx" ON "success_stories_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "success_stories_seo_json_ld_how_to_step_image_idx" ON "success_stories_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE INDEX "success_stories_client_logo_idx" ON "success_stories" USING btree ("client_logo_id");
  CREATE INDEX "success_stories_category_idx" ON "success_stories" USING btree ("category_id");
  CREATE INDEX "success_stories_featured_image_idx" ON "success_stories" USING btree ("featured_image_id");
  CREATE INDEX "success_stories_before_image_idx" ON "success_stories" USING btree ("before_image_id");
  CREATE INDEX "success_stories_after_image_idx" ON "success_stories" USING btree ("after_image_id");
  CREATE INDEX "success_stories_testimonial_testimonial_image_idx" ON "success_stories" USING btree ("testimonial_image_id");
  CREATE INDEX "success_stories_seo_seo_og_image_idx" ON "success_stories" USING btree ("seo_og_image_id");
  CREATE INDEX "success_stories_seo_seo_twitter_image_idx" ON "success_stories" USING btree ("seo_twitter_image_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories" USING btree ("slug");
  CREATE INDEX "success_stories_updated_at_idx" ON "success_stories" USING btree ("updated_at");
  CREATE INDEX "success_stories_created_at_idx" ON "success_stories" USING btree ("created_at");
  CREATE INDEX "success_stories__status_idx" ON "success_stories" USING btree ("_status");
  CREATE INDEX "_success_stories_v_version_summary_bullets_order_idx" ON "_success_stories_v_version_summary_bullets" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_summary_bullets_parent_id_idx" ON "_success_stories_v_version_summary_bullets" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_metrics_order_idx" ON "_success_stories_v_version_metrics" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_metrics_parent_id_idx" ON "_success_stories_v_version_metrics" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_metrics_optional_visual_idx" ON "_success_stories_v_version_metrics" USING btree ("optional_visual_id");
  CREATE INDEX "_success_stories_v_version_problem_points_order_idx" ON "_success_stories_v_version_problem_points" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_problem_points_parent_id_idx" ON "_success_stories_v_version_problem_points" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_solution_blocks_order_idx" ON "_success_stories_v_version_solution_blocks" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_solution_blocks_parent_id_idx" ON "_success_stories_v_version_solution_blocks" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_solution_blocks_image_idx" ON "_success_stories_v_version_solution_blocks" USING btree ("image_id");
  CREATE INDEX "_success_stories_v_version_seo_dismissed_warnings_order_idx" ON "_success_stories_v_version_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_seo_dismissed_warnings_parent_id_idx" ON "_success_stories_v_version_seo_dismissed_warnings" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_seo_json_ld_faq_order_idx" ON "_success_stories_v_version_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_seo_json_ld_faq_parent_id_idx" ON "_success_stories_v_version_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_seo_json_ld_how_to_step_order_idx" ON "_success_stories_v_version_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_seo_json_ld_how_to_step_parent_id_idx" ON "_success_stories_v_version_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_seo_json_ld_how_to_step_image_idx" ON "_success_stories_v_version_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE INDEX "_success_stories_v_parent_idx" ON "_success_stories_v" USING btree ("parent_id");
  CREATE INDEX "_success_stories_v_version_version_client_logo_idx" ON "_success_stories_v" USING btree ("version_client_logo_id");
  CREATE INDEX "_success_stories_v_version_version_category_idx" ON "_success_stories_v" USING btree ("version_category_id");
  CREATE INDEX "_success_stories_v_version_version_featured_image_idx" ON "_success_stories_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_success_stories_v_version_version_before_image_idx" ON "_success_stories_v" USING btree ("version_before_image_id");
  CREATE INDEX "_success_stories_v_version_version_after_image_idx" ON "_success_stories_v" USING btree ("version_after_image_id");
  CREATE INDEX "_success_stories_v_version_testimonial_version_testimoni_idx" ON "_success_stories_v" USING btree ("version_testimonial_image_id");
  CREATE INDEX "_success_stories_v_version_seo_version_seo_og_image_idx" ON "_success_stories_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_success_stories_v_version_seo_version_seo_twitter_image_idx" ON "_success_stories_v" USING btree ("version_seo_twitter_image_id");
  CREATE INDEX "_success_stories_v_version_version_slug_idx" ON "_success_stories_v" USING btree ("version_slug");
  CREATE INDEX "_success_stories_v_version_version_updated_at_idx" ON "_success_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_success_stories_v_version_version_created_at_idx" ON "_success_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_success_stories_v_version_version__status_idx" ON "_success_stories_v" USING btree ("version__status");
  CREATE INDEX "_success_stories_v_created_at_idx" ON "_success_stories_v" USING btree ("created_at");
  CREATE INDEX "_success_stories_v_updated_at_idx" ON "_success_stories_v" USING btree ("updated_at");
  CREATE INDEX "_success_stories_v_latest_idx" ON "_success_stories_v" USING btree ("latest");
  CREATE INDEX "success_story_categories_seo_dismissed_warnings_order_idx" ON "success_story_categories_seo_dismissed_warnings" USING btree ("_order");
  CREATE INDEX "success_story_categories_seo_dismissed_warnings_parent_id_idx" ON "success_story_categories_seo_dismissed_warnings" USING btree ("_parent_id");
  CREATE INDEX "success_story_categories_seo_json_ld_faq_order_idx" ON "success_story_categories_seo_json_ld_faq" USING btree ("_order");
  CREATE INDEX "success_story_categories_seo_json_ld_faq_parent_id_idx" ON "success_story_categories_seo_json_ld_faq" USING btree ("_parent_id");
  CREATE INDEX "success_story_categories_seo_json_ld_how_to_step_order_idx" ON "success_story_categories_seo_json_ld_how_to_step" USING btree ("_order");
  CREATE INDEX "success_story_categories_seo_json_ld_how_to_step_parent_id_idx" ON "success_story_categories_seo_json_ld_how_to_step" USING btree ("_parent_id");
  CREATE INDEX "success_story_categories_seo_json_ld_how_to_step_image_idx" ON "success_story_categories_seo_json_ld_how_to_step" USING btree ("image_id");
  CREATE UNIQUE INDEX "success_story_categories_slug_idx" ON "success_story_categories" USING btree ("slug");
  CREATE INDEX "success_story_categories_seo_seo_og_image_idx" ON "success_story_categories" USING btree ("seo_og_image_id");
  CREATE INDEX "success_story_categories_seo_seo_twitter_image_idx" ON "success_story_categories" USING btree ("seo_twitter_image_id");
  CREATE INDEX "success_story_categories_updated_at_idx" ON "success_story_categories" USING btree ("updated_at");
  CREATE INDEX "success_story_categories_created_at_idx" ON "success_story_categories" USING btree ("created_at");
  CREATE INDEX "site_settings_trusted_brands_logos_order_idx" ON "site_settings_trusted_brands_logos" USING btree ("_order");
  CREATE INDEX "site_settings_trusted_brands_logos_parent_id_idx" ON "site_settings_trusted_brands_logos" USING btree ("_parent_id");
  CREATE INDEX "site_settings_trusted_brands_logos_logo_idx" ON "site_settings_trusted_brands_logos" USING btree ("logo_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_story_categories_fk" FOREIGN KEY ("success_story_categories_id") REFERENCES "public"."success_story_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_success_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("success_stories_id");
  CREATE INDEX "payload_locked_documents_rels_success_story_categories_i_idx" ON "payload_locked_documents_rels" USING btree ("success_story_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "success_stories_summary_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_problem_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_solution_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_seo_dismissed_warnings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_summary_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_problem_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_solution_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_seo_dismissed_warnings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_version_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_story_categories_seo_dismissed_warnings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_story_categories_seo_json_ld_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_story_categories_seo_json_ld_how_to_step" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_story_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_trusted_brands_logos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "success_stories_summary_bullets" CASCADE;
  DROP TABLE "success_stories_metrics" CASCADE;
  DROP TABLE "success_stories_problem_points" CASCADE;
  DROP TABLE "success_stories_solution_blocks" CASCADE;
  DROP TABLE "success_stories_seo_dismissed_warnings" CASCADE;
  DROP TABLE "success_stories_seo_json_ld_faq" CASCADE;
  DROP TABLE "success_stories_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "success_stories" CASCADE;
  DROP TABLE "_success_stories_v_version_summary_bullets" CASCADE;
  DROP TABLE "_success_stories_v_version_metrics" CASCADE;
  DROP TABLE "_success_stories_v_version_problem_points" CASCADE;
  DROP TABLE "_success_stories_v_version_solution_blocks" CASCADE;
  DROP TABLE "_success_stories_v_version_seo_dismissed_warnings" CASCADE;
  DROP TABLE "_success_stories_v_version_seo_json_ld_faq" CASCADE;
  DROP TABLE "_success_stories_v_version_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "_success_stories_v" CASCADE;
  DROP TABLE "success_story_categories_seo_dismissed_warnings" CASCADE;
  DROP TABLE "success_story_categories_seo_json_ld_faq" CASCADE;
  DROP TABLE "success_story_categories_seo_json_ld_how_to_step" CASCADE;
  DROP TABLE "success_story_categories" CASCADE;
  DROP TABLE "site_settings_trusted_brands_logos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_success_stories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_success_story_categories_fk";
  
  DROP INDEX "payload_locked_documents_rels_success_stories_id_idx";
  DROP INDEX "payload_locked_documents_rels_success_story_categories_i_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "success_stories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "success_story_categories_id";
  DROP TYPE "public"."enum_success_stories_seo_robots_max_image_preview";
  DROP TYPE "public"."enum_success_stories_status";
  DROP TYPE "public"."enum__success_stories_v_version_seo_robots_max_image_preview";
  DROP TYPE "public"."enum__success_stories_v_version_status";
  DROP TYPE "public"."enum_success_story_categories_seo_robots_max_image_preview";`)
}
