import { TENANT_HEADER, CORRELATION_ID_HEADER } from "@ordella/middleware";
import { EVENT_TYPES } from "@ordella/shared";

export { TENANT_HEADER, CORRELATION_ID_HEADER };

export const AUTH_SERVICE_NAME = "auth-service";

export const DEFAULT_USER_ROLE = "STAFF" as const;

export const AUTH_EVENTS = {
  USER_REGISTERED: EVENT_TYPES.USER_CREATED,
  USER_LOGGED_IN: EVENT_TYPES.USER_LOGGED_IN,
  USER_PASSWORD_RESET: EVENT_TYPES.USER_PASSWORD_RESET,
  USER_PASSWORD_RESET_REQUESTED: EVENT_TYPES.USER_PASSWORD_RESET_REQUESTED,
} as const;

export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

export const RESET_TOKEN_PREFIX = "reset:";
export const VERIFY_TOKEN_PREFIX = "verify:";
