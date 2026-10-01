import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_pages_blocks_hero_quick_links_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_visual" AS ENUM('none', 'channels');
  CREATE TYPE "payload"."enum_pages_blocks_features_items_icon" AS ENUM('original', 'savings', 'stock', 'transparency', 'traceability', 'decision', 'calendar', 'temperature', 'inventory', 'delivery', 'certificate', 'check', 'recall', 'idea', 'route', 'freedom', 'growth', 'clock', 'home', 'family', 'equipment');
  CREATE TYPE "payload"."enum_pages_blocks_features_cta_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_features_tone" AS ENUM('plain', 'muted', 'teal');
  CREATE TYPE "payload"."enum_pages_blocks_statement_tone" AS ENUM('plain', 'teal', 'dark');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_quick_links_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_visual" AS ENUM('none', 'channels');
  CREATE TYPE "payload"."enum__pages_v_blocks_features_items_icon" AS ENUM('original', 'savings', 'stock', 'transparency', 'traceability', 'decision', 'calendar', 'temperature', 'inventory', 'delivery', 'certificate', 'check', 'recall', 'idea', 'route', 'freedom', 'growth', 'clock', 'home', 'family', 'equipment');
  CREATE TYPE "payload"."enum__pages_v_blocks_features_cta_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_features_tone" AS ENUM('plain', 'muted', 'teal');
  CREATE TYPE "payload"."enum__pages_v_blocks_statement_tone" AS ENUM('plain', 'teal', 'dark');
  ALTER TYPE "payload"."enum_pages_blocks_hero_variant" ADD VALUE 'lines';
  ALTER TYPE "payload"."enum__pages_v_blocks_hero_variant" ADD VALUE 'lines';
  CREATE TABLE "payload"."pages_blocks_hero_visual_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_visual_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_pages_blocks_hero_quick_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_quick_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_columns_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_columns_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_pages_blocks_features_items_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "payload"."pages_blocks_features_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_link_type" "payload"."enum_pages_blocks_features_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_document_id" integer,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean DEFAULT false,
  	"tone" "payload"."enum_pages_blocks_features_tone" DEFAULT 'plain',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_features_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_statement_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_statement_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum_pages_blocks_statement_tone" DEFAULT 'plain',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_statement_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "payload"."pages_blocks_team_members_locales" (
  	"role" varchar,
  	"bio" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_team_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_visual_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_visual_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum__pages_v_blocks_hero_quick_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_quick_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_columns_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_columns_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__pages_v_blocks_features_items_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_features_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_link_type" "payload"."enum__pages_v_blocks_features_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_document_id" integer,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean DEFAULT false,
  	"tone" "payload"."enum__pages_v_blocks_features_tone" DEFAULT 'plain',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_features_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_statement_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_statement_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum__pages_v_blocks_statement_tone" DEFAULT 'plain',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_statement_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_team_members_locales" (
  	"role" varchar,
  	"bio" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_team_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload"."pages_blocks_hero" ADD COLUMN "visual" "payload"."enum_pages_blocks_hero_visual" DEFAULT 'none';
  ALTER TABLE "payload"."pages_blocks_hero_locales" ADD COLUMN "title_highlight" varchar;
  ALTER TABLE "payload"."pages_blocks_stats_items" ADD COLUMN "plain" boolean DEFAULT false;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ADD COLUMN "visual" "payload"."enum__pages_v_blocks_hero_visual" DEFAULT 'none';
  ALTER TABLE "payload"."_pages_v_blocks_hero_locales" ADD COLUMN "title_highlight" varchar;
  ALTER TABLE "payload"."_pages_v_blocks_stats_items" ADD COLUMN "plain" boolean DEFAULT false;
  ALTER TABLE "payload"."pages_blocks_hero_visual_tags" ADD CONSTRAINT "pages_blocks_hero_visual_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_visual_tags_locales" ADD CONSTRAINT "pages_blocks_hero_visual_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero_visual_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_quick_links" ADD CONSTRAINT "pages_blocks_hero_quick_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_quick_links" ADD CONSTRAINT "pages_blocks_hero_quick_links_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_quick_links" ADD CONSTRAINT "pages_blocks_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_quick_links_locales" ADD CONSTRAINT "pages_blocks_hero_quick_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_columns_items" ADD CONSTRAINT "pages_blocks_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_columns_items_locales" ADD CONSTRAINT "pages_blocks_columns_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_columns_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_columns" ADD CONSTRAINT "pages_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_columns_locales" ADD CONSTRAINT "pages_blocks_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features_items_locales" ADD CONSTRAINT "pages_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_cta_link_document_id_documents_id_fk" FOREIGN KEY ("cta_link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_features_locales" ADD CONSTRAINT "pages_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_statement_tags" ADD CONSTRAINT "pages_blocks_statement_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_statement_tags_locales" ADD CONSTRAINT "pages_blocks_statement_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_statement_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_statement_locales" ADD CONSTRAINT "pages_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_team_members_locales" ADD CONSTRAINT "pages_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_team_locales" ADD CONSTRAINT "pages_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_visual_tags" ADD CONSTRAINT "_pages_v_blocks_hero_visual_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_visual_tags_locales" ADD CONSTRAINT "_pages_v_blocks_hero_visual_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero_visual_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_hero_quick_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_hero_quick_links_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_quick_links_locales" ADD CONSTRAINT "_pages_v_blocks_hero_quick_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_columns_items" ADD CONSTRAINT "_pages_v_blocks_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_columns_items_locales" ADD CONSTRAINT "_pages_v_blocks_columns_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_columns_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_columns" ADD CONSTRAINT "_pages_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_columns_locales" ADD CONSTRAINT "_pages_v_blocks_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features_items_locales" ADD CONSTRAINT "_pages_v_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_cta_link_document_id_documents_id_fk" FOREIGN KEY ("cta_link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_statement_tags" ADD CONSTRAINT "_pages_v_blocks_statement_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_statement_tags_locales" ADD CONSTRAINT "_pages_v_blocks_statement_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_statement_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_statement_locales" ADD CONSTRAINT "_pages_v_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_team_members_locales" ADD CONSTRAINT "_pages_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_team_locales" ADD CONSTRAINT "_pages_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_visual_tags_order_idx" ON "payload"."pages_blocks_hero_visual_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_visual_tags_parent_id_idx" ON "payload"."pages_blocks_hero_visual_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_visual_tags_locales_locale_parent_id_uniqu" ON "payload"."pages_blocks_hero_visual_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_visual_tags_locales_parent_id_idx" ON "payload"."pages_blocks_hero_visual_tags_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_quick_links_order_idx" ON "payload"."pages_blocks_hero_quick_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_quick_links_parent_id_idx" ON "payload"."pages_blocks_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_quick_links_link_link_page_idx" ON "payload"."pages_blocks_hero_quick_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_hero_quick_links_link_link_document_idx" ON "payload"."pages_blocks_hero_quick_links" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_quick_links_locales_locale_parent_id_uniqu" ON "payload"."pages_blocks_hero_quick_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_quick_links_locales_parent_id_idx" ON "payload"."pages_blocks_hero_quick_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_items_order_idx" ON "payload"."pages_blocks_columns_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_items_parent_id_idx" ON "payload"."pages_blocks_columns_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_columns_items_locales_locale_parent_id_unique" ON "payload"."pages_blocks_columns_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_columns_items_locales_parent_id_idx" ON "payload"."pages_blocks_columns_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_order_idx" ON "payload"."pages_blocks_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_parent_id_idx" ON "payload"."pages_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_path_idx" ON "payload"."pages_blocks_columns" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_columns_locales_locale_parent_id_unique" ON "payload"."pages_blocks_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_columns_locales_parent_id_idx" ON "payload"."pages_blocks_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_items_order_idx" ON "payload"."pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_items_parent_id_idx" ON "payload"."pages_blocks_features_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_items_locales_locale_parent_id_unique" ON "payload"."pages_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_items_locales_parent_id_idx" ON "payload"."pages_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "payload"."pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "payload"."pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "payload"."pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_features_cta_link_cta_link_page_idx" ON "payload"."pages_blocks_features" USING btree ("cta_link_page_id");
  CREATE INDEX "pages_blocks_features_cta_link_cta_link_document_idx" ON "payload"."pages_blocks_features" USING btree ("cta_link_document_id");
  CREATE UNIQUE INDEX "pages_blocks_features_locales_locale_parent_id_unique" ON "payload"."pages_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_locales_parent_id_idx" ON "payload"."pages_blocks_features_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_tags_order_idx" ON "payload"."pages_blocks_statement_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_tags_parent_id_idx" ON "payload"."pages_blocks_statement_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_statement_tags_locales_locale_parent_id_unique" ON "payload"."pages_blocks_statement_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_statement_tags_locales_parent_id_idx" ON "payload"."pages_blocks_statement_tags_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "payload"."pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "payload"."pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "payload"."pages_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_statement_locales_locale_parent_id_unique" ON "payload"."pages_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_statement_locales_parent_id_idx" ON "payload"."pages_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "payload"."pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "payload"."pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_image_idx" ON "payload"."pages_blocks_team_members" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_team_members_locales_locale_parent_id_unique" ON "payload"."pages_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_members_locales_parent_id_idx" ON "payload"."pages_blocks_team_members_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "payload"."pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "payload"."pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "payload"."pages_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_locales_locale_parent_id_unique" ON "payload"."pages_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_locales_parent_id_idx" ON "payload"."pages_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_visual_tags_order_idx" ON "payload"."_pages_v_blocks_hero_visual_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_visual_tags_parent_id_idx" ON "payload"."_pages_v_blocks_hero_visual_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_visual_tags_locales_locale_parent_id_un" ON "payload"."_pages_v_blocks_hero_visual_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_visual_tags_locales_parent_id_idx" ON "payload"."_pages_v_blocks_hero_visual_tags_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_quick_links_order_idx" ON "payload"."_pages_v_blocks_hero_quick_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_quick_links_parent_id_idx" ON "payload"."_pages_v_blocks_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_quick_links_link_link_page_idx" ON "payload"."_pages_v_blocks_hero_quick_links" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_hero_quick_links_link_link_document_idx" ON "payload"."_pages_v_blocks_hero_quick_links" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_quick_links_locales_locale_parent_id_un" ON "payload"."_pages_v_blocks_hero_quick_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_quick_links_locales_parent_id_idx" ON "payload"."_pages_v_blocks_hero_quick_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_items_order_idx" ON "payload"."_pages_v_blocks_columns_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_items_parent_id_idx" ON "payload"."_pages_v_blocks_columns_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_columns_items_locales_locale_parent_id_uniqu" ON "payload"."_pages_v_blocks_columns_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_items_locales_parent_id_idx" ON "payload"."_pages_v_blocks_columns_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_order_idx" ON "payload"."_pages_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_parent_id_idx" ON "payload"."_pages_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_path_idx" ON "payload"."_pages_v_blocks_columns" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_columns_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_locales_parent_id_idx" ON "payload"."_pages_v_blocks_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_order_idx" ON "payload"."_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_items_parent_id_idx" ON "payload"."_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_items_locales_locale_parent_id_uniq" ON "payload"."_pages_v_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_locales_parent_id_idx" ON "payload"."_pages_v_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "payload"."_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "payload"."_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "payload"."_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_cta_link_cta_link_page_idx" ON "payload"."_pages_v_blocks_features" USING btree ("cta_link_page_id");
  CREATE INDEX "_pages_v_blocks_features_cta_link_cta_link_document_idx" ON "payload"."_pages_v_blocks_features" USING btree ("cta_link_document_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_locales_parent_id_idx" ON "payload"."_pages_v_blocks_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_tags_order_idx" ON "payload"."_pages_v_blocks_statement_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_tags_parent_id_idx" ON "payload"."_pages_v_blocks_statement_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_statement_tags_locales_locale_parent_id_uniq" ON "payload"."_pages_v_blocks_statement_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_tags_locales_parent_id_idx" ON "payload"."_pages_v_blocks_statement_tags_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "payload"."_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "payload"."_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "payload"."_pages_v_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_statement_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_locales_parent_id_idx" ON "payload"."_pages_v_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "payload"."_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "payload"."_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_image_idx" ON "payload"."_pages_v_blocks_team_members" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_members_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_locales_parent_id_idx" ON "payload"."_pages_v_blocks_team_members_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "payload"."_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "payload"."_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "payload"."_pages_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_locales_parent_id_idx" ON "payload"."_pages_v_blocks_team_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."pages_blocks_hero_visual_tags" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_visual_tags_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_quick_links" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_quick_links_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_columns_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_columns_items_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_columns" CASCADE;
  DROP TABLE "payload"."pages_blocks_columns_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_features_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_features_items_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_features" CASCADE;
  DROP TABLE "payload"."pages_blocks_features_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_statement_tags" CASCADE;
  DROP TABLE "payload"."pages_blocks_statement_tags_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_statement" CASCADE;
  DROP TABLE "payload"."pages_blocks_statement_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_team_members" CASCADE;
  DROP TABLE "payload"."pages_blocks_team_members_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_team" CASCADE;
  DROP TABLE "payload"."pages_blocks_team_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_visual_tags" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_visual_tags_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_quick_links" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_quick_links_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_columns_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_columns_items_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_columns" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_columns_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_features_items_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_features" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_features_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_statement_tags" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_statement_tags_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_statement" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_statement_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_team" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_team_locales" CASCADE;
  ALTER TABLE "payload"."pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "payload"."pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'light'::text;
  DROP TYPE "payload"."enum_pages_blocks_hero_variant";
  CREATE TYPE "payload"."enum_pages_blocks_hero_variant" AS ENUM('light', 'dark', 'slats');
  ALTER TABLE "payload"."pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'light'::"payload"."enum_pages_blocks_hero_variant";
  ALTER TABLE "payload"."pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "payload"."enum_pages_blocks_hero_variant" USING "variant"::"payload"."enum_pages_blocks_hero_variant";
  ALTER TABLE "payload"."_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'light'::text;
  DROP TYPE "payload"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_variant" AS ENUM('light', 'dark', 'slats');
  ALTER TABLE "payload"."_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'light'::"payload"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "payload"."_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "payload"."enum__pages_v_blocks_hero_variant" USING "variant"::"payload"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "payload"."pages_blocks_hero" DROP COLUMN "visual";
  ALTER TABLE "payload"."pages_blocks_hero_locales" DROP COLUMN "title_highlight";
  ALTER TABLE "payload"."pages_blocks_stats_items" DROP COLUMN "plain";
  ALTER TABLE "payload"."_pages_v_blocks_hero" DROP COLUMN "visual";
  ALTER TABLE "payload"."_pages_v_blocks_hero_locales" DROP COLUMN "title_highlight";
  ALTER TABLE "payload"."_pages_v_blocks_stats_items" DROP COLUMN "plain";
  DROP TYPE "payload"."enum_pages_blocks_hero_quick_links_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_visual";
  DROP TYPE "payload"."enum_pages_blocks_features_items_icon";
  DROP TYPE "payload"."enum_pages_blocks_features_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_features_tone";
  DROP TYPE "payload"."enum_pages_blocks_statement_tone";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_quick_links_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_visual";
  DROP TYPE "payload"."enum__pages_v_blocks_features_items_icon";
  DROP TYPE "payload"."enum__pages_v_blocks_features_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_features_tone";
  DROP TYPE "payload"."enum__pages_v_blocks_statement_tone";`)
}
