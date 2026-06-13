"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { CreateAgentInput, CreateToolInput } from "@/lib/agent-types";

function requireAiApi(aiApi: ReturnType<typeof useAiApi>) {
  if (!aiApi) throw new Error("AI API unavailable.");
  return aiApi;
}

export function useAgents() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-agents", "list"],
    queryFn: () => requireAiApi(aiApi).listAgents(),
  });
}

export function useAgent(id: string | null) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-agents", "detail", id],
    queryFn: () => requireAiApi(aiApi).getAgent(id!),
    enabled: Boolean(id),
  });
}

export function useAgentTools() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-agents", "tools"],
    queryFn: () => requireAiApi(aiApi).listAgentTools(),
  });
}

export function useAgentRuns(agentId: string | null) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["ai-agents", "runs", agentId],
    queryFn: () => requireAiApi(aiApi).listAgentRuns(agentId!),
    enabled: Boolean(agentId),
  });
}

export function useCreateAgent() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAgentInput) => requireAiApi(aiApi).createAgent(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-agents", "list"] }),
  });
}

export function useRegisterAgentTool() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateToolInput) => requireAiApi(aiApi).registerAgentTool(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["ai-agents", "tools"] }),
  });
}

export function useRunAgent() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ agentId, input }: { agentId: string; input: string }) =>
      requireAiApi(aiApi).runConfiguredAgent(agentId, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["ai-agents", "runs", variables.agentId] });
    },
  });
}
