import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { expandCanonicalPermissions } from "../../middleware/permissions";
import { DEFAULT_ROLE_DEFINITIONS } from "./permissions";

export async function ensureDefaultRoles(tenantId: string): Promise<void> {
  for (const definition of Object.values(DEFAULT_ROLE_DEFINITIONS)) {
    await prisma.role.upsert({
      where: {
        tenantId_name: {
          tenantId,
          name: definition.name,
        },
      },
      create: {
        tenantId,
        name: definition.name,
        description: definition.description,
        permissions: [...definition.permissions],
        isSystem: true,
      },
      update: {
        description: definition.description,
        permissions: [...definition.permissions],
      },
    });
  }
}

export async function listRoles(tenantId: string) {
  return prisma.role.findMany({
    where: { tenantId },
    orderBy: { name: "asc" },
  });
}

export async function getUserRolesAndPermissions(userId: string, tenantId: string) {
  const assignments = await prisma.userRole.findMany({
    where: { userId, role: { tenantId } },
    include: { role: true },
  });

  const roles = assignments.map((assignment) => assignment.role.name);
  const rawPermissions = [...new Set(assignments.flatMap((assignment) => assignment.role.permissions))];
  const permissions = expandCanonicalPermissions(rawPermissions);

  return { roles, permissions };
}

export async function assignRole(tenantId: string, userId: string, roleId: string) {
  const role = await prisma.role.findFirst({ where: { id: roleId, tenantId } });
  if (!role) {
    throw new NotFoundError("Role not found");
  }

  const assignment = await prisma.userRole.upsert({
    where: { userId_roleId: { userId, roleId } },
    create: { userId, roleId },
    update: {},
    include: { role: true },
  });

  return assignment;
}
