import { createTenantMiddleware } from "@ordella/middleware";
import { SKIP_TENANT_PATHS } from "@/constants";

/**
 * Resolves tenant context from JWT, headers, or domain (placeholder).
 * Domain-based tenant resolution can be wired here when subdomain routing is enabled.
 */
export const TenantContextMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: SKIP_TENANT_PATHS,
});

export function resolveTenantFromDomain(_host: string | undefined): string | undefined {
  // Placeholder for subdomain-based tenant resolution (e.g. acme.ordella.app)
  return undefined;
}
