import { z } from "zod";

export const nodeEnvSchema = z.enum(["development", "test", "production"]);

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
export const billingEnvSchema = coreEnvSchema;

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
}).merge(gatewayServiceUrlsSchema).refine(
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
