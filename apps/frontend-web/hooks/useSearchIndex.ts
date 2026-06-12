"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createSearchIndexApi } from "@/lib/search-index-api";
import type {
  FederatedIndexName,
  IndexDocumentInput,
  SearchIndexName,
  SemanticSearchMode,
} from "@/lib/search-index-types";

export function useSearchIndexApi() {
  const api = useApi();
  return useMemo(() => createSearchIndexApi(api), [api]);
}

export function useSearchQuery(
  indexName: SearchIndexName,
  query: string,
  options?: { enabled?: boolean; limit?: number; offset?: number },
) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["search-index", indexName, query, options?.limit, options?.offset],
    queryFn: () =>
      searchApi.search(indexName, {
        q: query,
        limit: options?.limit,
        offset: options?.offset,
      }),
    enabled: Boolean(query.trim()) && (options?.enabled ?? true),
  });
}

export function useSearchAutocomplete(
  indexName: SearchIndexName,
  prefix: string,
  options?: { enabled?: boolean; limit?: number },
) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["search-autocomplete", indexName, prefix, options?.limit],
    queryFn: () =>
      searchApi.autocomplete(indexName, {
        prefix,
        limit: options?.limit ?? 5,
      }),
    enabled: Boolean(prefix.trim()) && (options?.enabled ?? true),
  });
}

const SEMANTIC_SEARCH_STORAGE_KEY = "ordella.semanticSearchEnabled";

export function useSemanticSearchPreference() {
  const enabled =
    typeof window !== "undefined" &&
    window.localStorage.getItem(SEMANTIC_SEARCH_STORAGE_KEY) === "true";

  function setEnabled(value: boolean) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SEMANTIC_SEARCH_STORAGE_KEY, value ? "true" : "false");
    }
  }

  return { enabled, setEnabled, storageKey: SEMANTIC_SEARCH_STORAGE_KEY };
}

export function useSemanticSearch(
  indexName: SearchIndexName,
  query: string,
  options?: { enabled?: boolean; limit?: number; mode?: SemanticSearchMode; debug?: boolean },
) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["semantic-search", indexName, query, options?.limit, options?.mode, options?.debug],
    enabled: Boolean(query.trim()) && (options?.enabled ?? true),
    queryFn: () =>
      searchApi.semanticSearch(indexName, {
        q: query,
        limit: options?.limit,
        mode: options?.mode ?? "hybrid",
        debug: options?.debug,
      }),
  });
}

export function useFederatedSemanticSearch(
  query: string,
  options?: { enabled?: boolean; limit?: number; mode?: SemanticSearchMode },
) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["federated-semantic-search", query, options?.limit, options?.mode],
    enabled: Boolean(query.trim()) && (options?.enabled ?? true),
    queryFn: () =>
      searchApi.federatedSemanticSearch({
        q: query,
        limit: options?.limit ?? 5,
        mode: options?.mode ?? "hybrid",
      }),
  });
}

export function useSearchSuggestions(
  indexName: FederatedIndexName,
  query: string,
  enabled = true,
) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["search-suggestions", indexName, query],
    enabled: enabled && query.trim().length > 0,
    queryFn: () => searchApi.getSearchSuggestions(indexName, { q: query }),
  });
}

export function useSemanticConfig(indexName: SearchIndexName) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["semantic-config", indexName],
    queryFn: () => searchApi.getSemanticConfig(indexName),
  });
}

export function useFederatedSearchAutocomplete(prefix: string, enabled = true, semantic = false) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["federated-search-autocomplete", prefix, semantic],
    enabled: enabled && prefix.trim().length >= 2,
    queryFn: async () => {
      if (semantic) {
        const result = await searchApi.federatedSemanticSearch({ q: prefix, limit: 5, mode: "hybrid" });
        return { grouped: result.grouped, mode: result.mode };
      }

      const result = await searchApi.federatedTopHits({ q: prefix, limit: 5 });
      return { grouped: result.grouped, mode: "lexical" as const };
    },
  });
}

export function useFederatedSearch(query: string, enabled = true, semantic = false) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["federated-search", query, semantic],
    enabled: enabled && query.trim().length > 0,
    queryFn: async () => {
      if (semantic) {
        const result = await searchApi.federatedSemanticSearch({ q: query, limit: 10, mode: "hybrid" });
        return { grouped: result.grouped, mode: result.mode };
      }

      const grouped = await searchApi.federatedSearch({ q: query, limit: 10 });
      return { grouped, mode: "lexical" as const };
    },
  });
}

export function useSearchAnalytics(filters: { dateStart?: string; dateEnd?: string } = {}) {
  const searchApi = useSearchIndexApi();

  return useQuery({
    queryKey: ["search-analytics", filters],
    queryFn: () => searchApi.getAnalytics(filters),
  });
}

export function useReindexIndex(indexName: SearchIndexName) {
  const searchApi = useSearchIndexApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => searchApi.reindex(indexName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["search-index"] });
      await queryClient.invalidateQueries({ queryKey: ["federated-search"] });
    },
  });
}

export function useReindexAll() {
  const searchApi = useSearchIndexApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => searchApi.reindexAll(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["search-index"] });
      await queryClient.invalidateQueries({ queryKey: ["federated-search"] });
    },
  });
}

export function useIndexDocument(indexName: SearchIndexName) {
  const searchApi = useSearchIndexApi();

  return useMutation({
    mutationFn: (input: IndexDocumentInput) => searchApi.indexDocument(indexName, input),
  });
}
