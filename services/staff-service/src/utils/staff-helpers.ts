import type { Staff, StaffLocation } from "@/generated/prisma";
import type { StaffListItem, StaffLocationRecord, StaffRecord } from "@/models/Staff";
import type { TenantLocationSummary } from "@/integrations/tenant-service.client";

export type AuthenticatedStaffUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function toStaffResponse(staff: Staff): StaffRecord {
  return {
    id: staff.id,
    tenantId: staff.tenantId,
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    phone: staff.phone,
    staffType: staff.staffType,
    roleId: staff.roleId,
    status: staff.status,
    createdAt: staff.createdAt.toISOString(),
    updatedAt: staff.updatedAt.toISOString(),
  };
}

export function toStaffLocationResponses(
  links: StaffLocation[],
  locationMap: Map<string, TenantLocationSummary>,
): StaffLocationRecord[] {
  return links.map((link) => {
    const location = locationMap.get(link.locationId);
    return {
      id: link.id,
      staffId: link.staffId,
      locationId: link.locationId,
      name: location?.name,
      code: location?.code,
    };
  });
}

export function toStaffListItem(
  staff: Staff & { locations: StaffLocation[] },
  locationMap: Map<string, TenantLocationSummary>,
  roleName: string | null,
): StaffListItem {
  return {
    ...toStaffResponse(staff),
    roleName,
    locations: toStaffLocationResponses(staff.locations, locationMap),
  };
}
