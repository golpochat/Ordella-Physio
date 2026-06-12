import { Router } from "express";
import type { RequestHandler } from "express";
import { PERMISSIONS } from "@ordella/security";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

export const FILE_ROUTES = {
  base: "/files",
  health: "/files/health",
  access: "/files/access",
  internal: "/files/internal",
} as const;

export function registerFileRoutes(
  router: Router,
  handlers: {
    uploadFile: RequestHandler;
    listFiles: RequestHandler;
    getFileMetadata: RequestHandler;
    getFileAccessUrl: RequestHandler;
    accessByToken: RequestHandler;
    softDeleteFile: RequestHandler;
    hardDeleteFile: RequestHandler;
    generateThumbnail: RequestHandler;
    getFileVersions: RequestHandler;
  },
): Router {
  router.get("/access", handlers.accessByToken);

  router.post("/", authMiddleware, requirePermission(PERMISSIONS.FILES_UPLOAD), handlers.uploadFile);

  router.get("/", authMiddleware, requirePermission(PERMISSIONS.FILES_VIEW), handlers.listFiles);

  router.delete(
    "/:id/hard",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_DELETE_HARD),
    handlers.hardDeleteFile,
  );

  router.post(
    "/:id/thumbnail",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_GENERATE_THUMBNAIL),
    handlers.generateThumbnail,
  );

  router.get(
    "/:id/versions",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_VIEW),
    handlers.getFileVersions,
  );

  router.delete(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_DELETE),
    handlers.softDeleteFile,
  );

  router.get(
    "/:id/access-url",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_VIEW),
    handlers.getFileAccessUrl,
  );

  router.get(
    "/:id",
    authMiddleware,
    requirePermission(PERMISSIONS.FILES_VIEW),
    handlers.getFileMetadata,
  );

  return router;
}
