import { z } from "zod";

export const revenueReportQuerySchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});
