import { createProxyRouteHandlers } from "@/lib/create-proxy-route";

export const { GET, POST, PUT, PATCH, DELETE } = createProxyRouteHandlers(
  "superAdminOrganization",
  "Super Admin Organization",
);
