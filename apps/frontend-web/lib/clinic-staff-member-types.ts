export const CLINIC_STAFF_TYPES = [
  "DOCTOR",
  "NURSE",
  "ADMIN",
  "RECEPTIONIST",
  "TECHNICIAN",
  "OTHER",
] as const;

export type ClinicStaffType = (typeof CLINIC_STAFF_TYPES)[number];

export const CLINIC_STAFF_STATUSES = ["ACTIVE", "INACTIVE"] as const;
export type ClinicStaffStatus = (typeof CLINIC_STAFF_STATUSES)[number];

export type ClinicStaffMemberRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  staffType: ClinicStaffType;
  roleId: string;
  status: ClinicStaffStatus;
  createdAt: string;
  updatedAt: string;
};

export type ClinicStaffMemberLocation = {
  id: string;
  staffId: string;
  locationId: string;
  name?: string;
  code?: string;
};

export type CreateClinicStaffMemberPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  staffType: ClinicStaffType;
  roleId: string;
  locations: string[];
  status?: ClinicStaffStatus;
};

export type CreateClinicStaffMemberResponse = {
  staff: ClinicStaffMemberRecord;
  locations: ClinicStaffMemberLocation[];
  message: string;
};

export type ClinicStaffMemberDetailResponse = {
  staff: ClinicStaffMemberRecord;
  locations: ClinicStaffMemberLocation[];
};

export type UpdateClinicStaffMemberPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  staffType?: ClinicStaffType;
  roleId?: string;
  locations?: string[];
  status?: ClinicStaffStatus;
};

export type UpdateClinicStaffMemberResponse = {
  staff: ClinicStaffMemberRecord;
  locations: ClinicStaffMemberLocation[];
  message: string;
};

export type ClinicStaffListItem = ClinicStaffMemberRecord & {
  roleName: string | null;
  locations: ClinicStaffMemberLocation[];
};

export type ClinicStaffListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  staffType?: ClinicStaffType;
  roleId?: string;
  locationId?: string;
  status?: ClinicStaffStatus;
  sortBy?: "createdAt" | "firstName" | "lastName" | "email" | "staffType" | "status" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export type ClinicStaffListResponse = {
  data: ClinicStaffListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicStaffStatusActionResponse = {
  staff: ClinicStaffMemberRecord;
  message: string;
};

export type ClinicStaffConfigNamespace =
  | "preferences"
  | "workingHours"
  | "features"
  | "restrictions";

export type ClinicStaffNotificationsConfig = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

export type ClinicStaffPreferencesConfig = {
  language?: string;
  timezone?: string;
  notifications: ClinicStaffNotificationsConfig;
};

export type ClinicStaffWeeklyScheduleEntry = {
  day: string;
  start: string;
  end: string;
};

export type ClinicStaffBreakTimeEntry = {
  start: string;
  end: string;
};

export type ClinicStaffWorkingHoursConfig = {
  weeklySchedule: ClinicStaffWeeklyScheduleEntry[];
  breakTimes: ClinicStaffBreakTimeEntry[];
};

export type ClinicStaffFeaturesConfig = {
  enableTelehealth: boolean;
  enableOverbooking: boolean;
  enableAutoAssign: boolean;
};

export type ClinicStaffRestrictionsConfig = {
  maxDailyAppointments: number;
  allowWalkIns: boolean;
  blockedDates: string[];
};

export type ClinicStaffConfigRecord = {
  namespace: ClinicStaffConfigNamespace;
  data: Record<string, unknown>;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type ClinicStaffConfigNamespaceSummary = {
  namespace: ClinicStaffConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type ClinicStaffConfigNamespacesResponse = {
  namespaces: ClinicStaffConfigNamespaceSummary[];
};

export type UpdateClinicStaffConfigResponse = {
  config: ClinicStaffConfigRecord;
  message: string;
};
