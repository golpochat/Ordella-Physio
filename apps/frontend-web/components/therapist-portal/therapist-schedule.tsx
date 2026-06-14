"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TherapistAppointment } from "@/lib/therapist-portal-types";
import {
  buildWeekSchedule,
  formatPortalDate,
  formatPortalTime,
  getWeekStart,
  shiftWeek,
} from "@/lib/therapist-portal-utils";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type TherapistScheduleProps = {
  appointments: TherapistAppointment[];
};

export function TherapistSchedule({ appointments }: TherapistScheduleProps) {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const schedule = useMemo(
    () => buildWeekSchedule(appointments, weekStart),
    [appointments, weekStart],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Week of</p>
          <p className="text-lg font-semibold">{formatPortalDate(weekStart.toISOString())}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setWeekStart((current) => shiftWeek(current, -1))}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setWeekStart(getWeekStart(new Date()))}>
            Today
          </Button>
          <Button variant="outline" onClick={() => setWeekStart((current) => shiftWeek(current, 1))}>
            Next
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {schedule.days.map((day, index) => (
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
                day.appointments.map((appointment) => (
                  <Link
                    key={appointment.id}
                    href={`/therapist/appointments/${appointment.id}`}
                    className="block rounded-md border border-border p-2 text-xs hover:bg-muted/40"
                  >
                    <p className="font-medium">
                      {formatPortalTime(appointment.startTime)} – {formatPortalTime(appointment.endTime)}
                    </p>
                    <p>{appointment.type}</p>
                    <p className="text-muted-foreground">{appointment.status}</p>
                  </Link>
                ))
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
