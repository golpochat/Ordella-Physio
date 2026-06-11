export type SecurityRole =
  | "OWNER"
  | "ADMIN"
  | "THERAPIST"
  | "STAFF"
  | "SYSTEM"
  | "PATIENT"
  | "PHARMACY";

export const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  THERAPIST: "THERAPIST",
  STAFF: "STAFF",
  SYSTEM: "SYSTEM",
  PATIENT: "PATIENT",
  PHARMACY: "PHARMACY",
} as const satisfies Record<string, SecurityRole>;

export const ROLE_HIERARCHY: Record<SecurityRole, number> = {
  SYSTEM: 100,
  OWNER: 90,
  ADMIN: 80,
  THERAPIST: 60,
  PHARMACY: 50,
  STAFF: 40,
  PATIENT: 20,
};

export function isSecurityRole(value: unknown): value is SecurityRole {
  return typeof value === "string" && value in ROLE_HIERARCHY;
}

export function roleAtLeast(userRole: SecurityRole, requiredRole: SecurityRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
