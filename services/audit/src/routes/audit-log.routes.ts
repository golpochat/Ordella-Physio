import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const AUDIT_LOG_ROUTES = {
  base: "/audit-logs",
  health: "/audit-logs/health",
  export: "/audit-logs/export",
} as const;

export function registerAuditLogRoutes(
  router: Router,
  handlers: {
    listAuditLogs: RequestHandler;
    createAuditLog: RequestHandler;
    exportAuditLogs: RequestHandler;
  },
): Router {
  router.get(
    "/export",
    authMiddleware,
    requirePermission(PERMISSIONS.AUDIT_EXPORT),
    handlers.exportAuditLogs,
  );

  router.get(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.AUDIT_VIEW),
    handlers.listAuditLogs,
  );

  router.post(
    "/",
    authMiddleware,
    requirePermission(PERMISSIONS.AUDIT_WRITE_INTERNAL),
    handlers.createAuditLog,
  );

  return router;
}
