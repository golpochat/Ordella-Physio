import { Injectable, Logger } from "@nestjs/common";
import type { SearchProviderName } from "@/generated/prisma";
import {
  buildTenantIndexKey,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_SEARCH_PROVIDER,
  type SupportedIndexName,
} from "@/config/search.config";
import { SearchIndexConfigRepository } from "@/repositories/search-index-config.repository";
import { SearchQueryLogRepository } from "@/repositories/search-query-log.repository";
import { RelevanceService } from "@/services/relevance.service";
import { SearchProviderRegistryService } from "@/services/search-provider-registry.service";
import { SynonymService } from "@/services/synonym.service";
import { VectorIndexService } from "@/services/vector-index.service";
import type { SearchDocument } from "@/services/providers/search-provider.interface";
import { indexNotConfiguredError, searchProviderError } from "@/utils/search-errors";
import {
  validateIndexDocument,
  validateIndexName,
  validateIndexRequestBody,
} from "@/validators/index.validator";
import { validateAutocompleteQuery, validateSearchQuery } from "@/validators/search.validator";

@Injectable()
export class SearchIndexService {
  private readonly logger = new Logger(SearchIndexService.name);

  constructor(
    private readonly configRepository: SearchIndexConfigRepository,
    private readonly providerRegistry: SearchProviderRegistryService,
    private readonly relevanceService: RelevanceService,
    private readonly synonymService: SynonymService,
    private readonly queryLogRepository: SearchQueryLogRepository,
    private readonly vectorIndexService: VectorIndexService,
  ) {}

  async indexDocument(input: {
    tenantId: string;
    indexName: string;
    body: Record<string, unknown>;
  }) {
    const indexName = validateIndexName(input.indexName);
    const document = validateIndexRequestBody(input.body);
    return this.indexDocumentDirect(input.tenantId, indexName, document);
  }

  async indexDocumentDirect(
    tenantId: string,
    indexName: string,
    documentInput: Record<string, unknown>,
  ) {
    const validatedIndex = validateIndexName(indexName);
    const document = validateIndexDocument(documentInput);
    const config = await this.resolveIndexConfig(tenantId, validatedIndex);
    const provider = this.providerRegistry.getProvider(config.provider);
    const indexKey = buildTenantIndexKey(tenantId, validatedIndex);

    try {
      await provider.indexDocument(indexKey, document);
      await this.vectorIndexService.indexDocumentVector({
        tenantId,
        indexName: validatedIndex as SupportedIndexName,
        document: document as Record<string, unknown>,
      });
      return { success: true, message: "Document indexed.", id: document.id };
    } catch (error) {
      this.logger.warn(
        `Index failed for ${indexKey}/${document.id}`,
        error instanceof Error ? error.message : error,
      );
      throw searchProviderError();
    }
  }

  async updateDocument(input: {
    tenantId: string;
    indexName: string;
    document: Record<string, unknown>;
  }) {
    const indexName = validateIndexName(input.indexName);
    const document = validateIndexDocument(input.document);
    const config = await this.resolveIndexConfig(input.tenantId, indexName);
    const provider = this.providerRegistry.getProvider(config.provider);
    const indexKey = buildTenantIndexKey(input.tenantId, indexName);

    try {
      await provider.updateDocument(indexKey, document);
      await this.vectorIndexService.indexDocumentVector({
        tenantId: input.tenantId,
        indexName: indexName as SupportedIndexName,
        document: document as Record<string, unknown>,
      });
      return { success: true, message: "Document updated.", id: document.id };
    } catch (error) {
      this.logger.warn(
        `Update failed for ${indexKey}/${document.id}`,
        error instanceof Error ? error.message : error,
      );
      throw searchProviderError();
    }
  }

  async deleteDocument(input: { tenantId: string; indexName: string; documentId: string }) {
    const indexName = validateIndexName(input.indexName);
    const documentId = input.documentId.trim();

    if (!documentId) {
      throw indexNotConfiguredError("Document id is required.");
    }

    const config = await this.resolveIndexConfig(input.tenantId, indexName);
    const provider = this.providerRegistry.getProvider(config.provider);
    const indexKey = buildTenantIndexKey(input.tenantId, indexName);

    try {
      await provider.deleteDocument(indexKey, documentId);
      await this.vectorIndexService.deleteVector({
        tenantId: input.tenantId,
        indexName: indexName as SupportedIndexName,
        documentId,
      });
      return { success: true, message: "Document deleted.", id: documentId };
    } catch (error) {
      this.logger.warn(
        `Delete failed for ${indexKey}/${documentId}`,
        error instanceof Error ? error.message : error,
      );
      throw searchProviderError();
    }
  }

  async search(input: {
    tenantId: string;
    indexName: string;
    query: string;
    filters?: string | Record<string, unknown>;
    limit?: number;
    offset?: number;
    logQuery?: boolean;
  }) {
    const startedAt = Date.now();
    const indexName = validateIndexName(input.indexName);
    const parsed = validateSearchQuery({
      q: input.query,
      limit: input.limit,
      offset: input.offset,
      filters: input.filters,
    });
    const searchContext = await this.buildSearchContext(input.tenantId, indexName, parsed.q);
    const config = await this.resolveIndexConfig(input.tenantId, indexName);
    const provider = this.providerRegistry.getProvider(config.provider);
    const indexKey = buildTenantIndexKey(input.tenantId, indexName);

    try {
      const result = await provider.search(indexKey, parsed.q, {
        limit: parsed.limit,
        offset: parsed.offset,
        filters: parsed.filters,
        ...searchContext,
      });

      const response = {
        hits: result.hits,
        total: result.total,
        limit: parsed.limit ?? DEFAULT_SEARCH_LIMIT,
        offset: parsed.offset ?? 0,
      };

      if (input.logQuery !== false) {
        await this.queryLogRepository.create({
          tenantId: input.tenantId,
          indexName,
          query: parsed.q,
          filters: parsed.filters,
          totalHits: result.total,
          durationMs: Date.now() - startedAt,
        });
      }

      return response;
    } catch (error) {
      this.logger.warn(
        `Search failed for ${indexKey}`,
        error instanceof Error ? error.message : error,
      );
      throw searchProviderError();
    }
  }

  async autocomplete(input: {
    tenantId: string;
    indexName: string;
    prefix: string;
    limit?: number;
  }) {
    const indexName = validateIndexName(input.indexName);
    const parsed = validateAutocompleteQuery({
      prefix: input.prefix,
      limit: input.limit,
    });
    const searchContext = await this.buildSearchContext(input.tenantId, indexName, parsed.prefix);
    const config = await this.resolveIndexConfig(input.tenantId, indexName);
    const provider = this.providerRegistry.getProvider(config.provider);
    const indexKey = buildTenantIndexKey(input.tenantId, indexName);

    try {
      const result = await provider.autocomplete(indexKey, parsed.prefix, {
        limit: parsed.limit ?? 10,
        ...searchContext,
      });

      return {
        hits: result.hits,
        total: result.total,
        limit: parsed.limit ?? 10,
        offset: 0,
      };
    } catch (error) {
      this.logger.warn(
        `Autocomplete failed for ${indexKey}`,
        error instanceof Error ? error.message : error,
      );
      throw searchProviderError();
    }
  }

  private async buildSearchContext(tenantId: string, indexName: SupportedIndexName, query: string) {
    const [rankingRules, synonyms, stopwords] = await Promise.all([
      this.relevanceService.getRankingRules(tenantId, indexName),
      this.synonymService.getSynonyms(tenantId, indexName),
      this.synonymService.getStopwords(tenantId, indexName),
    ]);

    return {
      rankingRules,
      synonyms,
      stopwords,
      expandedTokens: this.synonymService.expandQuery(query, synonyms),
    };
  }

  private async resolveIndexConfig(tenantId: string, indexName: string) {
    const existing = await this.configRepository.findByTenantAndIndex(tenantId, indexName);
    if (existing) {
      return existing;
    }

    const provider = DEFAULT_SEARCH_PROVIDER as SearchProviderName;
    return this.configRepository.create({
      tenantId,
      indexName,
      provider,
      settings: { autoProvisioned: true },
    });
  }
}
