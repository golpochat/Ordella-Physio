import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export function normalizePagination(input: PaginationInput): { page: number; pageSize: number } {
  return {
    page: input.page,
    pageSize: input.limit ?? input.pageSize,
  };
}

export function getPagination(input: PaginationInput): { skip: number; take: number } {
  const normalized = normalizePagination(input);
  const skip = (normalized.page - 1) * normalized.pageSize;
  return { skip, take: normalized.pageSize };
}

export function buildPaginatedResponse<T>(
  items: T[],
  total: number,
  input: PaginationInput,
): { items: T[]; total: number; page: number; pageSize: number; totalPages: number } {
  const normalized = normalizePagination(input);
  return {
    items,
    total,
    page: normalized.page,
    pageSize: normalized.pageSize,
    totalPages: Math.max(1, Math.ceil(total / normalized.pageSize)),
  };
}
