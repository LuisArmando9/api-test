CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "code" text,
  "price" integer,
  "status" varchar,
  "description" text,
  "brandId" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "brand" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "status" enum,
  "description" text,
    "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "action_user_logs" (
  "id" SERIAL PRIMARY KEY,
  "action" varchar,
  "userId" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

COMMENT ON COLUMN "products"."code" IS 'Content of the code';

COMMENT ON COLUMN "products"."description" IS 'Content of the code';

COMMENT ON COLUMN "brand"."description" IS 'Content of the code';

ALTER TABLE "action_user_logs" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brandId") REFERENCES "brand" ("id");
