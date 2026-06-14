export const PERMISSIONS = {
  PATIENTS_READ: "patients:read",
  PATIENTS_WRITE: "patients:write",
  APPOINTMENTS_READ: "appointments:read",
  APPOINTMENTS_WRITE: "appointments:write",
  THERAPISTS_READ: "therapists:read",
  THERAPISTS_WRITE: "therapists:write",
  STAFF_READ: "staff:read",
  STAFF_WRITE: "staff:write",
  BILLING_READ: "billing:read",
  BILLING_WRITE: "billing:write",
  NOTES_READ: "notes:read",
  NOTES_WRITE: "notes:write",
  REPORTS_READ: "reports:read",
  STATEMENTS_WRITE: "statements:write",
  NOTIFICATIONS_READ: "notifications:read",
  NOTIFICATIONS_WRITE: "notifications:write",
  RBAC_READ: "rbac:read",
  RBAC_WRITE: "rbac:write",
  AUDIT_READ: "audit:read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
