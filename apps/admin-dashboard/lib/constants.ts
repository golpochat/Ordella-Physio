export const APP_NAME = "Ordella Admin";

export const COOKIE_ACCESS_TOKEN = "ordella_access_token";
export const COOKIE_REFRESH_TOKEN = "ordella_refresh_token";
export const COOKIE_TENANT_ID = "ordella_tenant_id";

export const HEADER_TENANT_ID = "x-tenant-id";
export const HEADER_CORRELATION_ID = "x-correlation-id";
export const HEADER_AUTHORIZATION = "authorization";

export const API_ROUTES = {
  auth: "/api/auth",
  tenants: "/api/tenants",
  patients: "/api/patients",
  appointments: "/api/appointments",
  notes: "/api/notes",
  billing: "/api/billing",
  payments: "/api/payments",
  communication: "/api/communication",
  reporting: "/api/reporting",
} as const;

export const GATEWAY_PATHS = {
  auth: "/auth",
  tenants: "/tenants",
  patients: "/patients",
  appointments: "/appointments",
  notes: "/notes",
  billing: "/billing",
  payments: "/payments",
  communication: "/communication",
  reporting: "/reporting",
} as const;

export type ApiServiceKey = keyof typeof API_ROUTES;

export const PUBLIC_PATHS = ["/login", "/reset-password", "/api/auth"];

export const PROTECTED_PREFIXES = [
  "/",
  "/users",
  "/tenants",
  "/patients",
  "/appointments",
  "/notes",
  "/billing",
  "/payments",
  "/communication",
  "/reporting",
];

export const TOKEN_REFRESH_BUFFER_MS = 60_000;

export function getGatewayUrl() {
  return process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://localhost:3049";
}

export const NAV_ITEMS = [
  { href: "/", labelKey: "nav.dashboard" },
  { href: "/users", labelKey: "nav.users" },
  { href: "/tenants", labelKey: "nav.tenants" },
  { href: "/patients", labelKey: "nav.patients" },
  { href: "/appointments", labelKey: "nav.appointments" },
  { href: "/notes", labelKey: "nav.notes" },
  { href: "/billing", labelKey: "nav.billing" },
  { href: "/payments", labelKey: "nav.payments" },
  { href: "/communication", labelKey: "nav.communication" },
  { href: "/reporting", labelKey: "nav.reporting" },
] as const;
