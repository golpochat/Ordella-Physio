import { z } from "zod";
import { CUID_REGEX, DEV_SEED_ID_REGEX, EMAIL_REGEX, PHONE_REGEX, UUID_REGEX } from "../constants/regex";

export const idSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      UUID_REGEX.test(value) || CUID_REGEX.test(value) || DEV_SEED_ID_REGEX.test(value),
    {
      message: "Invalid id format (expected UUID, CUID, or dev seed id)",
    },
  );

export const emailSchema = z.string().regex(EMAIL_REGEX, "Invalid email address");

export const phoneSchema = z.string().regex(PHONE_REGEX, "Invalid phone number");

export const urlSchema = z.string().url("Invalid URL");

export const booleanSchema = z.boolean();

export const numericStringSchema = z
  .string()
  .regex(/^-?\d+(?:\.\d+)?$/, "Expected numeric string");

export const jsonSchema = z.union([
  z.record(z.string(), z.unknown()),
  z.array(z.unknown()),
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
