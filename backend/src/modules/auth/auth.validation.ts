import { z } from "zod";

import { paginationSchema } from "../../utils/pagination";
import { strongPasswordSchema } from "../../utils/password-policy";

export const listUsersQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  role: z.string().trim().optional(),
  status: z.enum(["ACTIVE", "DISABLED"]).optional(),
  sortBy: z.enum(["createdAt", "firstName", "lastName", "email", "role"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const userIdParamSchema = z.object({
  id: z.string().min(1),
});

export const loginSchema = z.object({
  tenantSlug: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(1).optional(),
  accessTokenJti: z.string().min(1).optional(),
  accessTokenExp: z.number().int().positive().optional(),
});

export const forgotPasswordSchema = z.object({
  tenantSlug: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  email: z.string().email().transform((value) => value.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: strongPasswordSchema,
});

export const registerUserSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: strongPasswordSchema,
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  roleName: z.enum(["ADMIN", "THERAPIST", "STAFF"]).optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  email: z.string().email().transform((value) => value.toLowerCase()).optional(),
  phone: z.string().trim().max(30).optional(),
  password: strongPasswordSchema.optional(),
});
