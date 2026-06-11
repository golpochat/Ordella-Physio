-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN "code" TEXT;
UPDATE "tenants" SET "code" = "slug" WHERE "code" IS NULL;
ALTER TABLE "tenants" ALTER COLUMN "code" SET NOT NULL;

ALTER TABLE "tenants" ADD COLUMN "ownerUserId" TEXT;
ALTER TABLE "tenants" ADD COLUMN "status" "TenantStatus" NOT NULL DEFAULT 'ACTIVE';

UPDATE "tenants"
SET "status" = CASE WHEN "isActive" = true THEN 'ACTIVE'::"TenantStatus" ELSE 'SUSPENDED'::"TenantStatus" END;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_code_key" ON "tenants"("code");
CREATE INDEX "tenants_ownerUserId_idx" ON "tenants"("ownerUserId");
