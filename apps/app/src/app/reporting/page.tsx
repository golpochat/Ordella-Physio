"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reportingApi } from "@/lib/api";

export default function ReportingPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const month = format(new Date(), "yyyy-MM");

  const daily = useQuery({ queryKey: ["reporting-daily"], queryFn: () => reportingApi.dailyDashboard(today) });
  const monthly = useQuery({ queryKey: ["reporting-monthly"], queryFn: () => reportingApi.monthlyDashboard(month) });
  const summary = useQuery({ queryKey: ["reporting-summary"], queryFn: () => reportingApi.appointmentSummary() });
  const revenue = useQuery({ queryKey: ["reporting-revenue"], queryFn: () => reportingApi.revenueDaily() });
  const therapists = useQuery({ queryKey: ["reporting-therapists"], queryFn: () => reportingApi.byTherapist() });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reporting & Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Daily Metrics</CardTitle></CardHeader><CardContent>{daily.isLoading ? "..." : `Revenue: $${daily.data?.revenue ?? 0}`}</CardContent></Card>
        <Card><CardHeader><CardTitle>Monthly Metrics</CardTitle></CardHeader><CardContent>{monthly.isLoading ? "..." : "Monthly rollup loaded."}</CardContent></Card>
        <Card><CardHeader><CardTitle>Appointment Analytics</CardTitle></CardHeader><CardContent>{summary.isLoading ? "..." : `${summary.data?.totalAppointments ?? 0} appointments`}</CardContent></Card>
        <Card><CardHeader><CardTitle>Revenue Analytics</CardTitle></CardHeader><CardContent>{revenue.isLoading ? "..." : "Daily revenue trend."}</CardContent></Card>
        <Card className="md:col-span-2"><CardHeader><CardTitle>Therapist Performance</CardTitle></CardHeader><CardContent>{therapists.isLoading ? "..." : JSON.stringify(therapists.data ?? [])}</CardContent></Card>
      </div>
    </div>
  );
}
