"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import {
  useClinicLocations,
  useClinicPatients,
  useClinicTherapists,
  useCreateClinicAppointment,
} from "@/hooks/useClinicPortal";

function toIsoDateTime(localValue: string): string {
  return new Date(localValue).toISOString();
}

export function ClinicAppointmentCreateForm() {
  const router = useRouter();
  const createAppointment = useCreateClinicAppointment();
  const patientsQuery = useClinicPatients();
  const therapistsQuery = useClinicTherapists();
  const locationsQuery = useClinicLocations();

  const [patientId, setPatientId] = useState("");
  const [therapistId, setTherapistId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("Initial consultation");
  const [notes, setNotes] = useState("");

  const loading = patientsQuery.isLoading || therapistsQuery.isLoading || locationsQuery.isLoading;
  const patients = patientsQuery.data ?? [];
  const therapists = therapistsQuery.data ?? [];
  const locations = (locationsQuery.data ?? []).filter((location) => location.status === "ACTIVE");

  useEffect(() => {
    if (!locationId && locations[0]) {
      setLocationId(locations[0].id);
    }
  }, [locationId, locations]);

  if (loading) {
    return <PageLoading rows={4} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule appointment</CardTitle>
        <CardDescription>Create a new appointment for a patient and therapist.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();

            if (!patientId || !therapistId || !locationId || !startTime || !endTime || !type) {
              toast.error("Complete all required fields before scheduling.");
              return;
            }

            createAppointment.mutate(
              {
                patientId,
                staffId: therapistId,
                locationId,
                appointmentType:
                  type === "TELEMEDICINE" ? "TELEMEDICINE" : "IN_PERSON",
                startTime: toIsoDateTime(startTime),
                endTime: toIsoDateTime(endTime),
                notes: notes || undefined,
              },
              {
                onSuccess: (appointment) => {
                  toast.success("Appointment scheduled");
                  router.push(`/clinic/appointments/${appointment.id}`);
                },
                onError: () => toast.error("Failed to schedule appointment"),
              },
            );
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <select
                id="patientId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select patient
                </option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="therapistId">Therapist</Label>
              <select
                id="therapistId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={therapistId}
                onChange={(event) => setTherapistId(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select therapist
                </option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.userId}>
                    {therapist.userId}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationId">Location</Label>
              {locations.length ? (
                <select
                  id="locationId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={locationId}
                  onChange={(event) => setLocationId(event.target.value)}
                  required
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id="locationId"
                  value={locationId}
                  onChange={(event) => setLocationId(event.target.value)}
                  placeholder="Location ID"
                  required
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Appointment type</Label>
              <Input
                id="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional scheduling notes"
            />
          </div>
          <Button type="submit" disabled={createAppointment.isPending}>
            {createAppointment.isPending ? "Scheduling..." : "Schedule appointment"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
