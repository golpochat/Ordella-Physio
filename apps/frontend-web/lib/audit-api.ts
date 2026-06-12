import type { createApiClient } from "@/lib/api-client";
import type { AuditLogExportResponse, AuditLogListFilters, AuditLogListResponse } from "@/lib/audit-types";

function toQueryParams(filters: AuditLogListFilters): Record<string, string | number | undefined> {
  return {
    page: filters.page,
    limit: filters.limit,
    keyword: filters.keyword,
    entityType: filters.entityType,
    entityId: filters.entityId,
    entityTypes: filters.entityTypes?.length ? filters.entityTypes.join(",") : undefined,
    actions: filters.actions?.length ? filters.actions.join(",") : undefined,
    actorUserIds: filters.actorUserIds?.length ? filters.actorUserIds.join(",") : undefined,
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };
}

export function createAuditApi(api: ReturnType<typeof createApiClient>) {
  return {
    listAuditLogs(filters: AuditLogListFilters = {}) {
      return api.get<AuditLogListResponse>("audit", "", {
        params: toQueryParams(filters),
      });
    },
    exportAuditLogs(filters: AuditLogListFilters = {}) {
      return api.get<AuditLogExportResponse>("audit", "/export", {
        params: toQueryParams(filters),
      });
    },
  };
}
