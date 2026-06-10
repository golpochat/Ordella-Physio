export type TherapistAppointment = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  notes: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TherapistAppointmentListResponse = {
  data: TherapistAppointment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type TherapistPatient = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TherapistPatientListResponse = {
  data: TherapistPatient[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type TherapistNote = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  appointmentId: string | null;
  type: string;
  content: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
};

export type TherapistNoteListResponse = {
  data: TherapistNote[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type TherapistInvoice = {
  id: string;
  tenantId: string;
  patientId: string;
  appointmentId: string | null;
  invoiceNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  dueDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TherapistProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdateTherapistProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type CreateTherapistNotePayload = {
  patientId: string;
  therapistId: string;
  appointmentId?: string;
  type: "GENERAL" | "SOAP" | "EXERCISE_PLAN" | "PROGRESS";
  content: string;
  attachments?: string[];
};

export type UpdateTherapistNotePayload = {
  patientId?: string;
  therapistId?: string;
  appointmentId?: string;
  type?: "GENERAL" | "SOAP" | "EXERCISE_PLAN" | "PROGRESS";
  content?: string;
  attachments?: string[];
};

export type TherapistNotification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};
