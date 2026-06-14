"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatPatientDate, formatPatientTime } from "@/lib/patient-portal-utils";
import type { ClinicAppointmentEvent } from "./types";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekStart(date: Date): Date {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function shiftWeek(weekStart: Date, deltaWeeks: number): Date {
  const next = new Date(weekStart);
  next.setDate(next.getDate() + deltaWeeks * 7);
  return next;
}

function buildWeekDays(appointments: ClinicAppointmentEvent[], weekStart: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + index);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const dayAppointments = appointments
      .filter((appointment) => {
        const start = new Date(appointment.startTime);
        return start >= dayStart && start < dayEnd && appointment.status !== "CANCELLED";
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return {
      key: dayStart.toISOString().slice(0, 10),
      label: dayStart.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      isToday: dayStart.getTime() === today.getTime(),
      appointments: dayAppointments,
    };
  });
}

export type AppointmentCalendarProps = {
  appointments: ClinicAppointmentEvent[];
  className?: string;
  showTenantBanner?: boolean;
  appointmentLinkPrefix?: string;
};

export function AppointmentCalendar({
  appointments,
  className,
  showTenantBanner = true,
  appointmentLinkPrefix,
}: AppointmentCalendarProps) {
  const { hasTenant } = useClinicScope();
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const days = useMemo(() => buildWeekDays(appointments, weekStart), [appointments, weekStart]);

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showTenantBanner ? <TenantScopeBanner /> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Week of</p>
          <p className="text-lg font-semibold">{formatPatientDate(weekStart.toISOString())}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setWeekStart((current) => shiftWeek(current, -1))}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekStart(getWeekStart(new Date()))}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekStart((current) => shiftWeek(current, 1))}>
            Next
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {days.map((day, index) => (
          <Card key={day.key} className={day.isToday ? "border-primary" : undefined}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                {WEEKDAY_LABELS[index]}
                <span className="ml-2 font-normal text-muted-foreground">{day.label}</span>
              </CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              {day.appointments.length === 0 ? (
                <p className="text-xs text-muted-foreground">No sessions</p>
              ) : (
                day.appointments.map((appointment) => {
                  const href =
                    appointment.href ??
                    (appointmentLinkPrefix ? `${appointmentLinkPrefix}/${appointment.id}` : undefined);

                  const content = (
                    <>
                      <p className="font-medium">
                        {formatPatientTime(appointment.startTime)} – {formatPatientTime(appointment.endTime)}
                      </p>
                      <p>{appointment.type}</p>
                      {appointment.patientName ? (
                        <p className="text-muted-foreground">{appointment.patientName}</p>
                      ) : null}
                      <p className="text-muted-foreground">{appointment.status}</p>
                    </>
                  );

                  return href ? (
                    <Link
                      key={appointment.id}
                      href={href}
                      className="block rounded-md border border-border p-2 text-xs hover:bg-muted/40"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={appointment.id} className="rounded-md border border-border p-2 text-xs">
                      {content}
                    </div>
                  );
                })
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
