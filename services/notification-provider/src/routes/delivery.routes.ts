import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const DELIVERY_ROUTES = {
  base: "/deliver",
} as const;

export function registerDeliveryRoutes(
  router: Router,
  handlers: {
    deliver: RequestHandler;
  },
): Router {
  router.post(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.NOTIFICATION_SEND),
    handlers.deliver,
  );

  return router;
}
