export const APP_NAME = "Ordella Physio";

export const CORRELATION_ID_HEADER = "x-correlation-id";
export const TENANT_HEADER = "x-tenant-id";
export const AUTHORIZATION_HEADER = "authorization";

export const API_ROUTES = {
  auth: "/api/auth",
  tenant: "/api/tenant",
  patient: "/api/patient",
  appointment: "/api/appointment",
  notes: "/api/notes",
  billing: "/api/billing",
  payment: "/api/payment",
  communication: "/api/communication",
  reporting: "/api/reporting",
} as const;

export const GATEWAY_PATHS = {
  auth: "/auth",
  tenant: "/tenants",
  patient: "/patients",
  appointment: "/appointments",
  notes: "/notes",
  billing: "/billing",
  payment: "/payments",
  communication: "/communication",
  reporting: "/reporting",
} as const;

export type ApiServiceKey = keyof typeof API_ROUTES;

export const DASHBOARD_ROUTES = {
  superAdmin: "/super-admin",
  admin: "/admin",
  clinic: "/clinic",
  therapist: "/therapist",
  patient: "/patient",
  pharmacy: "/pharmacy",
  staff: "/staff",
  user: "/user",
} as const;

export const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/features",
  "/about",
  "/contact",
  "/product",
  "/solutions",
  "/faq",
  "/blog",
  "/login",
  "/register",
  "/reset-password",
] as const;

export const TOKEN_REFRESH_BUFFER_MS = 60_000;
