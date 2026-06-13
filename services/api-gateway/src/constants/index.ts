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
  | "ENTERPRISE_SERVICE_URL"
  | "ORGANIZATION_SERVICE_URL"
  | "TERMINAL_SERVICE_URL"
  | "USER_ROLE_SERVICE_URL"
  | "STAFF_SERVICE_URL"
  | "AUDIT_SERVICE_URL"
  | "FILE_STORAGE_SERVICE_URL"
  | "NOTIFICATION_PROVIDER_SERVICE_URL"
  | "SEARCH_INDEX_SERVICE_URL"
  | "SUBSCRIPTION_BILLING_SERVICE_URL"
  | "AI_SERVICE_URL"
  | "AI_TRAINING_SERVICE_URL"
  | "AI_MONITORING_SERVICE_URL"
  | "AI_DEPLOY_SERVICE_URL"
  | "FEATURE_FLAGS_SERVICE_URL"
  | "AI_GATEWAY_SERVICE_URL"
  | "AI_COST_SERVICE_URL"
  | "AI_SECURITY_SERVICE_URL"
  | "AI_OBSERVABILITY_SERVICE_URL"
  | "AI_AGENTS_SERVICE_URL";

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
  {
    name: "organization",
    envKey: "ORGANIZATION_SERVICE_URL",
    healthPath: "/organizations/health",
    defaultUrl: "http://organization-service:3066",
  },
  {
    name: "terminal",
    envKey: "TERMINAL_SERVICE_URL",
    healthPath: "/terminals/health",
    defaultUrl: "http://terminal-service:3067",
  },
  {
    name: "user-role",
    envKey: "USER_ROLE_SERVICE_URL",
    healthPath: "/roles/health",
    defaultUrl: "http://user-role-service:3068",
  },
  {
    name: "staff",
    envKey: "STAFF_SERVICE_URL",
    healthPath: "/staff/health",
    defaultUrl: "http://staff-service:3069",
  },
  {
    name: "audit",
    envKey: "AUDIT_SERVICE_URL",
    healthPath: "/audit-logs/health",
    defaultUrl: "http://audit-service:3070",
  },
  {
    name: "file-storage",
    envKey: "FILE_STORAGE_SERVICE_URL",
    healthPath: "/files/health",
    defaultUrl: "http://file-storage-service:3071",
  },
  {
    name: "notification-provider",
    envKey: "NOTIFICATION_PROVIDER_SERVICE_URL",
    healthPath: "/notification-providers/health",
    defaultUrl: "http://notification-provider-service:3072",
  },
  {
    name: "search-index",
    envKey: "SEARCH_INDEX_SERVICE_URL",
    healthPath: "/search-index/health",
    defaultUrl: "http://search-index-service:3073",
  },
  {
    name: "subscription-billing",
    envKey: "SUBSCRIPTION_BILLING_SERVICE_URL",
    healthPath: "/subscription-billing/health",
    defaultUrl: "http://subscription-billing-service:3074",
  },
  {
    name: "ai-service",
    envKey: "AI_SERVICE_URL",
    healthPath: "/ai/platform/health",
    defaultUrl: "http://ai-service:3075",
  },
  {
    name: "ai-training-service",
    envKey: "AI_TRAINING_SERVICE_URL",
    healthPath: "/ai/training/health",
    defaultUrl: "http://ai-training-service:3076",
  },
  {
    name: "ai-monitoring-service",
    envKey: "AI_MONITORING_SERVICE_URL",
    healthPath: "/ai/drift/health",
    defaultUrl: "http://ai-monitoring-service:3077",
  },
  {
    name: "ai-deploy-service",
    envKey: "AI_DEPLOY_SERVICE_URL",
    healthPath: "/ai/deploy/health",
    defaultUrl: "http://ai-deploy-service:3078",
  },
  {
    name: "feature-flags-service",
    envKey: "FEATURE_FLAGS_SERVICE_URL",
    healthPath: "/ai/flags/health",
    defaultUrl: "http://feature-flags-service:3079",
  },
  {
    name: "ai-gateway-service",
    envKey: "AI_GATEWAY_SERVICE_URL",
    healthPath: "/ai/gateway/health",
    defaultUrl: "http://ai-gateway-service:3080",
  },
  {
    name: "ai-cost-service",
    envKey: "AI_COST_SERVICE_URL",
    healthPath: "/ai/cost/health",
    defaultUrl: "http://ai-cost-service:3081",
  },
  {
    name: "ai-security-service",
    envKey: "AI_SECURITY_SERVICE_URL",
    healthPath: "/ai/security/health",
    defaultUrl: "http://ai-security-service:3082",
  },
  {
    name: "ai-observability-service",
    envKey: "AI_OBSERVABILITY_SERVICE_URL",
    healthPath: "/ai/observability/health",
    defaultUrl: "http://ai-observability-service:3083",
  },
  {
    name: "ai-agents-service",
    envKey: "AI_AGENTS_SERVICE_URL",
    healthPath: "/ai/agents/health",
    defaultUrl: "http://ai-agents-service:3084",
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
  "/subscription-billing/stripe/webhook",
  "/tenants/internal",
  "/tenants/directory",
  "/files/access",
];

export const SKIP_TENANT_PATHS = [
  "/health",
  "/health/region",
  "/metrics",
  "/docs",
  "/auth",
  "/payments/webhook",
  "/billing/webhook",
  "/subscription-billing/stripe/webhook",
  "/tenants/internal",
  "/tenants/directory",
  "/files/access",
];

export const PUBLIC_JWT_PATHS = [
  "/health",
  "/health/region",
  "/metrics",
  "/docs",
  "/auth",
  "/payments/webhook",
  "/billing/webhook",
  "/subscription-billing/stripe/webhook",
  "/tenants/internal",
  "/tenants/directory",
  "/files/access",
];

export const GATEWAY_SERVICE_NAME = "api-gateway";
