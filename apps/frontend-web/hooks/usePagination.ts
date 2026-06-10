"use client";

import { useCallback, useMemo, useState } from "react";

export type PaginationState = {
  page: number;
  pageSize: number;
};

export function usePagination(initialPageSize = 20) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  });

  const setPage = useCallback((page: number) => {
    setPagination((current) => ({ ...current, page: Math.max(1, page) }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination({ page: 1, pageSize });
  }, []);

  const offset = useMemo(
    () => (pagination.page - 1) * pagination.pageSize,
    [pagination.page, pagination.pageSize],
  );

  return {
    ...pagination,
    offset,
    setPage,
    setPageSize,
    queryParams: { page: pagination.page, pageSize: pagination.pageSize },
  };
}
