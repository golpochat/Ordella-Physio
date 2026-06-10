import { z } from "zod";
import { dateRangeObjectSchema } from "../zod/date-schemas";
import { limit, page } from "../zod/pagination-schemas";

export const replayEventsSchema = dateRangeObjectSchema.extend({
  stream: z.string().min(1),
  subject: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
});

export const listDeadLetterSchema = z.object({
  stream: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  page,
  limit,
});

export type ReplayEventsInput = z.infer<typeof replayEventsSchema>;
export type ListDeadLetterInput = z.infer<typeof listDeadLetterSchema>;
