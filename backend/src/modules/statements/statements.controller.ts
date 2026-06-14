import type { Request, Response } from "express";
import { auditContextFromRequest } from "../utilities/audit.service";
import { emailServiceStatementToPatient, generateServiceStatementPdf } from "./statements.service";
import type { EmailServiceStatementBody, ServiceStatementQuery } from "./statements.validation";

export const statementsController = {
  downloadPdf: async (req: Request, res: Response) => {
    const { buffer, filename } = await generateServiceStatementPdf(
      req.tenantId!,
      String(req.params.id),
      req.query as unknown as ServiceStatementQuery,
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  },

  emailToPatient: async (req: Request, res: Response) => {
    const result = await emailServiceStatementToPatient(
      req.tenantId!,
      String(req.params.id),
      req.body as EmailServiceStatementBody,
      auditContextFromRequest(req),
    );

    res.json({ data: result });
  },
};
