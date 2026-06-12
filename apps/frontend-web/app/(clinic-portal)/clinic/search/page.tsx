"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResultHighlight } from "@/components/search/SearchResultHighlight";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoading } from "@/components/patient-portal/page-state";
import {
  useFederatedSearch,
  useSearchQuery,
  useSearchSuggestions,
  useSemanticSearch,
} from "@/hooks/useSearchIndex";
import type { FederatedIndexName, SearchHit, SearchIndexName } from "@/lib/search-index-types";
import { WithPermission } from "@/lib/auth/withPermission";

const INDEX_OPTIONS: SearchIndexName[] = ["patients", "appointments", "invoices", "staff", "products"];

function resolveDetailHref(indexName: SearchIndexName, id: string) {
  switch (indexName) {
    case "patients":
      return `/clinic/patients/${id}`;
    case "appointments":
      return `/clinic/appointments/${id}`;
    case "invoices":
      return `/clinic/billing/${id}`;
    case "staff":
      return `/clinic/staff/${id}`;
    case "products":
      return `/clinic/marketplace/${id}`;
    default:
      return "#";
  }
}

function hitLabel(hit: SearchHit) {
  if (typeof hit.label === "string") {
    return hit.label;
  }

  return [hit.firstName, hit.lastName].filter(Boolean).join(" ") || String(hit.id);
}

export default function ClinicSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const semanticEnabled = searchParams.get("semantic") === "true";
  const indexName = (searchParams.get("indexName")?.trim().toLowerCase() ??
    "all") as SearchIndexName | "all";
  const isDev = process.env.NODE_ENV === "development";

  const federatedQuery = useFederatedSearch(
    query,
    indexName === "all" && query.length > 0,
    semanticEnabled,
  );
  const singleIndexQuery = useSearchQuery(indexName as SearchIndexName, query, {
    enabled: indexName !== "all" && query.length > 0 && !semanticEnabled,
    limit: 50,
  });
  const semanticSingleQuery = useSemanticSearch(indexName as SearchIndexName, query, {
    enabled: indexName !== "all" && query.length > 0 && semanticEnabled,
    limit: 50,
    mode: "hybrid",
    debug: isDev,
  });

  const suggestionIndex = (indexName === "all" ? "patients" : indexName) as FederatedIndexName;
  const suggestionsQuery = useSearchSuggestions(suggestionIndex, query, query.length > 0);

  const hits = useMemo(() => {
    if (indexName === "all") {
      const grouped = federatedQuery.data?.grouped;
      if (!grouped) {
        return [] as Array<SearchHit & { indexName: SearchIndexName }>;
      }

      return (["patients", "appointments", "invoices", "staff"] as FederatedIndexName[]).flatMap(
        (name) =>
          (grouped[name] ?? []).map((hit: SearchHit) => ({
            ...hit,
            indexName: name,
          })),
      );
    }

    if (semanticEnabled) {
      return (semanticSingleQuery.data?.hits ?? []).map((hit) => ({
        ...hit,
        indexName: indexName as SearchIndexName,
      }));
    }

    return (singleIndexQuery.data?.hits ?? []).map((hit) => ({
      ...hit,
      indexName: indexName as SearchIndexName,
    }));
  }, [
    federatedQuery.data?.grouped,
    indexName,
    semanticEnabled,
    semanticSingleQuery.data?.hits,
    singleIndexQuery.data?.hits,
  ]);

  const isLoading =
    indexName === "all"
      ? federatedQuery.isLoading
      : semanticEnabled
        ? semanticSingleQuery.isLoading
        : singleIndexQuery.isLoading;

  const debugInfo = semanticEnabled ? semanticSingleQuery.data?.debug : undefined;

  function buildSearchHref(nextQuery: string, tab: SearchIndexName | "all" = indexName) {
    const params = new URLSearchParams({
      q: nextQuery,
      indexName: tab,
    });
    if (semanticEnabled) {
      params.set("semantic", "true");
    }
    return `/clinic/search?${params.toString()}`;
  }

  return (
    <WithPermission permission="search.query">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Search results</h1>
          <p className="text-muted-foreground">
            {query
              ? `Showing results for "${query}"${indexName === "all" ? " across all indexes." : ` in ${indexName}.`}`
              : "Enter a query from the global search bar."}
          </p>
          {semanticEnabled ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Hybrid search active: combining keyword + semantic relevance.
            </p>
          ) : null}
        </div>

        {suggestionsQuery.data?.didYouMean ? (
          <Card>
            <CardBody>
              <p className="text-sm">
                Did you mean:{" "}
                <Link
                  href={buildSearchHref(suggestionsQuery.data.didYouMean.suggestion)}
                  className="font-medium underline"
                >
                  {suggestionsQuery.data.didYouMean.suggestion}
                </Link>
                ?
              </p>
            </CardBody>
          </Card>
        ) : null}

        {suggestionsQuery.data?.relatedSearches?.length ? (
          <Card>
            <CardBody>
              <p className="text-sm font-medium">Related searches</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestionsQuery.data.relatedSearches.map((entry) => (
                  <Link
                    key={entry.query}
                    href={buildSearchHref(entry.query)}
                    className="rounded-full border px-3 py-1 text-xs hover:bg-muted"
                  >
                    {entry.query}
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>Indexes</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-2">
            <Link
              href={buildSearchHref(query, "all")}
              className={indexName === "all" ? "font-semibold underline" : "text-muted-foreground"}
            >
              All
            </Link>
            {INDEX_OPTIONS.map((option) => (
              <Link
                key={option}
                href={buildSearchHref(query, option)}
                className={option === indexName ? "font-semibold underline" : "text-muted-foreground"}
              >
                {option}
              </Link>
            ))}
          </CardBody>
        </Card>

        {!query ? (
          <Card>
            <CardBody>
              <p className="text-sm text-muted-foreground">No search query provided.</p>
            </CardBody>
          </Card>
        ) : isLoading ? (
          <PageLoading rows={5} />
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {hits.length} result{hits.length === 1 ? "" : "s"}
                </CardTitle>
              </CardHeader>
              <CardBody className="space-y-3">
                {hits.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No results found.</p>
                ) : (
                  hits.map((hit) => (
                    <Link
                      key={`${hit.indexName}-${hit.id}`}
                      href={resolveDetailHref(hit.indexName, String(hit.id))}
                      className="block rounded-md border px-4 py-3 hover:bg-muted"
                    >
                      <p className="font-medium">
                        <SearchResultHighlight text={hitLabel(hit)} query={query} />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {hit.indexName} · Score {hit._score ?? 0} · ID {String(hit.id)}
                      </p>
                    </Link>
                  ))
                )}
              </CardBody>
            </Card>

            {isDev && debugInfo ? (
              <Card>
                <CardHeader>
                  <CardTitle>Hybrid debug (dev)</CardTitle>
                </CardHeader>
                <CardBody className="space-y-2 text-xs font-mono">
                  <p>
                    Lexical hits: {debugInfo.lexicalHits.length} · Semantic hits:{" "}
                    {debugInfo.semanticHits.length}
                  </p>
                  <p>
                    Weights — lexical: {debugInfo.weights?.lexical ?? 0}, semantic:{" "}
                    {debugInfo.weights?.semantic ?? 0}
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </>
        )}
      </div>
    </WithPermission>
  );
}
