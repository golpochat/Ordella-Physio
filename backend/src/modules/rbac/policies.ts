import { composePolicy, Permission, requirePermission, requireAny } from "../../middleware/permissions";
import { denyRoles, requireRoles } from "../../middleware/rbac.middleware";
import { ROLES } from "./roles";

const denyPatient = denyRoles(ROLES.PATIENT);
const denyPatientClinician = denyRoles(ROLES.PATIENT, ROLES.CLINICIAN);

/** Central route authorization policies — permission guards with role blocks. */
export const policies = {
  // --- Patients ---
  patientsRead: composePolicy(denyPatient, requirePermission(Permission.PATIENT_VIEW)),
  patientsWriteAdminStaff: composePolicy(
    denyPatient,
    requirePermission(Permission.PATIENT_MANAGE),
  ),
  patientsEdit: composePolicy(denyPatient, requirePermission(Permission.PATIENT_EDIT)),

  // --- Appointments ---
  appointmentsRead: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_VIEW, Permission.APPOINTMENT_MANAGE, "appointments:read"]),
  ),
  appointmentsWrite: composePolicy(denyPatient, requirePermission(Permission.APPOINTMENT_MANAGE)),

  // --- Therapists / Clinicians directory ---
  therapistsRead: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_VIEW, "therapists:read"]),
  ),
  therapistsAdmin: composePolicy(
    denyPatient,
    requirePermission(Permission.USER_MANAGE),
  ),
  therapistSelfUpdate: composePolicy(denyPatient, requireRoles(ROLES.CLINICIAN)),

  // --- Staff / terminals ---
  staffAdmin: composePolicy(
    denyPatientClinician,
    requirePermission(Permission.TERMINAL_MANAGE),
  ),
  staffSelfRead: composePolicy(
    denyPatientClinician,
    requireAny([Permission.USER_MANAGE, "staff:read", "staff:write"]),
  ),

  // --- Billing ---
  billingRead: composePolicy(
    denyPatient,
    requireAny([Permission.BILLING_MANAGE, "billing:read"]),
  ),
  billingWrite: composePolicy(denyPatient, requirePermission(Permission.BILLING_MANAGE)),

  // --- Notes ---
  notesRead: composePolicy(denyPatient, requirePermission(Permission.NOTES_READ)),
  notesWrite: composePolicy(denyPatient, requirePermission(Permission.NOTES_WRITE)),

  // --- Reports ---
  reportsRead: composePolicy(
    denyPatient,
    requirePermission(Permission.REPORTING_VIEW),
  ),

  // --- Patient service statements (PDF / email) ---
  patientStatements: composePolicy(
    denyPatientClinician,
    requirePermission(Permission.BILLING_MANAGE),
  ),

  // --- Notifications ---
  notificationsRead: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_VIEW, "notifications:read"]),
  ),
  notificationsWrite: composePolicy(
    denyPatient,
    requirePermission(Permission.USER_MANAGE),
  ),

  // --- RBAC, users, roles, settings ---
  rbacRead: composePolicy(
    denyPatientClinician,
    requireAny([Permission.USER_MANAGE, Permission.ROLE_MANAGE, "rbac:read"]),
  ),
  rbacWrite: composePolicy(
    denyPatientClinician,
    requireAny([Permission.ROLE_MANAGE, Permission.USER_MANAGE, "rbac:write"]),
  ),
  auditRead: composePolicy(
    denyPatientClinician,
    requireAny([Permission.REPORTING_READ, "audit:read"]),
  ),
  settingsManage: composePolicy(
    denyPatientClinician,
    requireAny([Permission.SETTINGS_MANAGE, Permission.TENANT_MANAGE]),
  ),

  filesUpload: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_ATTACHMENTS, "files.upload"]),
  ),
  filesRead: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_ATTACHMENTS, Permission.PATIENT_VIEW, "files.view"]),
  ),
  filesDelete: composePolicy(
    denyPatient,
    requireAny([Permission.PATIENT_ATTACHMENTS, "files.delete", Permission.USER_MANAGE]),
  ),
};
