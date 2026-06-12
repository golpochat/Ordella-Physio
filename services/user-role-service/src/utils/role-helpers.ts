import type { Permission, Role } from "@/generated/prisma";
import type { PermissionRecord } from "@/models/Permission";
import type { RoleListItemRecord, RoleRecord } from "@/models/Role";

export type AuthenticatedRoleUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function toPermissionResponse(permission: Permission): PermissionRecord {
  return {
    id: permission.id,
    code: permission.code,
    description: permission.description,
  };
}

export function toRoleResponse(role: Role): RoleRecord {
  return {
    id: role.id,
    tenantId: role.tenantId,
    name: role.name,
    code: role.code,
    description: role.description,
    isSystem: role.isSystem,
    createdAt: role.createdAt.toISOString(),
    updatedAt: role.updatedAt.toISOString(),
  };
}

export function toRoleListItemResponse(
  role: Role & { _count: { permissions: number } },
): RoleListItemRecord {
  return {
    ...toRoleResponse(role),
    permissionsCount: role._count.permissions,
  };
}

export function toRolePermissionCodes(
  rolePermissions: Array<{ permission: Pick<Permission, "code"> }>,
): string[] {
  return rolePermissions.map((entry) => entry.permission.code);
}
