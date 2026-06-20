"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardBody } from "@/components/ui/card";
import type { PharmacyPrescription } from "@/lib/pharmacy-portal-types";
import type { PrescriptionStatus } from "@/lib/clinic-pharmacy-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

const STATUS_OPTIONS: Array<{ value: PrescriptionStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "ISSUED", label: "Issued" },
  { value: "DISPENSED", label: "Dispensed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function PharmacyPrescriptionList({
  prescriptions,
  statusFilter,
  onStatusFilterChange,
}: {
  prescriptions: PharmacyPrescription[];
  statusFilter: PrescriptionStatus | "ALL";
  onStatusFilterChange: (value: PrescriptionStatus | "ALL") => void;
}) {
  const filtered =
    statusFilter === "ALL"
      ? prescriptions
      : prescriptions.filter((item) => item.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusFilterChange(value as PrescriptionStatus | "ALL")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button asChild size="sm" className="btn-primary">
          <Link href="/pharmacy/prescriptions/new">New prescription</Link>
        </Button>
      </div>

      {!filtered.length ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">No prescription requests</p>
          <p className="mt-2">Create a draft or wait for issued prescriptions from the clinic.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((prescription) => (
            <Card key={prescription.id}>
              <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{prescription.medicationName}</p>
                    <Badge>{prescription.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Patient {prescription.patientId}</p>
                  <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {formatPortalDateTime(prescription.createdAt)}
                  </p>
                </div>
                <Link
                  href={`/pharmacy/prescriptions/${prescription.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View request
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function PharmacyPrescriptionListFilters({
  statusFilter,
  onStatusFilterChange,
}: {
  statusFilter: PrescriptionStatus | "ALL";
  onStatusFilterChange: (value: PrescriptionStatus | "ALL") => void;
}) {
  return (
    <Select
      value={statusFilter}
      onValueChange={(value) => onStatusFilterChange(value as PrescriptionStatus | "ALL")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
