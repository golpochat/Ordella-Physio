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
  REPORTING_WRITE: "reporting.write",
  TENANT_MANAGE: "tenant.manage",
  MESSAGING_READ: "messaging.read",
  MESSAGING_WRITE: "messaging.write",
  NOTIFICATIONS_READ: "notifications.read",
  NOTIFICATIONS_WRITE: "notifications.write",
  AI_NOTES_READ: "ai.notes.read",
  AI_NOTES_WRITE: "ai.notes.write",
  MARKETPLACE_READ: "marketplace.read",
  MARKETPLACE_WRITE: "marketplace.write",
  MARKETPLACE_MANAGE: "marketplace.manage",
  ENTERPRISE_READ: "enterprise.read",
  ENTERPRISE_WRITE: "enterprise.write",
  ENTERPRISE_MANAGE: "enterprise.manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS = Object.values(PERMISSIONS);

export function isPermission(value: unknown): value is Permission {
  return typeof value === "string" && ALL_PERMISSIONS.includes(value as Permission);
}
