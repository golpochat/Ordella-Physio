import { getPermissionsForRole, type SecurityRole } from "@ordella/security";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

export const DEMO_TENANT_ID = "demo-tenant";

/** Stable role IDs referenced by staff-service seed and manual tests. */
export const DEMO_ROLE_IDS = {
  OWNER: "dev_role_demo_owner",
  ADMIN: "dev_role_demo_admin",
  THERAPIST: "dev_role_demo_therapist",
  STAFF: "dev_role_demo_staff",
} as const;

const DEMO_ROLES: Array<{ id: string; code: SecurityRole }> = [
  { id: DEMO_ROLE_IDS.OWNER, code: "OWNER" },
  { id: DEMO_ROLE_IDS.ADMIN, code: "ADMIN" },
  { id: DEMO_ROLE_IDS.THERAPIST, code: "THERAPIST" },
  { id: DEMO_ROLE_IDS.STAFF, code: "STAFF" },
];

async function upsertRoleWithPermissions(roleId: string, tenantId: string, code: SecurityRole) {
  const permissionCodes = getPermissionsForRole(code);

  await prisma.role.upsert({
    where: { id: roleId },
    create: {
      id: roleId,
      tenantId,
      name: code,
      code,
      description: `Demo ${code} role`,
      isSystem: true,
    },
    update: {
      tenantId,
      name: code,
      code,
      description: `Demo ${code} role`,
      isSystem: true,
    },
  });

  const permissions = await prisma.permission.findMany({
    where: { code: { in: permissionCodes } },
  });

  await prisma.rolePermission.deleteMany({ where: { roleId } });

  if (permissions.length > 0) {
    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId,
        permissionId: permission.id,
      })),
      skipDuplicates: true,
    });
  }
}

async function main() {
  console.log(`Seeding user roles for tenant "${DEMO_TENANT_ID}"...`);

  for (const role of DEMO_ROLES) {
    await upsertRoleWithPermissions(role.id, DEMO_TENANT_ID, role.code);
    console.log(`  ✓ role ${role.code} (${role.id})`);
  }

  console.log("User role seed complete.");
}

main()
  .catch((error) => {
    console.error("User role seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
