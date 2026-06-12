export type FederatedIndexName = "patients" | "appointments" | "invoices" | "staff";

export type SearchIndexName = FederatedIndexName | "products";

export type SearchHit = {
  id: string;
  _score?: number;
  label?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
};

export type SearchResponse = {
  hits: SearchHit[];
  total: number;
  limit: number;
  offset: number;
};

export type AutocompleteResponse = SearchResponse;

export type IndexDocumentInput = {
  document: Record<string, unknown> & { id: string };
};

export type IndexMutationResponse = {
  success: boolean;
  message: string;
  id: string;
};

export type FederatedSearchGroupedResponse = Record<FederatedIndexName, SearchHit[]>;

export type FederatedTopHitsResponse = {
  grouped: FederatedSearchGroupedResponse;
  topHits: Array<SearchHit & { indexName: SearchIndexName }>;
};

export type SearchAnalyticsResponse = {
  topQueries: Array<{ indexName: string; query: string; count: number }>;
  zeroResultQueries: Array<{ indexName: string; query: string; count: number }>;
  slowestQueries: Array<{ indexName: string; query: string; durationMs: number }>;
  hitsPerIndex: Record<string, number>;
  totalQueries: number;
};

export type ReindexResponse = {
  message: string;
  indexed?: number;
  indexName?: string;
};

export type SemanticSearchMode = "semantic" | "hybrid";

export type HybridSearchResponse = SearchResponse & {
  mode?: SemanticSearchMode | "lexical";
  debug?: {
    lexicalHits: SearchHit[];
    semanticHits: Array<{ documentId: string; score: number; metadata?: Record<string, unknown> }>;
    weights?: { lexical: number; semantic: number };
  };
};

export type FederatedSemanticSearchResponse = {
  grouped: FederatedSearchGroupedResponse;
  mode: SemanticSearchMode;
};

export type SearchSuggestionsResponse = {
  didYouMean: { original: string; suggestion: string; confidence: number } | null;
  relatedSearches: Array<{ query: string; count: number }>;
  queryExpansion: { original: string; expandedTerms: string[] };
};

export type SemanticSearchConfig = {
  embeddingModel: string;
  dimensions: number;
  provider: string;
  settings: {
    semanticEnabled?: boolean;
    lexicalWeight?: number;
    semanticWeight?: number;
  };
};

export type SemanticSearchConfigResponse = SemanticSearchConfig & {
  message?: string;
};
