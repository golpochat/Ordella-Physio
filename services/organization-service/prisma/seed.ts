import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

export const DEMO_ORG_ID = "demo-org";
export const DEMO_TENANT_ID = "demo-tenant";

async function main() {
  console.log(`Seeding organization "${DEMO_ORG_ID}"...`);

  await prisma.organization.upsert({
    where: { id: DEMO_ORG_ID },
    create: {
      id: DEMO_ORG_ID,
      name: "Demo Organization",
      code: DEMO_ORG_ID,
      description: "Seeded org for manual Phase 5 organization portal testing",
      primaryContactName: "Org Admin",
      primaryContactEmail: "orgadmin@ordella.dev",
      primaryContactPhone: "+44 20 7946 0958",
      billingModel: "ORGANIZATION_LEVEL",
      status: "ACTIVE",
      stripeCustomerId: "cus_e2e_demoorg",
      stripeSubscriptionId: "sub_demo_org_pro",
      subscriptionStatus: "ACTIVE",
    },
    update: {
      name: "Demo Organization",
      billingModel: "ORGANIZATION_LEVEL",
      status: "ACTIVE",
      primaryContactName: "Org Admin",
      primaryContactEmail: "orgadmin@ordella.dev",
      stripeCustomerId: "cus_e2e_demoorg",
      stripeSubscriptionId: "sub_demo_org_pro",
      subscriptionStatus: "ACTIVE",
    },
  });

  console.log(`  ✓ organization ${DEMO_ORG_ID} (ORGANIZATION_LEVEL billing)`);

  await prisma.organizationTenant.upsert({
    where: { tenantId: DEMO_TENANT_ID },
    create: {
      organizationId: DEMO_ORG_ID,
      tenantId: DEMO_TENANT_ID,
    },
    update: {
      organizationId: DEMO_ORG_ID,
    },
  });

  console.log(`  ✓ linked tenant ${DEMO_TENANT_ID} → ${DEMO_ORG_ID}`);

  await prisma.organizationSsoConfig.upsert({
    where: { organizationId: DEMO_ORG_ID },
    create: {
      organizationId: DEMO_ORG_ID,
      ssoEnabled: false,
      ssoProtocol: "OIDC",
      ssoIssuer: "https://demo-idp.ordella.dev",
      ssoClientId: "ordella-demo-sso-client",
      ssoRedirectUri: "http://localhost:3010/clinic/enterprise/sso/callback",
      ssoMetadataUrl: null,
    },
    update: {
      ssoProtocol: "OIDC",
      ssoIssuer: "https://demo-idp.ordella.dev",
      ssoClientId: "ordella-demo-sso-client",
      ssoRedirectUri: "http://localhost:3010/clinic/enterprise/sso/callback",
    },
  });

  console.log("  ✓ demo SSO config scaffold (disabled — enable in clinic enterprise UI)");
  console.log("Organization seed complete.");
}

main()
  .catch((error) => {
    console.error("Organization seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
