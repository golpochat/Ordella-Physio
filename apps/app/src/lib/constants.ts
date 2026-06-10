export const COOKIE_ACCESS_TOKEN = "ordella_access_token";
export const COOKIE_REFRESH_TOKEN = "ordella_refresh_token";
export const COOKIE_TENANT_ID = "ordella_tenant_id";
export const HEADER_TENANT_ID = "x-tenant-id";

export const PUBLIC_PATHS = ["/login", "/api/auth"];
export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/patients",
  "/appointments",
  "/notes",
  "/billing",
  "/payments",
  "/communication",
  "/reporting",
  "/settings",
];

export function getGatewayUrl() {
  return process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://localhost:4000";
}

export function getClientApiBaseUrl() {
  if (typeof window === "undefined") {
    return getGatewayUrl();
  }
  return "/api/proxy";
}
