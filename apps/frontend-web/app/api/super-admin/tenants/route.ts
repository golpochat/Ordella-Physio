import { createProxyRouteHandlers } from "@/lib/create-proxy-route";

export const { GET, POST, PUT, PATCH, DELETE } = createProxyRouteHandlers(
  "superAdminTenant",
  "Super Admin Tenant",
);
