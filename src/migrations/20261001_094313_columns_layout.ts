import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_pages_blocks_columns_layout" AS ENUM('cards', 'alternating');
  CREATE TYPE "payload"."enum__pages_v_blocks_columns_layout" AS ENUM('cards', 'alternating');
  ALTER TABLE "payload"."pages_blocks_columns_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "payload"."pages_blocks_columns" ADD COLUMN "layout" "payload"."enum_pages_blocks_columns_layout" DEFAULT 'cards';
  ALTER TABLE "payload"."_pages_v_blocks_columns_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "payload"."_pages_v_blocks_columns" ADD COLUMN "layout" "payload"."enum__pages_v_blocks_columns_layout" DEFAULT 'cards';
  ALTER TABLE "payload"."pages_blocks_columns_items" ADD CONSTRAINT "pages_blocks_columns_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_columns_items" ADD CONSTRAINT "_pages_v_blocks_columns_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_columns_items_image_idx" ON "payload"."pages_blocks_columns_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_columns_items_image_idx" ON "payload"."_pages_v_blocks_columns_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."pages_blocks_columns_items" DROP CONSTRAINT "pages_blocks_columns_items_image_id_media_id_fk";
  
  ALTER TABLE "payload"."_pages_v_blocks_columns_items" DROP CONSTRAINT "_pages_v_blocks_columns_items_image_id_media_id_fk";
  
  DROP INDEX "payload"."pages_blocks_columns_items_image_idx";
  DROP INDEX "payload"."_pages_v_blocks_columns_items_image_idx";
  ALTER TABLE "payload"."pages_blocks_columns_items" DROP COLUMN "image_id";
  ALTER TABLE "payload"."pages_blocks_columns" DROP COLUMN "layout";
  ALTER TABLE "payload"."_pages_v_blocks_columns_items" DROP COLUMN "image_id";
  ALTER TABLE "payload"."_pages_v_blocks_columns" DROP COLUMN "layout";
  DROP TYPE "payload"."enum_pages_blocks_columns_layout";
  DROP TYPE "payload"."enum__pages_v_blocks_columns_layout";`)
}
