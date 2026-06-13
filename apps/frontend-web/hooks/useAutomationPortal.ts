"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAiApi } from "@/hooks/useAI";
import type {
  WorkflowDraft,
  WorkflowLiveEventFilters,
  WorkflowRunListFilters,
} from "@/lib/automation-types";

function requireAiApi(api: ReturnType<typeof useAiApi>) {
  if (!api) {
    throw new Error("API client is required");
  }
  return api;
}

export function useAutomationWorkflows() {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "workflows"],
    queryFn: () => requireAiApi(aiApi).listAutomationWorkflows(),
    enabled: Boolean(aiApi),
  });
}

export function useAutomationWorkflow(workflowId: string) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "workflows", workflowId],
    queryFn: () => requireAiApi(aiApi).getAutomationWorkflow(workflowId),
    enabled: Boolean(aiApi && workflowId),
  });
}

export function useCreateAutomationWorkflow() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkflowDraft & { versionLabel?: string }) =>
      requireAiApi(aiApi).createAutomationWorkflow(payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows"] });
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflow-versions", data.id] });
    },
  });
}

export function useUpdateAutomationWorkflow(workflowId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkflowDraft & { versionLabel?: string }) =>
      requireAiApi(aiApi).updateAutomationWorkflow(workflowId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows"] });
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows", workflowId] });
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflow-versions", workflowId] });
    },
  });
}

export function useWorkflowVersions(workflowId: string) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "workflow-versions", workflowId],
    queryFn: () => requireAiApi(aiApi).listWorkflowVersions(workflowId),
    enabled: Boolean(aiApi && workflowId),
  });
}

export function useWorkflowVersionDiff(
  workflowId: string,
  fromVersion: number | null,
  toVersion: number | null,
) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "workflow-version-diff", workflowId, fromVersion, toVersion],
    queryFn: () =>
      requireAiApi(aiApi).diffWorkflowVersions(workflowId, fromVersion!, toVersion!),
    enabled: Boolean(aiApi && workflowId && fromVersion && toVersion && fromVersion !== toVersion),
  });
}

export function useRollbackWorkflowVersion(workflowId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (versionNumber: number) =>
      requireAiApi(aiApi).rollbackWorkflowVersion(workflowId, versionNumber),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows"] });
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows", workflowId] });
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflow-versions", workflowId] });
    },
  });
}

export function useUpdateWorkflowVersionLabel(workflowId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ versionNumber, label }: { versionNumber: number; label: string | null }) =>
      requireAiApi(aiApi).updateWorkflowVersionLabel(workflowId, versionNumber, label),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflow-versions", workflowId] });
    },
  });
}

export function useToggleAutomationWorkflow() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      isActive
        ? requireAiApi(aiApi).enableAutomationWorkflow(id)
        : requireAiApi(aiApi).disableAutomationWorkflow(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["automation", "workflows"] });
    },
  });
}

export function useAutomationWorkflowRuns(filters: WorkflowRunListFilters = {}) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "workflow-runs", filters],
    queryFn: () => requireAiApi(aiApi).listAutomationWorkflowRuns(filters),
    enabled: Boolean(aiApi),
  });
}

export function useAutomationMonitorEvents(filters: WorkflowLiveEventFilters = {}) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["automation", "monitor-events", filters],
    queryFn: () => requireAiApi(aiApi).listAutomationMonitorEvents(filters),
    enabled: Boolean(aiApi),
    refetchInterval: 30_000,
  });
}
