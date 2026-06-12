export const SEARCH_ROUTES = {
  base: "/search-index/search",
  byName: "/search-index/search/:indexName",
  autocomplete: "/search-index/search/:indexName/autocomplete",
  health: "/search-index/health",
} as const;
