-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'OPEN', 'PAID', 'UNCOLLECTIBLE', 'VOID');

-- CreateEnum
CREATE TYPE "DunningStatus" AS ENUM ('ACTIVE', 'RESOLVED', 'CANCELED');

-- AlterTable
ALTER TABLE "tenant_subscriptions" ADD COLUMN "scheduledPlanId" TEXT;
ALTER TABLE "tenant_subscriptions" ADD COLUMN "scheduledChangeAt" TIMESTAMP(3);
ALTER TABLE "tenant_subscriptions" ADD COLUMN "billingCycle" TEXT NOT NULL DEFAULT 'monthly';

-- CreateTable
CREATE TABLE "subscription_invoices" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "amountDue" INTEGER NOT NULL DEFAULT 0,
    "amountPaid" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" "InvoiceStatus" NOT NULL DEFAULT 'OPEN',
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "hostedInvoiceUrl" TEXT,
    "invoicePdf" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dunning_records" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "nextRetryAt" TIMESTAMP(3),
    "lastFailedAt" TIMESTAMP(3),
    "status" "DunningStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dunning_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_invoices_stripeInvoiceId_key" ON "subscription_invoices"("stripeInvoiceId");
CREATE INDEX "subscription_invoices_tenantId_idx" ON "subscription_invoices"("tenantId");
CREATE INDEX "subscription_invoices_status_idx" ON "subscription_invoices"("status");
CREATE INDEX "subscription_invoices_createdAt_idx" ON "subscription_invoices"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "dunning_records_tenantId_key" ON "dunning_records"("tenantId");
CREATE INDEX "dunning_records_status_idx" ON "dunning_records"("status");
CREATE INDEX "dunning_records_nextRetryAt_idx" ON "dunning_records"("nextRetryAt");

-- AddForeignKey
ALTER TABLE "subscription_invoices" ADD CONSTRAINT "subscription_invoices_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant_subscriptions"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dunning_records" ADD CONSTRAINT "dunning_records_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant_subscriptions"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;
