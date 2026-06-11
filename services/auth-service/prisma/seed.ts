import { PrismaClient, type Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const DEMO_TENANT_ID = "demo-tenant";
const BCRYPT_ROUNDS = 12;

type SeedUser = {
  id: string;
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
};

export const DEV_SEED_USERS: SeedUser[] = [
  {
    id: "dev_user_superadmin",
    email: "superadmin@ordella.dev",
    password: "SuperAdmin123!",
    role: "SYSTEM",
    firstName: "Super",
    lastName: "Admin",
  },
  {
    id: "dev_user_clinicadmin",
    email: "clinicadmin@ordella.dev",
    password: "ClinicAdmin123!",
    role: "ADMIN",
    firstName: "Clinic",
    lastName: "Admin",
  },
  {
    id: "dev_user_therapist",
    email: "therapist@ordella.dev",
    password: "Therapist123!",
    role: "THERAPIST",
    firstName: "Demo",
    lastName: "Therapist",
  },
  {
    id: "dev_user_staff",
    email: "staff@ordella.dev",
    password: "Staff123!",
    role: "STAFF",
    firstName: "Demo",
    lastName: "Staff",
  },
  {
    id: "dev_user_pharmacy",
    email: "pharmacy@ordella.dev",
    password: "Pharmacy123!",
    role: "PHARMACY",
    firstName: "Demo",
    lastName: "Pharmacy",
  },
  {
    id: "dev_user_patient1",
    email: "patient1@ordella.dev",
    password: "Patient123!",
    role: "PATIENT",
    firstName: "Patient",
    lastName: "One",
  },
  {
    id: "dev_user_patient2",
    email: "patient2@ordella.dev",
    password: "Patient123!",
    role: "PATIENT",
    firstName: "Patient",
    lastName: "Two",
  },
];

async function main() {
  console.log(`Seeding auth users for tenant "${DEMO_TENANT_ID}"...`);

  for (const user of DEV_SEED_USERS) {
    const passwordHash = await bcrypt.hash(user.password, BCRYPT_ROUNDS);

    await prisma.user.upsert({
      where: {
        tenantId_email: {
          tenantId: DEMO_TENANT_ID,
          email: user.email,
        },
      },
      create: {
        id: user.id,
        tenantId: DEMO_TENANT_ID,
        email: user.email,
        passwordHash,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: true,
      },
      update: {
        passwordHash,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: true,
      },
    });

    console.log(`  ✓ ${user.email} (${user.role})`);
  }

  console.log("Auth seed complete.");
}

main()
  .catch((error) => {
    console.error("Auth seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
