import type { MetricsQueryInput } from "@ordella/validation";

export type DateRangeDto = Pick<MetricsQueryInput, "startDate" | "endDate">;
