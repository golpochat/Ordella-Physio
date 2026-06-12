"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createClinicStaffMemberApi } from "@/lib/clinic-staff-member-api";
import type {
  ClinicStaffConfigNamespace,
  ClinicStaffListFilters,
  CreateClinicStaffMemberPayload,
  UpdateClinicStaffMemberPayload,
} from "@/lib/clinic-staff-member-types";

export function useClinicStaffMemberApi() {
  const api = useApi();
  return useMemo(() => createClinicStaffMemberApi(api), [api]);
}

function requireStaffMemberApi(api: ReturnType<typeof createClinicStaffMemberApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useClinicStaffMembersList(filters: ClinicStaffListFilters = {}) {
  const staffMemberApi = useClinicStaffMemberApi();

  return useQuery({
    queryKey: ["clinic", "staff-members", "list", filters],
    queryFn: () => requireStaffMemberApi(staffMemberApi).listStaffMembers(filters),
    enabled: Boolean(staffMemberApi),
  });
}

export function useClinicStaffMemberDetail(staffId: string) {
  const staffMemberApi = useClinicStaffMemberApi();

  return useQuery({
    queryKey: ["clinic", "staff-members", staffId],
    queryFn: () => requireStaffMemberApi(staffMemberApi).getStaffMember(staffId),
    enabled: Boolean(staffMemberApi && staffId),
  });
}

export function useCreateClinicStaffMember() {
  const staffMemberApi = useClinicStaffMemberApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicStaffMemberPayload) =>
      requireStaffMemberApi(staffMemberApi).createStaffMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members"] });
    },
  });
}

export function useUpdateClinicStaffMember(staffId: string) {
  const staffMemberApi = useClinicStaffMemberApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicStaffMemberPayload) =>
      requireStaffMemberApi(staffMemberApi).updateStaffMember(staffId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members", staffId] });
    },
  });
}

export function useDeactivateClinicStaffMember(staffId: string) {
  const staffMemberApi = useClinicStaffMemberApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireStaffMemberApi(staffMemberApi).deactivateStaffMember(staffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members", staffId] });
    },
  });
}

export function useActivateClinicStaffMember(staffId: string) {
  const staffMemberApi = useClinicStaffMemberApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireStaffMemberApi(staffMemberApi).activateStaffMember(staffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff-members", staffId] });
    },
  });
}

export function useClinicStaffConfigNamespaces(staffId: string) {
  const staffMemberApi = useClinicStaffMemberApi();

  return useQuery({
    queryKey: ["clinic", "staff-members", staffId, "config", "namespaces"],
    queryFn: () => requireStaffMemberApi(staffMemberApi).listStaffConfigNamespaces(staffId),
    enabled: Boolean(staffMemberApi && staffId),
  });
}

export function useClinicStaffConfig(staffId: string, namespace: ClinicStaffConfigNamespace) {
  const staffMemberApi = useClinicStaffMemberApi();

  return useQuery({
    queryKey: ["clinic", "staff-members", staffId, "config", namespace],
    queryFn: () => requireStaffMemberApi(staffMemberApi).getStaffConfig(staffId, namespace),
    enabled: Boolean(staffMemberApi && staffId && namespace),
  });
}

export function useUpdateClinicStaffConfig(staffId: string, namespace: ClinicStaffConfigNamespace) {
  const staffMemberApi = useClinicStaffMemberApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) =>
      requireStaffMemberApi(staffMemberApi).updateStaffConfig(staffId, namespace, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinic", "staff-members", staffId, "config"],
      });
    },
  });
}
