import type { SecurityRole } from "./roles";

/** Productized effective roles (canonical names). */
export type EffectiveRole =
  | "TENANT_OWNER"
  | "ADMIN"
  | "STAFF"
  | "THERAPIST"
  | "BILLING_ADMIN"
  | "READ_ONLY"
  | "ORG_ADMIN"
  | "ORG_BILLING_ADMIN"
  | "SUPER_ADMIN"
  | "PATIENT"
  | "PHARMACY";

export const EFFECTIVE_ROLES = {
  TENANT_OWNER: "TENANT_OWNER",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  THERAPIST: "THERAPIST",
  BILLING_ADMIN: "BILLING_ADMIN",
  READ_ONLY: "READ_ONLY",
  ORG_ADMIN: "ORG_ADMIN",
  ORG_BILLING_ADMIN: "ORG_BILLING_ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  PATIENT: "PATIENT",
  PHARMACY: "PHARMACY",
} as const satisfies Record<string, EffectiveRole>;

const ROLE_ALIASES: Record<string, EffectiveRole> = {
  OWNER: "TENANT_OWNER",
  SYSTEM: "SUPER_ADMIN",
  CLINIC_ADMIN: "ADMIN",
  USER: "STAFF",
};

export function normalizeEffectiveRole(role: string | undefined | null): EffectiveRole | null {
  if (!role) {
    return null;
  }

  const upper = role.toUpperCase();
  if (upper in EFFECTIVE_ROLES) {
    return EFFECTIVE_ROLES[upper as keyof typeof EFFECTIVE_ROLES];
  }

  if (upper in ROLE_ALIASES) {
    return ROLE_ALIASES[upper];
  }

  return null;
}

export function toSecurityRole(role: EffectiveRole): SecurityRole {
  switch (role) {
    case "TENANT_OWNER":
      return "OWNER";
    case "SUPER_ADMIN":
      return "SYSTEM";
    default:
      return role as SecurityRole;
  }
}

export function isSuperAdminRole(role: EffectiveRole | null): boolean {
  return role === "SUPER_ADMIN";
}

export function isOrganizationRole(role: EffectiveRole | null): boolean {
  return role === "ORG_ADMIN" || role === "ORG_BILLING_ADMIN";
}

export function isTenantRole(role: EffectiveRole | null): boolean {
  return (
    role === "TENANT_OWNER" ||
    role === "ADMIN" ||
    role === "STAFF" ||
    role === "THERAPIST" ||
    role === "BILLING_ADMIN" ||
    role === "READ_ONLY" ||
    role === "PATIENT" ||
    role === "PHARMACY"
  );
}
