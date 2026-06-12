import type { SearchQueryLog as PrismaSearchQueryLog } from "@/generated/prisma";

export type SearchQueryLogRecord = PrismaSearchQueryLog;

export type SearchQueryLogResponse = {
  id: string;
  tenantId: string;
  indexName: string;
  query: string;
  filters: Record<string, unknown> | null;
  totalHits: number;
  durationMs: number;
  createdAt: string;
};

export function toSearchQueryLogResponse(log: SearchQueryLogRecord): SearchQueryLogResponse {
  return {
    id: log.id,
    tenantId: log.tenantId,
    indexName: log.indexName,
    query: log.query,
    filters: (log.filters ?? null) as Record<string, unknown> | null,
    totalHits: log.totalHits,
    durationMs: log.durationMs,
    createdAt: log.createdAt.toISOString(),
  };
}
