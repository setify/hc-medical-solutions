import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Eigenes Schema, das Supabase nicht über die REST-API bereitstellt.
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS "payload";`)
  await db.execute(sql`
   CREATE TYPE "payload"."_locales" AS ENUM('de', 'en', 'fr');
  CREATE TYPE "payload"."enum_pages_blocks_hero_actions_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_variant" AS ENUM('light', 'dark', 'slats');
  CREATE TYPE "payload"."enum_pages_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "payload"."enum_pages_blocks_call_to_action_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_call_to_action_variant" AS ENUM('dark', 'light');
  CREATE TYPE "payload"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_actions_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_variant" AS ENUM('light', 'dark', 'slats');
  CREATE TYPE "payload"."enum__pages_v_blocks_text_image_image_position" AS ENUM('right', 'left');
  CREATE TYPE "payload"."enum__pages_v_blocks_call_to_action_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_call_to_action_variant" AS ENUM('dark', 'light');
  CREATE TYPE "payload"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_published_locale" AS ENUM('de', 'en', 'fr');
  CREATE TYPE "payload"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "payload"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "payload"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "payload"."enum_navigation_items_children_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_navigation_items_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_navigation_cta_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_footer_columns_links_link_type" AS ENUM('page', 'document', 'external');
  CREATE TYPE "payload"."enum_footer_legal_links_link_type" AS ENUM('page', 'document', 'external');
  CREATE TABLE "payload"."pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_pages_blocks_hero_actions_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_actions_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "payload"."enum_pages_blocks_hero_variant" DEFAULT 'light',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "payload"."enum_pages_blocks_text_image_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_text_image_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_teaser_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE "payload"."pages_blocks_teaser_grid_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_teaser_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_teaser_grid_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_process_steps_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_faq_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_quote_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"decimals" numeric DEFAULT 0,
  	"suffix" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stats_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_pages_blocks_call_to_action_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"variant" "payload"."enum_pages_blocks_call_to_action_variant" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_call_to_action_locales" (
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_downloads_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_partner_logos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_job_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_job_list_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"empty_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_contact_form_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_contact_form_topics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_contact_form_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"privacy_text" varchar,
  	"success_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"noindex" boolean DEFAULT false,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."pages_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"path" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum__pages_v_blocks_hero_actions_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_actions_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "payload"."enum__pages_v_blocks_hero_variant" DEFAULT 'light',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "payload"."enum__pages_v_blocks_text_image_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_text_image_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_teaser_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_teaser_grid_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_teaser_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_teaser_grid_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_quote_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"decimals" numeric DEFAULT 0,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum__pages_v_blocks_call_to_action_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"variant" "payload"."enum__pages_v_blocks_call_to_action_variant" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_call_to_action_locales" (
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_downloads_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_partner_logos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_job_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_job_list_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"empty_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_contact_form_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_contact_form_topics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_contact_form_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"privacy_text" varchar,
  	"success_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_noindex" boolean DEFAULT false,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_pages_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "payload"."media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload"."documents_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "payload"."enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "payload"."enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "payload"."enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."navigation_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_navigation_items_children_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."navigation_items_children_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_navigation_items_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."navigation_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_link_type" "payload"."enum_navigation_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_document_id" integer,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."navigation_locales" (
  	"cta_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_footer_columns_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."footer_columns_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."footer_columns_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "payload"."enum_footer_legal_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_document_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."footer_legal_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_page_id" integer,
  	"organization_name" varchar,
  	"organization_street" varchar,
  	"organization_postal_code" varchar,
  	"organization_city" varchar,
  	"organization_phone" varchar,
  	"organization_email" varchar,
  	"contact_recipient" varchar,
  	"join_widget_token" varchar,
  	"join_company_url" varchar,
  	"matomo_url" varchar,
  	"matomo_site_id" varchar,
  	"matomo_respect_dnt" boolean DEFAULT true,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."settings_locales" (
  	"organization_country" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload"."pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_actions_locales" ADD CONSTRAINT "pages_blocks_hero_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_text_image" ADD CONSTRAINT "pages_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_text_image" ADD CONSTRAINT "pages_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_text_image_locales" ADD CONSTRAINT "pages_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_teaser_grid_items" ADD CONSTRAINT "pages_blocks_teaser_grid_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_teaser_grid_items" ADD CONSTRAINT "pages_blocks_teaser_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_teaser_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_teaser_grid_items_locales" ADD CONSTRAINT "pages_blocks_teaser_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_teaser_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_teaser_grid" ADD CONSTRAINT "pages_blocks_teaser_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_teaser_grid_locales" ADD CONSTRAINT "pages_blocks_teaser_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_teaser_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_process_steps_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_quote_locales" ADD CONSTRAINT "pages_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_call_to_action_locales" ADD CONSTRAINT "pages_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_downloads" ADD CONSTRAINT "pages_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_downloads_locales" ADD CONSTRAINT "pages_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_partner_logos" ADD CONSTRAINT "pages_blocks_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_partner_logos_locales" ADD CONSTRAINT "pages_blocks_partner_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_partner_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_job_list" ADD CONSTRAINT "pages_blocks_job_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_job_list_locales" ADD CONSTRAINT "pages_blocks_job_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_job_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_contact_form_topics" ADD CONSTRAINT "pages_blocks_contact_form_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_contact_form_topics_locales" ADD CONSTRAINT "pages_blocks_contact_form_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_contact_form_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_contact_form_locales" ADD CONSTRAINT "pages_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_rels" ADD CONSTRAINT "pages_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "payload"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_actions_locales" ADD CONSTRAINT "_pages_v_blocks_hero_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_text_image" ADD CONSTRAINT "_pages_v_blocks_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_text_image" ADD CONSTRAINT "_pages_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_text_image_locales" ADD CONSTRAINT "_pages_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_teaser_grid_items" ADD CONSTRAINT "_pages_v_blocks_teaser_grid_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_teaser_grid_items" ADD CONSTRAINT "_pages_v_blocks_teaser_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_teaser_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_teaser_grid_items_locales" ADD CONSTRAINT "_pages_v_blocks_teaser_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_teaser_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_teaser_grid" ADD CONSTRAINT "_pages_v_blocks_teaser_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_teaser_grid_locales" ADD CONSTRAINT "_pages_v_blocks_teaser_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_teaser_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_process_steps_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_quote_locales" ADD CONSTRAINT "_pages_v_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_call_to_action_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_downloads" ADD CONSTRAINT "_pages_v_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_downloads_locales" ADD CONSTRAINT "_pages_v_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_partner_logos" ADD CONSTRAINT "_pages_v_blocks_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_partner_logos_locales" ADD CONSTRAINT "_pages_v_blocks_partner_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_partner_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_job_list" ADD CONSTRAINT "_pages_v_blocks_job_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_job_list_locales" ADD CONSTRAINT "_pages_v_blocks_job_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_job_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_contact_form_topics" ADD CONSTRAINT "_pages_v_blocks_contact_form_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_contact_form_topics_locales" ADD CONSTRAINT "_pages_v_blocks_contact_form_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_contact_form_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_contact_form_locales" ADD CONSTRAINT "_pages_v_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "payload"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "payload"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "payload"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items_children" ADD CONSTRAINT "navigation_items_children_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items_children" ADD CONSTRAINT "navigation_items_children_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items_children" ADD CONSTRAINT "navigation_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items_children_locales" ADD CONSTRAINT "navigation_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items" ADD CONSTRAINT "navigation_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items" ADD CONSTRAINT "navigation_items_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."navigation" ADD CONSTRAINT "navigation_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation" ADD CONSTRAINT "navigation_cta_link_document_id_documents_id_fk" FOREIGN KEY ("cta_link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_links" ADD CONSTRAINT "footer_columns_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_links" ADD CONSTRAINT "footer_columns_links_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_legal_links" ADD CONSTRAINT "footer_legal_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_legal_links" ADD CONSTRAINT "footer_legal_links_link_document_id_documents_id_fk" FOREIGN KEY ("link_document_id") REFERENCES "payload"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."settings" ADD CONSTRAINT "settings_home_page_id_pages_id_fk" FOREIGN KEY ("home_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."settings" ADD CONSTRAINT "settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_actions_link_link_page_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_hero_actions_link_link_document_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_actions_locales_locale_parent_id_unique" ON "payload"."pages_blocks_hero_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_actions_locales_parent_id_idx" ON "payload"."pages_blocks_hero_actions_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "payload"."pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "payload"."pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "payload"."pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "payload"."pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "payload"."pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "payload"."pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "payload"."pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "payload"."pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_order_idx" ON "payload"."pages_blocks_text_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_image_parent_id_idx" ON "payload"."pages_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_path_idx" ON "payload"."pages_blocks_text_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_image_image_idx" ON "payload"."pages_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_text_image_locales_locale_parent_id_unique" ON "payload"."pages_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_image_locales_parent_id_idx" ON "payload"."pages_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_items_order_idx" ON "payload"."pages_blocks_teaser_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_teaser_grid_items_parent_id_idx" ON "payload"."pages_blocks_teaser_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_items_page_idx" ON "payload"."pages_blocks_teaser_grid_items" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_teaser_grid_items_locales_locale_parent_id_uniq" ON "payload"."pages_blocks_teaser_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_items_locales_parent_id_idx" ON "payload"."pages_blocks_teaser_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_order_idx" ON "payload"."pages_blocks_teaser_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_teaser_grid_parent_id_idx" ON "payload"."pages_blocks_teaser_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_path_idx" ON "payload"."pages_blocks_teaser_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_teaser_grid_locales_locale_parent_id_unique" ON "payload"."pages_blocks_teaser_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_teaser_grid_locales_parent_id_idx" ON "payload"."pages_blocks_teaser_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "payload"."pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "payload"."pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_steps_locales_locale_parent_id_un" ON "payload"."pages_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_locales_parent_id_idx" ON "payload"."pages_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "payload"."pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "payload"."pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "payload"."pages_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "payload"."pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_locales_parent_id_idx" ON "payload"."pages_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "payload"."pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "payload"."pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "payload"."pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "payload"."pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "payload"."pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "payload"."pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "payload"."pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "payload"."pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "payload"."pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "payload"."pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "payload"."pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "payload"."pages_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_quote_locales_locale_parent_id_unique" ON "payload"."pages_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_quote_locales_parent_id_idx" ON "payload"."pages_blocks_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "payload"."pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "payload"."pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "payload"."pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "payload"."pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "payload"."pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "payload"."pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "payload"."pages_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "payload"."pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_locales_parent_id_idx" ON "payload"."pages_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "payload"."pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "payload"."pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "payload"."pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "pages_blocks_call_to_action_link_link_page_idx" ON "payload"."pages_blocks_call_to_action" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_call_to_action_link_link_document_idx" ON "payload"."pages_blocks_call_to_action" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "pages_blocks_call_to_action_locales_locale_parent_id_unique" ON "payload"."pages_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_locales_parent_id_idx" ON "payload"."pages_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_downloads_order_idx" ON "payload"."pages_blocks_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_downloads_parent_id_idx" ON "payload"."pages_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_downloads_path_idx" ON "payload"."pages_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_downloads_locales_locale_parent_id_unique" ON "payload"."pages_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_downloads_locales_parent_id_idx" ON "payload"."pages_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_logos_order_idx" ON "payload"."pages_blocks_partner_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_logos_parent_id_idx" ON "payload"."pages_blocks_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_logos_path_idx" ON "payload"."pages_blocks_partner_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_partner_logos_locales_locale_parent_id_unique" ON "payload"."pages_blocks_partner_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_partner_logos_locales_parent_id_idx" ON "payload"."pages_blocks_partner_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_list_order_idx" ON "payload"."pages_blocks_job_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_job_list_parent_id_idx" ON "payload"."pages_blocks_job_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_list_path_idx" ON "payload"."pages_blocks_job_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_job_list_locales_locale_parent_id_unique" ON "payload"."pages_blocks_job_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_job_list_locales_parent_id_idx" ON "payload"."pages_blocks_job_list_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_topics_order_idx" ON "payload"."pages_blocks_contact_form_topics" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_topics_parent_id_idx" ON "payload"."pages_blocks_contact_form_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_topics_locales_locale_parent_id_un" ON "payload"."pages_blocks_contact_form_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_topics_locales_parent_id_idx" ON "payload"."pages_blocks_contact_form_topics_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "payload"."pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "payload"."pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "payload"."pages_blocks_contact_form" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_locales_locale_parent_id_unique" ON "payload"."pages_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_locales_parent_id_idx" ON "payload"."pages_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "payload"."pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "payload"."pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_locale_idx" ON "payload"."pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "payload"."pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages_parent_idx" ON "payload"."pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "payload"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "payload"."pages" USING btree ("_status");
  CREATE INDEX "pages_slug_idx" ON "payload"."pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "pages_path_idx" ON "payload"."pages_locales" USING btree ("path","_locale");
  CREATE INDEX "pages_meta_meta_image_idx" ON "payload"."pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "payload"."pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "payload"."pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "payload"."pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "payload"."pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "payload"."pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_documents_id_idx" ON "payload"."pages_rels" USING btree ("documents_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "payload"."pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_order_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_actions_parent_id_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_link_link_page_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_link_link_document_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_actions_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_hero_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_locales_parent_id_idx" ON "payload"."_pages_v_blocks_hero_actions_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "payload"."_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "payload"."_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_order_idx" ON "payload"."_pages_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_image_parent_id_idx" ON "payload"."_pages_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_path_idx" ON "payload"."_pages_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_image_image_idx" ON "payload"."_pages_v_blocks_text_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_image_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_locales_parent_id_idx" ON "payload"."_pages_v_blocks_text_image_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_items_order_idx" ON "payload"."_pages_v_blocks_teaser_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_teaser_grid_items_parent_id_idx" ON "payload"."_pages_v_blocks_teaser_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_items_page_idx" ON "payload"."_pages_v_blocks_teaser_grid_items" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_teaser_grid_items_locales_locale_parent_id_u" ON "payload"."_pages_v_blocks_teaser_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_items_locales_parent_id_idx" ON "payload"."_pages_v_blocks_teaser_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_order_idx" ON "payload"."_pages_v_blocks_teaser_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_teaser_grid_parent_id_idx" ON "payload"."_pages_v_blocks_teaser_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_path_idx" ON "payload"."_pages_v_blocks_teaser_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_teaser_grid_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_teaser_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_teaser_grid_locales_parent_id_idx" ON "payload"."_pages_v_blocks_teaser_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "payload"."_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "payload"."_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_steps_locales_locale_parent_id" ON "payload"."_pages_v_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_locales_parent_id_idx" ON "payload"."_pages_v_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "payload"."_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "payload"."_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "payload"."_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "payload"."_pages_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_locales_parent_id_idx" ON "payload"."_pages_v_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "payload"."_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "payload"."_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "payload"."_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "payload"."_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_quote_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_locales_parent_id_idx" ON "payload"."_pages_v_blocks_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "payload"."_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "payload"."_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locales_parent_id_idx" ON "payload"."_pages_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "payload"."_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "payload"."_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "payload"."_pages_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_locales_parent_id_idx" ON "payload"."_pages_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "payload"."_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "payload"."_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "payload"."_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_call_to_action_link_link_page_idx" ON "payload"."_pages_v_blocks_call_to_action" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_link_link_document_idx" ON "payload"."_pages_v_blocks_call_to_action" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_call_to_action_locales_locale_parent_id_uniq" ON "payload"."_pages_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_locales_parent_id_idx" ON "payload"."_pages_v_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_order_idx" ON "payload"."_pages_v_blocks_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_downloads_parent_id_idx" ON "payload"."_pages_v_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_path_idx" ON "payload"."_pages_v_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_downloads_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_locales_parent_id_idx" ON "payload"."_pages_v_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_logos_order_idx" ON "payload"."_pages_v_blocks_partner_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_logos_parent_id_idx" ON "payload"."_pages_v_blocks_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_logos_path_idx" ON "payload"."_pages_v_blocks_partner_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_partner_logos_locales_locale_parent_id_uniqu" ON "payload"."_pages_v_blocks_partner_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_logos_locales_parent_id_idx" ON "payload"."_pages_v_blocks_partner_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_list_order_idx" ON "payload"."_pages_v_blocks_job_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_job_list_parent_id_idx" ON "payload"."_pages_v_blocks_job_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_list_path_idx" ON "payload"."_pages_v_blocks_job_list" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_job_list_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_job_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_job_list_locales_parent_id_idx" ON "payload"."_pages_v_blocks_job_list_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_topics_order_idx" ON "payload"."_pages_v_blocks_contact_form_topics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_topics_parent_id_idx" ON "payload"."_pages_v_blocks_contact_form_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_form_topics_locales_locale_parent_id" ON "payload"."_pages_v_blocks_contact_form_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_topics_locales_parent_id_idx" ON "payload"."_pages_v_blocks_contact_form_topics_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "payload"."_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "payload"."_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "payload"."_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_form_locales_locale_parent_id_unique" ON "payload"."_pages_v_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_locales_parent_id_idx" ON "payload"."_pages_v_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "payload"."_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "payload"."_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_locale_idx" ON "payload"."_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "payload"."_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "payload"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "payload"."_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "payload"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "payload"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "payload"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "payload"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "payload"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "payload"."_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "payload"."_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "payload"."_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "payload"."_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "payload"."_pages_v_locales" USING btree ("version_path","_locale");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "payload"."_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "payload"."_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "payload"."_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "payload"."_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "payload"."_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "payload"."_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_documents_id_idx" ON "payload"."_pages_v_rels" USING btree ("documents_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "payload"."_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "payload"."media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "payload"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "payload"."media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "payload"."media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "payload"."media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "payload"."media_locales" USING btree ("_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "payload"."documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "payload"."documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "payload"."documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "payload"."documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_locales_parent_id_idx" ON "payload"."documents_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "payload"."redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "payload"."redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "payload"."redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "payload"."redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "payload"."redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "payload"."redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "payload"."redirects_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_children_order_idx" ON "payload"."navigation_items_children" USING btree ("_order");
  CREATE INDEX "navigation_items_children_parent_id_idx" ON "payload"."navigation_items_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_children_link_link_page_idx" ON "payload"."navigation_items_children" USING btree ("link_page_id");
  CREATE INDEX "navigation_items_children_link_link_document_idx" ON "payload"."navigation_items_children" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "navigation_items_children_locales_locale_parent_id_unique" ON "payload"."navigation_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_items_children_locales_parent_id_idx" ON "payload"."navigation_items_children_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_order_idx" ON "payload"."navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "payload"."navigation_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_link_link_page_idx" ON "payload"."navigation_items" USING btree ("link_page_id");
  CREATE INDEX "navigation_items_link_link_document_idx" ON "payload"."navigation_items" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "payload"."navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_items_locales_parent_id_idx" ON "payload"."navigation_items_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_cta_link_cta_link_page_idx" ON "payload"."navigation" USING btree ("cta_link_page_id");
  CREATE INDEX "navigation_cta_link_cta_link_document_idx" ON "payload"."navigation" USING btree ("cta_link_document_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "payload"."navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_locales_parent_id_idx" ON "payload"."navigation_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "payload"."footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "payload"."footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_link_link_page_idx" ON "payload"."footer_columns_links" USING btree ("link_page_id");
  CREATE INDEX "footer_columns_links_link_link_document_idx" ON "payload"."footer_columns_links" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "payload"."footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_locales_parent_id_idx" ON "payload"."footer_columns_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "payload"."footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "payload"."footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "payload"."footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_locales_parent_id_idx" ON "payload"."footer_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "payload"."footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "payload"."footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_link_link_page_idx" ON "payload"."footer_legal_links" USING btree ("link_page_id");
  CREATE INDEX "footer_legal_links_link_link_document_idx" ON "payload"."footer_legal_links" USING btree ("link_document_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "payload"."footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_links_locales_parent_id_idx" ON "payload"."footer_legal_links_locales" USING btree ("_parent_id");
  CREATE INDEX "settings_home_page_idx" ON "payload"."settings" USING btree ("home_page_id");
  CREATE INDEX "settings_default_og_image_idx" ON "payload"."settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "payload"."settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_locales_parent_id_idx" ON "payload"."settings_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."pages_blocks_hero_actions" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_actions_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_rich_text" CASCADE;
  DROP TABLE "payload"."pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_text_image" CASCADE;
  DROP TABLE "payload"."pages_blocks_text_image_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_teaser_grid_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_teaser_grid_items_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_teaser_grid" CASCADE;
  DROP TABLE "payload"."pages_blocks_teaser_grid_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "payload"."pages_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_process_steps" CASCADE;
  DROP TABLE "payload"."pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_quote" CASCADE;
  DROP TABLE "payload"."pages_blocks_quote_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_call_to_action" CASCADE;
  DROP TABLE "payload"."pages_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_downloads" CASCADE;
  DROP TABLE "payload"."pages_blocks_downloads_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_partner_logos" CASCADE;
  DROP TABLE "payload"."pages_blocks_partner_logos_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_job_list" CASCADE;
  DROP TABLE "payload"."pages_blocks_job_list_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_contact_form_topics" CASCADE;
  DROP TABLE "payload"."pages_blocks_contact_form_topics_locales" CASCADE;
  DROP TABLE "payload"."pages_blocks_contact_form" CASCADE;
  DROP TABLE "payload"."pages_blocks_contact_form_locales" CASCADE;
  DROP TABLE "payload"."pages_breadcrumbs" CASCADE;
  DROP TABLE "payload"."pages" CASCADE;
  DROP TABLE "payload"."pages_locales" CASCADE;
  DROP TABLE "payload"."pages_rels" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_actions" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_actions_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_text_image" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_teaser_grid_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_teaser_grid_items_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_teaser_grid" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_teaser_grid_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_quote" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_quote_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_downloads" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_downloads_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_partner_logos" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_partner_logos_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_job_list" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_job_list_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_contact_form_topics" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_contact_form_topics_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_contact_form_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "payload"."_pages_v" CASCADE;
  DROP TABLE "payload"."_pages_v_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_rels" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."media_locales" CASCADE;
  DROP TABLE "payload"."documents" CASCADE;
  DROP TABLE "payload"."documents_locales" CASCADE;
  DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."redirects" CASCADE;
  DROP TABLE "payload"."redirects_rels" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."navigation_items_children" CASCADE;
  DROP TABLE "payload"."navigation_items_children_locales" CASCADE;
  DROP TABLE "payload"."navigation_items" CASCADE;
  DROP TABLE "payload"."navigation_items_locales" CASCADE;
  DROP TABLE "payload"."navigation" CASCADE;
  DROP TABLE "payload"."navigation_locales" CASCADE;
  DROP TABLE "payload"."footer_columns_links" CASCADE;
  DROP TABLE "payload"."footer_columns_links_locales" CASCADE;
  DROP TABLE "payload"."footer_columns" CASCADE;
  DROP TABLE "payload"."footer_columns_locales" CASCADE;
  DROP TABLE "payload"."footer_legal_links" CASCADE;
  DROP TABLE "payload"."footer_legal_links_locales" CASCADE;
  DROP TABLE "payload"."footer" CASCADE;
  DROP TABLE "payload"."settings" CASCADE;
  DROP TABLE "payload"."settings_locales" CASCADE;
  DROP TYPE "payload"."_locales";
  DROP TYPE "payload"."enum_pages_blocks_hero_actions_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_variant";
  DROP TYPE "payload"."enum_pages_blocks_text_image_image_position";
  DROP TYPE "payload"."enum_pages_blocks_call_to_action_link_type";
  DROP TYPE "payload"."enum_pages_blocks_call_to_action_variant";
  DROP TYPE "payload"."enum_pages_status";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_actions_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "payload"."enum__pages_v_blocks_text_image_image_position";
  DROP TYPE "payload"."enum__pages_v_blocks_call_to_action_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_call_to_action_variant";
  DROP TYPE "payload"."enum__pages_v_version_status";
  DROP TYPE "payload"."enum__pages_v_published_locale";
  DROP TYPE "payload"."enum_users_role";
  DROP TYPE "payload"."enum_redirects_to_type";
  DROP TYPE "payload"."enum_redirects_type";
  DROP TYPE "payload"."enum_navigation_items_children_link_type";
  DROP TYPE "payload"."enum_navigation_items_link_type";
  DROP TYPE "payload"."enum_navigation_cta_link_type";
  DROP TYPE "payload"."enum_footer_columns_links_link_type";
  DROP TYPE "payload"."enum_footer_legal_links_link_type";`)
}
