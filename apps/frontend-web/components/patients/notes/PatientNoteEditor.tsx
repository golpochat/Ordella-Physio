"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  useCreateClinicPatientNote,
  useUpdateClinicPatientNote,
} from "@/hooks/useClinicPortal";
import { parsePatientNoteSaveErrors } from "@/lib/clinic-patient-api-errors";
import {
  CLINIC_PATIENT_NOTE_TYPES,
  type ClinicPatientNote,
  type ClinicPatientNoteType,
} from "@/lib/clinic-portal-types";

const NOTE_TYPE_LABELS: Record<ClinicPatientNoteType, string> = {
  GENERAL: "General",
  DIAGNOSIS: "Diagnosis",
  TREATMENT: "Treatment",
  FOLLOW_UP: "Follow-up",
  PHYSIOTHERAPY: "Physiotherapy",
  NURSING: "Nursing",
};

export type PatientNoteEditorProps = {
  patientId: string;
  open: boolean;
  note?: ClinicPatientNote | null;
  onOpenChange: (open: boolean) => void;
  onSaved?: (note: ClinicPatientNote) => void;
};

export function PatientNoteEditor({
  patientId,
  open,
  note,
  onOpenChange,
  onSaved,
}: PatientNoteEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(note);
  const createNote = useCreateClinicPatientNote(patientId);
  const updateNote = useUpdateClinicPatientNote(patientId, note?.id ?? "");

  const [noteType, setNoteType] = useState<ClinicPatientNoteType>("GENERAL");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const isPending = createNote.isPending || updateNote.isPending;

  useEffect(() => {
    if (!open) {
      return;
    }

    setNoteType(note?.noteType ?? "GENERAL");
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setFieldErrors({});
    setGeneralError(null);
  }, [note, open]);

  function handleSubmit() {
    setFieldErrors({});
    setGeneralError(null);

    const mutationOptions = {
      onSuccess: (response: { note: ClinicPatientNote; message: string }) => {
        onOpenChange(false);
        onSaved?.(response.note);
        toast.success(response.message ?? "Note saved successfully.");
      },
      onError: (error: unknown) => {
        const parsed = parsePatientNoteSaveErrors(error);

        if (parsed.forbidden || parsed.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (parsed.patientNotFound) {
          toast.error(parsed.generalError ?? "Patient does not exist.");
          router.push("/clinic/patients");
          return;
        }

        if (parsed.notFound) {
          toast.error(parsed.generalError ?? "Medical note does not exist.");
          onOpenChange(false);
          return;
        }

        setFieldErrors(parsed.fieldErrors);
        if (parsed.generalError) {
          setGeneralError(parsed.generalError);
        }
      },
    };

    if (isEditing && note) {
      updateNote.mutate(
        {
          noteType,
          title: title.trim(),
          content: content.trim(),
        },
        mutationOptions,
      );
      return;
    }

    createNote.mutate(
      {
        noteType,
        title: title.trim(),
        content: content.trim(),
      },
      mutationOptions,
    );
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle>{isEditing ? "Edit note" : "Add note"}</ModalTitle>
          <ModalDescription>
            Record clinical notes for this patient. Attachments support will be available in a future
            update.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          {generalError ? <p className="text-sm text-destructive">{generalError}</p> : null}

          <div className="space-y-2">
            <Label htmlFor="patient-note-type">Note type</Label>
            <select
              id="patient-note-type"
              className="tenant-create-form-select"
              value={noteType}
              disabled={isPending}
              onChange={(event) => setNoteType(event.target.value as ClinicPatientNoteType)}
            >
              {CLINIC_PATIENT_NOTE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {NOTE_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            {fieldErrors.noteType ? (
              <p className="text-sm text-destructive">{fieldErrors.noteType}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-note-title">Title</Label>
            <Input
              id="patient-note-title"
              value={title}
              disabled={isPending}
              onChange={(event) => setTitle(event.target.value)}
            />
            {fieldErrors.title ? <p className="text-sm text-destructive">{fieldErrors.title}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-note-content">Content</Label>
            <textarea
              id="patient-note-content"
              className="tenant-config-json-editor"
              rows={8}
              value={content}
              disabled={isPending}
              onChange={(event) => setContent(event.target.value)}
            />
            {fieldErrors.content ? (
              <p className="text-sm text-destructive">{fieldErrors.content}</p>
            ) : null}
          </div>
        </div>

        <ModalFooter className="gap-2 sm:gap-0">
          <Button variant="outline" disabled={isPending} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" disabled={isPending} onClick={handleSubmit}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isPending ? "Saving..." : "Save note"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
