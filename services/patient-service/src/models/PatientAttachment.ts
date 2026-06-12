export type PatientAttachmentRecord = {
  id: string;
  tenantId: string;
  patientId: string;
  uploadedByStaffId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  description: string | null;
  createdAt: string;
  downloadUrl: string;
};

export type UploadPatientAttachmentPayload = {
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
};

export type PatientAttachmentValidationFieldError = {
  field: string;
  message: string;
};
