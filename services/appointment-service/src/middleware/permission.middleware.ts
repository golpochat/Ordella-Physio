import type { SecurityRole } from "@ordella/security";
import { roleHasMappedPermission } from "@ordella/security";

const APPOINTMENT_MANAGE_PERMISSION = "appointment.manage";

export function hasAppointmentManageAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(APPOINTMENT_MANAGE_PERMISSION)) {
    return true;
  }

  if (user.permissions?.includes("appointment.write")) {
    return true;
  }

  return roleHasMappedPermission(user.role, APPOINTMENT_MANAGE_PERMISSION);
}
