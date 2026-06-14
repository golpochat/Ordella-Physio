type PaginatedEnvelope<T> = {
  items?: T[];
  data?: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  limit?: number;
  totalPages?: number;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export function normalizePaginatedList<T>(response: PaginatedEnvelope<T> | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;

  if (Array.isArray(response.items)) return response.items;
  if (Array.isArray(response.data)) return response.data;

  return [];
}

export function normalizeEntity<T>(response: T | { patient?: T; user?: T } | undefined): T | undefined {
  if (!response) return undefined;
  if (typeof response === "object" && response !== null) {
    if ("patient" in response && response.patient) return response.patient as T;
    if ("user" in response && response.user) return response.user as T;
  }
  return response as T;
}
