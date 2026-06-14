import { PERMISSIONS, type Permission } from "./permissions.constants";
import { ROLES } from "./roles";

/** Effective permissions granted to each clinic role. */
export const ROLE_PERMISSION_MATRIX: Record<
  typeof ROLES.ADMIN | typeof ROLES.STAFF | typeof ROLES.CLINICIAN,
  readonly Permission[]
> = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.STAFF]: [
    PERMISSIONS.PATIENTS_READ,
    PERMISSIONS.PATIENTS_WRITE,
    PERMISSIONS.APPOINTMENTS_READ,
    PERMISSIONS.APPOINTMENTS_WRITE,
    PERMISSIONS.THERAPISTS_READ,
    PERMISSIONS.BILLING_READ,
    PERMISSIONS.STATEMENTS_WRITE,
    PERMISSIONS.NOTIFICATIONS_READ,
    PERMISSIONS.NOTIFICATIONS_WRITE,
  ],
  [ROLES.CLINICIAN]: [
    PERMISSIONS.PATIENTS_READ,
    PERMISSIONS.APPOINTMENTS_READ,
    PERMISSIONS.APPOINTMENTS_WRITE,
    PERMISSIONS.THERAPISTS_READ,
    PERMISSIONS.BILLING_READ,
    PERMISSIONS.NOTES_READ,
    PERMISSIONS.NOTES_WRITE,
    PERMISSIONS.NOTIFICATIONS_READ,
  ],
};

export const DEFAULT_ROLE_DEFINITIONS = {
  ADMIN: {
    name: ROLES.ADMIN,
    description: "Admin — full clinic administration",
    permissions: [...ROLE_PERMISSION_MATRIX[ROLES.ADMIN]],
  },
  STAFF: {
    name: ROLES.STAFF,
    description: "Staff — front desk and operations",
    permissions: [...ROLE_PERMISSION_MATRIX[ROLES.STAFF]],
  },
  THERAPIST: {
    name: ROLES.CLINICIAN,
    description: "Clinician — clinical care and own schedule",
    permissions: [...ROLE_PERMISSION_MATRIX[ROLES.CLINICIAN]],
  },
  PATIENT: {
    name: ROLES.PATIENT,
    description: "Patient portal user — no clinic management access",
    permissions: [] as string[],
  },
} as const;

export { PERMISSIONS, type Permission };

export function getPermissionsForRole(role: string): readonly Permission[] {
  if (role === ROLES.ADMIN) return ROLE_PERMISSION_MATRIX[ROLES.ADMIN];
  if (role === ROLES.STAFF) return ROLE_PERMISSION_MATRIX[ROLES.STAFF];
  if (role === ROLES.CLINICIAN) return ROLE_PERMISSION_MATRIX[ROLES.CLINICIAN];
  return [];
}
