"use client";

import { useDatasets } from "@/hooks/useDatasetPortal";
import {
  useModelDriftSummary,
  useModelPromotion,
  useModelRegistry,
  useTrainingExperiments,
  useTrainingJobs,
} from "@/hooks/useTrainingPortal";

export function useAiAdminDashboard() {
  const datasetsQuery = useDatasets();
  const jobsQuery = useTrainingJobs();
  const modelsQuery = useModelRegistry();

  const jobs = jobsQuery.data ?? [];
  const models = modelsQuery.data ?? [];

  const runningJobs = jobs.filter((job) => job.status === "RUNNING" || job.status === "QUEUED");
  const publishedModels = models.filter((model) => model.status === "PUBLISHED");
  const draftModels = models.filter((model) => model.status === "DRAFT");

  return {
    isLoading: datasetsQuery.isLoading || jobsQuery.isLoading || modelsQuery.isLoading,
    stats: {
      datasetCount: datasetsQuery.data?.length ?? 0,
      trainingJobCount: jobs.length,
      activeExperiments: runningJobs.length,
      stagingModels: draftModels.length,
      productionModels: publishedModels.length,
      driftAlerts: 0,
    },
    jobs,
    models,
  };
}

export function useModelDriftAlertCount(modelId: string) {
  const summaryQuery = useModelDriftSummary(modelId);
  return summaryQuery.data?.unresolvedCount ?? 0;
}

export function useAllTrainingExperiments() {
  const jobsQuery = useTrainingJobs();
  const jobs = jobsQuery.data ?? [];
  return { jobs, isLoading: jobsQuery.isLoading };
}

export function useModelPromotionStage(modelId: string) {
  return useModelPromotion(modelId);
}
