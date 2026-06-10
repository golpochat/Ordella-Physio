"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSkeleton } from "@/components/ui/skeleton";
import { appointmentsApi, reportingApi } from "@/lib/api";

export default function DashboardPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const month = format(new Date(), "yyyy-MM");

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", "today"],
    queryFn: () => appointmentsApi.list({ startDate: today, endDate: today }),
  });

  const metricsQuery = useQuery({
    queryKey: ["reporting", "daily", today],
    queryFn: () => reportingApi.dailyDashboard(today),
  });

  const monthlyQuery = useQuery({
    queryKey: ["reporting", "monthly", month],
    queryFn: () => reportingApi.monthlyDashboard(month),
  });

  if (appointmentsQuery.isLoading || metricsQuery.isLoading) {
    return <PageSkeleton />;
  }

  const appointments = appointmentsQuery.data?.data ?? [];
  const metrics = metricsQuery.data;
  const monthly = monthlyQuery.data as { revenue?: string; newPatients?: number } | undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of today&apos;s clinic activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{metrics?.newPatients ?? monthly?.newPatients ?? 0}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">${metrics?.revenue ?? "0.00"}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{metrics?.completedAppointments ?? 0}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments scheduled for today.</p>
          ) : (
            <ul className="space-y-2">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>{appointment.patientId}</span>
                  <span className="text-muted-foreground">
                    {format(new Date(appointment.startTime), "HH:mm")} – {appointment.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
