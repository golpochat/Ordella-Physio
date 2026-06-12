import { Injectable } from "@nestjs/common";
import type { SupportedIndexName } from "@/config/search.config";
import { SearchQueryLogRepository } from "@/repositories/search-query-log.repository";
import type { SearchHit } from "@/services/providers/search-provider.interface";
import { EmbeddingService } from "@/services/embedding.service";
import { SearchIndexService } from "@/services/search-index.service";
import { VectorIndexService } from "@/services/vector-index.service";
import { validateIndexName } from "@/validators/index.validator";

type HybridHit = SearchHit & {
  _lexicalScore?: number;
  _semanticScore?: number;
};

@Injectable()
export class HybridSearchService {
  constructor(
    private readonly searchIndexService: SearchIndexService,
    private readonly vectorIndexService: VectorIndexService,
    private readonly embeddingService: EmbeddingService,
    private readonly queryLogRepository: SearchQueryLogRepository,
  ) {}

  async hybridSearch(input: {
    tenantId: string;
    indexName: string;
    query: string;
    filters?: string | Record<string, unknown>;
    limit?: number;
    offset?: number;
    includeDebug?: boolean;
  }) {
    const startedAt = Date.now();
    const indexName = validateIndexName(input.indexName) as SupportedIndexName;
    const settings = await this.vectorIndexService.getSemanticSettings(input.tenantId, indexName);
    const limit = input.limit ?? 20;

    const [lexicalResult, semanticNeighbors] = await Promise.all([
      this.searchIndexService.search({
        tenantId: input.tenantId,
        indexName,
        query: input.query,
        filters: input.filters,
        limit,
        offset: input.offset,
        logQuery: false,
      }),
      settings.semanticEnabled
        ? this.semanticSearch(input.tenantId, indexName, input.query, limit)
        : Promise.resolve([]),
    ]);

    const merged = this.mergeResults({
      lexicalHits: lexicalResult.hits,
      semanticHits: semanticNeighbors,
      lexicalWeight: settings.lexicalWeight ?? 0.6,
      semanticWeight: settings.semanticWeight ?? 0.4,
      limit,
    });

    await this.queryLogRepository.create({
      tenantId: input.tenantId,
      indexName,
      query: input.query,
      filters:
        typeof input.filters === "string"
          ? { raw: input.filters }
          : (input.filters as Record<string, unknown> | undefined),
      totalHits: merged.hits.length,
      durationMs: Date.now() - startedAt,
    });

    return {
      hits: merged.hits,
      total: merged.hits.length,
      limit,
      offset: input.offset ?? 0,
      mode: settings.semanticEnabled ? "hybrid" : "lexical",
      ...(input.includeDebug
        ? {
            debug: {
              lexicalHits: lexicalResult.hits,
              semanticHits: semanticNeighbors,
              weights: {
                lexical: settings.lexicalWeight,
                semantic: settings.semanticWeight,
              },
            },
          }
        : {}),
    };
  }

  async semanticOnlySearch(input: {
    tenantId: string;
    indexName: string;
    query: string;
    limit?: number;
    offset?: number;
  }) {
    const startedAt = Date.now();
    const indexName = validateIndexName(input.indexName) as SupportedIndexName;
    const limit = input.limit ?? 20;
    const neighbors = await this.semanticSearch(input.tenantId, indexName, input.query, limit);

    const hits: SearchHit[] = neighbors.map((neighbor) => ({
      id: neighbor.documentId,
      _score: neighbor.score,
      ...(neighbor.metadata as Record<string, unknown>),
    }));

    await this.queryLogRepository.create({
      tenantId: input.tenantId,
      indexName,
      query: input.query,
      totalHits: hits.length,
      durationMs: Date.now() - startedAt,
    });

    return {
      hits,
      total: hits.length,
      limit,
      offset: input.offset ?? 0,
      mode: "semantic" as const,
    };
  }

  private async semanticSearch(
    tenantId: string,
    indexName: SupportedIndexName,
    query: string,
    limit: number,
  ) {
    await this.vectorIndexService.assertSemanticEnabled(tenantId, indexName);
    const config = await this.vectorIndexService.getVectorConfig(tenantId, indexName);
    const queryVector = this.embeddingService.embedText(query, {
      model: config.embeddingModel as never,
      dimensions: config.dimensions,
    });

    return this.vectorIndexService.searchVector({
      tenantId,
      indexName,
      queryVector,
      limit,
    });
  }

  private mergeResults(input: {
    lexicalHits: SearchHit[];
    semanticHits: Array<{ documentId: string; score: number; metadata: Record<string, unknown> }>;
    lexicalWeight: number;
    semanticWeight: number;
    limit: number;
  }) {
    const lexicalScores = this.normalizeScores(
      input.lexicalHits.map((hit) => hit._score ?? 0),
    );
    const semanticScores = this.normalizeScores(input.semanticHits.map((hit) => hit.score));

    const combined = new Map<string, HybridHit>();

    input.lexicalHits.forEach((hit, index) => {
      const lexicalScore = lexicalScores[index] ?? 0;
      combined.set(String(hit.id), {
        ...hit,
        _lexicalScore: lexicalScore,
        _semanticScore: 0,
        _score: lexicalScore * input.lexicalWeight,
      });
    });

    input.semanticHits.forEach((hit, index) => {
      const semanticScore = semanticScores[index] ?? 0;
      const existing = combined.get(hit.documentId);
      if (existing) {
        existing._semanticScore = semanticScore;
        existing._score = (existing._lexicalScore ?? 0) * input.lexicalWeight + semanticScore * input.semanticWeight;
        return;
      }

      combined.set(hit.documentId, {
        ...(hit.metadata as SearchHit),
        id: hit.documentId,
        _lexicalScore: 0,
        _semanticScore: semanticScore,
        _score: semanticScore * input.semanticWeight,
      });
    });

    const hits = [...combined.values()]
      .sort((left, right) => (right._score ?? 0) - (left._score ?? 0))
      .slice(0, input.limit);

    return { hits };
  }

  private normalizeScores(scores: number[]) {
    if (!scores.length) {
      return [];
    }

    const max = Math.max(...scores, 0.0001);
    return scores.map((score) => score / max);
  }
}
