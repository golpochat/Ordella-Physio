export type TenantBillingSettingsRecord = {
  id: string;
  tenantId: string;
  billingEmail: string;
  billingContactName: string;
  billingAddressLine1: string;
  billingAddressLine2: string | null;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
  taxNumber: string | null;
  invoicePrefix: string | null;
  defaultCurrency: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTenantBillingSettingsPayload = {
  billingEmail?: string;
  billingContactName?: string;
  billingAddressLine1?: string;
  billingAddressLine2?: string | null;
  billingCity?: string;
  billingPostcode?: string;
  billingCountry?: string;
  taxNumber?: string | null;
  invoicePrefix?: string | null;
  defaultCurrency?: string;
};

export type TenantBillingValidationFieldError = {
  field: string;
  message: string;
};
