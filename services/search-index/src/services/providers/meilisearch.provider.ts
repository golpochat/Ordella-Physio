import { Injectable, Logger } from "@nestjs/common";
import { InMemorySearchEngine } from "@/services/providers/in-memory-search.engine";
import type {
  SearchDocument,
  SearchOptions,
  SearchProviderAdapter,
  SearchProviderResult,
} from "@/services/providers/search-provider.interface";

/**
 * Dev stub backed by in-memory storage.
 * TODO: Replace with Meilisearch HTTP client (`MEILISEARCH_HOST`, `MEILISEARCH_API_KEY`).
 */
@Injectable()
export class MeilisearchProvider implements SearchProviderAdapter {
  private readonly logger = new Logger(MeilisearchProvider.name);
  private readonly engine = new InMemorySearchEngine();

  indexDocument(indexKey: string, document: SearchDocument): Promise<void> {
    this.logger.debug(`[meilisearch-stub] index ${indexKey}/${document.id}`);
    this.engine.indexDocument(indexKey, document);
    return Promise.resolve();
  }

  updateDocument(indexKey: string, document: SearchDocument): Promise<void> {
    this.engine.updateDocument(indexKey, document);
    return Promise.resolve();
  }

  deleteDocument(indexKey: string, documentId: string): Promise<void> {
    this.engine.deleteDocument(indexKey, documentId);
    return Promise.resolve();
  }

  search(indexKey: string, query: string, options: SearchOptions): Promise<SearchProviderResult> {
    return Promise.resolve(this.engine.search(indexKey, query, options));
  }

  autocomplete(indexKey: string, prefix: string, options: SearchOptions = {}): Promise<SearchProviderResult> {
    return Promise.resolve(this.engine.autocomplete(indexKey, prefix, options));
  }
}
