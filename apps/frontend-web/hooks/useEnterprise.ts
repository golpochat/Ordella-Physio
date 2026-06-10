"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createApiClient } from "@/lib/api-client";
import { createEnterpriseApi } from "@/lib/enterprise-api";
import { useAuthStore } from "@/store/auth.store";

function useEnterpriseApi() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const tenantId = useAuthStore((s) => s.user?.tenantId);

  return useMemo(
    () =>
      createEnterpriseApi(
        createApiClient(() => ({
          accessToken,
          tenantId,
        })),
      ),
    [accessToken, tenantId],
  );
}

export function useEnterpriseSso() {
  const api = useEnterpriseApi();
  return useQuery({ queryKey: ["enterprise", "sso"], queryFn: () => api.listSso() });
}

export function useUpsertSso() {
  const api = useEnterpriseApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.upsertSso(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["enterprise", "sso"] }),
  });
}

export function useEnterpriseRoles() {
  const api = useEnterpriseApi();
  return useQuery({ queryKey: ["enterprise", "roles"], queryFn: () => api.listRoles() });
}

export function useCreateEnterpriseRole() {
  const api = useEnterpriseApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createRole(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["enterprise", "roles"] }),
  });
}

export function useAuditLogs(global = false, action?: string) {
  const api = useEnterpriseApi();
  return useQuery({
    queryKey: ["enterprise", "audit-logs", global, action],
    queryFn: () => (global ? api.listGlobalAuditLogs(action) : api.listAuditLogs(action)),
  });
}

export function useActivityLogs(global = false, eventType?: string) {
  const api = useEnterpriseApi();
  return useQuery({
    queryKey: ["enterprise", "activity-logs", global, eventType],
    queryFn: () => (global ? api.listGlobalActivityLogs(eventType) : api.listActivityLogs(eventType)),
  });
}

export function useEnterpriseApiKeys() {
  const api = useEnterpriseApi();
  return useQuery({ queryKey: ["enterprise", "api-keys"], queryFn: () => api.listApiKeys() });
}

export function useCreateApiKey() {
  const api = useEnterpriseApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; scopes: string[] }) => api.createApiKey(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["enterprise", "api-keys"] }),
  });
}

export function useRevokeApiKey() {
  const api = useEnterpriseApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (apiKeyId: string) => api.revokeApiKey(apiKeyId),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["enterprise", "api-keys"] }),
  });
}

export function useEnterpriseWebhooks() {
  const api = useEnterpriseApi();
  return useQuery({ queryKey: ["enterprise", "webhooks"], queryFn: () => api.listWebhooks() });
}

export function useCreateWebhook() {
  const api = useEnterpriseApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createWebhook(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["enterprise", "webhooks"] }),
  });
}
