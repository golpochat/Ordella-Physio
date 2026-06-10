import type { Staff } from "@/generated/prisma";
import { toStaffResponse } from "@/tenants/tenants.mapper";

export { toStaffResponse };

export function toStaffListResponse(staff: Staff[]) {
  return staff.map(toStaffResponse);
}
