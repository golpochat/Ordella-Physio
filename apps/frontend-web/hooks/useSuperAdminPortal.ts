"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createSuperAdminPortalApi,
  normalizeTenantList,
  normalizeUserList,
} from "@/lib/super-admin-portal-api";
import type {
  CreatePlatformRolePayload,
  CreatePlatformTenantPayload,
  CreatePlatformUserPayload,
  UpdatePlatformProfilePayload,
  UpdatePlatformRolePayload,
  UpdatePlatformSettingsPayload,
  UpdatePlatformTenantPayload,
  UpdatePlatformUserPayload,
} from "@/lib/super-admin-portal-types";
import { useAuthStore } from "@/store/auth.store";

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

export function useCreatePlatformTenant() {
  const portalApi = useSuperAdminPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlatformTenantPayload) =>
      requireApi(portalApi).createTenant(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["super-admin", "tenants"] }),
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
        ? requireApi(portalApi).activateTenant(id)
        : requireApi(portalApi).deactivateTenant(id),
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
    onSuccess: (profile) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "profile"] });
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
          user: {
            ...user,
            email: profile.email ?? user.email,
            firstName: profile.firstName ?? user.firstName,
            lastName: profile.lastName ?? user.lastName,
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
