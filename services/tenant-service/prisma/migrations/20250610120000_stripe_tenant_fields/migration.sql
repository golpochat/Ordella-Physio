-- AlterTable
ALTER TABLE "tenants" ADD COLUMN "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "tenant_subscriptions" ADD COLUMN "stripeSubscriptionId" TEXT;
ALTER TABLE "tenant_subscriptions" ADD COLUMN "subscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_stripeCustomerId_key" ON "tenants"("stripeCustomerId");
