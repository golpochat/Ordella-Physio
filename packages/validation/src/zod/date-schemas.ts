import { z } from "zod";

export const isoDateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected ISO date (YYYY-MM-DD)");

export const isoDateTimeString = z.string().datetime({ message: "Expected ISO datetime" });

export const dateRangeObjectSchema = z.object({
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
});

export const dateRangeSchema = dateRangeObjectSchema.refine(
  (value) => {
    if (!value.startDate || !value.endDate) {
      return true;
    }
    return value.startDate <= value.endDate;
  },
  { message: "startDate must be before or equal to endDate", path: ["endDate"] },
);

export type DateRangeInput = z.infer<typeof dateRangeObjectSchema>;
