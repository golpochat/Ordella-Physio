import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const DELIVERY_LOG_ROUTES = {
  base: "/delivery-logs",
} as const;

export function registerDeliveryLogRoutes(
  router: Router,
  handlers: {
    listDeliveryLogs: RequestHandler;
    getDeliveryLog: RequestHandler;
  },
): Router {
  router.get(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_LOGS_VIEW),
    handlers.listDeliveryLogs,
  );

  router.get(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_LOGS_VIEW),
    handlers.getDeliveryLog,
  );

  return router;
}
