"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AppointmentCalendar } from "@/components/appointments/calendar/AppointmentCalendar";
import { AppointmentCalendarFilters } from "@/components/appointments/calendar/AppointmentCalendarFilters";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicAppointmentCalendar } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseAppointmentCalendarErrors } from "@/lib/appointment-api-errors";
import { formatCalendarDateParam } from "@/lib/appointment-calendar-utils";
import type { ClinicAppointmentCalendarFilters } from "@/lib/clinic-portal-types";

function readFilters(searchParams: URLSearchParams): ClinicAppointmentCalendarFilters {
  const view = (searchParams.get("view")?.trim().toLowerCase() || "week") as
    | ClinicAppointmentCalendarFilters["view"]
    | undefined;
  const date = searchParams.get("date")?.trim() || formatCalendarDateParam(new Date());
  const staffId = searchParams.get("staffId")?.trim() || undefined;
  const locationId = searchParams.get("locationId")?.trim() || undefined;
  const appointmentType = (searchParams.get("appointmentType")?.trim().toUpperCase() ||
    undefined) as ClinicAppointmentCalendarFilters["appointmentType"];
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicAppointmentCalendarFilters["status"]
    | undefined;

  return {
    view: view === "day" || view === "week" || view === "month" ? view : "week",
    date,
    staffId,
    locationId,
    appointmentType,
    status,
  };
}

function buildSearchParams(filters: ClinicAppointmentCalendarFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set("view", filters.view ?? "week");
  params.set("date", filters.date ?? formatCalendarDateParam(new Date()));

  if (filters.staffId) {
    params.set("staffId", filters.staffId);
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

  return params;
}

export default function ClinicAppointmentCalendarPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useClinicAppointmentCalendar(filters);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseAppointmentCalendarErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicAppointmentCalendarFilters) {
    const params = buildSearchParams(next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleViewChange(view: ClinicAppointmentCalendarFilters["view"]) {
    replaceFilters({ ...filters, view });
  }

  function handleDateChange(date: string) {
    replaceFilters({ ...filters, date });
  }

  function handleStaffChange(staffId: string) {
    replaceFilters({ ...filters, staffId: staffId || undefined });
  }

  function handleLocationChange(locationId: string) {
    replaceFilters({ ...filters, locationId: locationId || undefined });
  }

  function handleAppointmentTypeChange(value: string) {
    replaceFilters({
      ...filters,
      appointmentType: value
        ? (value as ClinicAppointmentCalendarFilters["appointmentType"])
        : undefined,
    });
  }

  function handleStatusChange(value: string) {
    replaceFilters({
      ...filters,
      status: value ? (value as ClinicAppointmentCalendarFilters["status"]) : undefined,
    });
  }

  function handleReset() {
    router.replace(`${pathname}?view=week&date=${formatCalendarDateParam(new Date())}`);
  }

  function handleNavigate(nextDate: string) {
    replaceFilters({ ...filters, date: nextDate });
  }

  function handleToday() {
    replaceFilters({ ...filters, date: formatCalendarDateParam(new Date()) });
  }

  const events = data ?? [];

  return (
    <WithPermission permission="appointment.manage">
      <ListPage
        title="Appointment calendar"
        subtitle="View clinic appointments by day, week, or month."
        action={
          <div className="user-list-actions">
            <Button asChild variant="outline">
              <Link href="/clinic/appointments">List view</Link>
            </Button>
            <Button asChild>
              <Link href="/clinic/appointments/new">Schedule appointment</Link>
            </Button>
          </div>
        }
        isLoading={false}
        isError={isError}
        onRetry={() => void refetch()}
      >
        <AppointmentCalendarFilters
          filters={filters}
          disabled={isFetching}
          onViewChange={handleViewChange}
          onDateChange={handleDateChange}
          onStaffChange={handleStaffChange}
          onLocationChange={handleLocationChange}
          onAppointmentTypeChange={handleAppointmentTypeChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />

        <AppointmentCalendar
          events={events}
          view={filters.view ?? "week"}
          date={filters.date ?? formatCalendarDateParam(new Date())}
          isLoading={isLoading}
          isBusy={isFetching}
          onNavigate={handleNavigate}
          onToday={handleToday}
        />
      </ListPage>
    </WithPermission>
  );
}
