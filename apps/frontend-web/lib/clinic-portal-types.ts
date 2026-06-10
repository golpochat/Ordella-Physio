export type ClinicStaffMember = {
  id: string;
  tenantId: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type ClinicPatient = {
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

export type ClinicPatientListResponse = {
  data: ClinicPatient[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type ClinicAppointment = {
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

export type ClinicAppointmentListResponse = {
  data: ClinicAppointment[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type ClinicInvoice = {
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

export type ClinicNote = {
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

export type ClinicNoteListResponse = {
  data: ClinicNote[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type ClinicProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdateClinicProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type CreateClinicPatientPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
};

export type UpdateClinicPatientPayload = Partial<CreateClinicPatientPayload>;

export type CreateClinicStaffPayload = {
  userId: string;
  role: "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";
};

export type UpdateClinicStaffRolePayload = {
  role: "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";
};

export type ClinicRoleAssignment = {
  staffId: string;
  userId: string;
  role: string;
};

export type ClinicLocation = {
  id: string;
  tenantId: string;
  name: string;
  address: string | null;
  phone: string | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicAppointmentPayload = {
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  type: string;
  notes?: string;
};
