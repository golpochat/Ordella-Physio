import { mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import type { PortalRole } from "@/lib/rbac";
import { resolveUserRoles } from "@/lib/rbac";

const ROLE_ALIASES: Record<PortalRole, string[]> = {
  SYSTEM: ["system", "superadmin", "super-admin"],
  SUPER_ADMIN: ["system", "superadmin", "super-admin"],
  TENANT_OWNER: ["admin", "owner"],
  OWNER: ["admin", "owner"],
  ADMIN: ["admin"],
  CLINIC_ADMIN: ["admin", "clinic_admin", "clinic-admin"],
  THERAPIST: ["therapist"],
  STAFF: ["staff"],
  BILLING_ADMIN: ["billing", "staff"],
  READ_ONLY: ["staff", "readonly"],
  ORG_ADMIN: ["organization", "org_admin"],
  ORG_BILLING_ADMIN: ["organization", "org_billing"],
  PHARMACY: ["pharmacy"],
  PATIENT: ["patient"],
  USER: ["user"],
};

type NavUser = Parameters<typeof resolveUserRoles>[0] | null | undefined;

export function getUserPortalRoles(user: NavUser): PortalRole[] {
  if (!user) {
    return [];
  }

  return resolveUserRoles(user);
}

export function canAccessNavItem(
  userRoles: PortalRole[],
  requiredRoles?: string[],
): boolean {
  if (!requiredRoles?.length) {
    return true;
  }

  const normalizedRequired = requiredRoles.map((role) => role.toLowerCase());

  return userRoles.some((role) => {
    const aliases = ROLE_ALIASES[role] ?? [role.toLowerCase()];
    return aliases.some((alias) => normalizedRequired.includes(alias));
  });
}

export function getPrimaryPortalRole(user: NavUser): string {
  const roles = getUserPortalRoles(user);
  return roles[0] ?? mapAuthRoleToPortalRole(user?.role ?? "USER");
}
