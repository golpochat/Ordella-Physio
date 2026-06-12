export const MAX_PATIENT_ATTACHMENT_BYTES = 20 * 1024 * 1024;

export const ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
] as const;
