import { DELETED_AT_FIELD, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants/db-errors";

export type PaginationOptions = {
  page?: number;
  limit?: number;
  maxLimit?: number;
};

export type PaginatedResult<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PaginationQuery = {
  skip: number;
  take: number;
  page: number;
  limit: number;
};

export function resolvePagination(options: PaginationOptions = {}): PaginationQuery {
  const maxLimit = options.maxLimit ?? MAX_PAGE_SIZE;
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(maxLimit, Math.max(1, options.limit ?? DEFAULT_PAGE_SIZE));

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
}

export async function paginate<T>(
  fetchPage: (query: PaginationQuery) => Promise<T[]>,
  countTotal: () => Promise<number>,
  options: PaginationOptions = {},
): Promise<PaginatedResult<T>> {
  const query = resolvePagination(options);
  const [data, total] = await Promise.all([fetchPage(query), countTotal()]);

  return {
    data,
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    },
  };
}

export function buildSoftDeleteFilter(includeDeleted = false): Record<string, null> | undefined {
  if (includeDeleted) {
    return undefined;
  }

  return { [DELETED_AT_FIELD]: null };
}

export function softDeleteData(): Record<string, Date> {
  return { [DELETED_AT_FIELD]: new Date() };
}
