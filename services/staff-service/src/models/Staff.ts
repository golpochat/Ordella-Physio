export const STAFF_TYPES = [
  "DOCTOR",
  "NURSE",
  "ADMIN",
  "RECEPTIONIST",
  "TECHNICIAN",
  "OTHER",
] as const;

export type StaffType = (typeof STAFF_TYPES)[number];

export const STAFF_STATUSES = ["ACTIVE", "INACTIVE"] as const;
export type StaffStatus = (typeof STAFF_STATUSES)[number];

export type StaffValidationFieldError = {
  field: string;
  message: string;
};

export type CreateStaffPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  staffType?: StaffType;
  roleId?: string;
  locations?: string[];
  status?: StaffStatus;
};

export type UpdateStaffPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  staffType?: StaffType;
  roleId?: string;
  locations?: string[];
  status?: StaffStatus;
};

export type StaffRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  staffType: StaffType;
  roleId: string;
  status: StaffStatus;
  createdAt: string;
  updatedAt: string;
};

export type StaffLocationRecord = {
  id: string;
  staffId: string;
  locationId: string;
  name?: string;
  code?: string;
};

export const LIST_STAFF_SORT_FIELDS = [
  "createdAt",
  "firstName",
  "lastName",
  "email",
  "staffType",
  "status",
  "updatedAt",
] as const;

export type ListStaffSortField = (typeof LIST_STAFF_SORT_FIELDS)[number];

export type ListStaffQuery = {
  page: number;
  limit: number;
  search?: string;
  staffType?: StaffType;
  roleId?: string;
  locationId?: string;
  status?: StaffStatus;
  sortBy: ListStaffSortField;
  sortOrder: "asc" | "desc";
};

export type StaffListItem = StaffRecord & {
  roleName: string | null;
  locations: StaffLocationRecord[];
};

export type ListStaffResponse = {
  data: StaffListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
