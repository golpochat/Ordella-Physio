export type StaffPatient = {
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

export type StaffPatientListResponse = {
  data: StaffPatient[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type StaffAppointment = {
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

export type StaffAppointmentListResponse = {
  data: StaffAppointment[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type StaffInvoice = {
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

export type StaffNote = {
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

export type StaffNoteListResponse = {
  data: StaffNote[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type StaffProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdateStaffProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
