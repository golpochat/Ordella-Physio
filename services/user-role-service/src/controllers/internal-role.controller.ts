import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RoleRepository } from "@/repositories/role.repository";
import { TenantRoleSeedService } from "@/services/tenant-role-seed.service";
import { TenantRoleRollbackService } from "@/services/tenant-role-rollback.service";
import { roleNotFoundError } from "@/utils/role-errors";

@Controller("roles")
export class InternalRoleController {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly tenantRoleSeedService: TenantRoleSeedService,
    private readonly tenantRoleRollbackService: TenantRoleRollbackService,
  ) {}

  @Get("internal/:roleId")
  async getRoleInternal(@Param("roleId") roleId: string) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw roleNotFoundError();
    }

    return {
      id: role.id,
      tenantId: role.tenantId,
      name: role.name,
      code: role.code,
    };
  }

  @Post("internal/seed-tenant-defaults")
  seedTenantDefaults(@Body() body: { tenantId?: string; ownerUserId?: string }) {
    const tenantId = body.tenantId?.trim() ?? "";
    const ownerUserId = body.ownerUserId?.trim() ?? "";

    if (!tenantId || !ownerUserId) {
      return { message: "tenantId and ownerUserId are required." };
    }

    return this.tenantRoleSeedService.seedTenantDefaults(tenantId, ownerUserId);
  }

  @Delete("internal/tenant/:tenantId/provisioning-rollback")
  rollbackTenantProvisioning(@Param("tenantId") tenantId: string) {
    return this.tenantRoleRollbackService.rollbackTenantProvisioning(tenantId);
  }
}
