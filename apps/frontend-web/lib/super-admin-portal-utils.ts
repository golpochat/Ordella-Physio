export {
  formatPatientDate as formatPortalDate,
  formatPatientTime as formatPortalTime,
  formatPatientDateTime as formatPortalDateTime,
  formatCurrency,
} from "@/lib/patient-portal-utils";

import type { PlatformRole } from "@/lib/super-admin-portal-types";

type SecurityRole = "OWNER" | "ADMIN" | "THERAPIST" | "STAFF" | "SYSTEM";

const ROLE_HIERARCHY: Record<SecurityRole, number> = {
  SYSTEM: 100,
  OWNER: 90,
  ADMIN: 80,
  THERAPIST: 60,
  STAFF: 40,
};

const ROLE_DESCRIPTIONS: Record<SecurityRole, string> = {
  SYSTEM: "Full platform administration across all tenants.",
  OWNER: "Tenant owner with billing and configuration access.",
  ADMIN: "Clinic administrator managing day-to-day operations.",
  THERAPIST: "Clinical staff delivering patient care.",
  STAFF: "Support staff with limited operational access.",
};

const ROLE_PERMISSIONS: Record<SecurityRole, string[]> = {
  SYSTEM: ["platform:*", "tenants:*", "users:*", "roles:*"],
  OWNER: ["tenant:manage", "billing:manage", "staff:manage"],
  ADMIN: ["clinic:manage", "patients:manage", "appointments:manage"],
  THERAPIST: ["patients:read", "appointments:manage", "notes:write"],
  STAFF: ["appointments:read", "patients:read"],
};

export const BUILTIN_PLATFORM_ROLES: PlatformRole[] = (
  Object.keys(ROLE_HIERARCHY) as SecurityRole[]
).map((role) => ({
  id: role,
  name: role,
  level: ROLE_HIERARCHY[role],
  description: ROLE_DESCRIPTIONS[role],
  permissions: ROLE_PERMISSIONS[role],
}));

export function getUserDisplayName(user: {
  firstName?: string;
  lastName?: string;
  email?: string;
  id: string;
}): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email || user.id;
}
