"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createUserRoleApi } from "@/lib/user-role-api";
import type {
  ClinicRoleListFilters,
  CreateClinicRolePayload,
  UpdateClinicRolePayload,
} from "@/lib/user-role-portal-types";

export function useUserRoleApi() {
  const api = useApi();
  return useMemo(() => createUserRoleApi(api), [api]);
}

function requireUserRoleApi(api: ReturnType<typeof createUserRoleApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useClinicRolesList(filters: ClinicRoleListFilters = {}) {
  const userRoleApi = useUserRoleApi();

  return useQuery({
    queryKey: ["clinic", "roles", "list", filters],
    queryFn: () => requireUserRoleApi(userRoleApi).listRoles(filters),
    enabled: Boolean(userRoleApi),
  });
}

export function useClinicPermissionsList() {
  const userRoleApi = useUserRoleApi();

  return useQuery({
    queryKey: ["clinic", "roles", "permissions"],
    queryFn: () => requireUserRoleApi(userRoleApi).listPermissions(),
    enabled: Boolean(userRoleApi),
  });
}

export function useCreateClinicRole() {
  const userRoleApi = useUserRoleApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicRolePayload) =>
      requireUserRoleApi(userRoleApi).createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "roles"] });
    },
  });
}

export function useClinicRole(roleId: string) {
  const userRoleApi = useUserRoleApi();

  return useQuery({
    queryKey: ["clinic", "roles", roleId],
    queryFn: () => requireUserRoleApi(userRoleApi).getRole(roleId),
    enabled: Boolean(userRoleApi && roleId),
  });
}

export function useUpdateClinicRole(roleId: string) {
  const userRoleApi = useUserRoleApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicRolePayload) =>
      requireUserRoleApi(userRoleApi).updateRole(roleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "roles"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "roles", roleId] });
    },
  });
}

export function useDeleteClinicRole(roleId: string) {
  const userRoleApi = useUserRoleApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireUserRoleApi(userRoleApi).deleteRole(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "roles"] });
      queryClient.removeQueries({ queryKey: ["clinic", "roles", roleId] });
    },
  });
}
