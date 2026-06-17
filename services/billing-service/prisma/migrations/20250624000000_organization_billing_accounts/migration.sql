CREATE TABLE "organization_billing_accounts" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "defaultPaymentMethodId" TEXT,
    "email" TEXT,
    "stripeAiNotesSubscriptionItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_billing_accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "organization_stripe_subscriptions" (
    "id" TEXT NOT NULL,
    "organizationBillingId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" "StripeSubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_stripe_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "organization_billing_accounts_organizationId_key" ON "organization_billing_accounts"("organizationId");
CREATE UNIQUE INDEX "organization_billing_accounts_stripeCustomerId_key" ON "organization_billing_accounts"("stripeCustomerId");
CREATE UNIQUE INDEX "organization_stripe_subscriptions_organizationBillingId_key" ON "organization_stripe_subscriptions"("organizationBillingId");
CREATE UNIQUE INDEX "organization_stripe_subscriptions_stripeSubscriptionId_key" ON "organization_stripe_subscriptions"("stripeSubscriptionId");

ALTER TABLE "organization_stripe_subscriptions" ADD CONSTRAINT "organization_stripe_subscriptions_organizationBillingId_fkey" FOREIGN KEY ("organizationBillingId") REFERENCES "organization_billing_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
