import { Injectable } from "@nestjs/common";
import type { EmbeddingModel, Prisma, VectorIndexProvider } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { VectorIndexConfigRecord } from "@/models/VectorIndexConfig";

@Injectable()
export class VectorIndexConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantAndIndex(
    tenantId: string,
    indexName: string,
  ): Promise<VectorIndexConfigRecord | null> {
    return this.database.vectorIndexConfig.findUnique({
      where: {
        tenantId_indexName: { tenantId, indexName },
      },
    });
  }

  create(input: {
    tenantId: string;
    indexName: string;
    provider?: VectorIndexProvider;
    embeddingModel?: EmbeddingModel;
    dimensions?: number;
    settings?: Record<string, unknown>;
  }): Promise<VectorIndexConfigRecord> {
    return this.database.vectorIndexConfig.create({
      data: {
        tenantId: input.tenantId,
        indexName: input.indexName,
        provider: input.provider ?? "LOCAL",
        embeddingModel: input.embeddingModel ?? "LOCAL_MINILM",
        dimensions: input.dimensions ?? 384,
        settings: (input.settings ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  updateSettings(id: string, settings: Record<string, unknown>): Promise<VectorIndexConfigRecord> {
    return this.database.vectorIndexConfig.update({
      where: { id },
      data: {
        settings: settings as Prisma.InputJsonValue,
      },
    });
  }
}
