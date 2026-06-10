import { Injectable } from "@nestjs/common";
import type { CreateStaffDto } from "@/tenants/dto/create-staff.dto";
import { StaffService } from "@/staff/staff.service";

export type AddStaffCommandInput = {
  tenantId: string;
  dto: CreateStaffDto;
  actorRole: string;
  correlationId?: string;
};

@Injectable()
export class AddStaffCommand {
  constructor(private readonly staffService: StaffService) {}

  execute(input: AddStaffCommandInput) {
    return this.staffService.addStaff(input.tenantId, input.dto, input.actorRole, input.correlationId);
  }
}
