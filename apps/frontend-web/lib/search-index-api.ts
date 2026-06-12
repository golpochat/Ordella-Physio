import type { createApiClient } from "@/lib/api-client";
import type {
  AutocompleteResponse,
  IndexDocumentInput,
  IndexMutationResponse,
  SearchIndexName,
  FederatedSearchGroupedResponse,
  FederatedTopHitsResponse,
  ReindexResponse,
  SearchAnalyticsResponse,
  SearchResponse,
  HybridSearchResponse,
  FederatedSemanticSearchResponse,
  SearchSuggestionsResponse,
  SemanticSearchConfig,
  SemanticSearchConfigResponse,
  SemanticSearchMode,
  FederatedIndexName,
} from "@/lib/search-index-types";

export function createSearchIndexApi(api: ReturnType<typeof createApiClient>) {
  return {
    search(indexName: SearchIndexName, params: { q: string; limit?: number; offset?: number }) {
      return api.get<SearchResponse>("searchIndex", `/search/${indexName}`, { params });
    },

    autocomplete(indexName: SearchIndexName, params: { prefix: string; limit?: number }) {
      return api.get<AutocompleteResponse>("searchIndex", `/search/${indexName}/autocomplete`, {
        params,
      });
    },

    indexDocument(indexName: SearchIndexName, input: IndexDocumentInput) {
      return api.post<IndexMutationResponse>("searchIndex", `/index/${indexName}`, input);
    },

    updateDocument(indexName: SearchIndexName, id: string, input: IndexDocumentInput) {
      return api.put<IndexMutationResponse>("searchIndex", `/index/${indexName}/${id}`, input);
    },

    deleteDocument(indexName: SearchIndexName, id: string) {
      return api.delete<IndexMutationResponse>("searchIndex", `/index/${indexName}/${id}`);
    },

    federatedSearch(params: { q: string; limit?: number }) {
      return api.get<FederatedSearchGroupedResponse>("searchIndex", "/search/federated", { params });
    },

    federatedTopHits(params: { q: string; limit?: number }) {
      return api.get<FederatedTopHitsResponse>("searchIndex", "/search/federated", {
        params: { ...params, mode: "top" },
      });
    },

    reindex(indexName: SearchIndexName) {
      return api.post<ReindexResponse>("searchIndex", `/admin/reindex/${indexName}`, {});
    },

    reindexAll() {
      return api.post<ReindexResponse>("searchIndex", "/admin/reindex-all", {});
    },

    setRankingRules(indexName: SearchIndexName, rules: Record<string, unknown>) {
      return api.post("searchIndex", `/admin/ranking-rules/${indexName}`, rules);
    },

    setSynonyms(indexName: SearchIndexName, synonyms: Record<string, string[]>) {
      return api.post("searchIndex", `/admin/synonyms/${indexName}`, synonyms);
    },

    setStopwords(indexName: SearchIndexName, stopwords: string[]) {
      return api.post("searchIndex", `/admin/stopwords/${indexName}`, { stopwords });
    },

    getAnalytics(filters: { dateStart?: string; dateEnd?: string } = {}) {
      return api.get<SearchAnalyticsResponse>("searchIndex", "/admin/analytics", { params: filters });
    },

    semanticSearch(
      indexName: SearchIndexName,
      params: { q: string; limit?: number; offset?: number; mode?: SemanticSearchMode; debug?: boolean },
    ) {
      return api.get<HybridSearchResponse>("searchIndex", `/semantic-search/${indexName}`, { params });
    },

    federatedSemanticSearch(params: {
      q: string;
      limit?: number;
      mode?: SemanticSearchMode;
      debug?: boolean;
    }) {
      return api.get<FederatedSemanticSearchResponse>("searchIndex", "/semantic-search/federated", {
        params,
      });
    },

    getSearchSuggestions(indexName: FederatedIndexName | SearchIndexName, params: { q: string }) {
      return api.get<SearchSuggestionsResponse>(
        "searchIndex",
        `/semantic-search/${indexName}/suggestions`,
        { params },
      );
    },

    getSemanticConfig(indexName: SearchIndexName) {
      return api.get<SemanticSearchConfig>("searchIndex", `/admin/semantic-config/${indexName}`);
    },

    setSemanticConfig(
      indexName: SearchIndexName,
      config: { semanticEnabled: boolean; lexicalWeight?: number; semanticWeight?: number },
    ) {
      return api.post<SemanticSearchConfigResponse>(
        "searchIndex",
        `/admin/semantic-config/${indexName}`,
        config,
      );
    },
  };
}
