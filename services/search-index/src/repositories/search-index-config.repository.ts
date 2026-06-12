import { Injectable } from "@nestjs/common";
import type { Prisma, SearchProviderName } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { SearchIndexConfigRecord } from "@/models/SearchIndexConfig";

@Injectable()
export class SearchIndexConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantAndIndex(
    tenantId: string,
    indexName: string,
  ): Promise<SearchIndexConfigRecord | null> {
    return this.database.searchIndexConfig.findUnique({
      where: {
        tenantId_indexName: { tenantId, indexName },
      },
    });
  }

  create(input: {
    tenantId: string;
    indexName: string;
    provider: SearchProviderName;
    settings?: Record<string, unknown>;
  }): Promise<SearchIndexConfigRecord> {
    return this.database.searchIndexConfig.create({
      data: {
        tenantId: input.tenantId,
        indexName: input.indexName,
        provider: input.provider,
        settings: (input.settings ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  listDistinctTenantIds(): Promise<string[]> {
    return this.database.searchIndexConfig
      .findMany({
        distinct: ["tenantId"],
        select: { tenantId: true },
      })
      .then((rows) => rows.map((row) => row.tenantId));
  }

  updateSettings(id: string, settings: Record<string, unknown>): Promise<SearchIndexConfigRecord> {
    return this.database.searchIndexConfig.update({
      where: { id },
      data: {
        settings: settings as Prisma.InputJsonValue,
      },
    });
  }
}
