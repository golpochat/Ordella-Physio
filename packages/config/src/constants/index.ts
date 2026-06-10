export const DEFAULT_TIMEZONE = "UTC";
export const DEFAULT_LOCALE = "en-US";

export const SUPPORTED_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Australia/Sydney",
] as const;

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD"] as const;

export const SERVICE_NAMES = {
  auth: "auth-service",
  tenant: "tenant-service",
  patient: "patient-service",
  appointment: "appointment-service",
  notes: "notes-service",
  billing: "billing-service",
  payment: "payment-service",
  communication: "communication-service",
  reporting: "reporting-service",
  messaging: "messaging-service",
  notification: "notification-service",
  gateway: "api-gateway",
} as const;

export type SupportedTimezone = (typeof SUPPORTED_TIMEZONES)[number];
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type ServiceName = keyof typeof SERVICE_NAMES;
