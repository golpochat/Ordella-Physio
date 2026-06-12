"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createAiApi } from "@/lib/ai-api";
import type { AIProviderType } from "@/lib/ai-types";

export function useAiApi() {
  const api = useApi();
  return useMemo(() => createAiApi(api), [api]);
}

export function useAIProviders() {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["ai-providers"],
    queryFn: () => aiApi.listProviders(),
  });
}

export function useCreateAIProvider() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      provider: AIProviderType;
      modelName: string;
      apiKey: string;
      baseUrl?: string;
      isActive?: boolean;
      priority?: number;
    }) => aiApi.createProvider(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ai-providers"] });
    },
  });
}

export function useUpdateAIProvider() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Partial<{
        provider: AIProviderType;
        modelName: string;
        apiKey: string;
        baseUrl: string;
        isActive: boolean;
        priority: number;
      }>;
    }) => aiApi.updateProvider(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ai-providers"] });
    },
  });
}

export function useAIText() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: {
      task?: string;
      prompt: string;
      maxTokens?: number;
      temperature?: number;
      model?: string;
    }) => aiApi.runText(input),
  });
}

export function useAIStructured() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: {
      task?: string;
      prompt: string;
      schema: Record<string, unknown>;
      maxTokens?: number;
      temperature?: number;
      model?: string;
    }) => aiApi.runStructured(input),
  });
}

export function useAIEmbed() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: { text: string; model?: string }) => aiApi.runEmbed(input),
  });
}

export function usePatientInsights() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (patientId: string) => aiApi.getPatientInsights(patientId),
  });
}

export function useAppointmentInsights() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (appointmentId: string) => aiApi.getAppointmentInsights(appointmentId),
  });
}

export function useInvoiceInsights() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (invoiceId: string) => aiApi.getInvoiceInsights(invoiceId),
  });
}

export function useReportInsights() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (report: Record<string, unknown>) => aiApi.getReportInsights(report),
  });
}

export function useAIAgent() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: { request: string; patientId?: string; invoiceId?: string }) =>
      aiApi.runAgent(input),
  });
}

export function useMultiStepAgent() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: {
      request: string;
      patientId?: string;
      invoiceId?: string;
      steps?: string[];
    }) => aiApi.runMultiStepAgent(input),
  });
}

export function useCopilot() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: {
      query: string;
      entityType?: "patient" | "appointment" | "invoice" | "report";
      entityId?: string;
    }) => aiApi.runCopilot(input),
  });
}

export function useWorkflowRun() {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: (input: {
      trigger: string;
      patientId?: string;
      invoiceId?: string;
      appointmentId?: string;
    }) => aiApi.runWorkflow(input),
  });
}

export function useCopilotMemory() {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["ai-copilot-memory"],
    queryFn: () => aiApi.getCopilotMemory(),
  });
}
