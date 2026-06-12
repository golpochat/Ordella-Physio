import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const PROVIDER_ROUTES = {
  base: "/providers",
} as const;

export function registerProviderRoutes(
  router: Router,
  handlers: {
    createProvider: RequestHandler;
    listProviders: RequestHandler;
    updateProvider: RequestHandler;
  },
): Router {
  router.post(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_PROVIDERS_MANAGE),
    handlers.createProvider,
  );

  router.get(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_PROVIDERS_VIEW),
    handlers.listProviders,
  );

  router.patch(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_PROVIDERS_MANAGE),
    handlers.updateProvider,
  );

  return router;
}
