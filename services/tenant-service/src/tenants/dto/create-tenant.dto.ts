export type CreateTenantDto = {
  name: string;
  code: string;
  slug?: string;
  ownerUserId: string;
  timezone: string;
  currency: string;
  address?: string;
  phone?: string;
  homeRegion?: string;
};
