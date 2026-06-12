import { ERROR_CODES, HttpError } from "@ordella/errors";

export function searchValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function indexNotConfiguredError(
  message = "Search index is not configured for this tenant.",
) {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.SEARCH_INDEX.INDEX_NOT_CONFIGURED,
    message,
    metadata: { error: "INDEX_NOT_CONFIGURED" },
  });
}

export function searchProviderError(message = "Search provider failed to process the request.") {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SEARCH_INDEX.SEARCH_PROVIDER_ERROR,
    message,
    metadata: { error: "SEARCH_PROVIDER_ERROR" },
  });
}

export function invalidSearchQueryError(message = "Search query is invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SEARCH_INDEX.INVALID_SEARCH_QUERY,
    message,
    metadata: { error: "INVALID_SEARCH_QUERY" },
  });
}

export function reindexFailedError(message = "Failed to rebuild index.") {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SEARCH_INDEX.REINDEX_FAILED,
    message,
    metadata: { error: "REINDEX_FAILED" },
  });
}

export function invalidRankingRulesError(message = "Ranking rules are invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SEARCH_INDEX.INVALID_RANKING_RULES,
    message,
    metadata: { error: "INVALID_RANKING_RULES" },
  });
}

export function embeddingProviderError(message = "Failed to generate embeddings.") {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SEARCH_INDEX.EMBEDDING_PROVIDER_ERROR,
    message,
    metadata: { error: "EMBEDDING_PROVIDER_ERROR" },
  });
}

export function vectorIndexError(message = "Vector index operation failed.") {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SEARCH_INDEX.VECTOR_INDEX_ERROR,
    message,
    metadata: { error: "VECTOR_INDEX_ERROR" },
  });
}

export function semanticSearchDisabledError(
  message = "Semantic search is not enabled for this index.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SEARCH_INDEX.SEMANTIC_SEARCH_DISABLED,
    message,
    metadata: { error: "SEMANTIC_SEARCH_DISABLED" },
  });
}
