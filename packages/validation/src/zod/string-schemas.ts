import { z } from "zod";
import { SLUG_REGEX } from "../constants/regex";
import { sanitizeInput } from "../utils/sanitize";
import { normalizeString } from "../utils/normalize";

export const nonEmptyString = z.string().min(1, "String cannot be empty");

export const trimmedString = z.string().transform((value) => value.trim());

export const sanitizedString = z
  .string()
  .transform((value) => sanitizeInput(normalizeString(value)));

export const slugString = z.string().regex(SLUG_REGEX, "Invalid slug format");
