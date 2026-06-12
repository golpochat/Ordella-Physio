"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { RoleListFilters } from "@/components/roles/RoleListFilters";
import { RoleListTable } from "@/components/roles/RoleListTable";
import { useClinicRolesList } from "@/hooks/useUserRolePortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseRoleListErrors } from "@/lib/user-role-api-errors";
import type { ClinicRoleListFilters } from "@/lib/user-role-portal-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicRoleListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const isSystemRaw = searchParams.get("isSystem")?.trim().toLowerCase();
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicRoleListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicRoleListFilters["sortOrder"]
    | undefined;

  let isSystem: boolean | undefined;
  if (isSystemRaw === "true") {
    isSystem = true;
  } else if (isSystemRaw === "false") {
    isSystem = false;
  }

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    isSystem,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicRoleListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.isSystem === true) {
    params.set("isSystem", "true");
  } else if (filters.isSystem === false) {
    params.set("isSystem", "false");
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function ClinicRolesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicRolesList(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseRoleListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicRoleListFilters) {
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

  function handleSystemRoleChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      isSystem: value === "true" ? true : value === "false" ? false : undefined,
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
    sortBy: NonNullable<ClinicRoleListFilters["sortBy"]>,
    sortOrder: ClinicRoleListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const roles = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="role.manage">
      <ListPage
        title="Roles"
        subtitle="Manage clinic roles and their assigned permissions."
        action={
          <Button asChild className="btn-primary">
            <Link href="/clinic/roles/new">Create role</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <RoleListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onSystemRoleChange={handleSystemRoleChange}
          onReset={handleReset}
        />

        <RoleListTable
          roles={roles}
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
