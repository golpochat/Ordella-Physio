export type PharmacyPatient = {
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

export type PharmacyPatientListResponse = {
  data: PharmacyPatient[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type PharmacyAppointment = {
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

export type PharmacyAppointmentListResponse = {
  data: PharmacyAppointment[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type PharmacyInvoice = {
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

export type PharmacyPrescription = {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  status: "PENDING" | "APPROVED" | "DISPENSED" | "CANCELLED";
  requestedAt: string;
  appointmentId: string | null;
};

export type PharmacyFulfillmentOrder = {
  id: string;
  prescriptionId: string;
  patientId: string;
  patientName: string;
  medication: string;
  status: "QUEUED" | "PREPARING" | "READY" | "DELIVERED";
  appointmentId: string | null;
  updatedAt: string;
};

export type PharmacyProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdatePharmacyProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
