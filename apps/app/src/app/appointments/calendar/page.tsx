"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AppointmentsCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointment Calendar</h1>
          <p className="text-muted-foreground">Week/day view with therapist availability and blocked slots</p>
        </div>
        <Button asChild variant="outline"><Link href="/appointments">List view</Link></Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <Card key={day}>
            <CardHeader className="pb-2"><CardTitle className="text-sm">{day}</CardTitle></CardHeader>
            <CardContent className="min-h-32 text-xs text-muted-foreground">No events</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
