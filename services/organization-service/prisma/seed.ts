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
    },
    update: {
      name: "Demo Organization",
      billingModel: "ORGANIZATION_LEVEL",
      status: "ACTIVE",
      primaryContactName: "Org Admin",
      primaryContactEmail: "orgadmin@ordella.dev",
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
