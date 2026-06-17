export type CreateTenantDto = {
  id?: string;
  name: string;
  code: string;
  slug?: string;
  organizationId: string;
  ownerUserId: string;
  timezone: string;
  currency: string;
  address?: string;
  phone?: string;
  homeRegion?: string;
};
