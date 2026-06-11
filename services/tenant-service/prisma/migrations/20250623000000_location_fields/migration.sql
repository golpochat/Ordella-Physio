-- Expand locations for multi-location tenant support
CREATE TYPE "LocationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

ALTER TABLE "locations" ADD COLUMN "code" TEXT;
ALTER TABLE "locations" ADD COLUMN "addressLine1" TEXT;
ALTER TABLE "locations" ADD COLUMN "addressLine2" TEXT;
ALTER TABLE "locations" ADD COLUMN "city" TEXT;
ALTER TABLE "locations" ADD COLUMN "state" TEXT;
ALTER TABLE "locations" ADD COLUMN "postalCode" TEXT;
ALTER TABLE "locations" ADD COLUMN "country" TEXT;
ALTER TABLE "locations" ADD COLUMN "email" TEXT;
ALTER TABLE "locations" ADD COLUMN "timezone" TEXT;
ALTER TABLE "locations" ADD COLUMN "status" "LocationStatus" NOT NULL DEFAULT 'ACTIVE';

UPDATE "locations"
SET
  "code" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(TRIM("name"), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')),
  "addressLine1" = COALESCE("address", 'Address pending'),
  "city" = 'Unknown',
  "postalCode" = '00000',
  "country" = 'GB',
  "timezone" = 'UTC',
  "status" = CASE WHEN "isArchived" = true THEN 'INACTIVE'::"LocationStatus" ELSE 'ACTIVE'::"LocationStatus" END
WHERE "code" IS NULL;

UPDATE "locations"
SET "code" = "code" || '-' || SUBSTRING("id", 1, 6)
WHERE "id" IN (
  SELECT l1."id"
  FROM "locations" l1
  INNER JOIN "locations" l2
    ON l1."tenantId" = l2."tenantId"
    AND l1."code" = l2."code"
    AND l1."id" <> l2."id"
);

ALTER TABLE "locations" ALTER COLUMN "code" SET NOT NULL;
ALTER TABLE "locations" ALTER COLUMN "addressLine1" SET NOT NULL;
ALTER TABLE "locations" ALTER COLUMN "city" SET NOT NULL;
ALTER TABLE "locations" ALTER COLUMN "postalCode" SET NOT NULL;
ALTER TABLE "locations" ALTER COLUMN "country" SET NOT NULL;
ALTER TABLE "locations" ALTER COLUMN "timezone" SET NOT NULL;

ALTER TABLE "locations" DROP COLUMN "address";
ALTER TABLE "locations" DROP COLUMN "isArchived";

CREATE UNIQUE INDEX "locations_tenantId_code_key" ON "locations"("tenantId", "code");
