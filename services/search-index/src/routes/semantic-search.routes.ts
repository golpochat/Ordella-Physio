export const SEMANTIC_SEARCH_ROUTES = {
  base: "semantic-search",
  byName: "semantic-search/:indexName",
  suggestions: "semantic-search/:indexName/suggestions",
  federated: "semantic-search/federated",
} as const;
