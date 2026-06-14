/**
 * Application roles. Clinicians are stored as `THERAPIST` in the database.
 */
export const ROLES = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  /** Clinician — persisted as THERAPIST in Role.name / JWT roles */
  CLINICIAN: "THERAPIST",
  PATIENT: "PATIENT",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<string, string> = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.STAFF]: "Staff",
  [ROLES.CLINICIAN]: "Clinician",
  [ROLES.PATIENT]: "Patient",
};

export const CLINIC_ROLES = [ROLES.ADMIN, ROLES.STAFF, ROLES.CLINICIAN] as const;

export function isClinicianRole(role: string): boolean {
  return role === ROLES.CLINICIAN;
}

export function normalizeRoleLabel(roleName: string): string {
  return ROLE_LABELS[roleName] ?? roleName;
}
