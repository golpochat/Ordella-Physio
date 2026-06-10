import { z } from "zod";

export const positiveNumber = z.number().positive("Expected a positive number");

export const nonNegativeNumber = z.number().min(0, "Expected a non-negative number");

export const percentageNumber = z
  .number()
  .min(0, "Percentage must be at least 0")
  .max(100, "Percentage must be at most 100");
