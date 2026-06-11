import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import {
  getOrganizationConfigHandler,
  listOrganizationConfigNamespacesHandler,
  updateOrganizationConfigHandler,
} from "@/routes/organization-config.handlers";

export function registerOrganizationConfigRoutes(
  router: Router,
  handlers: {
    listNamespaces: RequestHandler;
    getConfig: RequestHandler;
    updateConfig: RequestHandler;
  } = {
    listNamespaces: listOrganizationConfigNamespacesHandler as RequestHandler,
    getConfig: getOrganizationConfigHandler as RequestHandler,
    updateConfig: updateOrganizationConfigHandler as RequestHandler,
  },
): Router {
  router.get(
    "/:orgId/config",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.listNamespaces,
  );

  router.get(
    "/:orgId/config/:namespace",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.getConfig,
  );

  router.put(
    "/:orgId/config/:namespace",
    authMiddleware,
    requirePermission(PERMISSIONS.ORGANIZATION_MANAGE),
    handlers.updateConfig,
  );

  return router;
}
