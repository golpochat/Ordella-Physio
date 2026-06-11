import { z } from "zod";
import { emailSchema } from "../zod/base-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const userRoleSchema = z.enum([
  "OWNER",
  "ADMIN",
  "THERAPIST",
  "STAFF",
  "PATIENT",
  "PHARMACY",
]);

export const registerSchema = z.object({
  email: emailSchema,
  password: nonEmptyString.min(8, "Password must be at least 8 characters"),
  role: userRoleSchema.optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: nonEmptyString.min(6, "Password must be at least 6 characters"),
});

export const refreshTokenSchema = z.object({
  refreshToken: nonEmptyString,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
