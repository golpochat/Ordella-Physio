"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAiApi } from "@/hooks/useAI";
import type {
  CreateDatasetInput,
  DatasetLabelType,
  UpdateDatasetInput,
} from "@/lib/dataset-types";

function requireAiApi(api: ReturnType<typeof useAiApi>) {
  if (!api) {
    throw new Error("API client is required");
  }
  return api;
}

export function useDatasets() {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["datasets"],
    queryFn: () => requireAiApi(aiApi).listDatasets(),
    enabled: Boolean(aiApi),
  });
}

export function useDataset(datasetId: string) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["datasets", datasetId],
    queryFn: () => requireAiApi(aiApi).getDataset(datasetId),
    enabled: Boolean(aiApi && datasetId),
  });
}

export function useCreateDataset() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDatasetInput) => requireAiApi(aiApi).createDataset(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
  });
}

export function useUpdateDataset(datasetId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDatasetInput) =>
      requireAiApi(aiApi).updateDataset(datasetId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["datasets"] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useDeleteDataset() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (datasetId: string) => requireAiApi(aiApi).deleteDataset(datasetId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
  });
}

export function useCloneDataset() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (datasetId: string) => requireAiApi(aiApi).cloneDataset(datasetId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
  });
}

export function useExportDataset(datasetId: string) {
  const aiApi = useAiApi();

  return useMutation({
    mutationFn: () => requireAiApi(aiApi).exportDataset(datasetId),
  });
}

export function useImportDataset() {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDatasetInput) => requireAiApi(aiApi).importDataset(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
  });
}

export function useDatasetVersions(datasetId: string) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["dataset-versions", datasetId],
    queryFn: () => requireAiApi(aiApi).listDatasetVersions(datasetId),
    enabled: Boolean(aiApi && datasetId),
  });
}

export function useCreateDatasetVersion(datasetId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireAiApi(aiApi).createDatasetVersion(datasetId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useRollbackDatasetVersion(datasetId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (versionNumber: number) =>
      requireAiApi(aiApi).rollbackDatasetVersion(datasetId, versionNumber),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useDatasetVersionDiff(
  datasetId: string,
  fromVersion: number | null,
  toVersion: number | null,
) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["dataset-version-diff", datasetId, fromVersion, toVersion],
    queryFn: () =>
      requireAiApi(aiApi).diffDatasetVersions(datasetId, fromVersion!, toVersion!),
    enabled: Boolean(aiApi && datasetId && fromVersion && toVersion && fromVersion !== toVersion),
  });
}

export function useDatasetRecords(datasetId: string, versionId: string, search?: string) {
  const aiApi = useAiApi();

  return useQuery({
    queryKey: ["dataset-records", datasetId, versionId, search ?? ""],
    queryFn: () => requireAiApi(aiApi).listDatasetRecords(datasetId, versionId, search),
    enabled: Boolean(aiApi && datasetId && versionId),
  });
}

export function useAddDatasetRecord(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { input: unknown; output?: unknown; metadata?: Record<string, unknown> }) =>
      requireAiApi(aiApi).addDatasetRecord(datasetId, versionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useBulkAddDatasetRecords(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (records: Array<{ input: unknown; output?: unknown; metadata?: Record<string, unknown> }>) =>
      requireAiApi(aiApi).bulkAddDatasetRecords(datasetId, versionId, records),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useUpdateDatasetRecord(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { recordId: string; input?: unknown; output?: unknown; metadata?: Record<string, unknown> }) =>
      requireAiApi(aiApi).updateDatasetRecord(payload.recordId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
    },
  });
}

export function useDeleteDatasetRecord(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recordId: string) => requireAiApi(aiApi).deleteDatasetRecord(recordId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
      void queryClient.invalidateQueries({ queryKey: ["datasets", datasetId] });
    },
  });
}

export function useBatchEmbedDatasetVersion(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (model?: string) =>
      requireAiApi(aiApi).batchEmbedDatasetVersion(datasetId, versionId, model),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
      void queryClient.invalidateQueries({ queryKey: ["dataset-versions", datasetId] });
    },
  });
}

export function useAddDatasetLabel(datasetId: string, versionId: string) {
  const aiApi = useAiApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      recordId: string;
      labelType: DatasetLabelType;
      labelValue: Record<string, unknown>;
    }) =>
      requireAiApi(aiApi).addDatasetLabel(payload.recordId, {
        labelType: payload.labelType,
        labelValue: payload.labelValue,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dataset-records", datasetId, versionId] });
    },
  });
}
