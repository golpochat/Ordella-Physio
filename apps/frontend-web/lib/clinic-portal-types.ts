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

export type CreateClinicAppointmentPayload = {
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  type: string;
  notes?: string;
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
