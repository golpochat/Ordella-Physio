import { UserRole } from "../enums";
import type { DomainEvent } from "./base.event";

export type AuthRole = UserRole;

export interface UserCreatedPayload {
  userId: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

export interface UserLoggedInPayload {
  userId: string;
  email: string;
  tenantId: string;
}

export interface UserPasswordResetRequestedPayload {
  userId: string;
  email: string;
  tenantId: string;
}

export interface UserPasswordResetPayload {
  userId: string;
  email: string;
  tenantId: string;
}

export type UserCreatedEvent = DomainEvent<UserCreatedPayload>;
export type UserLoggedInEvent = DomainEvent<UserLoggedInPayload>;
export type UserPasswordResetRequestedEvent = DomainEvent<UserPasswordResetRequestedPayload>;
export type UserPasswordResetEvent = DomainEvent<UserPasswordResetPayload>;
