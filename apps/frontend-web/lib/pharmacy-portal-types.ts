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
  tenantId: string;
  patientId: string;
  therapistId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  status: "DRAFT" | "ISSUED" | "DISPENSED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  fulfillment?: {
    id: string;
    prescriptionId: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
    filledBy: string | null;
    filledAt: string | null;
    notes: string;
  } | null;
};

export type PharmacyFulfillmentOrder = PharmacyPrescription;

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
