export const ORGANIZATION_STATUSES = ["ACTIVE", "INACTIVE"] as const;

export type OrganizationStatus = (typeof ORGANIZATION_STATUSES)[number];

export const BILLING_MODELS = ["tenant-level", "organization-level"] as const;

export type BillingModel = (typeof BILLING_MODELS)[number];

export const ORGANIZATION_SUBSCRIPTION_STATUSES = [
  "ACTIVE",
  "TRIALING",
  "PAST_DUE",
  "CANCELED",
] as const;

export type OrganizationSubscriptionStatus = (typeof ORGANIZATION_SUBSCRIPTION_STATUSES)[number];

export type OrganizationRecord = {
  id: string;
  name: string;
  code: string;
  organizationCode: string;
  description: string | null;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string | null;
  billingModel: BillingModel;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: OrganizationSubscriptionStatus | null;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
};

export type SuperAdminCreateOrganizationPayload = {
  organizationName?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
  billingModel?: BillingModel | string;
  description?: string;
};

export type CreateOrganizationPayload = SuperAdminCreateOrganizationPayload;

export type UpdateOrganizationPayload = {
  name?: string;
  description?: string | null;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string | null;
  billingModel?: BillingModel | string;
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
