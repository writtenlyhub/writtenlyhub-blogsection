import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "newsletter_popup_is_active" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_popup_title" varchar DEFAULT 'Subscribe to Newsletter' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_popup_description" varchar DEFAULT 'Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and digital writing.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_popup_button_text" varchar DEFAULT 'Subscribe Now' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_popup_button_link" varchar DEFAULT '/newsletter' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "newsletter_popup_is_active";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_popup_title";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_popup_description";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_popup_button_text";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_popup_button_link";`)
}
