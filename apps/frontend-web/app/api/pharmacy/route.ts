import { createProxyRouteHandlers } from "@/lib/create-proxy-route";

export const { GET, POST, PUT, PATCH, DELETE } = createProxyRouteHandlers("pharmacy", "Pharmacy");
