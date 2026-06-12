export type ClinicUserListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: "ACTIVE" | "DISABLED";
  sortBy?: "createdAt" | "firstName" | "lastName" | "email" | "role";
  sortOrder?: "asc" | "desc";
};

export type ClinicUserListResponse = {
  data: ClinicUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicUser = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
};

export type CreateClinicUserResponse = {
  user: ClinicUser;
  message: string;
};

export type UpdateClinicUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  role?: string;
  status?: "ACTIVE" | "DISABLED";
};

export type UpdateClinicUserResponse = {
  user: ClinicUser;
  message: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PasswordMessageResponse = {
  message: string;
};

export type ChangeClinicUserRolePayload = {
  role: string;
};

export type ChangeClinicUserRoleResponse = {
  user: ClinicUser;
  message: string;
};

export type ClinicStaffMember = {
  id: string;
  tenantId: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type ClinicPatientGender = "MALE" | "FEMALE" | "OTHER";

export type ClinicPatientStatus = "ACTIVE" | "INACTIVE";

export type ClinicPatientInsurance = {
  id: string;
  patientId: string;
  providerName: string;
  policyNumber: string;
  expiryDate: string;
  notes: string | null;
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
  bloodGroup: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  status: ClinicPatientStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClinicPatientListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  status?: ClinicPatientStatus;
  dobStart?: string;
  dobEnd?: string;
  sortBy?:
    | "createdAt"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "gender"
    | "status"
    | "dateOfBirth"
    | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export type ClinicPatientListResponse = {
  data: ClinicPatient[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicPatientStatusActionResponse = {
  patient: ClinicPatient;
  message: string;
};

export const CLINIC_PATIENT_NOTE_TYPES = [
  "GENERAL",
  "DIAGNOSIS",
  "TREATMENT",
  "FOLLOW_UP",
  "PHYSIOTHERAPY",
  "NURSING",
] as const;

export type ClinicPatientNoteType = (typeof CLINIC_PATIENT_NOTE_TYPES)[number];

export type ClinicPatientNoteAttachment = {
  name: string;
  url?: string;
  mimeType?: string;
};

export type ClinicPatientNote = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string;
  noteType: ClinicPatientNoteType;
  title: string;
  content: string;
  attachments: ClinicPatientNoteAttachment[] | null;
  createdAt: string;
  updatedAt: string;
};

export type ClinicPatientNoteListFilters = {
  page?: number;
  limit?: number;
  noteType?: ClinicPatientNoteType;
  staffId?: string;
  createdFrom?: string;
  createdTo?: string;
};

export type ClinicPatientNoteListResponse = {
  data: ClinicPatientNote[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicPatientNoteDetailResponse = {
  note: ClinicPatientNote;
};

export type CreateClinicPatientNotePayload = {
  noteType: ClinicPatientNoteType;
  title: string;
  content: string;
  attachments?: ClinicPatientNoteAttachment[];
};

export type UpdateClinicPatientNotePayload = {
  noteType?: ClinicPatientNoteType;
  title?: string;
  content?: string;
  attachments?: ClinicPatientNoteAttachment[];
};

export type ClinicPatientNoteSaveResponse = {
  note: ClinicPatientNote;
  message: string;
};

export type ClinicPatientAttachment = {
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

export type ClinicPatientAttachmentListResponse = {
  data: ClinicPatientAttachment[];
};

export type ClinicPatientAttachmentDetailResponse = {
  attachment: ClinicPatientAttachment;
};

export type ClinicPatientAttachmentUploadResponse = {
  attachment: ClinicPatientAttachment;
  message: string;
};

export type ClinicPatientAttachmentDeleteResponse = {
  message: string;
};

export type ClinicAppointment = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string | null;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  notes: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClinicAppointmentListItem = ClinicAppointment & {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  staff: {
    id: string;
    firstName: string;
    lastName: string;
  };
  location: {
    id: string;
    name: string;
  } | null;
  appointmentType: string;
};

export type ClinicAppointmentListResponse = {
  data: ClinicAppointmentListItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

export type ClinicAppointmentListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  staffId?: string;
  patientId?: string;
  locationId?: string;
  appointmentType?: ClinicAppointmentType;
  status?: "SCHEDULED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  dateStart?: string;
  dateEnd?: string;
  sortBy?: "startTime" | "endTime" | "createdAt" | "status" | "type";
  sortOrder?: "asc" | "desc";
};

export type ClinicInvoiceItem = {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type ClinicInvoice = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string | null;
  appointmentId: string | null;
  invoiceNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  discount: number;
  taxTotal?: number;
  discountTotal?: number;
  total: number;
  currency: string;
  dueDate: string | null;
  notes: string | null;
  issuedAt?: string | null;
  paidAt?: string | null;
  paymentReference?: string | null;
  items?: ClinicInvoiceItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicInvoiceItemPayload = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount?: number;
};

export type CreateClinicInvoicePayload = {
  patientId: string;
  staffId?: string;
  appointmentId?: string;
  notes?: string;
  items: CreateClinicInvoiceItemPayload[];
};

export type CreateClinicInvoiceResponse = {
  invoice: ClinicInvoice;
  items: ClinicInvoiceItem[];
  message: string;
};

export type UpdateClinicInvoiceItemPayload = {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount?: number;
};

export type UpdateClinicInvoicePayload = {
  patientId?: string;
  staffId?: string | null;
  appointmentId?: string | null;
  notes?: string;
  status?: "DRAFT" | "ISSUED";
  items?: UpdateClinicInvoiceItemPayload[];
};

export type UpdateClinicInvoiceResponse = {
  invoice: ClinicInvoice;
  items: ClinicInvoiceItem[];
  message: string;
};

export type MarkClinicInvoicePaidPayload = {
  paymentReference?: string;
};

export type ClinicInvoiceStatusActionResponse = {
  invoice: ClinicInvoice;
  message: string;
};

export type ClinicInvoiceListItem = ClinicInvoice & {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  staff: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
};

export type ClinicInvoiceListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  patientId?: string;
  staffId?: string;
  status?: "DRAFT" | "ISSUED" | "PAID" | "VOID" | "VOIDED";
  dateStart?: string;
  dateEnd?: string;
  minTotal?: number;
  maxTotal?: number;
  sortBy?: "createdAt" | "invoiceNumber" | "status" | "subtotal" | "total";
  sortOrder?: "asc" | "desc";
};

export type ClinicInvoiceListResponse = {
  data: ClinicInvoiceListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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

export type UserProfile = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
};

export type ClinicProfile = UserProfile;

export type UpdateUserProfilePayload = {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
};

export type UpdateClinicProfilePayload = UpdateUserProfilePayload;

export type UpdateUserProfileResponse = {
  user: UserProfile;
  message: string;
};

export type UploadAvatarResponse = {
  avatarUrl: string;
  user: UserProfile;
  message: string;
};

export type RemoveAvatarResponse = {
  user: UserProfile;
  message: string;
};

export type CreateClinicPatientInsurancePayload = {
  providerName: string;
  policyNumber: string;
  expiryDate: string;
  notes?: string;
};

export type CreateClinicPatientPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: ClinicPatientGender;
  bloodGroup?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance?: CreateClinicPatientInsurancePayload;
};

export type CreateClinicPatientResponse = {
  patient: ClinicPatient;
  insurance: ClinicPatientInsurance | null;
  message: string;
};

export type ClinicPatientDetailResponse = {
  patient: ClinicPatient;
  insurance: ClinicPatientInsurance | null;
};

export type UpdateClinicPatientPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: ClinicPatientGender;
  bloodGroup?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  insurance?: CreateClinicPatientInsurancePayload;
};

export type UpdateClinicPatientResponse = {
  patient: ClinicPatient;
  insurance: ClinicPatientInsurance | null;
  message: string;
};

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
  code: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  phone: string | null;
  email: string | null;
  timezone: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicLocationPayload = {
  name: string;
  code: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  timezone: string;
};

export type CreateClinicLocationResponse = {
  location: ClinicLocation;
  message: string;
};

export type UpdateClinicLocationPayload = {
  name?: string;
  code?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  state?: string | null;
  postalCode?: string;
  country?: string;
  phone?: string | null;
  email?: string | null;
  timezone?: string;
  status?: "ACTIVE" | "INACTIVE";
};

export type UpdateClinicLocationResponse = {
  location: ClinicLocation;
  message: string;
};

export type ClinicLocationStatusActionResponse = {
  location: ClinicLocation;
  message: string;
};

export type ClinicLocationListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
  sortBy?: "createdAt" | "name" | "code" | "city" | "status";
  sortOrder?: "asc" | "desc";
};

export type ClinicLocationListResponse = {
  data: ClinicLocation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicLocationConfigNamespace =
  | "branding"
  | "operations"
  | "features"
  | "integrations";

export type ClinicLocationOpeningHoursEntry = {
  day: string;
  open: string;
  close: string;
};

export type ClinicLocationBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type ClinicLocationOperationsConfig = {
  openingHours: ClinicLocationOpeningHoursEntry[];
  maxDailyAppointments: number;
  allowWalkIns: boolean;
};

export type ClinicLocationFeaturesConfig = {
  enableKioskCheckIn: boolean;
  enableQueueManagement: boolean;
  enableInventoryTracking: boolean;
};

export type ClinicLocationIntegrationsConfig = {
  posDeviceId?: string | null;
  printerIp?: string | null;
  iotGatewayUrl?: string | null;
};

export type ClinicLocationConfigRecord = {
  namespace: ClinicLocationConfigNamespace;
  data: Record<string, unknown>;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type ClinicLocationConfigNamespaceSummary = {
  namespace: ClinicLocationConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type ClinicLocationConfigNamespacesResponse = {
  namespaces: ClinicLocationConfigNamespaceSummary[];
};

export type UpdateClinicLocationConfigResponse = {
  config: ClinicLocationConfigRecord;
  message: string;
};

export type ClinicAppointmentType = "IN_PERSON" | "TELEMEDICINE";

export type CreateClinicAppointmentPayload = {
  patientId: string;
  staffId: string;
  locationId?: string;
  appointmentType: ClinicAppointmentType;
  startTime: string;
  endTime: string;
  notes?: string;
};

export type CreateClinicAppointmentResponse = {
  appointment: ClinicAppointment;
  message: string;
};

export type UpdateClinicAppointmentPayload = {
  patientId?: string;
  staffId?: string;
  locationId?: string | null;
  appointmentType?: ClinicAppointmentType;
  startTime?: string;
  endTime?: string;
  notes?: string | null;
};

export type UpdateClinicAppointmentResponse = {
  appointment: ClinicAppointment;
  message: string;
};

export type ClinicAppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type ClinicAppointmentStatusActionResponse = {
  appointment: ClinicAppointment;
  message: string;
};

export type ClinicAppointmentCalendarView = "day" | "week" | "month";

export type ClinicAppointmentCalendarFilters = {
  view?: ClinicAppointmentCalendarView;
  date?: string;
  staffId?: string;
  locationId?: string;
  appointmentType?: ClinicAppointmentType;
  status?: ClinicAppointmentStatus;
};

export type ClinicAppointmentCalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  appointmentType: string;
  status: string;
  staffId: string;
  patientId: string;
  locationId: string | null;
};

export type ClinicAppointmentCalendarResponse = {
  data: ClinicAppointmentCalendarEvent[];
};

export type ClinicAppointmentReminderChannel = "EMAIL" | "SMS" | "PUSH";

export type ClinicAppointmentReminderStatus = "SCHEDULED" | "SENT" | "CANCELLED" | "FAILED";

export type ClinicAppointmentReminder = {
  id: string;
  tenantId: string;
  appointmentId: string;
  patientId: string;
  staffId: string | null;
  channel: ClinicAppointmentReminderChannel;
  offsetMinutes: number;
  status: ClinicAppointmentReminderStatus;
  lastError: string | null;
  scheduledFor: string;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicAppointmentReminderPayload = {
  channel: ClinicAppointmentReminderChannel;
  offsetMinutes: number;
  staffId?: string;
};

export type UpdateClinicAppointmentReminderPayload = {
  channel?: ClinicAppointmentReminderChannel;
  offsetMinutes?: number;
  status?: "CANCELLED";
};

export type ClinicAppointmentReminderSaveResponse = {
  reminder: ClinicAppointmentReminder;
  message: string;
};

export type ClinicSubscriptionPlan = "STARTER" | "PROFESSIONAL" | "ENTERPRISE";

export type ClinicStripeSubscription = {
  tenantId: string;
  stripeCustomerId: string | null;
  defaultPaymentMethodId: string | null;
  status: string;
  plan: ClinicSubscriptionPlan | null;
  subscription: {
    id: string;
    priceId: string;
    status: string;
    plan: ClinicSubscriptionPlan;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: string | null;
  } | null;
};

export type ClinicStripeInvoice = {
  id: string;
  number: string | null;
  status: string | null;
  amountDue: number;
  amountPaid: number;
  currency: string;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  createdAt: string;
  periodStart: string | null;
  periodEnd: string | null;
};

export type CreateClinicSubscriptionPayload = {
  plan: ClinicSubscriptionPlan;
  paymentMethodId?: string;
};

export type CancelClinicSubscriptionPayload = {
  immediately?: boolean;
};
