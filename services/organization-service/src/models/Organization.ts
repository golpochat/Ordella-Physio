export const ORGANIZATION_STATUSES = ["ACTIVE", "INACTIVE"] as const;

export type OrganizationStatus = (typeof ORGANIZATION_STATUSES)[number];

export type OrganizationRecord = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string | null;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganizationPayload = {
  name?: string;
  code?: string;
  description?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
  tenantId?: string;
};

export type UpdateOrganizationPayload = {
  name?: string;
  code?: string;
  description?: string | null;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string | null;
  status?: OrganizationStatus | string;
};

export type OrganizationValidationFieldError = {
  field: string;
  message: string;
};

export const LIST_ORGANIZATION_SORT_FIELDS = [
  "name",
  "code",
  "primaryContactName",
  "primaryContactEmail",
  "status",
  "createdAt",
  "updatedAt",
] as const;

export type ListOrganizationSortField = (typeof LIST_ORGANIZATION_SORT_FIELDS)[number];

export type ListOrganizationsQuery = {
  page: number;
  limit: number;
  search?: string;
  status?: OrganizationStatus;
  sortBy: ListOrganizationSortField;
  sortOrder: "asc" | "desc";
};
