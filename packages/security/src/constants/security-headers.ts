export const DEFAULT_RATE_LIMIT = {
  windowMs: 60_000,
  max: 100,
} as const;

export const TENANT_RATE_LIMIT = {
  windowMs: 60_000,
  max: 200,
} as const;

export const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "geolocation=()",
} as const;

export const BCRYPT_ROUNDS = 12;
export const DEFAULT_ACCESS_TOKEN_EXPIRES_IN = "15m";
export const DEFAULT_REFRESH_TOKEN_EXPIRES_IN = "7d";
export const TENANT_HEADER = "x-tenant-id";

export type SecurityHeaderName = keyof typeof SECURITY_HEADERS;
