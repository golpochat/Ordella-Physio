"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PlatformUserListFilters } from "@/components/super-admin/users/PlatformUserListFilters";
import { UserList } from "@/components/super-admin/users/UserList";
import { usePlatformTenants, usePlatformUsers } from "@/hooks/useSuperAdminPortal";
import type { PlatformUserListFilters as PlatformUserFilters } from "@/lib/super-admin-portal-types";
import { PLATFORM_OPERATOR_ROLE } from "@/lib/super-admin-portal-utils";

const DEFAULT_LIMIT = 20;

function readRoleFilter(searchParams: URLSearchParams): string | undefined {
  const roleParam = searchParams.get("role");

  if (roleParam === null) {
    return PLATFORM_OPERATOR_ROLE;
  }

  if (roleParam.toLowerCase() === "all") {
    return undefined;
  }

  return roleParam.trim().toUpperCase();
}

function readFilters(searchParams: URLSearchParams): PlatformUserFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | PlatformUserFilters["status"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    role: readRoleFilter(searchParams),
    status,
  };
}

function buildSearchParams(filters: PlatformUserFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.role === undefined) {
    params.set("role", "all");
  } else {
    params.set("role", filters.role);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  return params;
}

export default function SuperAdminUsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, refetch } = usePlatformUsers(filters);
  const { data: tenants } = usePlatformTenants();

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  function replaceFilters(next: PlatformUserFilters) {
    router.replace(`${pathname}?${buildSearchParams(next).toString()}`);
  }

  function handleApplySearch() {
    replaceFilters({
      ...filters,
      page: 1,
      search: draftSearch.trim() || undefined,
    });
  }

  function handleRoleChange(role: string) {
    replaceFilters({
      ...filters,
      page: 1,
      role: role ? role : undefined,
    });
  }

  function handleStatusChange(status: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: (status || undefined) as PlatformUserFilters["status"],
    });
  }

  function handleReset() {
    setDraftSearch("");
    router.replace(`${pathname}?role=${PLATFORM_OPERATOR_ROLE}`);
  }

  function handlePageChange(page: number) {
    replaceFilters({ ...filters, page });
  }

  const tenantNameById = useMemo(
    () => new Map((tenants ?? []).map((tenant) => [tenant.id, tenant.name])),
    [tenants],
  );

  const users = useMemo(
    () =>
      (data?.data ?? []).map((user) => ({
        ...user,
        tenant: { name: tenantNameById.get(user.tenantId) },
      })),
    [data?.data, tenantNameById],
  );

  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };
  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;

  return (
    <ListPage
      title="Users"
      subtitle="Platform operators with SYSTEM access. Manage tenant staff from each tenant's detail page."
      action={
        <Button asChild className="btn-primary">
          <Link href="/super-admin/users/create?mode=platform">Create platform operator</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      loadingRows={6}
    >
      <PlatformUserListFilters
        filters={filters}
        draftSearch={draftSearch}
        disabled={isFetching}
        onDraftSearchChange={setDraftSearch}
        onApplySearch={handleApplySearch}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onReset={handleReset}
      />

      <UserList
        users={users}
        emptyMessage="No platform operators found. Create a SYSTEM user or adjust filters."
      />

      <nav className="user-list-pagination" aria-label="Platform user list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages || 1} · {pagination.total} users
        </p>
        <div className="user-list-pagination-actions">
          <Button
            type="button"
            variant="outline"
            disabled={isFetching || currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isFetching || currentPage >= totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
    </ListPage>
  );
}
