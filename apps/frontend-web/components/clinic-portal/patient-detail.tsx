"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useDeleteClinicPatient, useUpdateClinicPatient } from "@/hooks/useClinicPortal";
import type { ClinicPatient } from "@/lib/clinic-portal-types";
import { formatPortalDate, getPatientDisplayName } from "@/lib/clinic-portal-utils";

export function ClinicPatientDetail({ patient }: { patient: ClinicPatient }) {
  const router = useRouter();
  const updatePatient = useUpdateClinicPatient(patient.id);
  const deletePatient = useDeleteClinicPatient();
  const [firstName, setFirstName] = useState(patient.firstName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [email, setEmail] = useState(patient.email ?? "");
  const [phone, setPhone] = useState(patient.phone ?? "");
  const [address, setAddress] = useState(patient.address ?? "");
  const [notes, setNotes] = useState(patient.notes ?? "");

  useEffect(() => {
    setFirstName(patient.firstName);
    setLastName(patient.lastName);
    setEmail(patient.email ?? "");
    setPhone(patient.phone ?? "");
    setAddress(patient.address ?? "");
    setNotes(patient.notes ?? "");
  }, [patient]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{getPatientDisplayName(patient)}</CardTitle>
        </CardHeader>
        <CardBody>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              updatePatient.mutate(
                {
                  firstName,
                  lastName,
                  email: email || undefined,
                  phone: phone || undefined,
                  address: address || undefined,
                  notes: notes || undefined,
                },
                {
                  onSuccess: () => toast.success("Patient updated"),
                  onError: () => toast.error("Failed to update patient"),
                },
              );
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {patient.dateOfBirth ? (
                <p>Date of birth: {formatPortalDate(patient.dateOfBirth)}</p>
              ) : null}
              <p>Gender: {patient.gender}</p>
            </div>
            <Button type="submit" disabled={updatePatient.isPending}>
              {updatePatient.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="destructive"
          disabled={deletePatient.isPending}
          onClick={() => {
            if (!window.confirm("Delete this patient record?")) {
              return;
            }
            deletePatient.mutate(patient.id, {
              onSuccess: () => {
                toast.success("Patient deleted");
                router.push("/clinic/patients");
              },
              onError: () => toast.error("Failed to delete patient"),
            });
          }}
        >
          Delete patient
        </Button>
        <Button asChild variant="outline">
          <Link href="/clinic/patients">Back to patients</Link>
        </Button>
      </div>
    </div>
  );
}
