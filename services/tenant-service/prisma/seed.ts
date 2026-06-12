import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const DEMO_TENANT_ID = "demo-tenant";

const STAFF_MEMBERS: Array<{ userId: string; role: string; label: string }> = [
  { userId: "dev_user_clinicadmin", role: "ADMIN", label: "clinicadmin@ordella.dev" },
  { userId: "dev_user_therapist", role: "THERAPIST", label: "therapist@ordella.dev" },
  { userId: "dev_user_staff", role: "STAFF", label: "staff@ordella.dev" },
  { userId: "dev_user_pharmacy", role: "STAFF", label: "pharmacy@ordella.dev" },
];

async function main() {
  console.log(`Seeding tenant "${DEMO_TENANT_ID}"...`);

  await prisma.$executeRaw`
    INSERT INTO tenants (id, name, code, slug, timezone, currency, address, phone, status, "isActive", "createdAt", "updatedAt")
    VALUES (
      ${DEMO_TENANT_ID},
      'Demo Clinic',
      ${DEMO_TENANT_ID},
      ${DEMO_TENANT_ID},
      'Europe/London',
      'GBP',
      '1 Demo Street, London',
      '+44 20 7946 0958',
      'ACTIVE'::"TenantStatus",
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      code = EXCLUDED.code,
      status = 'ACTIVE',
      "isActive" = true,
      "updatedAt" = NOW()
  `;

  console.log(`  ✓ tenant ${DEMO_TENANT_ID}`);

  await prisma.$executeRaw`
    INSERT INTO locations (
      id,
      "tenantId",
      name,
      code,
      "addressLine1",
      city,
      "postalCode",
      country,
      phone,
      timezone,
      status,
      "createdAt",
      "updatedAt"
    )
    VALUES (
      'dev_location_main',
      ${DEMO_TENANT_ID},
      'Main Clinic',
      'main-clinic',
      '1 Demo Street',
      'London',
      'SW1A 1AA',
      'GB',
      '+442079460958',
      'Europe/London',
      'ACTIVE'::"LocationStatus",
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      code = EXCLUDED.code,
      "addressLine1" = EXCLUDED."addressLine1",
      city = EXCLUDED.city,
      "postalCode" = EXCLUDED."postalCode",
      country = EXCLUDED.country,
      phone = EXCLUDED.phone,
      timezone = EXCLUDED.timezone,
      status = EXCLUDED.status,
      "updatedAt" = NOW()
  `;

  console.log("  ✓ main location");

  for (const member of STAFF_MEMBERS) {
    const staffId = `dev_staff_${member.userId}`;

    await prisma.$executeRaw`
      INSERT INTO staff (id, "tenantId", "userId", role, "createdAt", "updatedAt")
      VALUES (
        ${staffId},
        ${DEMO_TENANT_ID},
        ${member.userId},
        ${member.role}::"StaffRole",
        NOW(),
        NOW()
      )
      ON CONFLICT ("tenantId", "userId") DO UPDATE SET
        role = EXCLUDED.role,
        "updatedAt" = NOW()
    `;

    console.log(`  ✓ staff ${member.label} (${member.role})`);
  }

  console.log("Tenant seed complete.");
}

main()
  .catch((error) => {
    console.error("Tenant seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
