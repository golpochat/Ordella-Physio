import type { PatientAttachment } from "@/generated/prisma";
import type { PatientAttachmentRecord } from "@/models/PatientAttachment";
import { buildPatientAttachmentPublicUrl } from "@/utils/patient-attachment-storage";

export function toPatientAttachmentResponse(attachment: PatientAttachment): PatientAttachmentRecord {
  return {
    id: attachment.id,
    tenantId: attachment.tenantId,
    patientId: attachment.patientId,
    uploadedByStaffId: attachment.uploadedByStaffId,
    fileName: attachment.fileName,
    fileType: attachment.fileType,
    fileSize: attachment.fileSize,
    storagePath: attachment.storagePath,
    description: attachment.description,
    createdAt: attachment.createdAt.toISOString(),
    downloadUrl: buildPatientAttachmentPublicUrl(attachment.patientId, attachment.id),
  };
}

export function toPatientAttachmentListResponse(
  attachments: PatientAttachment[],
): PatientAttachmentRecord[] {
  return attachments.map(toPatientAttachmentResponse);
}
