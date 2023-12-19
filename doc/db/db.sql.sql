CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "code" text,
  "price" integer,
  "status" varchar,
  "description" text,
  "brand_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "brand" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "status" enum,
  "description" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "action_user_logs" (
  "id" SERIAL PRIMARY KEY,
  "action" varchar,
  "user_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

COMMENT ON COLUMN "products"."code" IS 'Content of the code';

COMMENT ON COLUMN "products"."description" IS 'Content of the code';

COMMENT ON COLUMN "brand"."description" IS 'Content of the code';

ALTER TABLE "action_user_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");
