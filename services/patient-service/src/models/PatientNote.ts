export const PATIENT_NOTE_TYPES = [
  "GENERAL",
  "DIAGNOSIS",
  "TREATMENT",
  "FOLLOW_UP",
  "PHYSIOTHERAPY",
  "NURSING",
] as const;

export type PatientNoteType = (typeof PATIENT_NOTE_TYPES)[number];

export type PatientNoteAttachment = {
  name: string;
  url?: string;
  mimeType?: string;
};

export type PatientNoteRecord = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string;
  noteType: PatientNoteType;
  title: string;
  content: string;
  attachments: PatientNoteAttachment[] | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePatientNotePayload = {
  noteType: PatientNoteType;
  title: string;
  content: string;
  attachments?: PatientNoteAttachment[];
};

export type UpdatePatientNotePayload = {
  noteType?: PatientNoteType;
  title?: string;
  content?: string;
  attachments?: PatientNoteAttachment[];
};

export type PatientNoteValidationFieldError = {
  field: string;
  message: string;
};
