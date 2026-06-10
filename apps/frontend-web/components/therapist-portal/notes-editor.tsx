"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCreateTherapistNote,
  useTherapistContext,
  useTherapistPatients,
  useUpdateTherapistNote,
} from "@/hooks/useTherapistPortal";
import { AiDisclaimer } from "@/components/therapist-portal/ai-notes/ai-disclaimer";
import { AiNotesAssistant } from "@/components/therapist-portal/ai-notes/ai-notes-assistant";
import type {
  CreateTherapistNotePayload,
  TherapistNote,
  UpdateTherapistNotePayload,
} from "@/lib/therapist-portal-types";

const NOTE_TYPES = ["GENERAL", "SOAP", "EXERCISE_PLAN", "PROGRESS"] as const;

export type NotesEditorProps = {
  mode: "create" | "edit";
  note?: TherapistNote;
};

export function NotesEditor({ mode, note }: NotesEditorProps) {
  const router = useRouter();
  const { therapistId } = useTherapistContext();
  const patientsQuery = useTherapistPatients();
  const createNote = useCreateTherapistNote();
  const updateNote = useUpdateTherapistNote(note?.id ?? "");

  const [patientId, setPatientId] = useState(note?.patientId ?? "");
  const [appointmentId, setAppointmentId] = useState(note?.appointmentId ?? "");
  const [type, setType] = useState<CreateTherapistNotePayload["type"]>(
    (note?.type as CreateTherapistNotePayload["type"]) ?? "GENERAL",
  );
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    if (note) {
      setPatientId(note.patientId);
      setAppointmentId(note.appointmentId ?? "");
      setType(note.type as CreateTherapistNotePayload["type"]);
      setContent(note.content);
    }
  }, [note]);

  const isPending = createNote.isPending || updateNote.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create clinical note" : "Edit clinical note"}</CardTitle>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!therapistId || !patientId) {
              toast.error("Therapist and patient are required.");
              return;
            }

            if (mode === "create") {
              const payload: CreateTherapistNotePayload = {
                patientId,
                therapistId,
                type,
                content,
                ...(appointmentId ? { appointmentId } : {}),
              };
              createNote.mutate(payload, {
                onSuccess: (created) => {
                  toast.success("Note created");
                  router.push(`/therapist/notes/${created.id}`);
                },
                onError: () => toast.error("Failed to create note"),
              });
              return;
            }

            const payload: UpdateTherapistNotePayload = {
              patientId,
              therapistId,
              type,
              content,
              appointmentId: appointmentId || undefined,
            };
            updateNote.mutate(payload, {
              onSuccess: () => {
                toast.success("Note updated");
                router.push(`/therapist/notes/${note?.id}`);
              },
              onError: () => toast.error("Failed to update note"),
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient</Label>
            <select
              id="patientId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              required
            >
              <option value="">Select patient</option>
              {(patientsQuery.data ?? []).map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Note type</Label>
            <select
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={type}
              onChange={(event) =>
                setType(event.target.value as CreateTherapistNotePayload["type"])
              }
            >
              {NOTE_TYPES.map((noteType) => (
                <option key={noteType} value={noteType}>
                  {noteType}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentId">Appointment ID (optional)</Label>
            <Input
              id="appointmentId"
              value={appointmentId}
              onChange={(event) => setAppointmentId(event.target.value)}
              placeholder="Link to an appointment"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={8}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
          </div>

          {therapistId ? (
            <div className="space-y-3 rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">AI Clinical Assistant</p>
              <AiDisclaimer />
              <AiNotesAssistant
                patientId={patientId}
                therapistId={therapistId}
                appointmentId={appointmentId || undefined}
                rawText={content}
                onInsertContent={(nextContent, noteType) => {
                  setContent(nextContent);
                  if (noteType) setType(noteType);
                }}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : mode === "create" ? "Create note" : "Save changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
