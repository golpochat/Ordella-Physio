import { z } from "zod";
import { patientIdParamSchema } from "../patients/patients.validation";

export const serviceStatementQuerySchema = z.object({
  includeClinicalSummary: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export const emailServiceStatementSchema = z.object({
  includeClinicalSummary: z.boolean().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  message: z.string().trim().max(2000).optional(),
});

export { patientIdParamSchema };

export type ServiceStatementQuery = z.infer<typeof serviceStatementQuerySchema>;
export type EmailServiceStatementBody = z.infer<typeof emailServiceStatementSchema>;
