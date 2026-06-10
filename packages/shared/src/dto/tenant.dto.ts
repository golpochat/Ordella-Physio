import type { UserRole } from "../enums";

export interface CreateTenantDto {
  name: string;
  slug: string;
  timezone?: string;
  currency?: string;
}

export interface UpdateTenantDto {
  name?: string;
  timezone?: string;
  currency?: string;
  isActive?: boolean;
}

export interface CreateLocationDto {
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

export interface UpdateLocationDto extends Partial<CreateLocationDto> {
  isActive?: boolean;
}

export interface CreateStaffDto {
  email: string;
  role: UserRole;
  locationId?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateStaffRoleDto {
  role: UserRole;
  locationId?: string;
  isActive?: boolean;
}
