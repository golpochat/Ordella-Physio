"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  AuditLogFilters,
  EMPTY_AUDIT_LOG_FILTER_DRAFT,
  auditFilterDraftToQuery,
  type AuditLogFilterDraft,
} from "@/components/audit/AuditLogFilters";
import { AuditLogEntitySidebar } from "@/components/audit/AuditLogEntitySidebar";
import { AuditLogTable } from "@/components/audit/AuditLogTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuditLogs, useExportAuditLogs } from "@/hooks/useAuditLogs";
import { useClinicUsers } from "@/hooks/useClinicPortal";
import { parseAuditApiError } from "@/lib/audit-api-errors";
import type { AuditLogListFilters, AuditLogSortField, DomainAuditLogRecord } from "@/lib/audit-types";
import { WithPermission } from "@/lib/auth/withPermission";
import { buildCsvContent, downloadCsv } from "@/lib/report-export-utils";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): AuditLogListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const keyword = searchParams.get("keyword")?.trim() || undefined;
  const entityTypes = searchParams.get("entityTypes")?.split(",").map((v) => v.trim()).filter(Boolean);
  const actions = searchParams.get("actions")?.split(",").map((v) => v.trim()).filter(Boolean);
  const actorUserIds = searchParams
    .get("actorUserIds")
    ?.split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const dateStart = searchParams.get("dateStart")?.trim() || undefined;
  const dateEnd = searchParams.get("dateEnd")?.trim() || undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || "createdAt") as AuditLogSortField;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || "desc") as "asc" | "desc";

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    keyword,
    entityTypes: entityTypes?.length ? entityTypes : undefined,
    actions: actions?.length ? actions : undefined,
    actorUserIds: actorUserIds?.length ? actorUserIds : undefined,
    dateStart,
    dateEnd,
    sortBy,
    sortOrder,
  };
}

function filtersToDraft(filters: AuditLogListFilters): AuditLogFilterDraft {
  return {
    keyword: filters.keyword ?? "",
    entityTypes: filters.entityTypes ?? [],
    actions: filters.actions ?? [],
    actorUserIds: filters.actorUserIds ?? [],
    dateStart: filters.dateStart ? filters.dateStart.slice(0, 16) : "",
    dateEnd: filters.dateEnd ? filters.dateEnd.slice(0, 16) : "",
  };
}

function buildSearchParams(filters: AuditLogListFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));
  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.entityTypes?.length) params.set("entityTypes", filters.entityTypes.join(","));
  if (filters.actions?.length) params.set("actions", filters.actions.join(","));
  if (filters.actorUserIds?.length) params.set("actorUserIds", filters.actorUserIds.join(","));
  if (filters.dateStart) params.set("dateStart", filters.dateStart);
  if (filters.dateEnd) params.set("dateEnd", filters.dateEnd);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  return params;
}

export default function ClinicAuditLogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draft, setDraft] = useState<AuditLogFilterDraft>(() => filtersToDraft(filters));
  const [selectedLog, setSelectedLog] = useState<DomainAuditLogRecord | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useAuditLogs(filters);
  const exportMutation = useExportAuditLogs();
  const usersQuery = useClinicUsers({ page: 1, limit: 100 });

  useEffect(() => {
    setDraft(filtersToDraft(filters));
  }, [filters]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const parsed = parseAuditApiError(error);
    if (parsed.redirectForbidden) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error, isError, router]);

  const actorLabels = useMemo(
    () =>
      new Map(
        (usersQuery.data?.data ?? []).map((user) => [
          user.id,
          [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
        ]),
      ),
    [usersQuery.data?.data],
  );

  function updateFilters(next: AuditLogListFilters) {
    const params = buildSearchParams(next);
    router.replace(`/clinic/audit-logs?${params.toString()}`);
  }

  function applyFilters() {
    updateFilters(
      auditFilterDraftToQuery(draft, {
        page: 1,
        limit: filters.limit ?? DEFAULT_LIMIT,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }),
    );
  }

  function resetFilters() {
    setDraft(EMPTY_AUDIT_LOG_FILTER_DRAFT);
    updateFilters({
      page: 1,
      limit: DEFAULT_LIMIT,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  async function handleExport() {
    try {
      const exportFilters = auditFilterDraftToQuery(draft, {
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });
      const result = await exportMutation.mutateAsync(exportFilters);
      const csv = buildCsvContent(result.columns, result.rows);
      downloadCsv(`audit-logs-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    } catch (exportError) {
      const parsed = parseAuditApiError(exportError);
      if (parsed.redirectForbidden) {
        router.replace("/forbidden");
        return;
      }
      toast.error(parsed.toastError ?? "Unable to export audit logs.");
    }
  }

  const logs = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="audit.view">
      <ListPage
        title="Audit logs"
        subtitle="Immutable activity history for your clinic."
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
      >
        <AuditLogFilters
          draft={draft}
          users={usersQuery.data?.data ?? []}
          disabled={isLoading || isFetching}
          exportDisabled={isLoading || isFetching || exportMutation.isPending}
          onDraftChange={setDraft}
          onApply={applyFilters}
          onReset={resetFilters}
          onExport={() => void handleExport()}
        />

        <AuditLogTable
          logs={logs}
          pagination={pagination}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          actorLabels={actorLabels}
          isLoading={isLoading}
          isBusy={isFetching || exportMutation.isPending}
          selectedLogId={selectedLog?.id ?? null}
          onPageChange={(page) => updateFilters({ ...filters, page })}
          onSortChange={(sortBy, sortOrder) => updateFilters({ ...filters, page: 1, sortBy, sortOrder })}
          onRowSelect={setSelectedLog}
        />

        <AuditLogEntitySidebar
          selectedLog={selectedLog}
          actorLabel={selectedLog ? actorLabels.get(selectedLog.actorUserId) : undefined}
          onClose={() => setSelectedLog(null)}
        />
      </ListPage>
    </WithPermission>
  );
}
