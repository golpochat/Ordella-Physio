"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createAuditApi } from "@/lib/audit-api";
import type { AuditLogListFilters } from "@/lib/audit-types";

export function useAuditApi() {
  const api = useApi();
  return useMemo(() => createAuditApi(api), [api]);
}

export function useAuditLogs(filters: AuditLogListFilters) {
  const auditApi = useAuditApi();

  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: () => auditApi.listAuditLogs(filters),
  });
}

export function useExportAuditLogs() {
  const auditApi = useAuditApi();

  return useMutation({
    mutationFn: (filters: AuditLogListFilters) => auditApi.exportAuditLogs(filters),
  });
}
