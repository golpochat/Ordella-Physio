export const PERMISSIONS = {
  PATIENT_READ: "patient.read",
  PATIENT_WRITE: "patient.write",
  APPOINTMENT_READ: "appointment.read",
  APPOINTMENT_WRITE: "appointment.write",
  NOTES_READ: "notes.read",
  NOTES_WRITE: "notes.write",
  BILLING_READ: "billing.read",
  BILLING_WRITE: "billing.write",
  PAYMENTS_READ: "payments.read",
  PAYMENTS_WRITE: "payments.write",
  COMMUNICATION_SEND: "communication.send",
  REPORTING_READ: "reporting.read",
  TENANT_MANAGE: "tenant.manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS = Object.values(PERMISSIONS);

export function isPermission(value: unknown): value is Permission {
  return typeof value === "string" && ALL_PERMISSIONS.includes(value as Permission);
}
