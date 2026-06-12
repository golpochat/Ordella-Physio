import type { SupportedIndexName } from "@/config/search.config";
import { INDEX_SEARCH_FIELDS } from "@/config/search.config";
import type {
  SearchDocument,
  SearchOptions,
  SearchProviderResult,
} from "@/services/providers/search-provider.interface";
import { DEFAULT_RANKING_RULES, type RankingRules } from "@/services/relevance.service";

type IndexedDocument = SearchDocument & { _indexedAt: number };

function tokenize(value: string, stopwords: Set<string>) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter((token) => token.length > 0 && !stopwords.has(token));
}

function documentText(document: IndexedDocument, indexName: SupportedIndexName) {
  const fields = INDEX_SEARCH_FIELDS[indexName] ?? Object.keys(document);
  const values = fields
    .map((field) => document[field])
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map((value) => String(value));

  if (typeof document.searchableText === "string") {
    values.push(document.searchableText);
  }

  return values.join(" ").toLowerCase();
}

function resolveIndexName(indexKey: string): SupportedIndexName {
  const indexName = indexKey.split(":").pop() ?? "patients";
  return indexName as SupportedIndexName;
}

function scoreDocument(
  document: IndexedDocument,
  queryTokens: string[],
  indexName: SupportedIndexName,
  rankingRules: RankingRules,
) {
  if (queryTokens.length === 0) {
    return 0;
  }

  const haystack = documentText(document, indexName);
  let score = 0;
  const fields = INDEX_SEARCH_FIELDS[indexName] ?? [];

  for (const token of queryTokens) {
    if (haystack === token) {
      score += rankingRules.exactMatchBoost;
    } else if (haystack.includes(token)) {
      score += rankingRules.typoMatchBoost;
    }

    for (const field of fields) {
      const value = document[field];
      if (typeof value !== "string") {
        continue;
      }

      const normalized = value.toLowerCase();
      const fieldBoost = rankingRules.fieldBoosts[field] ?? 1;

      if (normalized === token) {
        score += rankingRules.exactMatchBoost * fieldBoost;
      } else if (normalized.startsWith(token)) {
        score += rankingRules.prefixMatchBoost * fieldBoost;
      } else if (normalized.includes(token)) {
        score += rankingRules.typoMatchBoost * fieldBoost;
      }
    }
  }

  if (typeof document.label === "string") {
    const label = document.label.toLowerCase();
    for (const token of queryTokens) {
      if (label === token) {
        score += rankingRules.exactMatchBoost * (rankingRules.fieldBoosts.label ?? 5);
      } else if (label.startsWith(token)) {
        score += rankingRules.prefixMatchBoost * (rankingRules.fieldBoosts.label ?? 5);
      }
    }
  }

  return score;
}

export class InMemorySearchEngine {
  private readonly indexes = new Map<string, Map<string, IndexedDocument>>();

  private getBucket(indexKey: string) {
    const existing = this.indexes.get(indexKey);
    if (existing) {
      return existing;
    }

    const bucket = new Map<string, IndexedDocument>();
    this.indexes.set(indexKey, bucket);
    return bucket;
  }

  indexDocument(indexKey: string, document: SearchDocument) {
    const bucket = this.getBucket(indexKey);
    bucket.set(document.id, { ...document, _indexedAt: Date.now() });
  }

  updateDocument(indexKey: string, document: SearchDocument) {
    this.indexDocument(indexKey, document);
  }

  deleteDocument(indexKey: string, documentId: string) {
    this.getBucket(indexKey).delete(documentId);
  }

  search(indexKey: string, query: string, options: SearchOptions = {}): SearchProviderResult {
    const indexName = resolveIndexName(indexKey);
    const bucket = this.getBucket(indexKey);
    const stopwords = new Set((options.stopwords ?? []).map((word) => word.toLowerCase()));
    const queryTokens = options.expandedTokens?.length
      ? options.expandedTokens
      : tokenize(query, stopwords);
    const rankingRules = options.rankingRules ?? DEFAULT_RANKING_RULES;
    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;

    const ranked = [...bucket.values()]
      .map((document) => ({
        document,
        score: scoreDocument(document, queryTokens, indexName, rankingRules),
      }))
      .filter((entry) => entry.score > 0 || queryTokens.length === 0)
      .sort((left, right) => right.score - left.score || right.document._indexedAt - left.document._indexedAt);

    const filtered = ranked.filter(({ document }) => this.matchesFilters(document, options.filters));
    const slice = filtered.slice(offset, offset + limit);

    return {
      total: filtered.length,
      hits: slice.map(({ document, score }) => ({
        ...document,
        _score: score,
      })),
    };
  }

  autocomplete(indexKey: string, prefix: string, options: SearchOptions = {}): SearchProviderResult {
    const indexName = resolveIndexName(indexKey);
    const bucket = this.getBucket(indexKey);
    const normalizedPrefix = prefix.trim().toLowerCase();
    const rankingRules = options.rankingRules ?? DEFAULT_RANKING_RULES;
    const limit = options.limit ?? 10;

    if (!normalizedPrefix) {
      return { hits: [], total: 0 };
    }

    const ranked = [...bucket.values()]
      .map((document) => {
        const fields = INDEX_SEARCH_FIELDS[indexName] ?? [];
        let score = 0;

        for (const field of fields) {
          const value = document[field];
          const fieldBoost = rankingRules.fieldBoosts[field] ?? 1;
          if (typeof value === "string" && value.toLowerCase().startsWith(normalizedPrefix)) {
            score += rankingRules.prefixMatchBoost * fieldBoost;
          }
        }

        if (typeof document.label === "string" && document.label.toLowerCase().startsWith(normalizedPrefix)) {
          score += rankingRules.prefixMatchBoost * (rankingRules.fieldBoosts.label ?? 5);
        }

        return { document, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score || right.document._indexedAt - left.document._indexedAt)
      .slice(0, limit);

    return {
      total: ranked.length,
      hits: ranked.map(({ document, score }) => ({ ...document, _score: score })),
    };
  }

  private matchesFilters(document: IndexedDocument, filters?: Record<string, unknown>) {
    if (!filters) {
      return true;
    }

    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return true;
      }

      return String(document[key] ?? "") === String(value);
    });
  }
}
