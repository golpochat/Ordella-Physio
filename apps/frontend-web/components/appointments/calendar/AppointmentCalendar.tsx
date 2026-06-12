"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CALENDAR_END_HOUR,
  CALENDAR_START_HOUR,
  formatCalendarHeading,
  formatHourLabel,
  getCalendarEventClassName,
  getMonthGridDays,
  getTimedEventStyle,
  getWeekDays,
  isSameCalendarDay,
  parseCalendarDateParam,
  shiftCalendarDate,
} from "@/lib/appointment-calendar-utils";
import type {
  ClinicAppointmentCalendarEvent,
  ClinicAppointmentCalendarView,
} from "@/lib/clinic-portal-types";
import { cn } from "@/lib/cn";

const HOURS = Array.from(
  { length: CALENDAR_END_HOUR - CALENDAR_START_HOUR },
  (_, index) => CALENDAR_START_HOUR + index,
);

export type AppointmentCalendarProps = {
  events: ClinicAppointmentCalendarEvent[];
  view: ClinicAppointmentCalendarView;
  date: string;
  isLoading?: boolean;
  isBusy?: boolean;
  onNavigate: (nextDate: string) => void;
  onToday: () => void;
};

function CalendarEventLink({ event }: { event: ClinicAppointmentCalendarEvent }) {
  return (
    <Link
      href={`/clinic/appointments/${event.id}`}
      className={cn("appointment-calendar-event", getCalendarEventClassName(event))}
      title={event.title}
    >
      <span className="appointment-calendar-event-title">{event.title}</span>
    </Link>
  );
}

function TimedEventBlock({
  event,
  day,
}: {
  event: ClinicAppointmentCalendarEvent;
  day: Date;
}) {
  const placement = getTimedEventStyle(event, day);
  if (!placement) {
    return null;
  }

  const style = {
    "--appointment-event-top": placement.top,
    "--appointment-event-height": placement.height,
  } as CSSProperties;

  return (
    <Link
      href={`/clinic/appointments/${event.id}`}
      className={cn(
        "appointment-calendar-timed-event",
        getCalendarEventClassName(event),
      )}
      style={style}
      title={event.title}
    >
      <span className="appointment-calendar-event-title">{event.title}</span>
    </Link>
  );
}

function DayColumn({
  day,
  events,
  showHeader = true,
}: {
  day: Date;
  events: ClinicAppointmentCalendarEvent[];
  showHeader?: boolean;
}) {
  const dayEvents = events.filter((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return isSameCalendarDay(start, day) || isSameCalendarDay(end, day) || (start < day && end > day);
  });

  return (
    <div className="appointment-calendar-day-column">
      {showHeader ? (
        <div className="appointment-calendar-day-header">
          <span className="appointment-calendar-day-name">
            {day.toLocaleDateString(undefined, { weekday: "short" })}
          </span>
          <span className="appointment-calendar-day-number">{day.getDate()}</span>
        </div>
      ) : null}
      <div className="appointment-calendar-day-body">
        {dayEvents.map((event) => (
          <TimedEventBlock key={event.id} event={event} day={day} />
        ))}
      </div>
    </div>
  );
}

function DayView({
  date,
  events,
}: {
  date: string;
  events: ClinicAppointmentCalendarEvent[];
}) {
  const day = parseCalendarDateParam(date);

  return (
    <div className="appointment-calendar-timed-layout">
      <div className="appointment-calendar-time-column">
        <div className="appointment-calendar-day-header appointment-calendar-day-header-spacer" />
        {HOURS.map((hour) => (
          <div key={hour} className="appointment-calendar-hour-label">
            {formatHourLabel(hour)}
          </div>
        ))}
      </div>
      <div className="appointment-calendar-grid-column">
        <DayColumn day={day} events={events} />
        <div className="appointment-calendar-hour-grid">
          {HOURS.map((hour) => (
            <div key={hour} className="appointment-calendar-hour-row" />
          ))}
        </div>
      </div>
    </div>
  );
}

function WeekView({
  date,
  events,
}: {
  date: string;
  events: ClinicAppointmentCalendarEvent[];
}) {
  const days = getWeekDays(date);

  return (
    <div className="appointment-calendar-timed-layout appointment-calendar-week-layout">
      <div className="appointment-calendar-time-column">
        <div className="appointment-calendar-day-header appointment-calendar-day-header-spacer" />
        {HOURS.map((hour) => (
          <div key={hour} className="appointment-calendar-hour-label">
            {formatHourLabel(hour)}
          </div>
        ))}
      </div>
      <div className="appointment-calendar-week-columns">
        {days.map((day) => (
          <div key={day.toISOString()} className="appointment-calendar-grid-column">
            <DayColumn day={day} events={events} />
            <div className="appointment-calendar-hour-grid">
              {HOURS.map((hour) => (
                <div key={hour} className="appointment-calendar-hour-row" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthView({
  date,
  events,
}: {
  date: string;
  events: ClinicAppointmentCalendarEvent[];
}) {
  const days = getMonthGridDays(date);
  const anchor = parseCalendarDateParam(date);

  return (
    <div className="appointment-calendar-month">
      <div className="appointment-calendar-month-weekdays">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => (
          <div key={label} className="appointment-calendar-month-weekday">
            {label}
          </div>
        ))}
      </div>
      <div className="appointment-calendar-month-grid">
        {days.map((day) => {
          const inMonth = day.getMonth() === anchor.getMonth();
          const dayEvents = events.filter((event) => isSameCalendarDay(new Date(event.start), day));

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "appointment-calendar-month-cell",
                !inMonth && "appointment-calendar-month-cell-muted",
              )}
            >
              <span className="appointment-calendar-month-day">{day.getDate()}</span>
              <div className="appointment-calendar-month-events">
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEventLink key={event.id} event={event} />
                ))}
                {dayEvents.length > 3 ? (
                  <span className="appointment-calendar-month-more">
                    +{dayEvents.length - 3} more
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarSkeleton({ view }: { view: ClinicAppointmentCalendarView }) {
  if (view === "month") {
    return (
      <div className="appointment-calendar-skeleton appointment-calendar-skeleton-month">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="appointment-calendar-skeleton-block" />
        ))}
      </div>
    );
  }

  return (
    <div className="appointment-calendar-skeleton appointment-calendar-skeleton-timed">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="appointment-calendar-skeleton-row" />
      ))}
    </div>
  );
}

export function AppointmentCalendar({
  events,
  view,
  date,
  isLoading = false,
  isBusy = false,
  onNavigate,
  onToday,
}: AppointmentCalendarProps) {
  const heading = formatCalendarHeading(view, date);

  function handlePrevious() {
    onNavigate(shiftCalendarDate(date, view, -1));
  }

  function handleNext() {
    onNavigate(shiftCalendarDate(date, view, 1));
  }

  return (
    <section className="appointment-calendar">
      <div className="appointment-calendar-toolbar">
        <div className="appointment-calendar-nav">
          <Button type="button" variant="outline" disabled={isBusy} onClick={handlePrevious}>
            Previous
          </Button>
          <Button type="button" variant="outline" disabled={isBusy} onClick={onToday}>
            Today
          </Button>
          <Button type="button" variant="outline" disabled={isBusy} onClick={handleNext}>
            Next
          </Button>
        </div>
        <h2 className="appointment-calendar-heading">{heading}</h2>
      </div>

      {isLoading ? <CalendarSkeleton view={view} /> : null}

      {!isLoading ? (
        <div className="appointment-calendar-body">
          {events.length === 0 ? (
            <p className="appointment-calendar-empty">No appointments scheduled.</p>
          ) : null}
          {view === "day" ? <DayView date={date} events={events} /> : null}
          {view === "week" ? <WeekView date={date} events={events} /> : null}
          {view === "month" ? <MonthView date={date} events={events} /> : null}
        </div>
      ) : null}
    </section>
  );
}
