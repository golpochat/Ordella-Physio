"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createSuperAdminPortalApi,
  normalizeTenantList,
  normalizeUserList,
  normalizeOrganizationList,
} from "@/lib/super-admin-portal-api";
import type {
  AuthAuditLogFilters,
  CreatePlatformRolePayload,
  CreatePlatformTenantPayload,
  CreatePlatformUserPayload,
  UpdatePlatformProfilePayload,
  UpdatePlatformRolePayload,
  UpdatePlatformSettingsPayload,
  UpdatePlatformTenantPayload,
  UpdatePlatformTenantBillingPayload,
  UpdatePlatformTenantLocalizationPayload,
  CreatePlatformTenantDomainPayload,
  PlatformTenantConfigNamespace,
  UpdatePlatformUserPayload,
  CreatePlatformOrganizationPayload,
  UpdatePlatformOrganizationPayload,
  OrganizationLinkedTenant,
  OrganizationListFilters,
  PlatformOrganizationConfigNamespace,
} from "@/lib/super-admin-portal-types";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

export function useSuperAdminPortalApi() {
  const api = useApi();
  return useMemo(() => createSuperAdminPortalApi(api), [api]);
}

export function useSuperAdminContext() {
  const user = useAuthStore((state) => state.user);
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Super Admin";

  return { user, displayName, platformTenantId: user?.tenantId ?? null };
}

function requireApi(api: ReturnType<typeof createSuperAdminPortalApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function usePlatformTenants() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants"],
    queryFn: async () => normalizeTenantList(await requireApi(portalApi).listTenants({ limit: 100 })),
  });
}

export function usePlatformTenant(id: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", id],
    queryFn: () => requireApi(portalApi).getTenant(id),
    enabled: Boolean(id),
  });
}

export function usePlatformTenantBilling(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", tenantId, "billing"],
    queryFn: () => requireApi(portalApi).getTenantBillingSettings(tenantId),
    enabled: Boolean(tenantId),
  });
}

export function useUpdatePlatformTenantBilling(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformTenantBillingPayload) =>
      requireApi(portalApi).updateTenantBillingSettings(tenantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "billing"] });
    },
  });
}

export function usePlatformTenantLocalization(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", tenantId, "localization"],
    queryFn: () => requireApi(portalApi).getTenantLocalization(tenantId),
    enabled: Boolean(tenantId),
  });
}

export function useUpdatePlatformTenantLocalization(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformTenantLocalizationPayload) =>
      requireApi(portalApi).updateTenantLocalization(tenantId, payload),
    onSuccess: (localization) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "localization"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId] });
      useTenantStore.getState().setTenantLocalization({
        timezone: localization.timezone,
        currency: localization.currency,
        dateFormat: localization.dateFormat,
        timeFormat: localization.timeFormat,
        numberFormat: localization.numberFormat,
      });
    },
  });
}

export function usePlatformTenantConfigNamespaces(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", tenantId, "config"],
    queryFn: () => requireApi(portalApi).listTenantConfigNamespaces(tenantId),
    enabled: Boolean(tenantId),
  });
}

export function usePlatformTenantConfig(tenantId: string, namespace: PlatformTenantConfigNamespace) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", tenantId, "config", namespace],
    queryFn: () => requireApi(portalApi).getTenantConfig(tenantId, namespace),
    enabled: Boolean(tenantId) && Boolean(namespace),
  });
}

export function useUpdatePlatformTenantConfig(tenantId: string, namespace: PlatformTenantConfigNamespace) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      requireApi(portalApi).updateTenantConfig(tenantId, namespace, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "config"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "config", namespace] });
    },
  });
}

export function usePlatformTenantDomains(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "tenants", tenantId, "domains"],
    queryFn: () => requireApi(portalApi).listTenantDomains(tenantId),
    enabled: Boolean(tenantId),
  });
}

export function useCreatePlatformTenantDomain(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformTenantDomainPayload) =>
      requireApi(portalApi).createTenantDomain(tenantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "domains"] });
    },
  });
}

export function useVerifyPlatformTenantDomain(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (domainId: string) => requireApi(portalApi).verifyTenantDomain(tenantId, domainId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "domains"] });
    },
  });
}

export function useDeletePlatformTenantDomain(tenantId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (domainId: string) => requireApi(portalApi).deleteTenantDomain(tenantId, domainId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", tenantId, "domains"] });
    },
  });
}

export function useCreatePlatformTenant() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformTenantPayload) =>
      requireApi(portalApi).createTenant(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] }),
  });
}

export function usePlatformOrganizations(filters: OrganizationListFilters = {}) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", filters],
    queryFn: async () =>
      normalizeOrganizationList(await requireApi(portalApi).listOrganizations(filters)),
  });
}

export function useCreatePlatformOrganization() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformOrganizationPayload) =>
      requireApi(portalApi).createOrganization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations"] });
    },
  });
}

export function usePlatformOrganization(id: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", id],
    queryFn: () => requireApi(portalApi).getOrganization(id),
    enabled: Boolean(id),
  });
}

export function useUpdatePlatformOrganization(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformOrganizationPayload) =>
      requireApi(portalApi).updateOrganization(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations", id] });
    },
  });
}

export function useDeactivatePlatformOrganization(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(portalApi).deactivateOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations", id] });
    },
  });
}

export function useActivatePlatformOrganization(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(portalApi).activateOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations", id] });
    },
  });
}

function normalizeOrganizationTenantList(
  response:
    | { data: OrganizationLinkedTenant[] }
    | OrganizationLinkedTenant[],
) {
  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
}

export function useOrganizationLinkedTenants(orgId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", orgId, "tenants"],
    queryFn: async () =>
      normalizeOrganizationTenantList(await requireApi(portalApi).listOrganizationTenants(orgId)),
    enabled: Boolean(orgId),
  });
}

export function useUnassignedOrganizationTenants(orgId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", orgId, "tenants", "unassigned"],
    queryFn: async () =>
      normalizeOrganizationTenantList(
        await requireApi(portalApi).listUnassignedOrganizationTenants(orgId),
      ),
    enabled: Boolean(orgId),
  });
}

export function useAssignOrganizationTenant(orgId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) =>
      requireApi(portalApi).assignOrganizationTenant(orgId, tenantId),
    onSuccess: () => {
      invalidateOrganizationTenantQueries(queryClient, orgId);
    },
  });
}

export function useRemoveOrganizationTenant(orgId: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) =>
      requireApi(portalApi).removeOrganizationTenant(orgId, tenantId),
    onSuccess: () => {
      invalidateOrganizationTenantQueries(queryClient, orgId);
    },
  });
}

function invalidateOrganizationTenantQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  orgId: string,
) {
  queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations", orgId, "tenants"] });
}

export function usePlatformOrganizationConfigNamespaces(orgId: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", orgId, "config"],
    queryFn: () => requireApi(portalApi).listOrganizationConfigNamespaces(orgId),
    enabled: Boolean(orgId),
  });
}

export function usePlatformOrganizationConfig(
  orgId: string,
  namespace: PlatformOrganizationConfigNamespace,
) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "organizations", orgId, "config", namespace],
    queryFn: () => requireApi(portalApi).getOrganizationConfig(orgId, namespace),
    enabled: Boolean(orgId) && Boolean(namespace),
  });
}

export function useUpdatePlatformOrganizationConfig(
  orgId: string,
  namespace: PlatformOrganizationConfigNamespace,
) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      requireApi(portalApi).updateOrganizationConfig(orgId, namespace, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "organizations", orgId, "config"] });
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "organizations", orgId, "config", namespace],
      });
    },
  });
}

export function useUpdatePlatformTenant(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformTenantPayload) =>
      requireApi(portalApi).updateTenant(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", id] });
    },
  });
}

export function useDeletePlatformTenant() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(portalApi).deleteTenant(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] }),
  });
}

export function useSetPlatformTenantActive(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isActive: boolean) =>
      isActive
        ? requireApi(portalApi).reactivateTenant(id)
        : requireApi(portalApi).suspendTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", id] });
    },
  });
}

export function useSuspendPlatformTenant(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(portalApi).suspendTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", id] });
    },
  });
}

export function useReactivatePlatformTenant(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(portalApi).reactivateTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants", id] });
    },
  });
}

export function usePlatformUsers() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "users"],
    queryFn: async () => normalizeUserList(await requireApi(portalApi).listUsers({ limit: 100 })),
  });
}

export function usePlatformUser(id: string, tenantId?: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "users", id, tenantId],
    queryFn: () => requireApi(portalApi).getUser(id, tenantId),
    enabled: Boolean(id),
  });
}

export function useCreatePlatformUser() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformUserPayload) => requireApi(portalApi).createUser(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "users"] }),
  });
}

export function useUpdatePlatformUser(id: string, tenantId?: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformUserPayload) =>
      requireApi(portalApi).updateUser(id, payload, tenantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "users", id] });
    },
  });
}

export function useDeletePlatformUser() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tenantId }: { id: string; tenantId?: string }) =>
      requireApi(portalApi).deleteUser(id, tenantId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "users"] }),
  });
}

export function usePlatformRoles() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "roles"],
    queryFn: () => requireApi(portalApi).listRoles(),
  });
}

export function usePlatformRole(id: string) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "roles", id],
    queryFn: () => requireApi(portalApi).getRole(id),
    enabled: Boolean(id),
  });
}

export function useCreatePlatformRole() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformRolePayload) => requireApi(portalApi).createRole(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "roles"] }),
  });
}

export function useUpdatePlatformRole(id: string) {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformRolePayload) =>
      requireApi(portalApi).updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "roles"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin", "roles", id] });
    },
  });
}

export function useDeletePlatformRole() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(portalApi).deleteRole(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "roles"] }),
  });
}

export function usePlatformBilling() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "billing"],
    queryFn: () => requireApi(portalApi).getBillingOverview(),
  });
}

export function usePlatformReporting() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "reports"],
    queryFn: () => requireApi(portalApi).getReportingOverview(),
  });
}

export function usePlatformSystemHealth() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "system"],
    queryFn: () => requireApi(portalApi).getSystemHealth(),
  });
}

export function usePlatformProfile() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "profile"],
    queryFn: () => requireApi(portalApi).getProfile(),
  });
}

export function useUpdatePlatformProfile() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdatePlatformProfilePayload) =>
      requireApi(portalApi).updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "profile"] });
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
          user: {
            ...user,
            email: response.user.email ?? user.email,
            firstName: response.user.firstName ?? user.firstName,
            lastName: response.user.lastName ?? user.lastName,
          },
        });
      }
    },
  });
}

export function usePlatformSettings() {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "settings"],
    queryFn: () => requireApi(portalApi).getSettings(),
  });
}

export function useUpdatePlatformSettings() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlatformSettingsPayload) =>
      requireApi(portalApi).updateSettings(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "settings"] }),
  });
}

export function useAuthAuditLogs(filters: AuthAuditLogFilters) {
  const portalApi = useSuperAdminPortalApi();

  return useQuery({
    queryKey: ["super-admin", "auth-audit-logs", filters],
    queryFn: () => requireApi(portalApi).listAuditLogs(filters),
  });
}
