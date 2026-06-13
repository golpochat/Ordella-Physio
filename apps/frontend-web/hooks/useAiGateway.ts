"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { GatewayScope } from "@/lib/gateway-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useGatewayKeys() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "keys"],
    queryFn: () => requireAiApi(aiApi).listGatewayKeys(),
  });
}

export function useCreateGatewayKey() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      name: string;
      scopes: GatewayScope[];
      rateLimitProfileId?: string;
      budgetProfileId?: string;
    }) => requireAiApi(aiApi).createGatewayKey(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "keys"] }),
  });
}

export function useUpdateGatewayKey() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      id: string;
      payload: Partial<{ name: string; scopes: GatewayScope[]; isActive: boolean; rateLimitProfileId: string | null }>;
    }) => requireAiApi(aiApi).updateGatewayKey(input.id, input.payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "keys"] }),
  });
}

export function useRevokeGatewayKey() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).revokeGatewayKey(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "keys"] }),
  });
}

export function useRotateGatewayKey() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).rotateGatewayKey(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "keys"] }),
  });
}

export function useGatewayUsageSummary() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "usage"],
    queryFn: () => requireAiApi(aiApi).getGatewayUsageSummary(),
  });
}

export function useGatewayUsageByModel() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "usage", "models"],
    queryFn: () => requireAiApi(aiApi).getGatewayUsageByModel(),
  });
}

export function useGatewayUsageByKey() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "usage", "keys"],
    queryFn: () => requireAiApi(aiApi).getGatewayUsageByKey(),
  });
}

export function useGatewayRateLimits() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "limits", "rate"],
    queryFn: () => requireAiApi(aiApi).listGatewayRateLimits(),
  });
}

export function useUpsertGatewayRateLimit() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      name: string;
      requestsPerMinute?: number;
      requestsPerHour?: number;
      requestsPerDay?: number;
      tokensPerMinute?: number;
      tokensPerDay?: number;
      burstLimit?: number;
    }) => requireAiApi(aiApi).upsertGatewayRateLimit(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "limits", "rate"] }),
  });
}

export function useGatewayBudget() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-gateway", "limits", "budget"],
    queryFn: () => requireAiApi(aiApi).getGatewayBudget(),
  });
}

export function useUpdateGatewayBudget() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    }) => requireAiApi(aiApi).updateGatewayBudget(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-gateway", "limits", "budget"] }),
  });
}
