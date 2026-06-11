import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const DEMO_TENANT_ID = "demo-tenant";

const PATIENTS = [
  {
    id: "dev_patient_1",
    email: "patient1@ordella.dev",
    firstName: "Patient",
    lastName: "One",
    phone: "+44 7700 900001",
  },
  {
    id: "dev_patient_2",
    email: "patient2@ordella.dev",
    firstName: "Patient",
    lastName: "Two",
    phone: "+44 7700 900002",
  },
];

async function main() {
  console.log(`Seeding patients for tenant "${DEMO_TENANT_ID}"...`);

  for (const patient of PATIENTS) {
    await prisma.patient.upsert({
      where: {
        tenantId_email: {
          tenantId: DEMO_TENANT_ID,
          email: patient.email,
        },
      },
      create: {
        id: patient.id,
        tenantId: DEMO_TENANT_ID,
        email: patient.email,
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
      },
      update: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
      },
    });

    console.log(`  ✓ ${patient.email}`);
  }

  console.log("Patient seed complete.");
}

main()
  .catch((error) => {
    console.error("Patient seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
