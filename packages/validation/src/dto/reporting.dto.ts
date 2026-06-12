import { z } from "zod";
import { appointmentStatusSchema } from "./appointment.dto";
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

export const dashboardRangeTypeSchema = z.enum([
  "today",
  "yesterday",
  "last_7_days",
  "last_30_days",
  "this_month",
  "last_month",
  "custom",
]);

export const reportGroupBySchema = z.enum(["day", "week", "month"]);

const advancedReportBaseObjectSchema = z.object({
  rangeType: dashboardRangeTypeSchema.default("last_30_days"),
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  groupBy: reportGroupBySchema.default("day"),
});

function withCustomRangeRefinement<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  return schema.superRefine((value, context) => {
    if (value.rangeType !== "custom") {
      return;
    }

    if (!value.startDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startDate is required for custom range",
        path: ["startDate"],
      });
    }

    if (!value.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate is required for custom range",
        path: ["endDate"],
      });
    }

    if (value.startDate && value.endDate && value.startDate > value.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startDate must be before or equal to endDate",
        path: ["endDate"],
      });
    }
  });
}

export const appointmentReportQuerySchema = withCustomRangeRefinement(
  advancedReportBaseObjectSchema.extend({
    staffId: idSchema.optional(),
    locationId: locationIdSchema.optional(),
    appointmentType: z.string().min(1).max(100).optional(),
    status: appointmentStatusSchema.optional(),
  }),
);

export const revenueReportQuerySchema = withCustomRangeRefinement(
  advancedReportBaseObjectSchema.extend({
    staffId: idSchema.optional(),
    patientId: idSchema.optional(),
    status: z.enum(["PAID", "ISSUED", "VOID"]).optional(),
    minTotal: z.coerce.number().nonnegative().optional(),
    maxTotal: z.coerce.number().nonnegative().optional(),
  }),
);

export const patientReportQuerySchema = withCustomRangeRefinement(
  advancedReportBaseObjectSchema.extend({
    gender: z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
);

export const savedReportTypeSchema = z.enum(["APPOINTMENT", "REVENUE", "PATIENT"]);

export const scheduledReportFrequencySchema = z.enum(["DAILY", "WEEKLY", "MONTHLY"]);

export const scheduledReportStatusSchema = z.enum(["ACTIVE", "PAUSED"]);

export const createSavedReportSchema = z.object({
  name: z.string().min(1).max(200),
  type: savedReportTypeSchema,
  config: z.record(z.unknown()),
});

export const updateSavedReportSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  config: z.record(z.unknown()).optional(),
});

export const listSavedReportsSchema = z.object({
  type: savedReportTypeSchema.optional(),
  page,
  limit,
});

export const createScheduledReportSchema = z
  .object({
    savedReportId: idSchema,
    frequency: scheduledReportFrequencySchema,
    timeOfDay: z.string().regex(/^\d{2}:\d{2}$/, "timeOfDay must be HH:mm"),
    dayOfWeek: z.coerce.number().int().min(0).max(6).optional(),
    dayOfMonth: z.coerce.number().int().min(1).max(31).optional(),
    recipients: z.array(z.string().email()).min(1),
    status: scheduledReportStatusSchema.optional(),
  })
  .superRefine((value, context) => {
    if (value.frequency === "WEEKLY" && value.dayOfWeek === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "dayOfWeek is required for weekly schedules",
        path: ["dayOfWeek"],
      });
    }

    if (value.frequency === "MONTHLY" && value.dayOfMonth === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "dayOfMonth is required for monthly schedules",
        path: ["dayOfMonth"],
      });
    }
  });

export const updateScheduledReportSchema = z.object({
  frequency: scheduledReportFrequencySchema.optional(),
  timeOfDay: z.string().regex(/^\d{2}:\d{2}$/, "timeOfDay must be HH:mm").optional(),
  dayOfWeek: z.coerce.number().int().min(0).max(6).optional(),
  dayOfMonth: z.coerce.number().int().min(1).max(31).optional(),
  recipients: z.array(z.string().email()).min(1).optional(),
  status: scheduledReportStatusSchema.optional(),
});

export const dashboardMetricsQuerySchema = z
  .object({
    rangeType: dashboardRangeTypeSchema.default("last_7_days"),
    startDate: isoDateString.optional(),
    endDate: isoDateString.optional(),
  })
  .superRefine((value, context) => {
    if (value.rangeType !== "custom") {
      return;
    }

    if (!value.startDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startDate is required for custom range",
        path: ["startDate"],
      });
    }

    if (!value.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate is required for custom range",
        path: ["endDate"],
      });
    }

    if (value.startDate && value.endDate && value.startDate > value.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startDate must be before or equal to endDate",
        path: ["endDate"],
      });
    }
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
export type DashboardRangeType = z.infer<typeof dashboardRangeTypeSchema>;
export type DashboardMetricsQueryInput = z.infer<typeof dashboardMetricsQuerySchema>;
export type ReportGroupBy = z.infer<typeof reportGroupBySchema>;
export type AppointmentReportQueryInput = z.infer<typeof appointmentReportQuerySchema>;
export type RevenueReportQueryInput = z.infer<typeof revenueReportQuerySchema>;
export type PatientReportQueryInput = z.infer<typeof patientReportQuerySchema>;
export type ExportCsvInput = z.infer<typeof exportCsvSchema>;
export type ExportPdfInput = z.infer<typeof exportPdfSchema>;

export const reportTypeSchema = z.enum([
  "appointments_summary",
  "appointments_detailed",
  "billing_summary",
  "billing_detailed",
  "notes_summary",
  "therapist_activity",
  "patient_activity",
  "clinic_overview",
  "tenant_usage",
]);

export const reportStatusSchema = z.enum(["pending", "processing", "completed", "failed"]);

export const reportFormatSchema = z.enum(["json", "csv"]);

export const reportFiltersSchema = dateRangeObjectSchema
  .extend({
    therapistId: idSchema.optional(),
    patientId: idSchema.optional(),
    status: z.string().min(1).max(50).optional(),
    format: reportFormatSchema.optional(),
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

export const createReportRequestSchema = z.object({
  type: reportTypeSchema,
  filters: reportFiltersSchema,
});

export const listReportRequestsSchema = z.object({
  status: reportStatusSchema.optional(),
  type: reportTypeSchema.optional(),
  page,
  limit,
});

export const downloadReportSchema = z.object({
  format: reportFormatSchema.optional(),
});

export type ReportType = z.infer<typeof reportTypeSchema>;
export type ReportStatus = z.infer<typeof reportStatusSchema>;
export type ReportFormat = z.infer<typeof reportFormatSchema>;
export type ReportFiltersInput = z.infer<typeof reportFiltersSchema>;
export type CreateReportRequestInput = z.infer<typeof createReportRequestSchema>;
export type ListReportRequestsInput = z.infer<typeof listReportRequestsSchema>;
export type DownloadReportInput = z.infer<typeof downloadReportSchema>;
export type SavedReportType = z.infer<typeof savedReportTypeSchema>;
export type ScheduledReportFrequency = z.infer<typeof scheduledReportFrequencySchema>;
export type ScheduledReportStatus = z.infer<typeof scheduledReportStatusSchema>;
export type CreateSavedReportInput = z.infer<typeof createSavedReportSchema>;
export type UpdateSavedReportInput = z.infer<typeof updateSavedReportSchema>;
export type ListSavedReportsInput = z.infer<typeof listSavedReportsSchema>;
export type CreateScheduledReportInput = z.infer<typeof createScheduledReportSchema>;
export type UpdateScheduledReportInput = z.infer<typeof updateScheduledReportSchema>;
