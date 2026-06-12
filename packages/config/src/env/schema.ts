import { z } from "zod";

export const nodeEnvSchema = z.enum(["development", "test", "staging", "production"]);

export const coreEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema.default("development"),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string().min(1),
  NATS_URL: z.string().min(1).default("nats://localhost:4222"),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
});

export const authEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().min(1).default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: z.string().min(1).default("7d"),
});

export const tenantEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const patientEnvSchema = coreEnvSchema;
export const appointmentEnvSchema = coreEnvSchema;
export const notesEnvSchema = coreEnvSchema;
export const messagingEnvSchema = coreEnvSchema;
export const notificationEnvSchema = coreEnvSchema;

export const organizationEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const terminalEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  TENANT_SERVICE_URL: z.string().url().default("http://localhost:3052"),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const userRoleEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const staffEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  TENANT_SERVICE_URL: z.string().url().default("http://localhost:3052"),
  USER_ROLE_SERVICE_URL: z.string().url().default("http://localhost:3068"),
  APPOINTMENT_SERVICE_URL: z.string().url().default("http://localhost:3054"),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const enterpriseEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  ENTERPRISE_SSO_CALLBACK_URL: z.string().url().default("http://localhost:3049/enterprise/sso/oauth/callback"),
  ENTERPRISE_SAML_ACS_URL: z.string().url().default("http://localhost:3049/enterprise/sso/saml/acs"),
  ENTERPRISE_FRONTEND_CALLBACK_URL: z.string().url().default("http://localhost:3010/clinic/enterprise/sso/callback"),
  TENANT_SERVICE_URL: z.string().url().default("http://localhost:3052"),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

export const marketplaceEnvSchema = coreEnvSchema.extend({
  MARKETPLACE_OAUTH_CALLBACK_URL: z.string().url().default("http://localhost:3049/marketplace/oauth/redirect"),
  MARKETPLACE_FRONTEND_CALLBACK_URL: z.string().url().default("http://localhost:3010/clinic/marketplace/oauth/callback"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  DROPBOX_CLIENT_ID: z.string().optional(),
  DROPBOX_CLIENT_SECRET: z.string().optional(),
  ONEDRIVE_CLIENT_ID: z.string().optional(),
  ONEDRIVE_CLIENT_SECRET: z.string().optional(),
  ZOOM_CLIENT_ID: z.string().optional(),
  ZOOM_CLIENT_SECRET: z.string().optional(),
  APPOINTMENT_SERVICE_URL: z.string().url().default("http://appointment-service:3054"),
  NOTES_SERVICE_URL: z.string().url().default("http://notes-service:3055"),
  COMMUNICATION_SERVICE_URL: z.string().url().default("http://communication-service:3058"),
  BILLING_SERVICE_URL: z.string().url().default("http://billing-service:3056"),
});

export const aiNotesEnvSchema = coreEnvSchema.extend({
  AI_PROVIDER: z.enum(["openai", "azure"]).default("openai"),
  OPENAI_API_KEY: z.string().optional(),
  AZURE_OPENAI_KEY: z.string().optional(),
  AZURE_OPENAI_ENDPOINT: z
    .preprocess((value) => (value === "" ? undefined : value), z.string().url().optional()),
  AZURE_OPENAI_DEPLOYMENT: z.string().optional(),
  MODEL_NAME: z.string().default("gpt-4o-mini"),
  MAX_TOKENS: z.coerce.number().int().positive().default(2000),
  TEMPERATURE: z.coerce.number().min(0).max(2).default(0.3),
  PATIENT_SERVICE_URL: z.string().url().default("http://patient-service:3053"),
  APPOINTMENT_SERVICE_URL: z.string().url().default("http://appointment-service:3054"),
  NOTES_SERVICE_URL: z.string().url().default("http://notes-service:3055"),
});
export const billingEnvSchema = coreEnvSchema.extend({
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_PRICE_STARTER: z.string().optional(),
  STRIPE_PRICE_PRO: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE: z.string().optional(),
  TENANT_SERVICE_URL: z.string().url().optional(),
  FRONTEND_URL: z.string().url().optional(),
});

export const paymentEnvSchema = coreEnvSchema.extend({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  BILLING_SERVICE_URL: z.string().url().optional(),
});

export const communicationEnvSchema = coreEnvSchema.extend({
  EMAIL_PROVIDER_API_KEY: z.string().min(1),
  SMS_PROVIDER_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().email().optional(),
  SMS_FROM: z.string().optional(),
  QUEUE_REDIS_URL: z.string().optional(),
});

export const reportingEnvSchema = coreEnvSchema.extend({
  CACHE_REDIS_URL: z.string().optional(),
});

export const eventBusEnvSchema = coreEnvSchema.extend({
  JETSTREAM_REPLICAS: z.coerce.number().int().positive().default(1),
  JETSTREAM_MAX_AGE_HOURS: z.coerce.number().int().positive().default(168),
  JETSTREAM_MAX_BYTES: z.coerce.number().int().positive().default(1_000_000_000),
});

export const gatewayServiceUrlsSchema = z.object({
  AUTH_SERVICE_URL: z.string().url(),
  TENANT_SERVICE_URL: z.string().url(),
  PATIENT_SERVICE_URL: z.string().url(),
  APPOINTMENT_SERVICE_URL: z.string().url(),
  NOTES_SERVICE_URL: z.string().url(),
  BILLING_SERVICE_URL: z.string().url(),
  PAYMENT_SERVICE_URL: z.string().url(),
  COMMUNICATION_SERVICE_URL: z.string().url(),
  REPORTING_SERVICE_URL: z.string().url(),
  MESSAGING_SERVICE_URL: z.string().url(),
  NOTIFICATION_SERVICE_URL: z.string().url(),
  AI_NOTES_SERVICE_URL: z.string().url(),
  MARKETPLACE_SERVICE_URL: z.string().url(),
  ENTERPRISE_SERVICE_URL: z.string().url(),
  ORGANIZATION_SERVICE_URL: z.string().url(),
  TERMINAL_SERVICE_URL: z.string().url(),
  USER_ROLE_SERVICE_URL: z.string().url(),
  STAFF_SERVICE_URL: z.string().url(),
});

export const gatewayEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema.default("development"),
  PORT: z.coerce.number().int().positive(),
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  GATEWAY_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  GATEWAY_RATE_LIMIT_IP: z.coerce.number().int().positive().default(100),
  GATEWAY_RATE_LIMIT_TENANT: z.coerce.number().int().positive().default(200),
  GATEWAY_BODY_LIMIT: z.string().default("1mb"),
  CORS_ORIGIN: z.string().default("*"),
  ORDELLA_REGION: z.enum(["eu-west", "us-east", "apac"]).default("eu-west"),
  REGION_ROUTING_ENABLED: z.coerce.boolean().default(false),
  REGION_ENDPOINT_EU_WEST: z.string().url().optional(),
  REGION_ENDPOINT_US_EAST: z.string().url().optional(),
  REGION_ENDPOINT_APAC: z.string().url().optional(),
  TENANT_SERVICE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
}).merge(gatewayServiceUrlsSchema.omit({ TENANT_SERVICE_URL: true })).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);

/** Full environment schema covering all microservices (for compose / reference). */
export const fullEnvSchema = coreEnvSchema
  .extend({
    JWT_SECRET: z.string().min(32).optional(),
    JWT_ACCESS_SECRET: z.string().min(32).optional(),
    JWT_REFRESH_SECRET: z.string().min(32).optional(),
    JWT_EXPIRES_IN: z.string().optional(),
    JWT_ACCESS_EXPIRES_IN: z.string().optional(),
    REFRESH_TOKEN_EXPIRES_IN: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PRICE_STARTER: z.string().optional(),
    STRIPE_PRICE_PRO: z.string().optional(),
    STRIPE_PRICE_ENTERPRISE: z.string().optional(),
    EMAIL_PROVIDER_API_KEY: z.string().optional(),
    SMS_PROVIDER_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
    SMS_FROM: z.string().optional(),
    QUEUE_REDIS_URL: z.string().optional(),
    CACHE_REDIS_URL: z.string().optional(),
    BILLING_SERVICE_URL: z.string().optional(),
    GATEWAY_TIMEOUT_MS: z.coerce.number().optional(),
    GATEWAY_RATE_LIMIT_IP: z.coerce.number().optional(),
    GATEWAY_RATE_LIMIT_TENANT: z.coerce.number().optional(),
    GATEWAY_BODY_LIMIT: z.string().optional(),
    CORS_ORIGIN: z.string().optional(),
  })
  .merge(gatewayServiceUrlsSchema.partial())
  .passthrough();

export type CoreEnv = z.infer<typeof coreEnvSchema>;
export type AuthEnv = z.infer<typeof authEnvSchema>;
export type TenantEnv = z.infer<typeof tenantEnvSchema>;
export type PatientEnv = z.infer<typeof patientEnvSchema>;
export type AppointmentEnv = z.infer<typeof appointmentEnvSchema>;
export type NotesEnv = z.infer<typeof notesEnvSchema>;
export type BillingEnv = z.infer<typeof billingEnvSchema>;
export type PaymentEnv = z.infer<typeof paymentEnvSchema>;
export type CommunicationEnv = z.infer<typeof communicationEnvSchema>;
export type ReportingEnv = z.infer<typeof reportingEnvSchema>;
export type EventBusEnv = z.infer<typeof eventBusEnvSchema>;
export type GatewayEnv = z.infer<typeof gatewayEnvSchema>;
export type FullEnv = z.output<typeof fullEnvSchema>;
