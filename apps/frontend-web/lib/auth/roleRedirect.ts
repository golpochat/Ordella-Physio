export type RedirectPortalRole =
  | "SYSTEM"
  | "SUPER_ADMIN"
  | "TENANT_OWNER"
  | "OWNER"
  | "ADMIN"
  | "CLINIC_ADMIN"
  | "THERAPIST"
  | "STAFF"
  | "BILLING_ADMIN"
  | "READ_ONLY"
  | "ORG_ADMIN"
  | "ORG_BILLING_ADMIN"
  | "PHARMACY"
  | "PATIENT"
  | "USER";

/** Auth-service `ADMIN` is a clinic administrator in the current seed model. */
export function mapAuthRoleToPortalRole(role: string): RedirectPortalRole {
  if (role === "ADMIN") {
    return "CLINIC_ADMIN";
  }

  if (role === "TENANT_OWNER") {
    return "OWNER";
  }

  return role as RedirectPortalRole;
}

export function getPortalForRole(role: string): string {
  switch (role) {
    case "SYSTEM":
    case "SUPER_ADMIN":
      return "/super-admin";
    case "ORG_ADMIN":
    case "ORG_BILLING_ADMIN":
      return "/organization";
    case "ADMIN":
    case "CLINIC_ADMIN":
      return "/clinic";
    case "TENANT_OWNER":
    case "OWNER":
      return "/clinic";
    case "THERAPIST":
      return "/therapist";
    case "STAFF":
    case "BILLING_ADMIN":
    case "READ_ONLY":
      return "/staff";
    case "PHARMACY":
      return "/pharmacy";
    case "PATIENT":
      return "/patient";
    default:
      return "/login";
  }
}

const ROLE_REDIRECT_PRIORITY: RedirectPortalRole[] = [
  "SYSTEM",
  "SUPER_ADMIN",
  "ORG_ADMIN",
  "ORG_BILLING_ADMIN",
  "OWNER",
  "TENANT_OWNER",
  "ADMIN",
  "CLINIC_ADMIN",
  "THERAPIST",
  "PHARMACY",
  "BILLING_ADMIN",
  "STAFF",
  "READ_ONLY",
  "PATIENT",
  "USER",
];

export function getPortalForRoles(roles: RedirectPortalRole[] | undefined): string {
  const resolved = roles?.length ? roles : [];

  for (const role of ROLE_REDIRECT_PRIORITY) {
    if (resolved.includes(role)) {
      return getPortalForRole(role);
    }
  }

  return "/login";
}

export function isSystemUser(roles: RedirectPortalRole[]): boolean {
  return roles.includes("SYSTEM") || roles.includes("SUPER_ADMIN");
}

export function isSystemRole(role: string | undefined): boolean {
  return role === "SYSTEM" || role === "SUPER_ADMIN";
}

export function isOrganizationUser(roles: RedirectPortalRole[]): boolean {
  return roles.includes("ORG_ADMIN") || roles.includes("ORG_BILLING_ADMIN");
}
