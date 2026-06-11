export const LOCATION_CONFIG_ROUTES = {
  base: "/tenants/:tenantId/locations/:locationId/config",
  listNamespaces: "/",
  getByNamespace: "/:namespace",
  updateByNamespace: "/:namespace",
} as const;

export const locationConfigRouteDefinitions = [
  {
    method: "GET" as const,
    path: LOCATION_CONFIG_ROUTES.listNamespaces,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "listNamespaces",
  },
  {
    method: "GET" as const,
    path: LOCATION_CONFIG_ROUTES.getByNamespace,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "getConfig",
  },
  {
    method: "PUT" as const,
    path: LOCATION_CONFIG_ROUTES.updateByNamespace,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "updateConfig",
  },
];
