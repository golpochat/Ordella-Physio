import type { createApiClient } from "@/lib/api-client";
import type {
  OrganizationLinkedTenant,
  OrganizationTenantLinkResponse,
  OrganizationTenantListResponse,
} from "@/lib/super-admin-portal-types";

export type OrganizationPortalApiClient = ReturnType<typeof createApiClient>;

const GLOBAL_CONTEXT = { tenantId: null as string | null };

export function createOrganizationPortalApi(api: OrganizationPortalApiClient) {
  return {
    listOrganizationTenants(orgId: string) {
      return api.get<OrganizationTenantListResponse | OrganizationLinkedTenant[]>(
        "organization",
        `/${orgId}/tenants`,
        { context: GLOBAL_CONTEXT },
      );
    },

    listUnassignedOrganizationTenants(orgId: string) {
      return api.get<OrganizationTenantListResponse | OrganizationLinkedTenant[]>(
        "organization",
        `/${orgId}/tenants/unassigned`,
        { context: GLOBAL_CONTEXT },
      );
    },

    assignOrganizationTenant(orgId: string, tenantId: string) {
      return api.post<OrganizationTenantLinkResponse>(
        "organization",
        `/${orgId}/tenants/${tenantId}/assign`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );
    },

    removeOrganizationTenant(orgId: string, tenantId: string) {
      return api.post<OrganizationTenantLinkResponse>(
        "organization",
        `/${orgId}/tenants/${tenantId}/remove`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );
    },
  };
}
