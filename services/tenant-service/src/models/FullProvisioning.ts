export const FULL_PROVISIONING_BILLING_MODELS = ["tenant-level", "organization-level"] as const;

export type FullProvisioningBillingModel = (typeof FULL_PROVISIONING_BILLING_MODELS)[number];

export type FullProvisioningOrganizationInput = {
  organizationName?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
  billingModel?: FullProvisioningBillingModel | string;
  description?: string;
};

export type FullProvisioningTenantInput = {
  tenantName?: string;
  timezone?: string;
  currency?: string;
};

export type FullProvisioningOwnerInput = {
  ownerUserId?: string;
  ownerEmail?: string;
};

export type FullProvisioningPayload = {
  organization: FullProvisioningOrganizationInput;
  tenant: FullProvisioningTenantInput;
  owner: FullProvisioningOwnerInput;
};

export type NormalizedFullProvisioningPayload = {
  organization: {
    organizationName: string;
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone: string;
    billingModel: FullProvisioningBillingModel;
    description?: string;
  };
  tenant: {
    tenantName: string;
    timezone: string;
    currency: string;
  };
  owner: {
    ownerUserId?: string;
    ownerEmail?: string;
  };
};

export type FullProvisioningSuccess = {
  organizationId: string;
  organizationName: string;
  organizationCode: string;
  tenantId: string;
  tenantName: string;
  tenantCode: string;
  ownerUserId: string;
  ownerEmail: string;
  message: string;
};

export type ProvisionTrace = {
  organizationId?: string;
  tenantId?: string;
  ownerUserId?: string;
  invitedOwner?: boolean;
  previousOwnerTenantId?: string;
  orgLinked?: boolean;
  rolesSeeded?: boolean;
  billingProvisioned?: boolean;
  billingEntity?: "tenant" | "organization";
  stripeCustomerId?: string;
};

export type ProvisionTenantOptions = {
  rollbackOnFailure?: boolean;
  trace?: ProvisionTrace;
  skipAudit?: boolean;
  failAt?: import("@ordella/shared").ProvisioningFailStage;
};

export type ProvisionFullOptions = {
  failAt?: import("@ordella/shared").ProvisioningFailStage;
};
