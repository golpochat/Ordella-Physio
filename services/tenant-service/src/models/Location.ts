export const LOCATION_STATUSES = ["ACTIVE", "INACTIVE"] as const;

export type LocationStatus = (typeof LOCATION_STATUSES)[number];

export type LocationValidationFieldError = {
  field: string;
  message: string;
};

export type CreateLocationPayload = {
  name?: string;
  code?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
  timezone?: string;
};

export type UpdateLocationPayload = {
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
  status?: LocationStatus;
};

export type LocationResponse = {
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
  status: LocationStatus;
  createdAt: string;
  updatedAt: string;
};

export const LIST_LOCATION_SORT_FIELDS = ["createdAt", "name", "code", "city", "status"] as const;

export type ListLocationSortField = (typeof LIST_LOCATION_SORT_FIELDS)[number];

export type ListLocationsQuery = {
  page: number;
  limit: number;
  search?: string;
  status?: LocationStatus;
  sortBy: ListLocationSortField;
  sortOrder: "asc" | "desc";
};

export type ListLocationsResponse = {
  data: LocationResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
