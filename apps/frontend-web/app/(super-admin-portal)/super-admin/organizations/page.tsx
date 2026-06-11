"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { OrganizationListFilters } from "@/components/organizations/OrganizationListFilters";
import { OrganizationListTable } from "@/components/organizations/OrganizationListTable";
import { usePlatformOrganizations } from "@/hooks/useSuperAdminPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { OrganizationListFilters } from "@/lib/super-admin-portal-types";
import { parseOrganizationListErrors } from "@/lib/organization-api-errors";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): OrganizationListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | OrganizationListFilters["status"]
    | undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | OrganizationListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | OrganizationListFilters["sortOrder"]
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

function buildSearchParams(filters: OrganizationListFilters): URLSearchParams {
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

export default function SuperAdminOrganizationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = usePlatformOrganizations(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseOrganizationListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: OrganizationListFilters) {
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
      status: (status || undefined) as OrganizationListFilters["status"],
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
    sortBy: NonNullable<OrganizationListFilters["sortBy"]>,
    sortOrder: OrganizationListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const organizations = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="organization.manage">
      <ListPage
        title="Organizations"
        subtitle="Manage multi-tenant organizations across the platform."
        action={
          <Button asChild className="btn-primary">
            <Link href="/super-admin/organizations/new">Create organization</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <OrganizationListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />

        <OrganizationListTable
          organizations={organizations}
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
