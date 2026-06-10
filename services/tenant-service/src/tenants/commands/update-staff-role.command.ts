import { Injectable } from "@nestjs/common";
import type { UpdateStaffRoleDto } from "@/tenants/dto/update-staff-role.dto";
import { StaffService } from "@/staff/staff.service";

export type UpdateStaffRoleCommandInput = {
  tenantId: string;
  staffId: string;
  dto: UpdateStaffRoleDto;
  actorRole: string;
};

@Injectable()
export class UpdateStaffRoleCommand {
  constructor(private readonly staffService: StaffService) {}

  execute(input: UpdateStaffRoleCommandInput) {
    return this.staffService.updateRole(input.tenantId, input.staffId, input.dto, input.actorRole);
  }
}
