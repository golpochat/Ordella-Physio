import { Controller, Get, Param } from "@nestjs/common";
import { RoleRepository } from "@/repositories/role.repository";
import { roleNotFoundError } from "@/utils/role-errors";

@Controller("roles")
export class InternalRoleController {
  constructor(private readonly roleRepository: RoleRepository) {}

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
}
