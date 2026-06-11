import {
  CORRELATION_ID_HEADER,
  TENANT_HEADER,
  USER_EMAIL_HEADER,
  USER_ID_HEADER,
  USER_ROLE_HEADER,
} from "@ordella/middleware";
import type { Permission, SecurityRole } from "@ordella/security";

export {
  CORRELATION_ID_HEADER,
  TENANT_HEADER,
  USER_EMAIL_HEADER,
  USER_ID_HEADER,
  USER_ROLE_HEADER,
};

export const USER_ROLES_HEADER = "x-user-roles";
export const USER_PERMISSIONS_HEADER = "x-user-permissions";

export type GatewayUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  roles: SecurityRole[];
  permissions: Permission[];
  email?: string;
};

export type ServiceEnvKey =
  | "AUTH_SERVICE_URL"
  | "TENANT_SERVICE_URL"
  | "PATIENT_SERVICE_URL"
  | "APPOINTMENT_SERVICE_URL"
  | "NOTES_SERVICE_URL"
  | "BILLING_SERVICE_URL"
  | "PAYMENT_SERVICE_URL"
  | "COMMUNICATION_SERVICE_URL"
  | "REPORTING_SERVICE_URL"
  | "MESSAGING_SERVICE_URL"
  | "NOTIFICATION_SERVICE_URL"
  | "AI_NOTES_SERVICE_URL"
  | "MARKETPLACE_SERVICE_URL"
  | "ENTERPRISE_SERVICE_URL";

export type ServiceDefinition = {
  name: string;
  envKey: ServiceEnvKey;
  healthPath: string;
  defaultUrl: string;
};

export const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    name: "auth",
    envKey: "AUTH_SERVICE_URL",
    healthPath: "/auth/health",
    defaultUrl: "http://auth-service:3051",
  },
  {
    name: "tenant",
    envKey: "TENANT_SERVICE_URL",
    healthPath: "/tenants/health",
    defaultUrl: "http://tenant-service:3052",
  },
  {
    name: "patient",
    envKey: "PATIENT_SERVICE_URL",
    healthPath: "/patients/health",
    defaultUrl: "http://patient-service:3053",
  },
  {
    name: "appointment",
    envKey: "APPOINTMENT_SERVICE_URL",
    healthPath: "/appointments/health",
    defaultUrl: "http://appointment-service:3054",
  },
  {
    name: "notes",
    envKey: "NOTES_SERVICE_URL",
    healthPath: "/notes/health",
    defaultUrl: "http://notes-service:3055",
  },
  {
    name: "billing",
    envKey: "BILLING_SERVICE_URL",
    healthPath: "/billing/health",
    defaultUrl: "http://billing-service:3056",
  },
  {
    name: "payment",
    envKey: "PAYMENT_SERVICE_URL",
    healthPath: "/payments/health",
    defaultUrl: "http://payment-service:3057",
  },
  {
    name: "communication",
    envKey: "COMMUNICATION_SERVICE_URL",
    healthPath: "/communication/health",
    defaultUrl: "http://communication-service:3058",
  },
  {
    name: "reporting",
    envKey: "REPORTING_SERVICE_URL",
    healthPath: "/reporting/health",
    defaultUrl: "http://reporting-service:3059",
  },
  {
    name: "messaging",
    envKey: "MESSAGING_SERVICE_URL",
    healthPath: "/messaging/health",
    defaultUrl: "http://messaging-service:3061",
  },
  {
    name: "notification",
    envKey: "NOTIFICATION_SERVICE_URL",
    healthPath: "/notifications/health",
    defaultUrl: "http://notification-service:3062",
  },
  {
    name: "ai-notes",
    envKey: "AI_NOTES_SERVICE_URL",
    healthPath: "/ai/health",
    defaultUrl: "http://ai-notes-service:3063",
  },
  {
    name: "marketplace",
    envKey: "MARKETPLACE_SERVICE_URL",
    healthPath: "/marketplace/health",
    defaultUrl: "http://marketplace-service:3064",
  },
  {
    name: "enterprise",
    envKey: "ENTERPRISE_SERVICE_URL",
    healthPath: "/enterprise/health",
    defaultUrl: "http://enterprise-service:3065",
  },
];

export const PUBLIC_PATHS = [
  "/health",
  "/health/region",
  "/metrics",
  "/docs",
  "/auth",
  "/payments/webhook",
  "/billing/webhook",
  "/tenants/internal",
  "/tenants/directory",
];

export const SKIP_TENANT_PATHS = [
  "/health",
  "/health/region",
  "/metrics",
  "/docs",
  "/auth",
  "/payments/webhook",
  "/billing/webhook",
  "/tenants/internal",
  "/tenants/directory",
];

export const PUBLIC_JWT_PATHS = [
  "/health",
  "/health/region",
  "/metrics",
  "/docs",
  "/auth",
  "/payments/webhook",
  "/billing/webhook",
  "/tenants/internal",
  "/tenants/directory",
];

export const GATEWAY_SERVICE_NAME = "api-gateway";
