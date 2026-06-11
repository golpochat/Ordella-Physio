import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import {
  activateOrganizationHandler,
  assignTenantToOrganizationHandler,
  createOrganizationHandler,
  deactivateOrganizationHandler,
  getOrganizationHandler,
  listOrganizationTenantsHandler,
  listOrganizationsHandler,
  listUnassignedOrganizationTenantsHandler,
  removeTenantFromOrganizationHandler,
  updateOrganizationHandler,
} from "@/routes/organization.handlers";
export const ORGANIZATION_ROUTES = {
  base: "/organizations",
  health: "/organizations/health",
} as const;

export function registerOrganizationRoutes(
  router: Router,
  handlers: {
    createOrganization: RequestHandler;
    listOrganizations: RequestHandler;
    getOrganization: RequestHandler;
    updateOrganization: RequestHandler;
    deactivateOrganization: RequestHandler;
    activateOrganization: RequestHandler;
    listOrganizationTenants: RequestHandler;
    listUnassignedOrganizationTenants: RequestHandler;
    assignTenantToOrganization: RequestHandler;
    removeTenantFromOrganization: RequestHandler;
  } = {
    createOrganization: createOrganizationHandler as RequestHandler,
    listOrganizations: listOrganizationsHandler as RequestHandler,
    getOrganization: getOrganizationHandler as RequestHandler,
    updateOrganization: updateOrganizationHandler as RequestHandler,
    deactivateOrganization: deactivateOrganizationHandler as RequestHandler,
    activateOrganization: activateOrganizationHandler as RequestHandler,
    listOrganizationTenants: listOrganizationTenantsHandler as RequestHandler,
    listUnassignedOrganizationTenants: listUnassignedOrganizationTenantsHandler as RequestHandler,
    assignTenantToOrganization: assignTenantToOrganizationHandler as RequestHandler,
    removeTenantFromOrganization: removeTenantFromOrganizationHandler as RequestHandler,
  },
): Router {
  router.post(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.createOrganization,
  );

  router.get(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.listOrganizations,
  );

  router.get(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.getOrganization,
  );

  router.put(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.updateOrganization,
  );

  router.post(
    "/:id/deactivate",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.deactivateOrganization,
  );

  router.post(
    "/:id/activate",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.activateOrganization,
  );

  router.get(
    "/:orgId/tenants/unassigned",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.listUnassignedOrganizationTenants,
  );

  router.get(
    "/:orgId/tenants",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.listOrganizationTenants,
  );

  router.post(
    "/:orgId/tenants/:tenantId/assign",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.assignTenantToOrganization,
  );

  router.post(
    "/:orgId/tenants/:tenantId/remove",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.removeTenantFromOrganization,
  );

  return router;
}
