"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { ExperimentVariant, FlagVariant } from "@/lib/feature-flag-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useFeatureFlags() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["feature-flags"],
    queryFn: () => requireAiApi(aiApi).listFeatureFlags(),
  });
}

export function useEvaluateFeatureFlags(keys: string[], userId?: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["feature-flags", "evaluate", keys.join(","), userId ?? "self"],
    queryFn: () => requireAiApi(aiApi).evaluateFeatureFlags(keys, userId),
    enabled: keys.length > 0,
  });
}

export function useCreateFeatureFlag() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      key: string;
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants?: FlagVariant[];
      rollout?: Record<string, unknown>;
      isActive?: boolean;
    }) => requireAiApi(aiApi).createFeatureFlag(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["feature-flags"] }),
  });
}

export function useUpdateFeatureFlag() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; payload: Partial<{
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants: FlagVariant[];
      rollout: Record<string, unknown>;
      isActive: boolean;
    }> }) => requireAiApi(aiApi).updateFeatureFlag(input.id, input.payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["feature-flags"] }),
  });
}

export function useUpdateFeatureFlagRollout() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; rollout: Record<string, unknown> }) =>
      requireAiApi(aiApi).updateFeatureFlagRollout(input.id, input.rollout),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["feature-flags"] }),
  });
}

export function useAbExperiments() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ab-experiments"],
    queryFn: () => requireAiApi(aiApi).listAbExperiments(),
  });
}

export function useAbExperiment(id: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ab-experiments", id],
    queryFn: () => requireAiApi(aiApi).getAbExperiment(id),
    enabled: Boolean(id),
  });
}

export function useAbExperimentResults(id: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ab-experiments", id, "results"],
    queryFn: () => requireAiApi(aiApi).getAbExperimentResults(id),
    enabled: Boolean(id),
  });
}

export function useCreateAbExperiment() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      name: string;
      description?: string;
      variants?: ExperimentVariant[];
      targetAudience?: Record<string, unknown>;
      metricsTracked?: string[];
      modelKey?: string;
    }) => requireAiApi(aiApi).createAbExperiment(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ab-experiments"] }),
  });
}

export function useStartAbExperiment() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).startAbExperiment(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ab-experiments"] }),
  });
}

export function usePauseAbExperiment() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).pauseAbExperiment(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ab-experiments"] }),
  });
}

export function useCompleteAbExperiment() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).completeAbExperiment(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ab-experiments"] }),
  });
}
