import { z } from "zod";

import { paginationSchema } from "../../utils/pagination";

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

export const loginSchema = z
  .object({
    tenantSlug: z.string().min(1).optional(),
    tenantId: z.string().min(1).optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .refine((value) => Boolean(value.tenantSlug || value.tenantId), {
    message: "tenantSlug or tenantId is required",
    path: ["tenantSlug"],
  });

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  roleName: z.enum(["ADMIN", "THERAPIST", "STAFF"]).optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().max(30).optional(),
});
