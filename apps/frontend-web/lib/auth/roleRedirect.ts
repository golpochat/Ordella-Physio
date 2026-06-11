export type RedirectPortalRole =
  | "SYSTEM"
  | "OWNER"
  | "ADMIN"
  | "CLINIC_ADMIN"
  | "THERAPIST"
  | "STAFF"
  | "PHARMACY"
  | "PATIENT"
  | "USER";

/** Auth-service `ADMIN` is a clinic administrator in the current seed model. */
export function mapAuthRoleToPortalRole(role: string): RedirectPortalRole {
  if (role === "ADMIN") {
    return "CLINIC_ADMIN";
  }

  return role as RedirectPortalRole;
}

export function getPortalForRole(role: string): string {
  switch (role) {
    case "SYSTEM":
      return "/super-admin";
    case "ADMIN":
      return "/admin";
    case "CLINIC_ADMIN":
      return "/clinic";
    case "THERAPIST":
      return "/therapist";
    case "STAFF":
      return "/staff";
    case "PHARMACY":
      return "/pharmacy";
    case "PATIENT":
      return "/patient";
    case "OWNER":
      return "/admin";
    default:
      return "/login";
  }
}

const ROLE_REDIRECT_PRIORITY: RedirectPortalRole[] = [
  "SYSTEM",
  "OWNER",
  "ADMIN",
  "CLINIC_ADMIN",
  "THERAPIST",
  "PHARMACY",
  "STAFF",
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
  return roles.includes("SYSTEM");
}

export function isSystemRole(role: string | undefined): boolean {
  return role === "SYSTEM";
}
