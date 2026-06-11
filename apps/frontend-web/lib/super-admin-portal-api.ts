import type { createApiClient } from "@/lib/api-client";
import type { UpdateUserProfileResponse } from "@/lib/clinic-portal-types";
import type { ApiServiceKey } from "@/lib/constants";
import type {
  CreatePlatformRolePayload,
  CreatePlatformTenantPayload,
  CreatePlatformTenantResponse,
  CreatePlatformUserPayload,
  PlatformProfile,
  PlatformRole,
  PlatformSettings,
  PlatformTenant,
  PlatformUser,
  ServiceHealthStatus,
  UpdatePlatformProfilePayload,
  UpdatePlatformRolePayload,
  UpdatePlatformSettingsPayload,
  UpdatePlatformTenantPayload,
  UpdatePlatformTenantResponse,
  TenantStatusChangeResponse,
  PlatformTenantBillingSettings,
  UpdatePlatformTenantBillingPayload,
  UpdatePlatformTenantBillingResponse,
  PlatformTenantLocalization,
  UpdatePlatformTenantLocalizationPayload,
  UpdatePlatformTenantLocalizationResponse,
  PlatformTenantDomain,
  CreatePlatformTenantDomainPayload,
  CreatePlatformTenantDomainResponse,
  VerifyPlatformTenantDomainResponse,
  PlatformTenantConfigNamespace,
  PlatformTenantConfigRecord,
  PlatformTenantConfigNamespacesResponse,
  UpdatePlatformTenantConfigResponse,
  UpdatePlatformUserPayload,
  AuthAuditLogListResponse,
  AuthAuditLogFilters,
  CreatePlatformOrganizationPayload,
  CreatePlatformOrganizationResponse,
  PlatformOrganization,
  UpdatePlatformOrganizationPayload,
  UpdatePlatformOrganizationResponse,
  OrganizationStatusChangeResponse,
  OrganizationLinkedTenant,
  OrganizationTenantListResponse,
  OrganizationTenantLinkResponse,
  PlatformOrganizationConfigNamespace,
  PlatformOrganizationConfigRecord,
  PlatformOrganizationConfigNamespacesResponse,
  UpdatePlatformOrganizationConfigResponse,
  OrganizationListFilters,
  PlatformOrganizationListResponse,
} from "@/lib/super-admin-portal-types";
import { BUILTIN_PLATFORM_ROLES } from "@/lib/super-admin-portal-utils";

export type SuperAdminApiClient = ReturnType<typeof createApiClient>;

const GLOBAL_CONTEXT = { tenantId: null as string | null };

export function normalizeTenantList(
  response: PlatformTenant[] | { data: PlatformTenant[] } | undefined,
): PlatformTenant[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function normalizeUserList(
  response: PlatformUser[] | { data: PlatformUser[] } | undefined,
): PlatformUser[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function normalizeOrganizationList(
  response:
    | PlatformOrganization[]
    | PlatformOrganizationListResponse
    | { data: PlatformOrganization[] }
    | undefined,
): PlatformOrganizationListResponse {
  if (!response) {
    return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } };
  }

  if (Array.isArray(response)) {
    return {
      data: response,
      pagination: {
        page: 1,
        limit: response.length,
        total: response.length,
        totalPages: response.length > 0 ? 1 : 0,
      },
    };
  }

  if ("pagination" in response && response.pagination) {
    return {
      data: response.data ?? [],
      pagination: response.pagination,
    };
  }

  const data = response.data ?? [];
  return {
    data,
    pagination: {
      page: 1,
      limit: data.length,
      total: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    },
  };
}

export function createSuperAdminPortalApi(api: SuperAdminApiClient) {
  return {
    listTenants(params?: { page?: number; limit?: number }) {
      return api.get<PlatformTenant[] | { data: PlatformTenant[] }>("tenant", "", {
        params,
        context: GLOBAL_CONTEXT,
      });
    },

    getTenant(id: string) {
      return api.get<PlatformTenant>("tenant", `/${id}`, { context: GLOBAL_CONTEXT });
    },

    getTenantBillingSettings(tenantId: string) {
      return api.get<PlatformTenantBillingSettings | null>("tenant", `/${tenantId}/billing`, {
        context: GLOBAL_CONTEXT,
      });
    },

    getTenantLocalization(tenantId: string) {
      return api.get<PlatformTenantLocalization>("tenant", `/${tenantId}/localization`, {
        context: GLOBAL_CONTEXT,
      });
    },

    listTenantConfigNamespaces(tenantId: string) {
      return api.get<PlatformTenantConfigNamespacesResponse>("tenant", `/${tenantId}/config`, {
        context: GLOBAL_CONTEXT,
      });
    },

    getTenantConfig(tenantId: string, namespace: PlatformTenantConfigNamespace) {
      return api.get<PlatformTenantConfigRecord>("tenant", `/${tenantId}/config/${namespace}`, {
        context: GLOBAL_CONTEXT,
      });
    },

    async updateTenantConfig(
      tenantId: string,
      namespace: PlatformTenantConfigNamespace,
      data: Record<string, unknown>,
    ) {
      const response = await api.put<UpdatePlatformTenantConfigResponse | PlatformTenantConfigRecord>(
        "tenant",
        `/${tenantId}/config/${namespace}`,
        { data },
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "config" in response) {
        return response.config;
      }

      return response as PlatformTenantConfigRecord;
    },

    listTenantDomains(tenantId: string) {
      return api.get<PlatformTenantDomain[]>("tenant", `/${tenantId}/domains`, {
        context: GLOBAL_CONTEXT,
      });
    },

    async createTenantDomain(tenantId: string, payload: CreatePlatformTenantDomainPayload) {
      const response = await api.post<CreatePlatformTenantDomainResponse | PlatformTenantDomain>(
        "tenant",
        `/${tenantId}/domains`,
        payload,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "domain" in response) {
        return response;
      }

      return {
        domain: response as PlatformTenantDomain,
        message: "Domain added successfully.",
      };
    },

    async verifyTenantDomain(tenantId: string, domainId: string) {
      const response = await api.post<VerifyPlatformTenantDomainResponse | PlatformTenantDomain>(
        "tenant",
        `/${tenantId}/domains/${domainId}/verify`,
        {},
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "domain" in response) {
        return response.domain;
      }

      return response as PlatformTenantDomain;
    },

    deleteTenantDomain(tenantId: string, domainId: string) {
      return api.delete<{ message: string }>("tenant", `/${tenantId}/domains/${domainId}`, {
        context: GLOBAL_CONTEXT,
      });
    },

    async updateTenantLocalization(
      tenantId: string,
      payload: UpdatePlatformTenantLocalizationPayload,
    ) {
      const response = await api.put<
        UpdatePlatformTenantLocalizationResponse | PlatformTenantLocalization
      >("tenant", `/${tenantId}/localization`, payload, { context: GLOBAL_CONTEXT });

      if (response && typeof response === "object" && "localization" in response) {
        return response.localization;
      }

      return response as PlatformTenantLocalization;
    },

    async updateTenantBillingSettings(
      tenantId: string,
      payload: UpdatePlatformTenantBillingPayload,
    ) {
      const response = await api.put<UpdatePlatformTenantBillingResponse | PlatformTenantBillingSettings>(
        "tenant",
        `/${tenantId}/billing`,
        payload,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "billingSettings" in response) {
        return response.billingSettings;
      }

      return response as PlatformTenantBillingSettings;
    },

    async createTenant(payload: CreatePlatformTenantPayload) {
      const response = await api.post<CreatePlatformTenantResponse | PlatformTenant>("tenant", "", payload, {
        context: GLOBAL_CONTEXT,
      });

      if (response && typeof response === "object" && "tenant" in response) {
        return response.tenant;
      }

      return response as PlatformTenant;
    },

    listOrganizations(params?: OrganizationListFilters) {
      return api.get<PlatformOrganizationListResponse | PlatformOrganization[]>("organization", "", {
        params,
        context: GLOBAL_CONTEXT,
      });
    },

    async createOrganization(payload: CreatePlatformOrganizationPayload) {
      const response = await api.post<CreatePlatformOrganizationResponse | PlatformOrganization>(
        "organization",
        "",
        payload,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "organization" in response) {
        return response;
      }

      return {
        organization: response as PlatformOrganization,
        message: "Organization created successfully.",
      };
    },

    getOrganization(id: string) {
      return api.get<PlatformOrganization>("organization", `/${id}`, { context: GLOBAL_CONTEXT });
    },

    async updateOrganization(id: string, payload: UpdatePlatformOrganizationPayload) {
      const response = await api.put<UpdatePlatformOrganizationResponse | PlatformOrganization>(
        "organization",
        `/${id}`,
        payload,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "organization" in response) {
        return response;
      }

      return {
        organization: response as PlatformOrganization,
        message: "Organization updated successfully.",
      };
    },

    async deactivateOrganization(id: string) {
      const response = await api.post<OrganizationStatusChangeResponse>(
        "organization",
        `/${id}/deactivate`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );

      return response;
    },

    async activateOrganization(id: string) {
      const response = await api.post<OrganizationStatusChangeResponse>(
        "organization",
        `/${id}/activate`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );

      return response;
    },

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

    listOrganizationConfigNamespaces(orgId: string) {
      return api.get<PlatformOrganizationConfigNamespacesResponse>(
        "organization",
        `/${orgId}/config`,
        { context: GLOBAL_CONTEXT },
      );
    },

    getOrganizationConfig(orgId: string, namespace: PlatformOrganizationConfigNamespace) {
      return api.get<PlatformOrganizationConfigRecord>(
        "organization",
        `/${orgId}/config/${namespace}`,
        { context: GLOBAL_CONTEXT },
      );
    },

    async updateOrganizationConfig(
      orgId: string,
      namespace: PlatformOrganizationConfigNamespace,
      data: Record<string, unknown>,
    ) {
      const response = await api.put<
        UpdatePlatformOrganizationConfigResponse | PlatformOrganizationConfigRecord
      >("organization", `/${orgId}/config/${namespace}`, { data }, { context: GLOBAL_CONTEXT });

      if (response && typeof response === "object" && "config" in response) {
        return response.config;
      }

      return response as PlatformOrganizationConfigRecord;
    },

    async updateTenant(id: string, payload: UpdatePlatformTenantPayload) {
      const response = await api.put<UpdatePlatformTenantResponse | PlatformTenant>("tenant", `/${id}`, payload, {
        context: GLOBAL_CONTEXT,
      });

      if (response && typeof response === "object" && "tenant" in response) {
        return response.tenant;
      }

      return response as PlatformTenant;
    },

    async suspendTenant(id: string) {
      const response = await api.post<TenantStatusChangeResponse | PlatformTenant>(
        "tenant",
        `/${id}/suspend`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "tenant" in response) {
        return response.tenant;
      }

      return response as PlatformTenant;
    },

    async reactivateTenant(id: string) {
      const response = await api.post<TenantStatusChangeResponse | PlatformTenant>(
        "tenant",
        `/${id}/reactivate`,
        undefined,
        { context: GLOBAL_CONTEXT },
      );

      if (response && typeof response === "object" && "tenant" in response) {
        return response.tenant;
      }

      return response as PlatformTenant;
    },

    activateTenant(id: string) {
      return this.reactivateTenant(id);
    },

    deactivateTenant(id: string) {
      return this.suspendTenant(id);
    },

    async deleteTenant(id: string) {
      return this.suspendTenant(id);
    },

    async listUsers(params?: { page?: number; limit?: number }) {
      try {
        return await api.get<PlatformUser[] | { data: PlatformUser[] }>("auth", "/users", {
          params,
          context: GLOBAL_CONTEXT,
        });
      } catch {
        const tenants = normalizeTenantList(await this.listTenants({ limit: 100 }));
        const users: PlatformUser[] = [];

        for (const tenant of tenants) {
          try {
            const staff = await api.get<
              Array<{ userId: string; role: string; tenantId: string; createdAt: string }>
            >("tenant", `/${tenant.id}/staff`, { context: { tenantId: tenant.id } });

            for (const member of staff ?? []) {
              users.push({
                id: member.userId,
                tenantId: member.tenantId ?? tenant.id,
                role: member.role,
                createdAt: member.createdAt,
              });
            }
          } catch {
            // Skip tenants without staff access
          }
        }

        return users;
      }
    },

    getUser(id: string, tenantId?: string) {
      return api
        .get<PlatformUser>("auth", `/users/${id}`, {
          context: tenantId ? { tenantId } : GLOBAL_CONTEXT,
        })
        .catch(async () => {
          const users = normalizeUserList(await this.listUsers());
          return users.find((user) => user.id === id) ?? null;
        });
    },

    createUser(payload: CreatePlatformUserPayload) {
      const { tenantId, email, password, role } = payload;
      return api.post<{ user: PlatformUser; message: string }>(
        "auth",
        "/users",
        {
          email,
          password,
          role,
          firstName: email.split("@")[0] ?? "User",
          lastName: "Account",
        },
        { context: { tenantId } },
      );
    },

    updateUser(id: string, payload: UpdatePlatformUserPayload, tenantId?: string) {
      return api.put<{ user: PlatformUser; message: string }>("auth", `/users/${id}`, payload, {
        context: tenantId ? { tenantId } : GLOBAL_CONTEXT,
      });
    },

    deleteUser(id: string, tenantId?: string) {
      return api.delete<void>("auth", `/users/${id}`, {
        context: tenantId ? { tenantId } : GLOBAL_CONTEXT,
      });
    },

    async listRoles() {
      return BUILTIN_PLATFORM_ROLES;
    },

    async getRole(id: string) {
      try {
        return await api.get<PlatformRole>("auth", `/roles/${id}`, { context: GLOBAL_CONTEXT });
      } catch {
        return BUILTIN_PLATFORM_ROLES.find((role) => role.id === id) ?? null;
      }
    },

    createRole(payload: CreatePlatformRolePayload) {
      return api.post<PlatformRole>("auth", "/roles", payload, { context: GLOBAL_CONTEXT });
    },

    updateRole(id: string, payload: UpdatePlatformRolePayload) {
      return api.patch<PlatformRole>("auth", `/roles/${id}`, payload, { context: GLOBAL_CONTEXT });
    },

    deleteRole(id: string) {
      return api.delete<void>("auth", `/roles/${id}`, { context: GLOBAL_CONTEXT });
    },

    getBillingOverview() {
      return Promise.resolve([]);
    },

    getReportingOverview() {
      return api
        .get<unknown>("reporting", "/overview", { context: GLOBAL_CONTEXT })
        .catch(() => null);
    },

    async getSystemHealth(): Promise<ServiceHealthStatus[]> {
      const checks: Array<{ service: string; path: string; key: ApiServiceKey }> =
        [
          { service: "Auth", path: "/health", key: "auth" },
          { service: "Tenants", path: "/health", key: "tenant" },
          { service: "Patients", path: "/health", key: "patient" },
          { service: "Appointments", path: "/health", key: "appointment" },
          { service: "Billing", path: "/health", key: "billing" },
        ];

      const results = await Promise.all(
        checks.map(async (check) => {
          try {
            const response = await api.get<{ status?: string }>(check.key, check.path, {
              context: GLOBAL_CONTEXT,
            });
            return {
              service: check.service,
              status: response?.status === "ok" ? ("ok" as const) : ("degraded" as const),
            };
          } catch {
            return { service: check.service, status: "unknown" as const };
          }
        }),
      );

      return results;
    },

    getProfile() {
      return api.get<PlatformProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdatePlatformProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },

    getSettings() {
      return api
        .get<PlatformSettings>("auth", "/settings", { context: GLOBAL_CONTEXT })
        .catch(() => ({
          platformName: "Ordella Physio",
          supportEmail: "support@ordella.com",
          defaultTimezone: "UTC",
          defaultCurrency: "USD",
          maintenanceMode: false,
        }));
    },

    updateSettings(payload: UpdatePlatformSettingsPayload) {
      return api.patch<PlatformSettings>("auth", "/settings", payload, { context: GLOBAL_CONTEXT });
    },

    listAuditLogs(params?: AuthAuditLogFilters) {
      return api.get<AuthAuditLogListResponse>("auth", "/audit-logs", {
        params,
        context: GLOBAL_CONTEXT,
      });
    },
  };
}
