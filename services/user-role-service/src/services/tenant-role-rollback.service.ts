import { Injectable } from "@nestjs/common";
import { RoleRepository } from "@/repositories/role.repository";

@Injectable()
export class TenantRoleRollbackService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async rollbackTenantProvisioning(tenantId: string) {
    await this.roleRepository.deleteTenantRoles(tenantId);
    return { message: "Tenant role provisioning rollback completed." };
  }
}
