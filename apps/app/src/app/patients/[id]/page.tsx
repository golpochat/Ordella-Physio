"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSkeleton } from "@/components/ui/skeleton";
import { patientsApi } from "@/lib/api";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const { data: patient, isLoading } = useQuery({
    queryKey: ["patients", params.id],
    queryFn: () => patientsApi.get(params.id),
  });

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {patient?.firstName} {patient?.lastName}
          </h1>
          <p className="text-muted-foreground">Patient profile</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/patients">Back to patients</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Demographics</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Email: {patient?.email ?? "—"}</p>
            <p>Phone: {patient?.phone ?? "—"}</p>
            <p>Date of birth: {patient?.dateOfBirth ?? "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Medical Record</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Medical history and conditions will appear here.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Linked clinical notes and SOAP entries.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Appointments</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Upcoming and past appointments for this patient.</CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Invoices and payment history for this patient.</CardContent>
        </Card>
      </div>
    </div>
  );
}
