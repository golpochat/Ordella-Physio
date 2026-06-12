import type { VectorIndexConfig as VectorIndexConfigRecord } from "@/generated/prisma";

export type { VectorIndexConfigRecord };

export type SemanticSearchSettings = {
  semanticEnabled?: boolean;
  lexicalWeight?: number;
  semanticWeight?: number;
};

export type VectorIndexConfigResponse = {
  id: string;
  tenantId: string;
  indexName: string;
  provider: string;
  embeddingModel: string;
  dimensions: number;
  settings: SemanticSearchSettings & Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export function toVectorIndexConfigResponse(
  record: VectorIndexConfigRecord,
): VectorIndexConfigResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    indexName: record.indexName,
    provider: record.provider,
    embeddingModel: record.embeddingModel,
    dimensions: record.dimensions,
    settings: (record.settings ?? {}) as SemanticSearchSettings & Record<string, unknown>,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
