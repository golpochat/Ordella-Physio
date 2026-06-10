import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { dateRangeObjectSchema, dateRangeSchema, isoDateString } from "../zod/date-schemas";
import { limit, page } from "../zod/pagination-schemas";
import { locationIdSchema } from "../zod/tenant-schemas";

export { dateRangeSchema };

export const metricsQuerySchema = dateRangeObjectSchema
  .extend({
    therapistId: idSchema.optional(),
    locationId: locationIdSchema.optional(),
    page,
    limit,
  })
  .refine(
    (value) => {
      if (!value.startDate || !value.endDate) {
        return true;
      }
      return value.startDate <= value.endDate;
    },
    { message: "startDate must be before or equal to endDate", path: ["endDate"] },
  );

export const dashboardDailySchema = z.object({
  date: isoDateString,
});

export const dashboardMonthlySchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "month must be in YYYY-MM format"),
});

export const dashboardTypeSchema = z.enum([
  "kpi",
  "revenue",
  "appointments",
  "patients",
  "therapist_utilization",
  "financial_overview",
]);

export const dashboardQuerySchema = dateRangeObjectSchema.extend({
  dashboardType: dashboardTypeSchema.optional(),
  therapistId: idSchema.optional(),
  locationId: locationIdSchema.optional(),
});

export const exportCsvSchema = dateRangeObjectSchema.extend({
  metricType: z.enum([
    "daily",
    "weekly",
    "monthly",
    "financial",
    "patients",
    "appointments",
    "therapist_workload",
  ]),
  therapistId: idSchema.optional(),
  locationId: locationIdSchema.optional(),
});

export const exportPdfSchema = exportCsvSchema.extend({
  title: z.string().min(1).max(200).optional(),
  includeCharts: z.boolean().optional(),
});

export type MetricsQueryInput = z.infer<typeof metricsQuerySchema>;
export type DashboardDailyInput = z.infer<typeof dashboardDailySchema>;
export type DashboardMonthlyInput = z.infer<typeof dashboardMonthlySchema>;
export type DashboardQueryInput = z.infer<typeof dashboardQuerySchema>;
export type ExportCsvInput = z.infer<typeof exportCsvSchema>;
export type ExportPdfInput = z.infer<typeof exportPdfSchema>;
