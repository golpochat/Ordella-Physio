import { z } from "zod";
import { phoneSchema } from "../zod/base-schemas";
import { idSchema } from "../zod/base-schemas";
import { nonEmptyString, slugString } from "../zod/string-schemas";

export const staffRoleSchema = z.enum(["OWNER", "ADMIN", "THERAPIST", "STAFF"]);

export const tenantRegionSchema = z.enum(["eu-west", "us-east", "apac"]);

export const createTenantSchema = z.object({
  name: nonEmptyString.min(3),
  code: slugString.optional(),
  slug: slugString.optional(),
  ownerUserId: idSchema.optional(),
  timezone: z.string().min(1).optional(),
  currency: z.string().length(3).optional(),
  address: z.string().optional(),
  phone: phoneSchema.optional(),
  homeRegion: tenantRegionSchema.optional(),
}).superRefine((value, ctx) => {
  if (!value.code && !value.slug) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Tenant code is required.",
      path: ["code"],
    });
  }
});

export const updateTenantSchema = z.object({
  name: nonEmptyString.min(2).optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  address: z.string().optional(),
  phone: phoneSchema.optional(),
  homeRegion: tenantRegionSchema.optional(),
});

export const createLocationSchema = z.object({
  name: nonEmptyString.min(2),
  address: z.string().optional(),
  phone: phoneSchema.optional(),
});

export const updateLocationSchema = z.object({
  name: nonEmptyString.min(2).optional(),
  address: z.string().optional(),
  phone: phoneSchema.optional(),
});

export const createStaffSchema = z.object({
  userId: idSchema,
  role: staffRoleSchema,
});

export const updateStaffRoleSchema = z.object({
  role: staffRoleSchema,
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type UpdateTenantInput = z.infer<typeof updateTenantSchema>;
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffRoleInput = z.infer<typeof updateStaffRoleSchema>;
