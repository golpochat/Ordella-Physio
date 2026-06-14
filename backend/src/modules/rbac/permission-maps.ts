import { PERMISSIONS, type Permission } from "./permissions.constants";

export const MODULES = {
  PATIENTS: "patients",
  APPOINTMENTS: "appointments",
  THERAPISTS: "therapists",
  STAFF: "staff",
  BILLING: "billing",
  NOTES: "notes",
  REPORTS: "reports",
  STATEMENTS: "statements",
  NOTIFICATIONS: "notifications",
  RBAC: "rbac",
  AUDIT: "audit",
} as const;

export type ModuleName = (typeof MODULES)[keyof typeof MODULES];

export type ModuleActions = {
  read: Permission;
  write: Permission;
};

/** Permission map per module (read / write). */
export const MODULE_PERMISSION_MAP: Record<ModuleName, ModuleActions> = {
  [MODULES.PATIENTS]: {
    read: PERMISSIONS.PATIENTS_READ,
    write: PERMISSIONS.PATIENTS_WRITE,
  },
  [MODULES.APPOINTMENTS]: {
    read: PERMISSIONS.APPOINTMENTS_READ,
    write: PERMISSIONS.APPOINTMENTS_WRITE,
  },
  [MODULES.THERAPISTS]: {
    read: PERMISSIONS.THERAPISTS_READ,
    write: PERMISSIONS.THERAPISTS_WRITE,
  },
  [MODULES.STAFF]: {
    read: PERMISSIONS.STAFF_READ,
    write: PERMISSIONS.STAFF_WRITE,
  },
  [MODULES.BILLING]: {
    read: PERMISSIONS.BILLING_READ,
    write: PERMISSIONS.BILLING_WRITE,
  },
  [MODULES.NOTES]: {
    read: PERMISSIONS.NOTES_READ,
    write: PERMISSIONS.NOTES_WRITE,
  },
  [MODULES.REPORTS]: {
    read: PERMISSIONS.REPORTS_READ,
    write: PERMISSIONS.REPORTS_READ,
  },
  [MODULES.STATEMENTS]: {
    read: PERMISSIONS.STATEMENTS_WRITE,
    write: PERMISSIONS.STATEMENTS_WRITE,
  },
  [MODULES.NOTIFICATIONS]: {
    read: PERMISSIONS.NOTIFICATIONS_READ,
    write: PERMISSIONS.NOTIFICATIONS_WRITE,
  },
  [MODULES.RBAC]: {
    read: PERMISSIONS.RBAC_READ,
    write: PERMISSIONS.RBAC_WRITE,
  },
  [MODULES.AUDIT]: {
    read: PERMISSIONS.AUDIT_READ,
    write: PERMISSIONS.AUDIT_READ,
  },
};

export function getModulePermission(module: ModuleName, action: keyof ModuleActions): Permission {
  return MODULE_PERMISSION_MAP[module][action];
}
