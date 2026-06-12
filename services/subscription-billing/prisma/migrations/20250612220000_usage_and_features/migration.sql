-- CreateEnum
CREATE TYPE "UsageMetric" AS ENUM ('PATIENT_COUNT', 'APPOINTMENT_COUNT', 'STORAGE_MB', 'SMS_SENT');

-- AlterTable
ALTER TABLE "tenant_subscriptions" ADD COLUMN "stripeSubscriptionItemId" TEXT;

-- CreateTable
CREATE TABLE "usage_records" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "metric" "UsageMetric" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "stripeUsageRecordId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usage_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "featureKey" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "usage_records_tenantId_idx" ON "usage_records"("tenantId");

-- CreateIndex
CREATE INDEX "usage_records_metric_idx" ON "usage_records"("metric");

-- CreateIndex
CREATE INDEX "usage_records_periodStart_idx" ON "usage_records"("periodStart");

-- CreateIndex
CREATE UNIQUE INDEX "usage_records_tenantId_metric_periodStart_key" ON "usage_records"("tenantId", "metric", "periodStart");

-- CreateIndex
CREATE INDEX "feature_flags_planId_idx" ON "feature_flags"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_planId_featureKey_key" ON "feature_flags"("planId", "featureKey");

-- AddForeignKey
ALTER TABLE "feature_flags" ADD CONSTRAINT "feature_flags_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed feature flags
INSERT INTO "feature_flags" ("id", "planId", "featureKey", "enabled", "updatedAt") VALUES
  ('ff_free_reporting', 'plan_free', 'REPORTING', false, CURRENT_TIMESTAMP),
  ('ff_free_ai', 'plan_free', 'AI_ASSISTANT', false, CURRENT_TIMESTAMP),
  ('ff_free_analytics', 'plan_free', 'ADVANCED_ANALYTICS', false, CURRENT_TIMESTAMP),
  ('ff_free_billing', 'plan_free', 'BILLING', false, CURRENT_TIMESTAMP),
  ('ff_std_reporting', 'plan_standard', 'REPORTING', true, CURRENT_TIMESTAMP),
  ('ff_std_ai', 'plan_standard', 'AI_ASSISTANT', false, CURRENT_TIMESTAMP),
  ('ff_std_analytics', 'plan_standard', 'ADVANCED_ANALYTICS', false, CURRENT_TIMESTAMP),
  ('ff_std_billing', 'plan_standard', 'BILLING', true, CURRENT_TIMESTAMP),
  ('ff_pro_reporting', 'plan_pro', 'REPORTING', true, CURRENT_TIMESTAMP),
  ('ff_pro_ai', 'plan_pro', 'AI_ASSISTANT', true, CURRENT_TIMESTAMP),
  ('ff_pro_analytics', 'plan_pro', 'ADVANCED_ANALYTICS', true, CURRENT_TIMESTAMP),
  ('ff_pro_billing', 'plan_pro', 'BILLING', true, CURRENT_TIMESTAMP),
  ('ff_ent_reporting', 'plan_enterprise', 'REPORTING', true, CURRENT_TIMESTAMP),
  ('ff_ent_ai', 'plan_enterprise', 'AI_ASSISTANT', true, CURRENT_TIMESTAMP),
  ('ff_ent_analytics', 'plan_enterprise', 'ADVANCED_ANALYTICS', true, CURRENT_TIMESTAMP),
  ('ff_ent_billing', 'plan_enterprise', 'BILLING', true, CURRENT_TIMESTAMP);
