import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "success_stories" ADD COLUMN "strategy_eyebrow" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "strategy_heading" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "strategy_description" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "strategy_visual_id" integer;
  ALTER TABLE "success_stories" ADD COLUMN "impact_visual_id" integer;
  ALTER TABLE "success_stories" ADD COLUMN "client_description" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "client_visual_id" integer;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_strategy_eyebrow" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_strategy_heading" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_strategy_description" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_strategy_visual_id" integer;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_impact_visual_id" integer;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_client_description" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_client_visual_id" integer;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_strategy_visual_id_media_id_fk" FOREIGN KEY ("strategy_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_impact_visual_id_media_id_fk" FOREIGN KEY ("impact_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_client_visual_id_media_id_fk" FOREIGN KEY ("client_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_strategy_visual_id_media_id_fk" FOREIGN KEY ("version_strategy_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_impact_visual_id_media_id_fk" FOREIGN KEY ("version_impact_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_client_visual_id_media_id_fk" FOREIGN KEY ("version_client_visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "success_stories_strategy_visual_idx" ON "success_stories" USING btree ("strategy_visual_id");
  CREATE INDEX "success_stories_impact_visual_idx" ON "success_stories" USING btree ("impact_visual_id");
  CREATE INDEX "success_stories_client_visual_idx" ON "success_stories" USING btree ("client_visual_id");
  CREATE INDEX "_success_stories_v_version_version_strategy_visual_idx" ON "_success_stories_v" USING btree ("version_strategy_visual_id");
  CREATE INDEX "_success_stories_v_version_version_impact_visual_idx" ON "_success_stories_v" USING btree ("version_impact_visual_id");
  CREATE INDEX "_success_stories_v_version_version_client_visual_idx" ON "_success_stories_v" USING btree ("version_client_visual_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "success_stories" DROP CONSTRAINT "success_stories_strategy_visual_id_media_id_fk";
  
  ALTER TABLE "success_stories" DROP CONSTRAINT "success_stories_impact_visual_id_media_id_fk";
  
  ALTER TABLE "success_stories" DROP CONSTRAINT "success_stories_client_visual_id_media_id_fk";
  
  ALTER TABLE "_success_stories_v" DROP CONSTRAINT "_success_stories_v_version_strategy_visual_id_media_id_fk";
  
  ALTER TABLE "_success_stories_v" DROP CONSTRAINT "_success_stories_v_version_impact_visual_id_media_id_fk";
  
  ALTER TABLE "_success_stories_v" DROP CONSTRAINT "_success_stories_v_version_client_visual_id_media_id_fk";
  
  DROP INDEX "success_stories_strategy_visual_idx";
  DROP INDEX "success_stories_impact_visual_idx";
  DROP INDEX "success_stories_client_visual_idx";
  DROP INDEX "_success_stories_v_version_version_strategy_visual_idx";
  DROP INDEX "_success_stories_v_version_version_impact_visual_idx";
  DROP INDEX "_success_stories_v_version_version_client_visual_idx";
  ALTER TABLE "success_stories" DROP COLUMN "strategy_eyebrow";
  ALTER TABLE "success_stories" DROP COLUMN "strategy_heading";
  ALTER TABLE "success_stories" DROP COLUMN "strategy_description";
  ALTER TABLE "success_stories" DROP COLUMN "strategy_visual_id";
  ALTER TABLE "success_stories" DROP COLUMN "impact_visual_id";
  ALTER TABLE "success_stories" DROP COLUMN "client_description";
  ALTER TABLE "success_stories" DROP COLUMN "client_visual_id";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_strategy_eyebrow";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_strategy_heading";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_strategy_description";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_strategy_visual_id";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_impact_visual_id";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_client_description";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_client_visual_id";`)
}
