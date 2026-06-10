import { TENANT_HEADER, CORRELATION_ID_HEADER } from "@ordella/middleware";
import { EVENT_TYPES } from "@ordella/shared";

export { TENANT_HEADER, CORRELATION_ID_HEADER };

export const TENANT_SERVICE_NAME = "tenant-service";

export const DEFAULT_TENANT_SETTINGS = {
  timezone: "UTC",
  currency: "GBP",
  theme: "light",
} as const;

export const SUBSCRIPTION_PLANS = ["STARTER", "PROFESSIONAL", "ENTERPRISE"] as const;

export const TENANT_EVENTS = {
  TENANT_CREATED: EVENT_TYPES.TENANT_CREATED,
  TENANT_UPDATED: EVENT_TYPES.TENANT_UPDATED,
  LOCATION_ADDED: EVENT_TYPES.LOCATION_CREATED,
  STAFF_ADDED: EVENT_TYPES.STAFF_ADDED,
  STAFF_ROLE_CHANGED: EVENT_TYPES.STAFF_ROLE_CHANGED,
  SUBSCRIPTION_UPDATED: "subscription.updated",
} as const;

export const STAFF_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;
