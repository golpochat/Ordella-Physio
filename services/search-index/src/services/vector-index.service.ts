import { Injectable, Logger } from "@nestjs/common";
import { buildTenantIndexKey, type SupportedIndexName } from "@/config/search.config";
import { VectorIndexConfigRepository } from "@/repositories/vector-index-config.repository";
import { EmbeddingService } from "@/services/embedding.service";
import type { SemanticSearchSettings } from "@/models/VectorIndexConfig";
import { cosineSimilarity } from "@/utils/vector-math";
import { HttpError } from "@ordella/errors";
import { semanticSearchDisabledError, vectorIndexError } from "@/utils/search-errors";
import { validateIndexName } from "@/validators/index.validator";
import { DEFAULT_LEXICAL_WEIGHT, DEFAULT_SEMANTIC_WEIGHT } from "@/config/embedding.config";

type StoredVector = {
  documentId: string;
  vector: number[];
  metadata: Record<string, unknown>;
};

type VectorStore = Map<string, StoredVector>;

@Injectable()
export class VectorIndexService {
  private readonly logger = new Logger(VectorIndexService.name);
  private readonly store = new Map<string, VectorStore>();

  constructor(
    private readonly vectorConfigRepository: VectorIndexConfigRepository,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async getSemanticSettings(tenantId: string, indexName: string): Promise<SemanticSearchSettings> {
    const config = await this.resolveVectorConfig(tenantId, indexName);
    const settings = (config.settings ?? {}) as SemanticSearchSettings;

    return {
      semanticEnabled: settings.semanticEnabled ?? false,
      lexicalWeight: settings.lexicalWeight ?? DEFAULT_LEXICAL_WEIGHT,
      semanticWeight: settings.semanticWeight ?? DEFAULT_SEMANTIC_WEIGHT,
    };
  }

  async setSemanticSettings(
    tenantId: string,
    indexNameInput: string,
    settings: SemanticSearchSettings,
  ) {
    const indexName = validateIndexName(indexNameInput);
    const config = await this.resolveVectorConfig(tenantId, indexName);
    const current = (config.settings ?? {}) as Record<string, unknown>;

    const lexicalWeight = this.clampWeight(settings.lexicalWeight ?? DEFAULT_LEXICAL_WEIGHT);
    const semanticWeight = this.clampWeight(settings.semanticWeight ?? DEFAULT_SEMANTIC_WEIGHT);
    const total = lexicalWeight + semanticWeight;
    const normalizedLexical = total > 0 ? lexicalWeight / total : DEFAULT_LEXICAL_WEIGHT;
    const normalizedSemantic = total > 0 ? semanticWeight / total : DEFAULT_SEMANTIC_WEIGHT;

    const nextSettings = {
      ...current,
      semanticEnabled: settings.semanticEnabled ?? current.semanticEnabled ?? false,
      lexicalWeight: normalizedLexical,
      semanticWeight: normalizedSemantic,
    };

    await this.vectorConfigRepository.updateSettings(config.id, nextSettings);

    return {
      message: "Semantic search settings updated.",
      settings: nextSettings,
      embeddingModel: config.embeddingModel,
      dimensions: config.dimensions,
      provider: config.provider,
    };
  }

  async getVectorConfig(tenantId: string, indexName: string) {
    const config = await this.resolveVectorConfig(tenantId, indexName);
    return {
      embeddingModel: config.embeddingModel,
      dimensions: config.dimensions,
      provider: config.provider,
      settings: await this.getSemanticSettings(tenantId, indexName),
    };
  }

  async assertSemanticEnabled(tenantId: string, indexName: string) {
    const settings = await this.getSemanticSettings(tenantId, indexName);
    if (!settings.semanticEnabled) {
      throw semanticSearchDisabledError();
    }
  }

  async indexVector(input: {
    tenantId: string;
    indexName: SupportedIndexName;
    documentId: string;
    vector: number[];
    metadata?: Record<string, unknown>;
  }) {
    try {
      const indexKey = buildTenantIndexKey(input.tenantId, input.indexName);
      const bucket = this.getBucket(indexKey);
      bucket.set(input.documentId, {
        documentId: input.documentId,
        vector: input.vector,
        metadata: input.metadata ?? {},
      });
    } catch (error) {
      this.logger.warn(
        `Vector index failed for ${input.documentId}`,
        error instanceof Error ? error.message : error,
      );
      throw vectorIndexError();
    }
  }

  async indexDocumentVector(input: {
    tenantId: string;
    indexName: SupportedIndexName;
    document: Record<string, unknown>;
  }) {
    const documentId = String(input.document.id ?? "").trim();
    if (!documentId) {
      return;
    }

    const config = await this.resolveVectorConfig(input.tenantId, input.indexName);
    const text = this.embeddingService.buildDocumentText(input.indexName, input.document);
    const vector = this.embeddingService.embedText(text, {
      model: config.embeddingModel,
      dimensions: config.dimensions,
    });

    await this.indexVector({
      tenantId: input.tenantId,
      indexName: input.indexName,
      documentId,
      vector,
      metadata: input.document,
    });
  }

  async searchVector(input: {
    tenantId: string;
    indexName: SupportedIndexName;
    queryVector: number[];
    limit?: number;
  }) {
    await this.assertSemanticEnabled(input.tenantId, input.indexName);

    try {
      const indexKey = buildTenantIndexKey(input.tenantId, input.indexName);
      const bucket = this.getBucket(indexKey);
      const limit = input.limit ?? 10;

      const ranked = [...bucket.values()]
        .map((entry) => ({
          documentId: entry.documentId,
          score: cosineSimilarity(input.queryVector, entry.vector),
          metadata: entry.metadata,
        }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);

      return ranked;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      this.logger.warn(
        `Vector search failed for ${input.indexName}`,
        error instanceof Error ? error.message : error,
      );
      throw vectorIndexError();
    }
  }

  async deleteVector(input: {
    tenantId: string;
    indexName: SupportedIndexName;
    documentId: string;
  }) {
    const indexKey = buildTenantIndexKey(input.tenantId, input.indexName);
    const bucket = this.getBucket(indexKey);
    bucket.delete(input.documentId);
  }

  async clearIndex(tenantId: string, indexName: SupportedIndexName) {
    const indexKey = buildTenantIndexKey(tenantId, indexName);
    this.store.delete(indexKey);
  }

  private getBucket(indexKey: string): VectorStore {
    if (!this.store.has(indexKey)) {
      this.store.set(indexKey, new Map());
    }

    return this.store.get(indexKey)!;
  }

  private async resolveVectorConfig(tenantId: string, indexName: string) {
    const validated = validateIndexName(indexName);
    const existing = await this.vectorConfigRepository.findByTenantAndIndex(tenantId, validated);
    if (existing) {
      return existing;
    }

    return this.vectorConfigRepository.create({
      tenantId,
      indexName: validated,
      settings: {
        semanticEnabled: false,
        lexicalWeight: DEFAULT_LEXICAL_WEIGHT,
        semanticWeight: DEFAULT_SEMANTIC_WEIGHT,
        autoProvisioned: true,
      },
    });
  }

  private clampWeight(value: number) {
    if (!Number.isFinite(value)) {
      return DEFAULT_LEXICAL_WEIGHT;
    }

    return Math.min(1, Math.max(0, value));
  }
}
