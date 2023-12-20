



-- Database: api-hostech

-- DROP DATABASE IF EXISTS "api-hostech";

CREATE DATABASE "api-hostech"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Latin America.1252'
    LC_CTYPE = 'Spanish_Latin America.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
	
	


CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
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
  "status" varchar(50),
  "description" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "action_user_logs" (
  "id" SERIAL PRIMARY KEY,
  "action" varchar,
  "user_id" integer,
  "after_data" json,
  "before_data" json,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);


CREATE VIEW view_get_user AS
SELECT
  password,
  id,
  email
FROM users;


CREATE VIEW view_get_brand AS
SELECT
  id,
  name,
  status,
  description
FROM brand where deleted_at is null and status = 'enable';


CREATE VIEW view_get_product AS
SELECT
  p.id,
  p.name,
  p.code,
  p.price,
  p.status,
  p.description,
  p.created_at,
  p.brand_id
FROM products p where (p.deleted_at is null) and (SELECT 1 FROM brand b WHERE b.id = p.brand_id and b.deleted_at is null and b.status = 'enable') = 1;



CREATE VIEW view_get_log AS
SELECT
  aul.id,
  aul.action,
  aul.after_data,
  aul.before_data,
  aul.user_id,
  (select u.email from users u where u.id = aul.user_id and u.deleted_at is null) as email
FROM action_user_logs aul;