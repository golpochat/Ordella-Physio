import { ForbiddenException, Injectable } from "@nestjs/common";
import { StaffRepository } from "@/staff/staff.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import type { CreateStaffDto } from "@/tenants/dto/create-staff.dto";
import type { UpdateStaffRoleDto } from "@/tenants/dto/update-staff-role.dto";
import { canAssignStaffRole } from "@/utils/tenant-helpers";
import { toStaffListResponse, toStaffResponse } from "@/staff/staff.mapper";

@Injectable()
export class StaffService {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async addStaff(tenantId: string, dto: CreateStaffDto, actorRole: string, correlationId?: string) {
    if (!canAssignStaffRole(actorRole, dto.role)) {
      throw new ForbiddenException("Insufficient permissions to assign staff role");
    }

    const staff = await this.staffRepository.create(tenantId, {
      userId: dto.userId,
      role: dto.role,
    });

    await this.eventPublisher.publishStaffAdded(
      {
        tenantId,
        staffId: staff.id,
        userId: staff.userId,
        role: staff.role,
        createdAt: staff.createdAt.toISOString(),
      },
      correlationId,
    );

    return toStaffResponse(staff);
  }

  async listStaff(tenantId: string) {
    const staff = await this.staffRepository.findByTenant(tenantId);
    return toStaffListResponse(staff);
  }

  async updateRole(tenantId: string, staffId: string, dto: UpdateStaffRoleDto, actorRole: string) {
    if (!canAssignStaffRole(actorRole, dto.role)) {
      throw new ForbiddenException("Insufficient permissions to update staff role");
    }

    const staff = await this.staffRepository.updateRole(tenantId, staffId, { role: dto.role });
    return toStaffResponse(staff);
  }

  async removeStaff(tenantId: string, staffId: string, actorRole: string) {
    const existing = await this.staffRepository.findById(tenantId, staffId);

    if (existing && !canAssignStaffRole(actorRole, existing.role)) {
      throw new ForbiddenException("Insufficient permissions to remove staff member");
    }

    await this.staffRepository.remove(tenantId, staffId);
    return { message: "Staff member removed" };
  }
}
