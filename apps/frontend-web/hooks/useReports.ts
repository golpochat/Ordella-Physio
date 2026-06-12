"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createReportingApi } from "@/lib/reporting-api";
import type {
  AppointmentReportQuery,
  CreateSavedReportInput,
  CreateScheduledReportInput,
  DashboardMetricsQuery,
  PatientReportQuery,
  ReportFilters,
  ReportType,
  RevenueReportQuery,
  SavedReportType,
  UpdateSavedReportInput,
} from "@/lib/reporting-types";
import { useAuthStore } from "@/store/auth.store";

const POLL_INTERVAL_MS = 4_000;

function reportsQueryKey(tenantId: string | null | undefined) {
  return ["reports", tenantId] as const;
}

export function useReportingApi() {
  const api = useApi();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { tenantId } = useTenant();

  return useMemo(
    () =>
      createReportingApi(api, () => ({
        accessToken,
        tenantId,
      })),
    [api, accessToken, tenantId],
  );
}

export function useReportHistory() {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: reportsQueryKey(tenantId),
    queryFn: () => reportingApi.list({ limit: 50 }),
    enabled: Boolean(tenantId),
    refetchInterval: (query) => {
      const hasActive = query.state.data?.items.some((report) =>
        ["pending", "processing"].includes(report.status),
      );
      return hasActive ? POLL_INTERVAL_MS : false;
    },
  });
}

export function useDashboardMetrics(filters?: DashboardMetricsQuery) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "dashboard", tenantId, filters?.rangeType, filters?.startDate, filters?.endDate],
    queryFn: () => reportingApi.getDashboard(filters),
    enabled: Boolean(tenantId),
  });
}

export function useAppointmentReport(filters?: AppointmentReportQuery) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "appointments", tenantId, filters],
    queryFn: () => reportingApi.getAppointmentReport(filters),
    enabled: Boolean(tenantId),
  });
}

export function useRevenueReport(filters?: RevenueReportQuery) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "revenue", tenantId, filters],
    queryFn: () => reportingApi.getRevenueReport(filters),
    enabled: Boolean(tenantId),
  });
}

export function usePatientReport(filters?: PatientReportQuery) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "patients", tenantId, filters],
    queryFn: () => reportingApi.getPatientReport(filters),
    enabled: Boolean(tenantId),
  });
}

export function useReportingKpi(filters?: Pick<ReportFilters, "startDate" | "endDate">) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "kpi", tenantId, filters?.startDate, filters?.endDate],
    queryFn: () => reportingApi.getKpi(filters),
    enabled: Boolean(tenantId),
  });
}

export function useRequestReport() {
  const reportingApi = useReportingApi();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation({
    mutationFn: ({ type, filters }: { type: ReportType; filters: ReportFilters }) =>
      reportingApi.requestReport(type, filters),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reportsQueryKey(tenantId) });
    },
  });
}

export function useDownloadReport() {
  const reportingApi = useReportingApi();

  return useMutation({
    mutationFn: ({ id, format }: { id: string; format?: "json" | "csv" }) =>
      reportingApi.download(id, format),
    onSuccess: ({ blob, filename }) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    },
  });
}

export function useSavedReports(params?: { type?: SavedReportType; page?: number; limit?: number }) {
  const reportingApi = useReportingApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["reporting", "saved", tenantId, params],
    queryFn: () => reportingApi.listSavedReports(params),
    enabled: Boolean(tenantId),
  });
}

export function useCreateSavedReport() {
  const reportingApi = useReportingApi();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation({
    mutationFn: (body: CreateSavedReportInput) => reportingApi.createSavedReport(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reporting", "saved", tenantId] });
    },
  });
}

export function useUpdateSavedReport() {
  const reportingApi = useReportingApi();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateSavedReportInput }) =>
      reportingApi.updateSavedReport(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reporting", "saved", tenantId] });
    },
  });
}

export function useDeleteSavedReport() {
  const reportingApi = useReportingApi();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation({
    mutationFn: (id: string) => reportingApi.deleteSavedReport(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reporting", "saved", tenantId] });
    },
  });
}

export function useCreateScheduledReport() {
  const reportingApi = useReportingApi();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation({
    mutationFn: (body: CreateScheduledReportInput) => reportingApi.createScheduledReport(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reporting", "scheduled", tenantId] });
    },
  });
}

export function useExportAppointmentReport() {
  const reportingApi = useReportingApi();
  return useMutation({
    mutationFn: (params?: AppointmentReportQuery) => reportingApi.exportAppointmentReport(params),
  });
}

export function useExportRevenueReport() {
  const reportingApi = useReportingApi();
  return useMutation({
    mutationFn: (params?: RevenueReportQuery) => reportingApi.exportRevenueReport(params),
  });
}

export function useExportPatientReport() {
  const reportingApi = useReportingApi();
  return useMutation({
    mutationFn: (params?: PatientReportQuery) => reportingApi.exportPatientReport(params),
  });
}
