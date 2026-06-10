import type { UserRole } from "../enums";
import type { DomainEvent } from "./base.event";

export interface TenantCreatedPayload {
  tenantId: string;
  name: string;
  slug: string;
}

export interface TenantUpdatedPayload {
  tenantId: string;
  name?: string;
  timezone?: string;
  currency?: string;
}

export interface LocationCreatedPayload {
  tenantId: string;
  locationId: string;
  name: string;
}

export interface StaffAddedPayload {
  tenantId: string;
  staffId: string;
  userId: string;
  role: UserRole;
}

export interface StaffRoleChangedPayload {
  tenantId: string;
  staffId: string;
  userId: string;
  previousRole: UserRole;
  newRole: UserRole;
}

export type TenantCreatedEvent = DomainEvent<TenantCreatedPayload>;
export type TenantUpdatedEvent = DomainEvent<TenantUpdatedPayload>;
export type LocationCreatedEvent = DomainEvent<LocationCreatedPayload>;
export type StaffAddedEvent = DomainEvent<StaffAddedPayload>;
export type StaffRoleChangedEvent = DomainEvent<StaffRoleChangedPayload>;
