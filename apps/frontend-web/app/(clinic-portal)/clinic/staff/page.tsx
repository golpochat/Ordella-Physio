"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { StaffListFilters } from "@/components/staff/StaffListFilters";
import { StaffListTable } from "@/components/staff/StaffListTable";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import { useClinicRolesList } from "@/hooks/useUserRolePortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseStaffMemberListErrors } from "@/lib/clinic-staff-member-api-errors";
import type { ClinicStaffListFilters } from "@/lib/clinic-staff-member-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicStaffListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const staffType = (searchParams.get("staffType")?.trim().toUpperCase() || undefined) as
    | ClinicStaffListFilters["staffType"]
    | undefined;
  const roleId = searchParams.get("roleId")?.trim() || undefined;
  const locationId = searchParams.get("locationId")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicStaffListFilters["status"]
    | undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicStaffListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicStaffListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    staffType,
    roleId,
    locationId,
    status,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicStaffListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.staffType) {
    params.set("staffType", filters.staffType);
  }

  if (filters.roleId) {
    params.set("roleId", filters.roleId);
  }

  if (filters.locationId) {
    params.set("locationId", filters.locationId);
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

export default function ClinicStaffPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicStaffMembersList(filters);
  const rolesQuery = useClinicRolesList({ limit: 200, page: 1 });
  const locationsQuery = useClinicLocationsList({ status: "ACTIVE", limit: 200, page: 1 });

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseStaffMemberListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicStaffListFilters) {
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

  function handleStaffTypeChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      staffType: value ? (value as ClinicStaffListFilters["staffType"]) : undefined,
    });
  }

  function handleRoleChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      roleId: value || undefined,
    });
  }

  function handleLocationChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      locationId: value || undefined,
    });
  }

  function handleStatusChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: value ? (value as ClinicStaffListFilters["status"]) : undefined,
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
    sortBy: NonNullable<ClinicStaffListFilters["sortBy"]>,
    sortOrder: ClinicStaffListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const staff = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="user.manage">
      <ListPage
        title="Staff"
        subtitle="Manage clinic staff members, roles, and location assignments."
        action={
          <Button asChild className="btn-primary">
            <Link href="/clinic/staff/new">Add staff</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <StaffListFilters
          filters={filters}
          draftSearch={draftSearch}
          roles={rolesQuery.data?.data ?? []}
          locations={locationsQuery.data?.data ?? []}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onStaffTypeChange={handleStaffTypeChange}
          onRoleChange={handleRoleChange}
          onLocationChange={handleLocationChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />

        <StaffListTable
          staff={staff}
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
