"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useUploadClinicPatientAttachment } from "@/hooks/useClinicPortal";
import {
  parsePatientAttachmentUploadErrors,
  validatePatientAttachmentFile,
} from "@/lib/clinic-patient-api-errors";

const ACCEPTED_FILE_TYPES =
  ".pdf,.jpg,.jpeg,.png,.webp,.gif,.doc,.docx,.txt,application/pdf,image/*";

export type PatientAttachmentUploaderProps = {
  patientId: string;
  disabled?: boolean;
  onUploaded?: () => void;
};

export function PatientAttachmentUploader({
  patientId,
  disabled = false,
  onUploaded,
}: PatientAttachmentUploaderProps) {
  const router = useRouter();
  const uploadAttachment = useUploadClinicPatientAttachment(patientId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const isPending = uploadAttachment.isPending;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles(files);
    setFieldErrors({});
    setGeneralError(null);
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) {
      setFieldErrors({ file: "Select at least one file to upload." });
      return;
    }

    setFieldErrors({});
    setGeneralError(null);

    for (const file of selectedFiles) {
      const clientError = validatePatientAttachmentFile(file);
      if (clientError) {
        setFieldErrors({ file: clientError });
        return;
      }
    }

    for (const file of selectedFiles) {
      try {
        await uploadAttachment.mutateAsync({
          file,
          description: description.trim() || undefined,
        });
      } catch (error) {
        const parsed = parsePatientAttachmentUploadErrors(error);

        if (parsed.forbidden || parsed.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (parsed.patientNotFound) {
          toast.error(parsed.generalError ?? "Patient does not exist.");
          router.push("/clinic/patients");
          return;
        }

        setFieldErrors(parsed.fieldErrors);
        if (parsed.generalError) {
          setGeneralError(parsed.generalError);
          toast.error(parsed.generalError);
        }
        return;
      }
    }

    setSelectedFiles([]);
    setDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Attachment uploaded successfully.");
    onUploaded?.();
  }

  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field sm:col-span-2">
          <Label htmlFor="patient-attachment-files">Files</Label>
          <Input
            id="patient-attachment-files"
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES}
            disabled={disabled || isPending}
            onChange={handleFileChange}
          />
          {fieldErrors.file ? <p className="text-sm text-destructive">{fieldErrors.file}</p> : null}
          <p className="text-sm text-muted-foreground">
            PDF, images, DOCX, DOC, or TXT up to 20MB each.
          </p>
        </div>

        <div className="user-list-filter-field sm:col-span-2">
          <Label htmlFor="patient-attachment-description">Description (optional)</Label>
          <Input
            id="patient-attachment-description"
            value={description}
            disabled={disabled || isPending}
            placeholder="Brief description of the attachment"
            onChange={(event) => setDescription(event.target.value)}
          />
          {fieldErrors.description ? (
            <p className="text-sm text-destructive">{fieldErrors.description}</p>
          ) : null}
        </div>
      </div>

      {generalError ? <p className="text-sm text-destructive">{generalError}</p> : null}

      <div className="user-list-filters-actions">
        <Button type="button" disabled={disabled || isPending} onClick={() => void handleUpload()}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </section>
  );
}
