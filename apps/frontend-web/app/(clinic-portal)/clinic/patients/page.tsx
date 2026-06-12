"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PatientListFilters } from "@/components/patients/PatientListFilters";
import { PatientListTable } from "@/components/patients/PatientListTable";
import { useClinicPatientsList } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parsePatientListErrors } from "@/lib/clinic-patient-api-errors";
import type { ClinicPatientListFilters } from "@/lib/clinic-portal-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicPatientListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const gender = (searchParams.get("gender")?.trim().toUpperCase() || undefined) as
    | ClinicPatientListFilters["gender"]
    | undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicPatientListFilters["status"]
    | undefined;
  const dobStart = searchParams.get("dobStart")?.trim() || undefined;
  const dobEnd = searchParams.get("dobEnd")?.trim() || undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicPatientListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicPatientListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    gender,
    status,
    dobStart,
    dobEnd,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicPatientListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.gender) {
    params.set("gender", filters.gender);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.dobStart) {
    params.set("dobStart", filters.dobStart);
  }

  if (filters.dobEnd) {
    params.set("dobEnd", filters.dobEnd);
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function ClinicPatientsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicPatientsList(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parsePatientListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicPatientListFilters) {
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

  function handleGenderChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      gender: value ? (value as ClinicPatientListFilters["gender"]) : undefined,
    });
  }

  function handleStatusChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: value ? (value as ClinicPatientListFilters["status"]) : undefined,
    });
  }

  function handleDobStartChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      dobStart: value || undefined,
    });
  }

  function handleDobEndChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      dobEnd: value || undefined,
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
    sortBy: NonNullable<ClinicPatientListFilters["sortBy"]>,
    sortOrder: ClinicPatientListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const patients = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="patient.manage">
      <ListPage
        title="Patients"
        subtitle="Manage patient records for your clinic."
        action={
          <Button asChild className="btn-primary">
            <Link href="/clinic/patients/new">Register patient</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <PatientListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onGenderChange={handleGenderChange}
          onStatusChange={handleStatusChange}
          onDobStartChange={handleDobStartChange}
          onDobEndChange={handleDobEndChange}
          onReset={handleReset}
        />

        <PatientListTable
          patients={patients}
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
