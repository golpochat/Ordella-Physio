import type { PortalRole } from "@/lib/rbac";
import type { AuthUser } from "@/store/auth.store";
import type { TenantState } from "@/store/tenant.store";

function resolvePortalType(role: PortalRole): TenantState["portalType"] {
  if (role === "SYSTEM") {
    return "admin";
  }

  if (role === "PATIENT") {
    return "patient";
  }

  if (role === "THERAPIST") {
    return "therapist";
  }

  if (role === "OWNER" || role === "ADMIN") {
    return "admin";
  }

  if (role === "CLINIC_ADMIN") {
    return "clinic";
  }

  return "clinic";
}

export function buildTenantStateFromUser(user: AuthUser, name?: string): TenantState {
  const role = user.role ?? user.roles?.[0] ?? "USER";

  return {
    id: user.tenantId,
    name: name ?? user.tenantId,
    portalType: resolvePortalType(role),
  };
}
