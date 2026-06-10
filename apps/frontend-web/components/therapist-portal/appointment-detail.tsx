"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { AiDisclaimer } from "@/components/therapist-portal/ai-notes/ai-disclaimer";
import { AiNotesAssistant } from "@/components/therapist-portal/ai-notes/ai-notes-assistant";
import { useTherapistContext } from "@/hooks/useTherapistPortal";
import type { TherapistAppointment } from "@/lib/therapist-portal-types";
import { formatPortalDateTime } from "@/lib/therapist-portal-utils";

export function TherapistAppointmentDetail({ appointment }: { appointment: TherapistAppointment }) {
  const { therapistId } = useTherapistContext();
  const [draftNotes, setDraftNotes] = useState(appointment.notes ?? "");
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{appointment.type}</CardTitle>
          <Badge>{appointment.status}</Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-4 text-sm">
        <div>
          <p className="font-medium">When</p>
          <p className="text-muted-foreground">{formatPortalDateTime(appointment.startTime)}</p>
        </div>
        <div>
          <p className="font-medium">Patient</p>
          <p className="text-muted-foreground">{appointment.patientId}</p>
        </div>
        <div>
          <p className="font-medium">Location</p>
          <p className="text-muted-foreground">{appointment.locationId}</p>
        </div>
        <div>
          <p className="font-medium">Session notes draft</p>
          <Textarea
            rows={5}
            value={draftNotes}
            onChange={(event) => setDraftNotes(event.target.value)}
            placeholder="Capture session observations, then use AI to structure a clinical note"
          />
        </div>

        {therapistId ? (
          <div className="space-y-3 rounded-lg border border-dashed p-4">
            <p className="text-sm font-medium">AI Clinical Assistant</p>
            <AiDisclaimer />
            <AiNotesAssistant
              patientId={appointment.patientId}
              therapistId={therapistId}
              appointmentId={appointment.id}
              rawText={draftNotes}
              showSummarize
              showTreatmentPlan
              onInsertContent={(content) => setDraftNotes(content)}
            />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
