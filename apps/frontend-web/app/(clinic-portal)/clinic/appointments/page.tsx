"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { EntityIndexSearchBox } from "@/components/search/EntityIndexSearchBox";
import { AppointmentListFilters } from "@/components/appointments/AppointmentListFilters";
import { AppointmentListTable } from "@/components/appointments/AppointmentListTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicAppointmentsList } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseAppointmentListErrors } from "@/lib/appointment-api-errors";
import type { ClinicAppointmentListFilters } from "@/lib/clinic-portal-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicAppointmentListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const staffId = searchParams.get("staffId")?.trim() || undefined;
  const patientId = searchParams.get("patientId")?.trim() || undefined;
  const locationId = searchParams.get("locationId")?.trim() || undefined;
  const appointmentType = (searchParams.get("appointmentType")?.trim().toUpperCase() ||
    undefined) as ClinicAppointmentListFilters["appointmentType"];
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicAppointmentListFilters["status"]
    | undefined;
  const dateStart = searchParams.get("dateStart")?.trim() || undefined;
  const dateEnd = searchParams.get("dateEnd")?.trim() || undefined;
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicAppointmentListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicAppointmentListFilters["sortOrder"]
    | undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    staffId,
    patientId,
    locationId,
    appointmentType,
    status,
    dateStart,
    dateEnd,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicAppointmentListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.staffId) {
    params.set("staffId", filters.staffId);
  }

  if (filters.patientId) {
    params.set("patientId", filters.patientId);
  }

  if (filters.locationId) {
    params.set("locationId", filters.locationId);
  }

  if (filters.appointmentType) {
    params.set("appointmentType", filters.appointmentType);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.dateStart) {
    params.set("dateStart", filters.dateStart);
  }

  if (filters.dateEnd) {
    params.set("dateEnd", filters.dateEnd);
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function ClinicAppointmentsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error, refetch } = useClinicAppointmentsList(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseAppointmentListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicAppointmentListFilters) {
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

  function handleStaffChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      staffId: value || undefined,
    });
  }

  function handlePatientChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      patientId: value || undefined,
    });
  }

  function handleLocationChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      locationId: value || undefined,
    });
  }

  function handleAppointmentTypeChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      appointmentType: value
        ? (value as ClinicAppointmentListFilters["appointmentType"])
        : undefined,
    });
  }

  function handleStatusChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      status: value ? (value as ClinicAppointmentListFilters["status"]) : undefined,
    });
  }

  function handleDateStartChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      dateStart: value || undefined,
    });
  }

  function handleDateEndChange(value: string) {
    replaceFilters({
      ...filters,
      page: 1,
      dateEnd: value || undefined,
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
    sortBy: NonNullable<ClinicAppointmentListFilters["sortBy"]>,
    sortOrder: ClinicAppointmentListFilters["sortOrder"],
  ) {
    replaceFilters({
      ...filters,
      page: 1,
      sortBy,
      sortOrder,
    });
  }

  const appointments = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="appointment.manage">
      <ListPage
        title="Appointments"
        subtitle="View and manage clinic appointments."
        action={
          <div className="user-list-actions">
            <Button asChild variant="outline">
              <Link href="/clinic/appointments/calendar">Calendar view</Link>
            </Button>
            <Button asChild>
              <Link href="/clinic/appointments/new">Schedule appointment</Link>
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <EntityIndexSearchBox
          indexName="appointments"
          label="Index search"
          placeholder="Search by patient name, provider, or date"
          detailHref={(id) => `/clinic/appointments/${id}`}
        />

        <AppointmentListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isFetching}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onStaffChange={handleStaffChange}
          onPatientChange={handlePatientChange}
          onLocationChange={handleLocationChange}
          onAppointmentTypeChange={handleAppointmentTypeChange}
          onStatusChange={handleStatusChange}
          onDateStartChange={handleDateStartChange}
          onDateEndChange={handleDateEndChange}
          onReset={handleReset}
        />

        <AppointmentListTable
          appointments={appointments}
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
