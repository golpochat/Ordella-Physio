import { Injectable } from "@nestjs/common";
import { getPermissionsForRole, type SecurityRole } from "@ordella/security";
import { RoleRepository } from "@/repositories/role.repository";

const DEFAULT_TENANT_ROLES: SecurityRole[] = ["OWNER", "ADMIN", "THERAPIST", "STAFF"];

@Injectable()
export class TenantRoleSeedService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async seedTenantDefaults(tenantId: string, ownerUserId: string) {
    for (const roleCode of DEFAULT_TENANT_ROLES) {
      const existing = await this.roleRepository.findByTenantAndCode(tenantId, roleCode);
      if (existing) {
        continue;
      }

      const permissionCodes = getPermissionsForRole(roleCode);
      const permissions = await this.roleRepository.findPermissionsByCodes(permissionCodes);

      await this.roleRepository.createSystemRoleWithPermissions({
        tenantId,
        name: roleCode,
        code: roleCode,
        description: `Default ${roleCode} role`,
        permissionIds: permissions.map((permission) => permission.id),
      });
    }

    const ownerRole = await this.roleRepository.findByTenantAndCode(tenantId, "OWNER");
    if (ownerRole) {
      const existingAssignment = await this.roleRepository.findUserAssignment(tenantId, ownerUserId);
      if (!existingAssignment) {
        await this.roleRepository.assignUserRole({
          tenantId,
          userId: ownerUserId,
          roleId: ownerRole.id,
        });
      }
    }

    return { message: "Default tenant roles seeded." };
  }
}
