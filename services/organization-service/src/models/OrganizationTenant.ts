export type OrganizationTenantSummary = {
  id: string;
  name: string;
  code: string;
  slug: string;
  domain: string | null;
  status: "ACTIVE" | "SUSPENDED";
  isActive: boolean;
  organizationId: string | null;
};

export type OrganizationTenantLinkResponse = {
  tenant: OrganizationTenantSummary;
  message: string;
};
