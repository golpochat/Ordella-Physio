export const DOMAIN_TYPES = ["PRIMARY", "CUSTOM"] as const;

export type DomainType = (typeof DOMAIN_TYPES)[number];

export type TenantDomainRecord = {
  id: string;
  tenantId: string;
  domain: string;
  type: DomainType;
  verificationToken: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTenantDomainPayload = {
  domain?: string;
  type?: string;
};

export type VerifyTenantDomainPayload = {
  token?: string;
};

export type TenantDomainValidationFieldError = {
  field: string;
  message: string;
};

export type TenantDomainVerificationInstructions = {
  txtName: string;
  txtValue: string;
};
