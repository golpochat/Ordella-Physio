import type { PortalRole } from "@/lib/rbac";

export type PortalCapability =
  | "patients:read"
  | "patients:write"
  | "appointments:read"
  | "appointments:write"
  | "billing:read"
  | "billing:write"
  | "notes:read"
  | "notes:write"
  | "reports:read"
  | "schedule:read"
  | "profile:read";

export const PORTAL_CAPABILITY_MATRIX: Record<PortalRole, readonly PortalCapability[]> = {
  SYSTEM: [],
  OWNER: [
    "patients:read",
    "patients:write",
    "appointments:read",
    "appointments:write",
    "billing:read",
    "billing:write",
    "notes:read",
    "notes:write",
    "reports:read",
    "schedule:read",
    "profile:read",
  ],
  ADMIN: [
    "patients:read",
    "patients:write",
    "appointments:read",
    "appointments:write",
    "billing:read",
    "billing:write",
    "notes:read",
    "notes:write",
    "reports:read",
    "schedule:read",
    "profile:read",
  ],
  CLINIC_ADMIN: [
    "patients:read",
    "patients:write",
    "appointments:read",
    "appointments:write",
    "billing:read",
    "billing:write",
    "notes:read",
    "notes:write",
    "reports:read",
    "schedule:read",
    "profile:read",
  ],
  STAFF: [
    "patients:read",
    "patients:write",
    "appointments:read",
    "appointments:write",
    "billing:read",
    "billing:write",
    "notes:read",
    "reports:read",
    "profile:read",
  ],
  THERAPIST: [
    "patients:read",
    "appointments:read",
    "appointments:write",
    "billing:read",
    "notes:read",
    "notes:write",
    "reports:read",
    "schedule:read",
    "profile:read",
  ],
  PATIENT: ["profile:read"],
  PHARMACY: ["profile:read"],
  USER: ["profile:read"],
};

export function portalHasCapability(
  roles: PortalRole[],
  capability: PortalCapability,
): boolean {
  return roles.some((role) => PORTAL_CAPABILITY_MATRIX[role]?.includes(capability));
}

export function getPortalCapabilities(roles: PortalRole[]): PortalCapability[] {
  const set = new Set<PortalCapability>();
  for (const role of roles) {
    for (const capability of PORTAL_CAPABILITY_MATRIX[role] ?? []) {
      set.add(capability);
    }
  }
  return [...set];
}

/** Nav hrefs gated by required capability (longest prefix wins). */
export const PORTAL_NAV_CAPABILITIES: Record<string, PortalCapability> = {
  "/clinic/patients": "patients:read",
  "/clinic/appointments": "appointments:read",
  "/clinic/billing": "billing:read",
  "/clinic/notes": "notes:read",
  "/clinic/reports": "reports:read",
  "/staff/patients": "patients:read",
  "/staff/appointments": "appointments:read",
  "/staff/billing": "billing:read",
  "/staff/notes": "notes:read",
  "/staff/reports": "reports:read",
  "/therapist/today": "appointments:read",
  "/therapist/upcoming": "schedule:read",
  "/therapist/appointments": "appointments:read",
  "/therapist/patients": "patients:read",
  "/therapist/billing": "billing:read",
  "/therapist/notes": "notes:write",
  "/patient/profile": "profile:read",
};

export function canAccessNavHref(pathname: string, roles: PortalRole[]): boolean {
  const match = Object.entries(PORTAL_NAV_CAPABILITIES)
    .filter(([href]) => pathname === href || pathname.startsWith(`${href}/`))
    .sort(([a], [b]) => b.length - a.length)[0];

  if (!match) {
    return true;
  }

  return portalHasCapability(roles, match[1]);
}
