import { z } from "zod";
import { coreEnvSchema } from "./schema";

export const pharmacyEnvSchema = coreEnvSchema.extend({
  JWT_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  PATIENT_SERVICE_URL: z.string().url().default("http://localhost:3053"),
  THERAPIST_SERVICE_URL: z.string().url().default("http://localhost:3051"),
  STAFF_SERVICE_URL: z.string().url().default("http://localhost:3069"),
  APPOINTMENT_SERVICE_URL: z.string().url().default("http://localhost:3054"),
  AUDIT_SERVICE_URL: z.string().url().default("http://localhost:3070"),
}).refine(
  (value) => Boolean(value.JWT_SECRET ?? value.JWT_ACCESS_SECRET),
  { message: "JWT_SECRET or JWT_ACCESS_SECRET is required", path: ["JWT_SECRET"] },
);
