"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createReportingApi } from "@/lib/reporting-api";
import type { ReportFilters, ReportType } from "@/lib/reporting-types";
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
