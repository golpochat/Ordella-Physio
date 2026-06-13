"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { AuditAction } from "@/lib/security-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useAuditLogs(filters?: {
  action?: AuditAction;
  modelId?: string;
  userId?: string;
  piiDetected?: boolean;
}) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-security", "audit", filters ?? {}],
    queryFn: () => requireAiApi(aiApi).searchAuditLogs(filters),
  });
}

export function useExportAuditLogs() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-security", "audit", "export"],
    queryFn: () => requireAiApi(aiApi).exportAuditLogs(),
    enabled: false,
  });
}

export function useComplianceExport() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-security", "compliance", "export"],
    queryFn: () => requireAiApi(aiApi).exportComplianceReport(),
    enabled: false,
  });
}

export function useAccessPolicies() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-security", "policies"],
    queryFn: () => requireAiApi(aiApi).listAccessPolicies(),
  });
}

export function useAssignAccessPolicy() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { modelId: string; allowedRoles: string[]; allowedUsers?: string[] }) =>
      requireAiApi(aiApi).assignAccessPolicy(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-security", "policies"] }),
  });
}

export function useRevokeAccessPolicy() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).revokeAccessPolicy(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-security", "policies"] }),
  });
}

export function usePiiIncidents(unresolvedOnly = false) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-security", "pii", unresolvedOnly ? "unresolved" : "all"],
    queryFn: () => requireAiApi(aiApi).listPiiIncidents(unresolvedOnly),
  });
}

export function useResolvePiiIncident() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).resolvePiiIncident(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-security", "pii"] }),
  });
}
