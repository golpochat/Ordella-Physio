import { authorize } from "../../middleware/rbac.middleware";
import { PERMISSIONS } from "./permissions";
import { ROLES } from "./roles";
import { MODULE_PERMISSION_MAP, MODULES } from "./permission-maps";

const denyPatient = [ROLES.PATIENT] as const;
const denyPatientClinician = [ROLES.PATIENT, ROLES.CLINICIAN] as const;

/** Central route authorization policies — compose role + permission checks per module. */
export const policies = {
  // --- Patients ---
  patientsRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.PATIENTS].read],
  }),
  patientsWriteAdminStaff: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.PATIENTS].write],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- Appointments ---
  appointmentsRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.APPOINTMENTS].read],
  }),
  appointmentsWrite: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.APPOINTMENTS].write],
  }),

  // --- Therapists / Clinicians directory ---
  therapistsRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.THERAPISTS].read],
  }),
  therapistsAdmin: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.THERAPISTS].write],
    roles: [ROLES.ADMIN],
  }),
  therapistSelfUpdate: authorize({
    denyRoles: [...denyPatient],
    roles: [ROLES.CLINICIAN],
  }),

  // --- Staff ---
  staffAdmin: authorize({
    denyRoles: [...denyPatientClinician],
    permissions: [MODULE_PERMISSION_MAP[MODULES.STAFF].write],
    roles: [ROLES.ADMIN],
  }),
  staffSelfRead: authorize({
    denyRoles: [...denyPatientClinician],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- Billing ---
  billingRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.BILLING].read],
  }),
  billingWrite: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.BILLING].write],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- Notes ---
  notesRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.NOTES].read],
  }),
  notesWrite: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.NOTES].write],
  }),

  // --- Reports ---
  reportsRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.REPORTS].read],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- Patient service statements (PDF / email) ---
  patientStatements: authorize({
    denyRoles: [...denyPatientClinician],
    permissions: [MODULE_PERMISSION_MAP[MODULES.STATEMENTS].write],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- Notifications ---
  notificationsRead: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.NOTIFICATIONS].read],
  }),
  notificationsWrite: authorize({
    denyRoles: [...denyPatient],
    permissions: [MODULE_PERMISSION_MAP[MODULES.NOTIFICATIONS].write],
    roles: [ROLES.ADMIN, ROLES.STAFF],
  }),

  // --- RBAC & audit ---
  rbacRead: authorize({
    denyRoles: [...denyPatient, ROLES.CLINICIAN],
    permissions: [PERMISSIONS.RBAC_READ],
    roles: [ROLES.ADMIN],
  }),
  rbacWrite: authorize({
    denyRoles: [...denyPatient, ROLES.CLINICIAN],
    permissions: [PERMISSIONS.RBAC_WRITE],
    roles: [ROLES.ADMIN],
  }),
  auditRead: authorize({
    denyRoles: [...denyPatient, ROLES.CLINICIAN],
    permissions: [PERMISSIONS.AUDIT_READ],
    roles: [ROLES.ADMIN],
  }),
};
