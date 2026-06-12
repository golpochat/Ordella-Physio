import { Injectable } from "@nestjs/common";
import type { CreateStaffPayload, UpdateStaffPayload } from "@/models/Staff";
import { StaffRepository } from "@/repositories/staff.repository";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { UserRoleServiceClient } from "@/integrations/user-role-service.client";
import { parseListStaffQuery, validateCreateStaff, validateUpdateStaff } from "@/validators/staff.validator";
import {
  invalidLocationError,
  invalidRoleError,
  invalidStaffFilterError,
  invalidStaffPaginationError,
  staffAlreadyActiveError,
  staffAlreadyInactiveError,
  staffEmailExistsError,
  staffHasActiveAppointmentsError,
  staffNotFoundError,
  staffTenantMismatchError,
  staffTenantRequiredError,
  staffValidationError,
} from "@/utils/staff-errors";
import {
  toStaffListItem,
  toStaffLocationResponses,
  toStaffResponse,
  type AuthenticatedStaffUser,
} from "@/utils/staff-helpers";

@Injectable()
export class StaffService {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly tenantServiceClient: TenantServiceClient,
    private readonly userRoleServiceClient: UserRoleServiceClient,
    private readonly appointmentServiceClient: AppointmentServiceClient,
  ) {}

  async listStaff(query: unknown, requestingUser: AuthenticatedStaffUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const parsed = parseListStaffQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidStaffPaginationError();
      }
      throw invalidStaffFilterError();
    }

    const { page, limit, search, staffType, roleId, locationId, status, sortBy, sortOrder } =
      parsed.payload;
    const filter = { tenantId, search, staffType, roleId, locationId, status };

    const [records, total] = await Promise.all([
      this.staffRepository.findManyFiltered({
        ...filter,
        skip: (page - 1) * limit,
        take: limit,
        sortBy,
        sortOrder,
      }),
      this.staffRepository.countFiltered(filter),
    ]);

    const uniqueRoleIds = [...new Set(records.map((record) => record.roleId))];
    const roleEntries = await Promise.all(
      uniqueRoleIds.map(async (id) => {
        const role = await this.userRoleServiceClient.getRole(id);
        return role ? ([id, role.name] as const) : null;
      }),
    );
    const roleNameById = new Map(roleEntries.filter((entry): entry is [string, string] => entry !== null));

    const uniqueLocationIds = [
      ...new Set(records.flatMap((record) => record.locations.map((link) => link.locationId))),
    ];
    const locationMap = await this.tenantServiceClient.getLocations(uniqueLocationIds);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data: records.map((record) =>
        toStaffListItem(record, locationMap, roleNameById.get(record.roleId) ?? null),
      ),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getStaff(id: string, requestingUser: AuthenticatedStaffUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const record = await this.staffRepository.findById(id);
    if (!record) {
      throw staffNotFoundError();
    }

    if (record.tenantId !== tenantId) {
      throw staffTenantMismatchError();
    }

    const locationMap = await this.tenantServiceClient.getLocations(
      record.locations.map((link) => link.locationId),
    );

    return {
      staff: toStaffResponse(record),
      locations: toStaffLocationResponses(record.locations, locationMap),
    };
  }

  async createStaff(payload: CreateStaffPayload, createdByUser: AuthenticatedStaffUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const validation = validateCreateStaff(payload);
    if (!validation.valid) {
      throw staffValidationError(validation.fields);
    }

    const normalized = validation.payload;

    const existing = await this.staffRepository.findByTenantAndEmail(tenantId, normalized.email);
    if (existing) {
      throw staffEmailExistsError();
    }

    const role = await this.userRoleServiceClient.getRole(normalized.roleId);
    if (!role || role.tenantId !== tenantId) {
      throw invalidRoleError();
    }

    const locationMap = await this.tenantServiceClient.getLocations(normalized.locations);
    if (locationMap.size !== normalized.locations.length) {
      throw invalidLocationError();
    }

    for (const location of locationMap.values()) {
      if (location.tenantId !== tenantId) {
        throw invalidLocationError();
      }
    }

    const created = await this.staffRepository.createStaffWithLocations({
      tenantId,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      phone: normalized.phone,
      staffType: normalized.staffType,
      roleId: normalized.roleId,
      status: normalized.status,
      locationIds: normalized.locations,
    });

    return {
      staff: toStaffResponse(created.staff),
      locations: toStaffLocationResponses(created.locations, locationMap),
      message: "Staff member created successfully.",
    };
  }

  async updateStaff(id: string, payload: UpdateStaffPayload, updatedByUser: AuthenticatedStaffUser) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const record = await this.staffRepository.findById(id);
    if (!record) {
      throw staffNotFoundError();
    }

    if (record.tenantId !== tenantId) {
      throw staffTenantMismatchError();
    }

    const validation = validateUpdateStaff(payload);
    if (!validation.valid) {
      throw staffValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.email !== undefined && normalized.email !== record.email) {
      const existing = await this.staffRepository.findByTenantAndEmail(tenantId, normalized.email);
      if (existing && existing.id !== record.id) {
        throw staffEmailExistsError();
      }
    }

    if (normalized.roleId !== undefined && normalized.roleId !== record.roleId) {
      const role = await this.userRoleServiceClient.getRole(normalized.roleId);
      if (!role || role.tenantId !== tenantId) {
        throw invalidRoleError();
      }
    }

    let locationMap = new Map(
      (
        await this.tenantServiceClient.getLocations(
          record.locations.map((link) => link.locationId),
        )
      ).entries(),
    );

    if (normalized.locations !== undefined) {
      locationMap = await this.tenantServiceClient.getLocations(normalized.locations);
      if (locationMap.size !== normalized.locations.length) {
        throw invalidLocationError();
      }

      for (const location of locationMap.values()) {
        if (location.tenantId !== tenantId) {
          throw invalidLocationError();
        }
      }
    }

    const updated = await this.staffRepository.updateStaffWithLocations(id, {
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      phone: normalized.phone,
      staffType: normalized.staffType,
      roleId: normalized.roleId,
      status: normalized.status,
      locationIds: normalized.locations,
    });

    if (normalized.locations === undefined) {
      locationMap = await this.tenantServiceClient.getLocations(
        updated.locations.map((link) => link.locationId),
      );
    }

    return {
      staff: toStaffResponse(updated.staff),
      locations: toStaffLocationResponses(updated.locations, locationMap),
      message: "Staff member updated successfully.",
    };
  }

  async deactivateStaff(id: string, performedByUser: AuthenticatedStaffUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const record = await this.staffRepository.findById(id);
    if (!record) {
      throw staffNotFoundError();
    }

    if (record.tenantId !== tenantId) {
      throw staffTenantMismatchError();
    }

    if (record.status === "INACTIVE") {
      throw staffAlreadyInactiveError();
    }

    const hasActiveAppointments =
      await this.appointmentServiceClient.hasActiveAppointmentsForStaff(tenantId, record.id);
    if (hasActiveAppointments) {
      throw staffHasActiveAppointmentsError();
    }

    const updated = await this.staffRepository.setStatus(id, "INACTIVE");

    return {
      staff: toStaffResponse(updated),
      message: "Staff deactivated successfully.",
    };
  }

  async activateStaff(id: string, performedByUser: AuthenticatedStaffUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const record = await this.staffRepository.findById(id);
    if (!record) {
      throw staffNotFoundError();
    }

    if (record.tenantId !== tenantId) {
      throw staffTenantMismatchError();
    }

    if (record.status === "ACTIVE") {
      throw staffAlreadyActiveError();
    }

    const updated = await this.staffRepository.setStatus(id, "ACTIVE");

    return {
      staff: toStaffResponse(updated),
      message: "Staff activated successfully.",
    };
  }
}
