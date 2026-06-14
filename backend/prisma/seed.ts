import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { ensureDefaultRoles } from "../src/modules/rbac/rbac.service";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo-clinic" },
    create: {
      name: "Demo Clinic",
      slug: "demo-clinic",
      code: "DEMO001",
      timezone: "Europe/Dublin",
      currency: "EUR",
    },
    update: {},
  });

  await ensureDefaultRoles(tenant.id);

  const adminRole = await prisma.role.findUniqueOrThrow({
    where: { tenantId_name: { tenantId: tenant.id, name: "ADMIN" } },
  });
  const staffRole = await prisma.role.findUniqueOrThrow({
    where: { tenantId_name: { tenantId: tenant.id, name: "STAFF" } },
  });
  const therapistRole = await prisma.role.findUniqueOrThrow({
    where: { tenantId_name: { tenantId: tenant.id, name: "THERAPIST" } },
  });

  const passwordHash = await hashPassword("Admin123!");

  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: "admin@demo-clinic.dev" } },
    create: {
      tenantId: tenant.id,
      email: "admin@demo-clinic.dev",
      passwordHash,
      firstName: "Demo",
      lastName: "Admin",
      roles: { create: [{ roleId: adminRole.id }] },
    },
    update: {},
  });

  const staffUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: "staff@demo-clinic.dev" } },
    create: {
      tenantId: tenant.id,
      email: "staff@demo-clinic.dev",
      passwordHash,
      firstName: "Sarah",
      lastName: "Staff",
      roles: { create: [{ roleId: staffRole.id }] },
    },
    update: {},
  });

  const therapistUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: "therapist@demo-clinic.dev" } },
    create: {
      tenantId: tenant.id,
      email: "therapist@demo-clinic.dev",
      passwordHash,
      firstName: "Tom",
      lastName: "Therapist",
      roles: { create: [{ roleId: therapistRole.id }] },
    },
    update: {},
  });

  const therapist = await prisma.therapist.upsert({
    where: { userId: therapistUser.id },
    create: {
      tenantId: tenant.id,
      userId: therapistUser.id,
      specialty: "Physiotherapy",
      licenseNumber: "PT-1001",
      isActive: true,
    },
    update: {},
  });

  await prisma.staff.upsert({
    where: { userId: staffUser.id },
    create: {
      tenantId: tenant.id,
      userId: staffUser.id,
      jobTitle: "Front Desk",
      department: "Operations",
      isActive: true,
    },
    update: {},
  });

  const patient = await prisma.patient.upsert({
    where: { id: "seed-patient-demo" },
    create: {
      id: "seed-patient-demo",
      tenantId: tenant.id,
      firstName: "Jane",
      lastName: "Patient",
      email: "jane.patient@example.com",
      phone: "+353871234567",
      isActive: true,
    },
    update: {},
  });

  const appointmentStart = new Date();
  appointmentStart.setDate(appointmentStart.getDate() + 1);
  appointmentStart.setHours(10, 0, 0, 0);
  const appointmentEnd = new Date(appointmentStart);
  appointmentEnd.setMinutes(appointmentEnd.getMinutes() + 45);

  const appointment = await prisma.appointment.upsert({
    where: { id: "seed-appointment-demo" },
    create: {
      id: "seed-appointment-demo",
      tenantId: tenant.id,
      patientId: patient.id,
      therapistId: therapist.id,
      startTime: appointmentStart,
      endTime: appointmentEnd,
      status: "SCHEDULED",
      type: "Initial Assessment",
      notes: "Demo appointment for E2E flows",
    },
    update: {},
  });

  console.log("Seed complete:");
  console.log(`  tenant slug: demo-clinic`);
  console.log(`  admin email: admin@demo-clinic.dev`);
  console.log(`  staff email: staff@demo-clinic.dev`);
  console.log(`  therapist email: therapist@demo-clinic.dev`);
  console.log(`  password (all): Admin123!`);
  console.log(`  tenant id: ${tenant.id}`);
  console.log(`  patient id: ${patient.id}`);
  console.log(`  appointment id: ${appointment.id}`);
  console.log(`  admin user id: ${admin.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
