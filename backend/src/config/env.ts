import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

function emptyToUndefined(value: unknown): unknown {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(32),
    JWT_SECRET_PREVIOUS: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
    JWT_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET_PREVIOUS: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
    JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
    TENANT_HEADER: z.string().default("x-tenant-id"),
    FRONTEND_URL: z.string().url().default("http://localhost:3011"),
    CORS_ORIGINS: z.string().default("http://localhost:3010,http://localhost:3011"),
    CSRF_SECRET: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
    TRUST_PROXY: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    FORCE_HTTPS: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
    RATE_LIMIT_MAX: z.coerce.number().default(120),
    AUTH_RATE_LIMIT_MAX: z.coerce.number().default(10),
    LOGIN_MAX_ATTEMPTS: z.coerce.number().default(5),
    LOGIN_LOCKOUT_BASE_MS: z.coerce.number().default(300_000),
    LOGIN_LOCKOUT_MAX_MS: z.coerce.number().default(3_600_000),
    REDIS_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
    REDIS_KEY_PREFIX: z.string().default("clinic-backend:"),
    CLAMAV_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
    CLAMAV_PORT: z.coerce.number().default(3310),
    CLAMAV_TIMEOUT_MS: z.coerce.number().default(30_000),
    CLAMAV_REQUIRED: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    SENTRY_DSN: z.preprocess(emptyToUndefined, z.string().url().optional()),
    SMTP_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
    SMTP_PORT: z.coerce.number().default(587),
    SMTP_SECURE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().default("noreply@ordella.local"),
    TRIAL_DURATION_DAYS: z.coerce.number().int().min(1).max(90).default(14),
    FILE_STORAGE_SERVICE_URL: z
      .string()
      .url()
      .default("http://localhost:3071"),
    FILE_STORAGE_MAX_BYTES: z.coerce.number().default(50 * 1024 * 1024),
  })
  .superRefine((value, ctx) => {
    if (value.NODE_ENV === "production") {
      if (!value.CSRF_SECRET) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CSRF_SECRET is required in production",
          path: ["CSRF_SECRET"],
        });
      }

      if (!value.DATABASE_URL.includes("sslmode=") && !value.DATABASE_URL.includes("ssl=true")) {
        console.warn(
          "[security] DATABASE_URL should include sslmode=require (or equivalent) in production",
        );
      }
    }
  });

export const env = envSchema.parse(process.env);

export function getCorsOrigins(): string[] {
  return env.CORS_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
