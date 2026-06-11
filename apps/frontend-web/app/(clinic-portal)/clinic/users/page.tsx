"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { UserListFilters } from "@/components/users/UserListFilters";
import { UserListTable } from "@/components/users/UserListTable";
import { useClinicUsers } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { ClinicUserListFilters } from "@/lib/clinic-portal-types";
import { parseUserListErrors } from "@/lib/user-api-errors";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicUserListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const role = searchParams.get("role")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicUserListFilters["status"]
    | undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicUserListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicUserListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    role,
    status,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicUserListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.role) {
    params.set("role", filters.role);
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

export default function ClinicUsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicUsers(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseUserListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicUserListFilters) {
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

  function handleRoleChange(role: string) {
    replaceFilters({
      ...filters,
      page: 1,
      role: role || undefined,
    });
  }

  function handleStatusChange(status: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: (status || undefined) as ClinicUserListFilters["status"],
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
    sortBy: ClinicUserListFilters["sortBy"],
    sortOrder: ClinicUserListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const users = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="user.manage">
      <ListPage
        title="Users"
        subtitle="Manage clinic user accounts and roles."
        action={
          <Button asChild className="btn-primary">
            <Link href="/clinic/users/new">Create user</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <UserListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />

        <UserListTable
          users={users}
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
