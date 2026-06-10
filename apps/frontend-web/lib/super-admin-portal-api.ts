import type { createApiClient } from "@/lib/api-client";
import type { ApiServiceKey } from "@/lib/constants";
import type {
  CreatePlatformRolePayload,
  CreatePlatformTenantPayload,
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
  UpdatePlatformUserPayload,
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

    createTenant(payload: CreatePlatformTenantPayload) {
      return api.post<PlatformTenant>("tenant", "", payload, { context: GLOBAL_CONTEXT });
    },

    updateTenant(id: string, payload: UpdatePlatformTenantPayload) {
      return api.patch<PlatformTenant>("tenant", `/${id}`, payload, { context: GLOBAL_CONTEXT });
    },

    activateTenant(id: string) {
      return api.patch<PlatformTenant>("tenant", `/${id}/activate`, undefined, {
        context: GLOBAL_CONTEXT,
      });
    },

    deactivateTenant(id: string) {
      return api.patch<PlatformTenant>("tenant", `/${id}/deactivate`, undefined, {
        context: GLOBAL_CONTEXT,
      });
    },

    async deleteTenant(id: string) {
      return this.deactivateTenant(id);
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
      return api.post<{ user: PlatformUser }>(
        "auth",
        "/register",
        { email, password, role },
        { context: { tenantId } },
      );
    },

    updateUser(id: string, payload: UpdatePlatformUserPayload, tenantId?: string) {
      return api.patch<PlatformUser>("auth", `/users/${id}`, payload, {
        context: tenantId ? { tenantId } : GLOBAL_CONTEXT,
      });
    },

    deleteUser(id: string, tenantId?: string) {
      return api.delete<void>("auth", `/users/${id}`, {
        context: tenantId ? { tenantId } : GLOBAL_CONTEXT,
      });
    },

    async listRoles() {
      try {
        const response = await api.get<PlatformRole[] | { data: PlatformRole[] }>("auth", "/roles", {
          context: GLOBAL_CONTEXT,
        });
        const roles = Array.isArray(response) ? response : (response.data ?? []);
        return roles.length ? roles : BUILTIN_PLATFORM_ROLES;
      } catch {
        return BUILTIN_PLATFORM_ROLES;
      }
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
      return api.get<unknown>("billing", "/invoices", { context: GLOBAL_CONTEXT }).catch(() => []);
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
      return api.get<PlatformProfile>("auth", "/me");
    },

    updateProfile(payload: UpdatePlatformProfilePayload) {
      return api.patch<PlatformProfile>("auth", "/me", payload);
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
  };
}
