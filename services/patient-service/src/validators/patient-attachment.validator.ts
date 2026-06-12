import {
  ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES,
  MAX_PATIENT_ATTACHMENT_BYTES,
} from "@/constants/patient-attachment.constants";
import type {
  PatientAttachmentValidationFieldError,
  UploadPatientAttachmentPayload,
} from "@/models/PatientAttachment";

export function validateUploadAttachment(
  payload: UploadPatientAttachmentPayload,
):
  | { valid: true; payload: UploadPatientAttachmentPayload }
  | { valid: false; fields: PatientAttachmentValidationFieldError[] } {
  const fields: PatientAttachmentValidationFieldError[] = [];

  const fileName = payload.fileName?.trim();
  if (!fileName) {
    fields.push({ field: "fileName", message: "File name is required." });
  }

  const fileType = payload.fileType?.trim();
  if (!fileType) {
    fields.push({ field: "fileType", message: "File type is required." });
  } else if (
    !ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES.includes(
      fileType as (typeof ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES)[number],
    )
  ) {
    fields.push({ field: "fileType", message: "Unsupported file type." });
  }

  if (!Number.isFinite(payload.fileSize) || payload.fileSize <= 0) {
    fields.push({ field: "fileSize", message: "File size is required." });
  } else if (payload.fileSize > MAX_PATIENT_ATTACHMENT_BYTES) {
    fields.push({
      field: "fileSize",
      message: "The uploaded file exceeds the maximum allowed size.",
    });
  }

  const description =
    typeof payload.description === "string" ? payload.description.trim() : undefined;

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  return {
    valid: true,
    payload: {
      fileName: fileName as string,
      fileType: fileType as string,
      fileSize: payload.fileSize,
      description: description || undefined,
    },
  };
}
