"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type { CreateTrainingJobInput, StartDeploymentInput } from "@/lib/training-types";

function requireAiApi(api: ReturnType<typeof useAiApi>) {
  if (!api) {
    throw new Error("API client is required");
  }
  return api;
}

export function useTrainingJobs() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "jobs"],
    queryFn: () => requireAiApi(aiApi).listTrainingJobs(),
    enabled: Boolean(aiApi),
  });
}

export function useTrainingJob(jobId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "jobs", jobId],
    queryFn: () => requireAiApi(aiApi).getTrainingJob(jobId),
    enabled: Boolean(aiApi && jobId),
    refetchInterval: (query) =>
      query.state.data?.status === "RUNNING" || query.state.data?.status === "QUEUED"
        ? 3000
        : false,
  });
}

export function useTrainingMetrics(jobId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "metrics", jobId],
    queryFn: () => requireAiApi(aiApi).getTrainingMetrics(jobId),
    enabled: Boolean(aiApi && jobId),
    refetchInterval: 5000,
  });
}

export function useTrainingDashboard(jobId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "dashboard", jobId],
    queryFn: () => requireAiApi(aiApi).getTrainingDashboard(jobId),
    enabled: Boolean(aiApi && jobId),
    refetchInterval: (query) =>
      query.state.data?.job.status === "RUNNING" || query.state.data?.job.status === "QUEUED"
        ? 3000
        : false,
  });
}

export function useTrainingExperiments(jobId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "experiments", jobId],
    queryFn: () => requireAiApi(aiApi).listTrainingExperiments(jobId),
    enabled: Boolean(aiApi && jobId),
  });
}

export function useTrainingExperiment(experimentId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "experiment", experimentId],
    queryFn: () => requireAiApi(aiApi).getTrainingExperiment(experimentId),
    enabled: Boolean(aiApi && experimentId),
  });
}

export function useCompareTrainingExperiments(jobId: string, experimentIds?: string[]) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "experiments-compare", jobId, experimentIds?.join(",") ?? "all"],
    queryFn: () => requireAiApi(aiApi).compareTrainingExperiments(jobId, experimentIds),
    enabled: Boolean(aiApi && jobId),
  });
}

export function useResumeTraining(jobId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (checkpointNumber: number) =>
      requireAiApi(aiApi).resumeTrainingFromCheckpoint(jobId, checkpointNumber),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "jobs", jobId] });
      void queryClient.invalidateQueries({ queryKey: ["training", "dashboard", jobId] });
    },
  });
}

export function useCreateTrainingJob() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTrainingJobInput) =>
      requireAiApi(aiApi).createTrainingJob(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "jobs"] });
    },
  });
}

export function useModelRegistry() {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models"],
    queryFn: () => requireAiApi(aiApi).listRegistryModels(),
    enabled: Boolean(aiApi),
  });
}

export function useRegistryModel(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId],
    queryFn: () => requireAiApi(aiApi).getRegistryModel(modelId),
    enabled: Boolean(aiApi && modelId),
  });
}

export function usePublishModel(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).publishRegistryModel(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId] });
    },
  });
}

export function useDeprecateModel(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).deprecateRegistryModel(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
    },
  });
}

export function useModelEvaluations(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "evaluations"],
    queryFn: () => requireAiApi(aiApi).listModelEvaluations(modelId),
    enabled: Boolean(aiApi && modelId),
  });
}

export function useLatestModelEvaluation(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "evaluation-latest"],
    queryFn: () => requireAiApi(aiApi).getLatestModelEvaluation(modelId),
    enabled: Boolean(aiApi && modelId),
  });
}

export function useRunModelEvaluation(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (datasetId?: string) => requireAiApi(aiApi).runModelEvaluation(modelId, datasetId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "evaluations"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "evaluation-latest"] });
    },
  });
}

export function useModelPromotion(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "promotion"],
    queryFn: () => requireAiApi(aiApi).getModelPromotion(modelId),
    enabled: Boolean(aiApi && modelId),
    retry: false,
  });
}

export function usePromoteModelToStaging(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).promoteModelToStaging(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
    },
  });
}

export function usePromoteModelToProduction(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).promoteModelToProduction(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId] });
    },
  });
}

export function useSetModelRollout(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rolloutPercentage: number) =>
      requireAiApi(aiApi).setModelRollout(modelId, rolloutPercentage),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
    },
  });
}

export function useAutoAdjustModelCanary(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).autoAdjustModelCanary(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
    },
  });
}

export function useModelDriftSummary(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "drift"],
    queryFn: () => requireAiApi(aiApi).getModelDriftSummary(modelId),
    enabled: Boolean(aiApi && modelId),
  });
}

export function useModelDriftEvents(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "drift-events"],
    queryFn: () => requireAiApi(aiApi).listModelDriftEvents(modelId),
    enabled: Boolean(aiApi && modelId),
  });
}

export function useRunDriftDetection(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).runModelDriftDetection(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "drift"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "drift-events"] });
    },
  });
}

export function useResolveDriftEvent(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { eventId: string; mitigationAction?: string }) =>
      requireAiApi(aiApi).resolveDriftEvent(modelId, input.eventId, input.mitigationAction),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "drift"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "drift-events"] });
    },
  });
}

export function useDriftMitigation(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "drift"] });
    void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "promotion"] });
  };
  return {
    retrain: useMutation({
      mutationFn: () => requireAiApi(aiApi).triggerDriftRetrain(modelId),
      onSuccess: invalidate,
    }),
    rollback: useMutation({
      mutationFn: () => requireAiApi(aiApi).rollbackDriftModel(modelId),
      onSuccess: invalidate,
    }),
    reduceRollout: useMutation({
      mutationFn: (rolloutPercentage?: number) =>
        requireAiApi(aiApi).reduceDriftRollout(modelId, rolloutPercentage ?? 10),
      onSuccess: invalidate,
    }),
  };
}

export function useModelDeploymentStatus(modelId: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "deployment"],
    queryFn: () => requireAiApi(aiApi).getModelDeploymentStatus(modelId),
    enabled: Boolean(modelId),
  });
}

export function useDeploymentMetrics(modelId: string, version?: string) {
  const aiApi = useAiApi();
  return useQuery({
    queryKey: ["training", "models", modelId, "deployment-metrics", version ?? "latest"],
    queryFn: () => requireAiApi(aiApi).getDeploymentMetrics(modelId, version),
    enabled: Boolean(modelId),
  });
}

export function useStartModelDeployment() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: StartDeploymentInput) => requireAiApi(aiApi).startModelDeployment(payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", variables.modelId, "deployment"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", variables.modelId, "deployment-metrics"] });
    },
  });
}

export function useRollbackModelDeployment(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requireAiApi(aiApi).rollbackModelDeployment(modelId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "deployment"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "deployment-metrics"] });
    },
  });
}

export function useSetRegionRollout(modelId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { region: string; rolloutPercent: number }) =>
      requireAiApi(aiApi).setRegionRollout(modelId, input.region, input.rolloutPercent),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "deployment"] });
      void queryClient.invalidateQueries({ queryKey: ["training", "models", modelId, "deployment-metrics"] });
    },
  });
}
