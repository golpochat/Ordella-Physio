export const SERVICE_PORTS = {
  AUTH: 4001,
  TENANT: 3052,
  PATIENT: 3053,
  APPOINTMENT: 3054,
  NOTES: 3055,
  BILLING: 3056,
  PAYMENT: 3057,
  COMMUNICATION: 3058,
  REPORTING: 3059,
  EVENT_BUS: 3060,
  MESSAGING: 3061,
  NOTIFICATION: 3062,
  API_GATEWAY: 3049,
} as const;

export const JWT_ACCESS_TTL_SECONDS = 900;
export const JWT_REFRESH_TTL_SECONDS = 604800;

export const DEFAULT_TIMEZONE = "UTC";

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP"] as const;

export const DATE_FORMATS = {
  ISO_DATE: "yyyy-MM-dd",
  ISO_DATETIME: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  DISPLAY_DATE: "MMM d, yyyy",
  DISPLAY_DATETIME: "MMM d, yyyy h:mm a",
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  VALIDATION_FAILED: "Validation failed",
  TENANT_REQUIRED: "Tenant context is required",
  INTERNAL_ERROR: "Internal server error",
  CONFLICT: "Resource conflict",
  BAD_REQUEST: "Bad request",
} as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
