import { Injectable } from "@nestjs/common";
import type { SupportedIndexName } from "@/config/search.config";
import type { SearchHit } from "@/services/providers/search-provider.interface";
import { SearchIndexService } from "@/services/search-index.service";

const FEDERATED_INDEXES: SupportedIndexName[] = ["patients", "appointments", "invoices", "staff"];

@Injectable()
export class FederatedSearchService {
  constructor(private readonly searchIndexService: SearchIndexService) {}

  async searchAll(input: { tenantId: string; query: string; limit?: number }) {
    const limit = input.limit ?? 10;
    const entries = await Promise.all(
      FEDERATED_INDEXES.map(async (indexName) => {
        const result = await this.searchIndexService.search({
          tenantId: input.tenantId,
          indexName,
          query: input.query,
          limit,
        });

        return [indexName, result.hits] as const;
      }),
    );

    return Object.fromEntries(entries) as Record<string, SearchHit[]>;
  }

  async searchTopHits(input: { tenantId: string; query: string; perIndex?: number }) {
    const perIndex = input.perIndex ?? 5;
    const grouped = await this.searchAll({
      tenantId: input.tenantId,
      query: input.query,
      limit: perIndex,
    });

    const flat = FEDERATED_INDEXES.flatMap((indexName) =>
      (grouped[indexName] ?? []).map((hit) => ({
        ...hit,
        indexName,
      })),
    ).sort((left, right) => (right._score ?? 0) - (left._score ?? 0));

    return {
      grouped,
      topHits: flat.slice(0, perIndex * FEDERATED_INDEXES.length),
    };
  }
}
