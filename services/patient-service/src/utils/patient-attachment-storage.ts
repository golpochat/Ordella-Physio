import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import { extname, join } from "path";
import {
  ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES,
  MAX_PATIENT_ATTACHMENT_BYTES,
} from "@/constants/patient-attachment.constants";

export type PatientAttachmentUploadFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname: string;
};

export function getPatientAttachmentUploadRoot(): string {
  return (
    process.env.PATIENT_ATTACHMENT_UPLOAD_DIR ??
    join(process.cwd(), "uploads", "patient-attachments")
  );
}

export function buildPatientAttachmentDownloadPath(
  patientId: string,
  attachmentId: string,
): string {
  return `/patients/${patientId}/attachments/${attachmentId}/download`;
}

export function buildPatientAttachmentPublicUrl(patientId: string, attachmentId: string): string {
  const configuredBase = process.env.PATIENT_ATTACHMENT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const path = buildPatientAttachmentDownloadPath(patientId, attachmentId);
  return configuredBase ? `${configuredBase}${path}` : path;
}

function resolveAttachmentExtension(file: PatientAttachmentUploadFile): string {
  const fromName = extname(file.originalname).toLowerCase();
  if (fromName) {
    return fromName;
  }

  switch (file.mimetype) {
    case "application/pdf":
      return ".pdf";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return ".docx";
    case "application/msword":
      return ".doc";
    case "text/plain":
      return ".txt";
    default:
      return "";
  }
}

export function isAllowedPatientAttachmentMimeType(mimeType: string): boolean {
  return ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES.includes(
    mimeType as (typeof ALLOWED_PATIENT_ATTACHMENT_MIME_TYPES)[number],
  );
}

export function isAllowedPatientAttachmentSize(size: number): boolean {
  return size > 0 && size <= MAX_PATIENT_ATTACHMENT_BYTES;
}

function buildRelativeStoragePath(
  tenantId: string,
  patientId: string,
  filename: string,
): string {
  return join(tenantId, patientId, filename);
}

export function resolveAbsoluteStoragePath(storagePath: string): string {
  return join(getPatientAttachmentUploadRoot(), storagePath);
}

async function uploadToLocal(
  file: PatientAttachmentUploadFile,
  tenantId: string,
  patientId: string,
): Promise<string> {
  const extension = resolveAttachmentExtension(file);
  const filename = `${randomUUID()}${extension}`;
  const relativePath = buildRelativeStoragePath(tenantId, patientId, filename);
  const absolutePath = resolveAbsoluteStoragePath(relativePath);

  await mkdir(join(getPatientAttachmentUploadRoot(), tenantId, patientId), { recursive: true });
  await writeFile(absolutePath, file.buffer);

  return relativePath.replace(/\\/g, "/");
}

async function uploadToS3(
  _file: PatientAttachmentUploadFile,
  _tenantId: string,
  _patientId: string,
): Promise<string> {
  const bucket = process.env.PATIENT_ATTACHMENT_S3_BUCKET;
  const publicBase = process.env.PATIENT_ATTACHMENT_S3_PUBLIC_BASE_URL?.replace(/\/$/, "");

  if (!bucket || !publicBase) {
    throw new Error("S3_NOT_CONFIGURED");
  }

  throw new Error("S3_SDK_NOT_AVAILABLE");
}

export async function uploadPatientAttachmentFile(
  file: PatientAttachmentUploadFile,
  tenantId: string,
  patientId: string,
): Promise<string> {
  const storage = process.env.PATIENT_ATTACHMENT_STORAGE ?? "local";

  if (storage === "s3") {
    return uploadToS3(file, tenantId, patientId);
  }

  return uploadToLocal(file, tenantId, patientId);
}

export async function deletePatientAttachmentFile(storagePath: string): Promise<void> {
  const storage = process.env.PATIENT_ATTACHMENT_STORAGE ?? "local";
  if (storage === "s3") {
    return;
  }

  try {
    await unlink(resolveAbsoluteStoragePath(storagePath));
  } catch {
    // Ignore missing files during cleanup.
  }
}
