import type { UserRole } from "../enums";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  tenantId: string;
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StaffMember {
  id: string;
  tenantId: string;
  userId: string;
  locationId?: string;
  role: UserRole;
  isActive: boolean;
  invitedAt?: string;
  joinedAt?: string;
  createdAt: string;
  updatedAt: string;
}
