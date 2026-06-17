export type SecurityRole =
  | "TENANT_OWNER"
  | "OWNER"
  | "ADMIN"
  | "THERAPIST"
  | "STAFF"
  | "BILLING_ADMIN"
  | "READ_ONLY"
  | "ORG_ADMIN"
  | "ORG_BILLING_ADMIN"
  | "SUPER_ADMIN"
  | "SYSTEM"
  | "PATIENT"
  | "PHARMACY";

export const ROLES = {
  TENANT_OWNER: "TENANT_OWNER",
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  THERAPIST: "THERAPIST",
  STAFF: "STAFF",
  BILLING_ADMIN: "BILLING_ADMIN",
  READ_ONLY: "READ_ONLY",
  ORG_ADMIN: "ORG_ADMIN",
  ORG_BILLING_ADMIN: "ORG_BILLING_ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  SYSTEM: "SYSTEM",
  PATIENT: "PATIENT",
  PHARMACY: "PHARMACY",
} as const satisfies Record<string, SecurityRole>;

export const ROLE_HIERARCHY: Record<SecurityRole, number> = {
  SUPER_ADMIN: 100,
  SYSTEM: 100,
  ORG_ADMIN: 75,
  ORG_BILLING_ADMIN: 70,
  TENANT_OWNER: 90,
  OWNER: 90,
  ADMIN: 80,
  BILLING_ADMIN: 78,
  THERAPIST: 60,
  PHARMACY: 50,
  STAFF: 40,
  READ_ONLY: 30,
  PATIENT: 20,
};

/** Alias used by auth-service role enforcement middleware. */
export const ROLE_LEVELS = ROLE_HIERARCHY;

export function isSecurityRole(value: unknown): value is SecurityRole {
  return typeof value === "string" && value in ROLE_HIERARCHY;
}

export function roleAtLeast(userRole: SecurityRole, requiredRole: SecurityRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function isSystemRole(role: SecurityRole): boolean {
  return role === "SYSTEM" || role === "SUPER_ADMIN";
}

export function getRoleLevel(role: SecurityRole): number {
  return ROLE_HIERARCHY[role] ?? 0;
}

export function roleMeetsMinLevel(role: SecurityRole, minRoleLevel: number): boolean {
  if (isSystemRole(role)) {
    return true;
  }

  return getRoleLevel(role) >= minRoleLevel;
}
