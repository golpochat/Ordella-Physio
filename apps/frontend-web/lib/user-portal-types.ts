export type PortalUserAppointment = {
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

export type PortalUserAppointmentListResponse = {
  data: PortalUserAppointment[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type PortalUserInvoice = {
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

export type PortalUserNote = {
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

export type PortalUserNoteListResponse = {
  data: PortalUserNote[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type PortalUserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdatePortalUserProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
