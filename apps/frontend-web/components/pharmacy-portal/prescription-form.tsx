"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreatePharmacyPrescription,
  usePharmacyPatients,
  useUpdatePharmacyPrescription,
} from "@/hooks/usePharmacyPortal";
import type {
  ClinicPrescription,
  CreateClinicPrescriptionPayload,
} from "@/lib/clinic-pharmacy-types";

type PharmacyPrescriptionFormProps = {
  mode: "create" | "edit";
  prescription?: ClinicPrescription;
};

export function PharmacyPrescriptionForm({ mode, prescription }: PharmacyPrescriptionFormProps) {
  const router = useRouter();
  const { data: patients = [] } = usePharmacyPatients();
  const createMutation = useCreatePharmacyPrescription();
  const updateMutation = useUpdatePharmacyPrescription(prescription?.id ?? "");
  const [form, setForm] = useState<CreateClinicPrescriptionPayload>({
    patientId: prescription?.patientId ?? "",
    therapistId: prescription?.therapistId ?? "",
    medicationName: prescription?.medicationName ?? "",
    dosage: prescription?.dosage ?? "",
    frequency: prescription?.frequency ?? "",
    duration: prescription?.duration ?? "",
    notes: prescription?.notes ?? "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      if (mode === "create") {
        const created = await createMutation.mutateAsync(form);
        toast.success("Prescription draft created");
        router.push(`/pharmacy/prescriptions/${created.id}`);
        return;
      }

      await updateMutation.mutateAsync({
        medicationName: form.medicationName,
        dosage: form.dosage,
        frequency: form.frequency,
        duration: form.duration,
        notes: form.notes,
      });
      toast.success("Prescription updated");
      router.push(`/pharmacy/prescriptions/${prescription?.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save prescription");
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient</Label>
          <Select
            value={form.patientId}
            onValueChange={(value) => setForm((prev) => ({ ...prev, patientId: value }))}
            disabled={mode === "edit"}
          >
            <SelectTrigger id="patientId">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {[patient.firstName, patient.lastName].filter(Boolean).join(" ") || patient.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="therapistId">Prescriber ID</Label>
          <Input
            id="therapistId"
            value={form.therapistId}
            onChange={(event) => setForm((prev) => ({ ...prev, therapistId: event.target.value }))}
            required
            disabled={mode === "edit"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicationName">Medication</Label>
        <Input
          id="medicationName"
          value={form.medicationName}
          onChange={(event) => setForm((prev) => ({ ...prev, medicationName: event.target.value }))}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            value={form.dosage}
            onChange={(event) => setForm((prev) => ({ ...prev, dosage: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            value={form.frequency}
            onChange={(event) => setForm((prev) => ({ ...prev, frequency: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={form.duration}
            onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={form.notes ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
        />
      </div>

      <Button type="submit" className="btn-primary" disabled={isPending}>
        {mode === "create" ? "Create draft" : "Save changes"}
      </Button>
    </form>
  );
}
