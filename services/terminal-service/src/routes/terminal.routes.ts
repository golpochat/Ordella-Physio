import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const TERMINAL_ROUTES = {
  base: "/terminals",
  health: "/terminals/health",
} as const;

export function registerTerminalRoutes(
  router: Router,
  handlers: {
    listTerminals: RequestHandler;
    createTerminal: RequestHandler;
    updateTerminal: RequestHandler;
    deactivateTerminal: RequestHandler;
    activateTerminal: RequestHandler;
  },
): Router {
  router.get(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.TERMINAL_MANAGE),
    handlers.listTerminals,
  );

  router.post(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.TERMINAL_MANAGE),
    handlers.createTerminal,
  );

  router.put(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.TERMINAL_MANAGE),
    handlers.updateTerminal,
  );

  router.post(
    "/:id/deactivate",
    authMiddleware,
    requirePermission(PERMISSIONS.TERMINAL_MANAGE),
    handlers.deactivateTerminal,
  );

  router.post(
    "/:id/activate",
    authMiddleware,
    requirePermission(PERMISSIONS.TERMINAL_MANAGE),
    handlers.activateTerminal,
  );

  return router;
}
