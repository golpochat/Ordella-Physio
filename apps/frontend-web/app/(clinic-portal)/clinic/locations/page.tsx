"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { LocationListFilters } from "@/components/locations/LocationListFilters";
import { LocationListTable } from "@/components/locations/LocationListTable";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { ClinicLocationListFilters } from "@/lib/clinic-portal-types";
import { parseLocationListErrors } from "@/lib/location-api-errors";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicLocationListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicLocationListFilters["status"]
    | undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicLocationListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicLocationListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    status,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicLocationListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function ClinicLocationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicLocationsList(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseLocationListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicLocationListFilters) {
    const params = buildSearchParams(next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleApplySearch() {
    replaceFilters({
      ...filters,
      page: 1,
      search: draftSearch.trim() || undefined,
    });
  }

  function handleStatusChange(status: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: (status || undefined) as ClinicLocationListFilters["status"],
    });
  }

  function handleReset() {
    setDraftSearch("");
    router.replace(pathname);
  }

  function handlePageChange(page: number) {
    replaceFilters({ ...filters, page });
  }

  function handleSortChange(
    sortBy: NonNullable<ClinicLocationListFilters["sortBy"]>,
    sortOrder: ClinicLocationListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const locations = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="location.manage">
      <ListPage
        title="Locations"
        subtitle="Manage clinic locations for multi-site operations."
        action={
          <Button asChild>
            <Link href="/clinic/locations/new">Add location</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <LocationListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />

        <LocationListTable
          locations={locations}
          pagination={pagination}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          isBusy={isFetching}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
        />
      </ListPage>
    </WithPermission>
  );
}
