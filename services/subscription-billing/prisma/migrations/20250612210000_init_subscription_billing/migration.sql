-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED', 'INCOMPLETE');

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "priceMonthly" INTEGER NOT NULL DEFAULT 0,
    "priceYearly" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "stripeProductId" TEXT,
    "stripePriceMonthlyId" TEXT,
    "stripePriceYearlyId" TEXT,
    "limits" JSONB NOT NULL DEFAULT '{}',
    "trialDays" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_subscriptions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "trialEndsAt" TIMESTAMP(3),
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plans_name_idx" ON "plans"("name");

-- CreateIndex
CREATE INDEX "plans_isActive_idx" ON "plans"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_subscriptions_tenantId_key" ON "tenant_subscriptions"("tenantId");

-- CreateIndex
CREATE INDEX "tenant_subscriptions_tenantId_idx" ON "tenant_subscriptions"("tenantId");

-- CreateIndex
CREATE INDEX "tenant_subscriptions_stripeSubscriptionId_idx" ON "tenant_subscriptions"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "tenant_subscriptions" ADD CONSTRAINT "tenant_subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed default plans
INSERT INTO "plans" ("id", "name", "description", "priceMonthly", "priceYearly", "currency", "limits", "trialDays", "isActive", "updatedAt")
VALUES
  ('plan_free', 'Free', 'Core features for small clinics getting started', 0, 0, 'EUR', '{"maxStaff":2,"maxPatients":100,"maxStorageMB":512,"features":{"billing":false,"reporting":false,"ai":false}}', 0, true, CURRENT_TIMESTAMP),
  ('plan_standard', 'Standard', 'Scheduling, patients, and basic billing', 4900, 49000, 'EUR', '{"maxStaff":10,"maxPatients":2000,"maxStorageMB":5120,"features":{"billing":true,"reporting":true,"ai":false}}', 14, true, CURRENT_TIMESTAMP),
  ('plan_pro', 'Pro', 'Advanced reporting, AI notes, and integrations', 9900, 99000, 'EUR', '{"maxStaff":50,"maxPatients":10000,"maxStorageMB":20480,"features":{"billing":true,"reporting":true,"ai":true}}', 14, true, CURRENT_TIMESTAMP),
  ('plan_enterprise', 'Enterprise', 'Unlimited scale with dedicated support', 29900, 299000, 'EUR', '{"maxStaff":-1,"maxPatients":-1,"maxStorageMB":102400,"features":{"billing":true,"reporting":true,"ai":true}}', 30, true, CURRENT_TIMESTAMP);
