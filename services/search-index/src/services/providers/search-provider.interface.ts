import type { RankingRules } from "@/services/relevance.service";
import type { SynonymMap } from "@/services/synonym.service";

export type SearchDocument = Record<string, unknown> & { id: string };

export type SearchOptions = {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
  rankingRules?: RankingRules;
  synonyms?: SynonymMap;
  stopwords?: string[];
  expandedTokens?: string[];
};

export type SearchHit = SearchDocument & { _score: number };

export type SearchProviderResult = {
  hits: SearchHit[];
  total: number;
};

export interface SearchProviderAdapter {
  indexDocument(indexKey: string, document: SearchDocument): Promise<void>;
  updateDocument(indexKey: string, document: SearchDocument): Promise<void>;
  deleteDocument(indexKey: string, documentId: string): Promise<void>;
  search(indexKey: string, query: string, options: SearchOptions): Promise<SearchProviderResult>;
  autocomplete(indexKey: string, prefix: string, options?: SearchOptions): Promise<SearchProviderResult>;
}
