export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  THERAPIST = "THERAPIST",
  STAFF = "STAFF",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export enum AppointmentStatus {
  SCHEDULED = "SCHEDULED",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
  RESCHEDULED = "RESCHEDULED",
}

export enum NoteType {
  GENERAL = "GENERAL",
  SOAP = "SOAP",
  ATTACHMENT = "ATTACHMENT",
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  ISSUED = "ISSUED",
  PAID = "PAID",
  VOID = "VOID",
  REFUNDED = "REFUNDED",
  OVERDUE = "OVERDUE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
}

export enum PaymentProvider {
  STRIPE = "STRIPE",
  MANUAL = "MANUAL",
}

export enum NotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  IN_APP = "IN_APP",
}

export enum ReminderChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
}
