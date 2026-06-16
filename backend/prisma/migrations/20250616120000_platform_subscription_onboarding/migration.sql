-- AlterEnum
ALTER TYPE "TenantStatus" ADD VALUE IF NOT EXISTS 'REGISTERED';

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "postalCode" TEXT;
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "vatNumber" TEXT;
ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "profileCompletion" JSONB;

-- CreateTable
CREATE TABLE IF NOT EXISTS "platform_subscriptions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "billingCycle" TEXT NOT NULL,
    "baseAmount" DECIMAL(10,2) NOT NULL,
    "vatRate" DECIMAL(5,2) NOT NULL,
    "vatAmount" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "billingStreet" TEXT,
    "billingCity" TEXT,
    "billingPostal" TEXT,
    "companyName" TEXT,
    "cardholderName" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "platform_invoices" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "baseAmount" DECIMAL(10,2) NOT NULL,
    "vatRate" DECIMAL(5,2) NOT NULL,
    "vatAmount" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "platform_subscriptions_tenantId_key" ON "platform_subscriptions"("tenantId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "platform_invoices_subscriptionId_idx" ON "platform_invoices"("subscriptionId");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "platform_subscriptions" ADD CONSTRAINT "platform_subscriptions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "platform_invoices" ADD CONSTRAINT "platform_invoices_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "platform_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
