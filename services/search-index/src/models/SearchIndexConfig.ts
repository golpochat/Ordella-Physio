import type { SearchIndexConfig as PrismaSearchIndexConfig, SearchProviderName } from "@/generated/prisma";

export type SearchIndexConfigRecord = PrismaSearchIndexConfig;

export type SearchIndexConfigResponse = {
  id: string;
  tenantId: string;
  indexName: string;
  provider: SearchProviderName;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export function toSearchIndexConfigResponse(
  config: SearchIndexConfigRecord,
): SearchIndexConfigResponse {
  return {
    id: config.id,
    tenantId: config.tenantId,
    indexName: config.indexName,
    provider: config.provider,
    settings: (config.settings ?? {}) as Record<string, unknown>,
    createdAt: config.createdAt.toISOString(),
    updatedAt: config.updatedAt.toISOString(),
  };
}
