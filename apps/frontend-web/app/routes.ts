/**
 * Re-exports the portal route map for app-layer imports.
 * Canonical definitions live in `@/lib/routes`.
 */
export {
  adminRoutes,
  canAccessPortalNamespace,
  getPortalNamespaceForRole,
  getPortalNamespaceFromPath,
  getRoutesForRole,
  isPathAllowlistedForPortal,
  normalizePortalRouteRole,
  PORTAL_NAMESPACE,
  routes,
  staffRoutes,
  therapistRoutes,
  type PortalRouteRole,
} from "@/lib/routes";
