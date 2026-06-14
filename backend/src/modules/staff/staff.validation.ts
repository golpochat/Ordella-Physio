import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";
import { STAFF_ASSIGNABLE_ROLE_NAMES } from "./staff.types";

export const listStaffQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  department: z.string().trim().optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  sortBy: z.enum(["createdAt", "lastName", "department"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const createStaffSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  phone: z.string().trim().optional(),
  jobTitle: z.string().trim().max(100).optional(),
  department: z.string().trim().max(100).optional(),
  roleNames: z.array(z.enum(STAFF_ASSIGNABLE_ROLE_NAMES)).min(1).optional(),
});

export const adminUpdateStaffSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  phone: z.string().trim().nullable().optional(),
  jobTitle: z.string().trim().max(100).nullable().optional(),
  department: z.string().trim().max(100).nullable().optional(),
  isActive: z.boolean().optional(),
});

export const assignStaffRolesSchema = z.object({
  roleNames: z.array(z.enum(STAFF_ASSIGNABLE_ROLE_NAMES)).min(1),
});

export const staffIdParamSchema = z.object({
  id: z.string().min(1),
});

export type ListStaffQuery = z.infer<typeof listStaffQuerySchema>;
export type CreateStaffBody = z.infer<typeof createStaffSchema>;
export type AdminUpdateStaffBody = z.infer<typeof adminUpdateStaffSchema>;
export type AssignStaffRolesBody = z.infer<typeof assignStaffRolesSchema>;
