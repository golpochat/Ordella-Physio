export const LOCATION_ROUTES = {
  base: "/tenants/:tenantId/locations",
  create: "/",
  list: "/",
  getById: "/:id",
  update: "/:id",
  deactivate: "/:id/deactivate",
  activate: "/:id/activate",
} as const;

/**
 * Route registration metadata for location endpoints.
 * NestJS handlers live in location.controller.ts.
 */
export const locationRouteDefinitions = [
  {
    method: "POST" as const,
    path: LOCATION_ROUTES.create,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "createLocation",
  },
  {
    method: "GET" as const,
    path: LOCATION_ROUTES.list,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "listLocations",
  },
  {
    method: "GET" as const,
    path: LOCATION_ROUTES.getById,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "getLocation",
  },
  {
    method: "PUT" as const,
    path: LOCATION_ROUTES.update,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "updateLocation",
  },
  {
    method: "POST" as const,
    path: LOCATION_ROUTES.deactivate,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "deactivateLocation",
  },
  {
    method: "POST" as const,
    path: LOCATION_ROUTES.activate,
    middleware: ["authMiddleware", "requirePermission(location.manage)"],
    handler: "activateLocation",
  },
];
