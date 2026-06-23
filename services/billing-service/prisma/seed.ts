import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

export const DEMO_ORG_ID = "demo-org";
export const DEMO_ORG_STRIPE_CUSTOMER_ID = "cus_e2e_demoorg";
export const DEMO_ORG_STRIPE_SUBSCRIPTION_ID = "sub_demo_org_pro";
export const DEMO_ORG_BILLING_ACCOUNT_ID = "dev_org_billing_account";
export const DEMO_ORG_STRIPE_SUB_RECORD_ID = "dev_org_stripe_subscription";

async function main() {
  console.log(`Seeding demo organization billing for "${DEMO_ORG_ID}"...`);

  const periodStart = new Date();
  const periodEnd = new Date();
  periodEnd.setFullYear(periodEnd.getFullYear() + 1);

  await prisma.organizationBillingAccount.upsert({
    where: { organizationId: DEMO_ORG_ID },
    create: {
      id: DEMO_ORG_BILLING_ACCOUNT_ID,
      organizationId: DEMO_ORG_ID,
      stripeCustomerId: DEMO_ORG_STRIPE_CUSTOMER_ID,
      email: "orgadmin@ordella.dev",
    },
    update: {
      stripeCustomerId: DEMO_ORG_STRIPE_CUSTOMER_ID,
      email: "orgadmin@ordella.dev",
    },
  });

  await prisma.organizationStripeSubscription.upsert({
    where: { organizationBillingId: DEMO_ORG_BILLING_ACCOUNT_ID },
    create: {
      id: DEMO_ORG_STRIPE_SUB_RECORD_ID,
      organizationBillingId: DEMO_ORG_BILLING_ACCOUNT_ID,
      stripeSubscriptionId: DEMO_ORG_STRIPE_SUBSCRIPTION_ID,
      stripePriceId: process.env.STRIPE_PRICE_ENTERPRISE ?? "price_local_enterprise",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
    },
    update: {
      stripeSubscriptionId: DEMO_ORG_STRIPE_SUBSCRIPTION_ID,
      stripePriceId: process.env.STRIPE_PRICE_ENTERPRISE ?? "price_local_enterprise",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      canceledAt: null,
    },
  });

  console.log(`  ✓ organization billing account (${DEMO_ORG_STRIPE_CUSTOMER_ID})`);
  console.log(`  ✓ ENTERPRISE subscription (${DEMO_ORG_STRIPE_SUBSCRIPTION_ID})`);
  console.log("Billing seed complete.");
}

main()
  .catch((error) => {
    console.error("Billing seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
