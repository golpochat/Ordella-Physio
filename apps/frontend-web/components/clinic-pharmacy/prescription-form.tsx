"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateClinicPrescription } from "@/hooks/useClinicPharmacy";
import type { CreateClinicPrescriptionPayload } from "@/lib/clinic-pharmacy-types";
import { adminRoutes } from "@/lib/routes";

export function PrescriptionIssueForm() {
  const router = useRouter();
  const createMutation = useCreateClinicPrescription();
  const [form, setForm] = useState<CreateClinicPrescriptionPayload>({
    patientId: "",
    therapistId: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const prescription = await createMutation.mutateAsync(form);
      toast.success("Prescription draft created");
      router.push(adminRoutes.pharmacyPrescription(prescription.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create prescription");
    }
  }

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient ID</Label>
          <Input
            id="patientId"
            value={form.patientId}
            onChange={(event) => setForm((prev) => ({ ...prev, patientId: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="therapistId">Therapist ID</Label>
          <Input
            id="therapistId"
            value={form.therapistId}
            onChange={(event) => setForm((prev) => ({ ...prev, therapistId: event.target.value }))}
            required
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
          value={form.notes}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
        />
      </div>

      <Button type="submit" className="btn-primary" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Saving…" : "Create draft prescription"}
      </Button>
    </form>
  );
}
