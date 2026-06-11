"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { TerminalListFilters } from "@/components/terminals/TerminalListFilters";
import { TerminalListTable } from "@/components/terminals/TerminalListTable";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useClinicTerminalsList } from "@/hooks/useTerminalPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { ClinicTerminalListFilters } from "@/lib/terminal-portal-types";
import { parseTerminalListErrors } from "@/lib/terminal-api-errors";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicTerminalListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const type = (searchParams.get("type")?.trim().toUpperCase() || undefined) as
    | ClinicTerminalListFilters["type"]
    | undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicTerminalListFilters["status"]
    | undefined;
  const locationId = searchParams.get("locationId")?.trim() || undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicTerminalListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicTerminalListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    type,
    status,
    locationId,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicTerminalListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.locationId) {
    params.set("locationId", filters.locationId);
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function ClinicTerminalsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicTerminalsList(filters);
  const locationsQuery = useClinicLocationsList({ limit: 200, page: 1 });

  const locations = locationsQuery.data?.data ?? [];
  const locationsById = useMemo(
    () => Object.fromEntries(locations.map((location) => [location.id, location])),
    [locations],
  );

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseTerminalListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicTerminalListFilters) {
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

  function handleTypeChange(type: string) {
    replaceFilters({
      ...filters,
      page: 1,
      type: (type || undefined) as ClinicTerminalListFilters["type"],
    });
  }

  function handleStatusChange(status: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: (status || undefined) as ClinicTerminalListFilters["status"],
    });
  }

  function handleLocationChange(locationId: string) {
    replaceFilters({
      ...filters,
      page: 1,
      locationId: locationId || undefined,
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
    sortBy: NonNullable<ClinicTerminalListFilters["sortBy"]>,
    sortOrder: ClinicTerminalListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const terminals = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="terminal.manage">
      <ListPage
        title="Terminals"
        subtitle="Manage POS, kiosk, printer, and tablet devices across clinic locations."
        action={
          <Button asChild>
            <Link href="/clinic/terminals/new">Create terminal</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <TerminalListFilters
          filters={filters}
          draftSearch={draftSearch}
          locations={locations}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onLocationChange={handleLocationChange}
          onReset={handleReset}
        />

        <TerminalListTable
          terminals={terminals}
          locationsById={locationsById}
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
