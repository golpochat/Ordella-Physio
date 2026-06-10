"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointmentsApi } from "@/lib/api";

export default function AppointmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.list(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">List and manage appointments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link href="/appointments/calendar">Calendar view</Link></Button>
          <Button>Create appointment</Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Upcoming</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {(data?.data ?? []).map((item) => (
                <li key={item.id} className="flex justify-between rounded-md border p-3 text-sm">
                  <span>{item.patientId}</span>
                  <span>{format(new Date(item.startTime), "PPp")} · {item.status}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
