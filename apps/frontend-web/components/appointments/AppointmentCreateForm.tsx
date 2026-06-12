"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import {
  useClinicLocations,
  useClinicPatientsList,
  useCreateClinicAppointment,
} from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import { parseAppointmentCreateErrors } from "@/lib/appointment-api-errors";
import type { ClinicAppointmentType } from "@/lib/clinic-portal-types";

function combineDateAndTime(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

const APPOINTMENT_TYPE_OPTIONS: Array<{ value: ClinicAppointmentType; label: string }> = [
  { value: "IN_PERSON", label: "In person" },
  { value: "TELEMEDICINE", label: "Telemedicine" },
];

export function AppointmentCreateForm() {
  const router = useRouter();
  const createAppointment = useCreateClinicAppointment();
  const patientsQuery = useClinicPatientsList({ page: 1, limit: 100, status: "ACTIVE" });
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const locationsQuery = useClinicLocations();

  const [patientId, setPatientId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [appointmentType, setAppointmentType] = useState<ClinicAppointmentType>("IN_PERSON");
  const [locationId, setLocationId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const loading = patientsQuery.isLoading || staffQuery.isLoading || locationsQuery.isLoading;

  const patients = patientsQuery.data?.data ?? [];
  const staffMembers = useMemo(
    () => (staffQuery.data?.data ?? []).filter((member) => member.status === "ACTIVE"),
    [staffQuery.data?.data],
  );
  const locations = (locationsQuery.data ?? []).filter((location) => location.status === "ACTIVE");

  useEffect(() => {
    if (!locationId && locations[0]) {
      setLocationId(locations[0].id);
    }
  }, [locationId, locations]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!patientId) {
      errors.patientId = "Patient is required";
    }

    if (!staffId) {
      errors.staffId = "Staff is required";
    }

    if (appointmentType === "IN_PERSON" && !locationId) {
      errors.locationId = "Location is required";
    }

    if (!appointmentDate || !startTime) {
      errors.startTime = "Start time is required";
    }

    if (!appointmentDate || !endTime) {
      errors.endTime = "End time is required";
    }

    if (appointmentDate && startTime && endTime) {
      const start = new Date(`${appointmentDate}T${startTime}`);
      const end = new Date(`${appointmentDate}T${endTime}`);
      if (end.getTime() <= start.getTime()) {
        errors.endTime = "End time must be after start time";
      }
    }

    return errors;
  }

  if (loading) {
    return <PageLoading rows={4} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule appointment</CardTitle>
        <CardDescription>Create a new appointment for a patient and staff member.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const clientErrors = validateClient();
            setFieldErrors(clientErrors);

            if (Object.keys(clientErrors).length > 0) {
              return;
            }

            createAppointment.mutate(
              {
                patientId,
                staffId,
                appointmentType,
                locationId: appointmentType === "IN_PERSON" ? locationId : undefined,
                startTime: combineDateAndTime(appointmentDate, startTime),
                endTime: combineDateAndTime(appointmentDate, endTime),
                notes: notes || undefined,
              },
              {
                onSuccess: () => {
                  toast.success("Appointment created successfully.");
                  router.push("/clinic/appointments");
                },
                onError: (error) => {
                  const parsed = parseAppointmentCreateErrors(error);

                  if (parsed.forbidden) {
                    router.replace("/forbidden");
                    return;
                  }

                  if (parsed.staffNotAvailable) {
                    toast.error(
                      parsed.generalError ??
                        "The selected staff member is not available at this time.",
                    );
                    return;
                  }

                  if (parsed.patientAlreadyBooked) {
                    toast.error(
                      parsed.generalError ??
                        "The patient already has an appointment at this time.",
                    );
                    return;
                  }

                  if (parsed.invalidLocation) {
                    toast.error(
                      parsed.generalError ??
                        "The selected location does not belong to this tenant.",
                    );
                    return;
                  }

                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="form-error-banner">{generalError}</p> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <select
                id="patientId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
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
              {fieldErrors.patientId ? (
                <p className="form-field-error">{fieldErrors.patientId}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffId">Staff</Label>
              <select
                id="staffId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
              >
                <option value="" disabled>
                  Select staff member
                </option>
                {staffMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
              {fieldErrors.staffId ? (
                <p className="form-field-error">{fieldErrors.staffId}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment type</Label>
              <select
                id="appointmentType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={appointmentType}
                onChange={(event) =>
                  setAppointmentType(event.target.value as ClinicAppointmentType)
                }
              >
                {APPOINTMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {appointmentType === "IN_PERSON" ? (
              <div className="space-y-2">
                <Label htmlFor="locationId">Location</Label>
                {locations.length ? (
                  <select
                    id="locationId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={locationId}
                    onChange={(event) => setLocationId(event.target.value)}
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
                  />
                )}
                {fieldErrors.locationId ? (
                  <p className="form-field-error">{fieldErrors.locationId}</p>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Date</Label>
              <Input
                id="appointmentDate"
                type="date"
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Start time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
              {fieldErrors.startTime ? (
                <p className="form-field-error">{fieldErrors.startTime}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
              {fieldErrors.endTime ? (
                <p className="form-field-error">{fieldErrors.endTime}</p>
              ) : null}
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
            {createAppointment.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              "Schedule appointment"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
