import { PrismaClient, type StaffType } from "../src/generated/prisma";

const prisma = new PrismaClient();

const DEMO_TENANT_ID = "demo-tenant";
const DEMO_LOCATION_ID = "dev_location_main";

/** Must match services/user-role-service/prisma/seed.ts */
const DEMO_ROLE_IDS = {
  THERAPIST: "dev_role_demo_therapist",
  STAFF: "dev_role_demo_staff",
  ADMIN: "dev_role_demo_admin",
} as const;

type SeedStaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  staffType: StaffType;
  roleId: string;
};

const STAFF_MEMBERS: SeedStaffMember[] = [
  {
    id: "dev_staff_member_therapist",
    firstName: "Demo",
    lastName: "Therapist",
    email: "therapist@ordella.dev",
    staffType: "TECHNICIAN",
    roleId: DEMO_ROLE_IDS.THERAPIST,
  },
  {
    id: "dev_staff_member_staff",
    firstName: "Demo",
    lastName: "Staff",
    email: "staff@ordella.dev",
    staffType: "RECEPTIONIST",
    roleId: DEMO_ROLE_IDS.STAFF,
  },
  {
    id: "dev_staff_member_clinicadmin",
    firstName: "Clinic",
    lastName: "Admin",
    email: "clinicadmin@ordella.dev",
    staffType: "ADMIN",
    roleId: DEMO_ROLE_IDS.ADMIN,
  },
];

async function main() {
  console.log(`Seeding staff members for tenant "${DEMO_TENANT_ID}"...`);

  for (const member of STAFF_MEMBERS) {
    await prisma.staff.upsert({
      where: {
        tenantId_email: {
          tenantId: DEMO_TENANT_ID,
          email: member.email,
        },
      },
      create: {
        id: member.id,
        tenantId: DEMO_TENANT_ID,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        staffType: member.staffType,
        roleId: member.roleId,
        status: "ACTIVE",
      },
      update: {
        firstName: member.firstName,
        lastName: member.lastName,
        staffType: member.staffType,
        roleId: member.roleId,
        status: "ACTIVE",
      },
    });

    await prisma.staffLocation.upsert({
      where: {
        staffId_locationId: {
          staffId: member.id,
          locationId: DEMO_LOCATION_ID,
        },
      },
      create: {
        staffId: member.id,
        locationId: DEMO_LOCATION_ID,
      },
      update: {},
    });

    console.log(`  ✓ ${member.email} (${member.staffType})`);
  }

  console.log("Staff seed complete.");
}

main()
  .catch((error) => {
    console.error("Staff seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
