export type ClinicAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

export type ClinicPatientProfile = {
  id: string;
  tenantId?: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  address?: ClinicAddress | null;
  emergencyContact?: {
    name?: string | null;
    phone?: string | null;
  };
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClinicInvoicePayment = {
  id?: string;
  amount: number;
  method?: string;
  status?: string;
  reference?: string | null;
  paidAt?: string | null;
};

export type ClinicInvoiceView = {
  id: string;
  tenantId?: string;
  invoiceNumber: string;
  status: string;
  patientId: string;
  patientName?: string;
  description?: string | null;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  dueDate?: string | null;
  issuedAt?: string | null;
  paidAt?: string | null;
  payments?: ClinicInvoicePayment[];
  outstanding?: number;
};

export type ClinicAppointmentEvent = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  patientId?: string;
  patientName?: string;
  therapistName?: string;
  href?: string;
};
