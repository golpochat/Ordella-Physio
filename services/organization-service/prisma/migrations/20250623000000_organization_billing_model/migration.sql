-- CreateEnum
CREATE TYPE "BillingModel" AS ENUM ('TENANT_LEVEL', 'ORGANIZATION_LEVEL');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN "billingModel" "BillingModel" NOT NULL DEFAULT 'TENANT_LEVEL';
