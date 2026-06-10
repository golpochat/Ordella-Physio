export interface DomainEvent<TPayload = unknown> {
  id: string;
  eventName: EventType;
  /** @deprecated Use eventName */
  type: EventType;
  tenantId: string;
  timestamp: string;
  /** @deprecated Use timestamp */
  occurredAt: string;
  payload: TPayload;
}

export const EVENT_TYPES = {
  USER_CREATED: "user.created",
  USER_LOGGED_IN: "user.logged_in",
  USER_PASSWORD_RESET_REQUESTED: "user.password_reset_requested",
  USER_PASSWORD_RESET: "user.password_reset",
  TENANT_CREATED: "tenant.created",
  TENANT_UPDATED: "tenant.updated",
  LOCATION_CREATED: "location.created",
  STAFF_ADDED: "staff.added",
  STAFF_ROLE_CHANGED: "staff.role_changed",
  PATIENT_CREATED: "patient.created",
  PATIENT_UPDATED: "patient.updated",
  PATIENT_DELETED: "patient.deleted",
  MEDICAL_RECORD_UPDATED: "medical_record.updated",
  APPOINTMENT_CREATED: "appointment.created",
  APPOINTMENT_UPDATED: "appointment.updated",
  APPOINTMENT_COMPLETED: "appointment.completed",
  APPOINTMENT_CANCELLED: "appointment.cancelled",
  APPOINTMENT_NO_SHOW: "appointment.no_show",
  APPOINTMENT_RESCHEDULED: "appointment.rescheduled",
  NOTE_CREATED: "note.created",
  NOTE_UPDATED: "note.updated",
  NOTE_DELETED: "note.deleted",
  SOAPNOTE_CREATED: "soapnote.created",
  SOAPNOTE_UPDATED: "soapnote.updated",
  INVOICE_CREATED: "invoice.created",
  INVOICE_UPDATED: "invoice.updated",
  INVOICE_ITEM_ADDED: "invoice_item.added",
  INVOICE_ITEM_UPDATED: "invoice_item.updated",
  INVOICE_ISSUED: "invoice.issued",
  INVOICE_PAID: "invoice.paid",
  INVOICE_VOIDED: "invoice.voided",
  INVOICE_REFUNDED: "invoice.refunded",
  TAX_RATE_CREATED: "tax_rate.created",
  TAX_RATE_UPDATED: "tax_rate.updated",
  PAYMENT_INTENT_CREATED: "payment_intent.created",
  PAYMENT_CREATED: "payment.created",
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_FAILED: "payment.failed",
  PAYMENT_CANCELLED: "payment.cancelled",
  PAYMENT_REFUNDED: "payment.refunded",
  REFUND_CREATED: "refund.created",
  PAYOUT_CREATED: "payout.created",
  LEDGER_ENTRY_CREATED: "ledger_entry.created",
  NOTIFICATION_CREATED: "notification.created",
  NOTIFICATION_SENT: "notification.sent",
  NOTIFICATION_FAILED: "notification.failed",
  NOTIFICATION_CANCELLED: "notification.cancelled",
  REMINDER_CREATED: "reminder.created",
  REMINDER_SENT: "reminder.sent",
  REMINDER_FAILED: "reminder.failed",
  REMINDER_CANCELLED: "reminder.cancelled",
  METRICS_DAILY_UPDATED: "metrics.daily.updated",
  METRICS_MONTHLY_UPDATED: "metrics.monthly.updated",
  METRICS_GENERATED: "metrics.generated",
  DATA_INGESTED: "data.ingested",
  AUDIT_LOGGED: "audit.logged",
  MESSAGING_CONVERSATION_CREATED: "messaging.conversation.created",
  MESSAGING_MESSAGE_CREATED: "messaging.message.created",
  MESSAGING_MESSAGE_READ: "messaging.message.read",
  MESSAGING_TYPING: "messaging.typing",
  NOTIFICATION_CREATE: "notification.create",
  NOTIFICATION_READ: "notification.read",
  NOTIFICATION_BROADCAST: "notification.broadcast",
  REPORTING_REQUEST_CREATED: "reporting.request.created",
  REPORTING_REQUEST_COMPLETED: "reporting.request.completed",
  REPORTING_REQUEST_FAILED: "reporting.request.failed",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
