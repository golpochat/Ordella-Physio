"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { CostPeriod } from "@/lib/cost-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useCostSummary(period?: CostPeriod) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "summary", period ?? "MONTHLY"],
    queryFn: () => requireAiApi(aiApi).getCostSummary(period),
  });
}

export function useCostByModel(period?: CostPeriod) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "models", period ?? "MONTHLY"],
    queryFn: () => requireAiApi(aiApi).getCostByModel(period),
  });
}

export function useCostByFeature(period?: CostPeriod) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "features", period ?? "MONTHLY"],
    queryFn: () => requireAiApi(aiApi).getCostByFeature(period),
  });
}

export function useCostTrends(period: CostPeriod = "DAILY", limit = 30) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "trends", period, limit],
    queryFn: () => requireAiApi(aiApi).getCostTrends(period, limit),
  });
}

export function useCostBudget() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "budget"],
    queryFn: () => requireAiApi(aiApi).getCostBudget(),
  });
}

export function useUpdateCostBudget() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    }) => requireAiApi(aiApi).updateCostBudget(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-cost", "budget"] }),
  });
}

export function useCostAlerts(unresolvedOnly = false) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "alerts", unresolvedOnly ? "unresolved" : "all"],
    queryFn: () => requireAiApi(aiApi).listCostAlerts(unresolvedOnly),
  });
}

export function useResolveCostAlert() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).resolveCostAlert(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-cost", "alerts"] }),
  });
}

export function useCostOptimization() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-cost", "optimization"],
    queryFn: () => requireAiApi(aiApi).getCostOptimization(),
  });
}
