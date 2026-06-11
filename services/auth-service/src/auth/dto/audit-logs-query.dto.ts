import { z } from "zod";

export const auditLogsQuerySchema = z.object({
  userId: z.string().trim().optional(),
  tenantId: z.string().trim().optional(),
  action: z.string().trim().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type AuditLogsQueryDto = z.infer<typeof auditLogsQuerySchema>;
