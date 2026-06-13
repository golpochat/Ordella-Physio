"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { LogLevel, MetricType, TraceService, TraceStatus } from "@/lib/observability-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useObservabilityDashboard() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "dashboard"],
    queryFn: () => requireAiApi(aiApi).getObservabilityDashboard(),
  });
}

export function usePipelineView() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "pipeline"],
    queryFn: () => requireAiApi(aiApi).getPipelineView(),
  });
}

export function useTraces(filters?: { service?: TraceService; status?: TraceStatus; since?: string }) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "traces", filters ?? {}],
    queryFn: () => requireAiApi(aiApi).searchTraces(filters),
  });
}

export function useTraceDetail(traceId: string | null) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "trace", traceId],
    queryFn: () => requireAiApi(aiApi).getTrace(traceId!),
    enabled: Boolean(traceId),
  });
}

export function useObservabilityLogs(filters?: { service?: TraceService; level?: LogLevel; since?: string }) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "logs", filters ?? {}],
    queryFn: () => requireAiApi(aiApi).getObservabilityLogs(filters),
  });
}

export function useObservabilityMetrics(metricType?: MetricType, since?: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "metrics", metricType ?? "latency", since ?? ""],
    queryFn: () => requireAiApi(aiApi).getObservabilityMetrics(metricType, since),
  });
}

export function useLatencyHeatmap(since?: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "heatmap", "latency", since ?? ""],
    queryFn: () => requireAiApi(aiApi).getLatencyHeatmap(since),
  });
}

export function useErrorHeatmap(since?: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "heatmap", "error", since ?? ""],
    queryFn: () => requireAiApi(aiApi).getErrorHeatmap(since),
  });
}

export function useBottleneckAlerts() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-observability", "bottlenecks"],
    queryFn: () => requireAiApi(aiApi).listBottleneckAlerts(),
  });
}

export function useDetectBottlenecks() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).detectBottlenecks(),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-observability", "bottlenecks"] }),
  });
}

export function useResolveBottleneck() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requireAiApi(aiApi).resolveBottleneck(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-observability", "bottlenecks"] }),
  });
}
