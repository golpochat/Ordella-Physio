import type { Request, Response } from "express";
import { auditContextFromRequest } from "../utilities/audit.service";
import {
  createInvoice,
  generateInvoicePdfBuffer,
  getInvoice,
  getInvoiceBalance,
  getOutstandingBalance,
  issueInvoice,
  listInvoices,
  recordPayment,
  updateInvoice,
  voidInvoice,
} from "./billing.service";
import type { CreateInvoiceBody, ListInvoicesQuery, RecordPaymentBody, UpdateInvoiceBody } from "./billing.validation";

export const billingController = {
  listInvoices: async (req: Request, res: Response) => {
    const result = await listInvoices(req.tenantId!, req.query as unknown as ListInvoicesQuery);
    res.json({ data: result });
  },

  getOutstanding: async (req: Request, res: Response) => {
    const patientId = req.query.patientId as string | undefined;
    const balance = await getOutstandingBalance(req.tenantId!, patientId);
    res.json({ data: balance });
  },

  getPatientOutstanding: async (req: Request, res: Response) => {
    const balance = await getOutstandingBalance(req.tenantId!, String(req.params.patientId));
    res.json({ data: balance });
  },

  getInvoice: async (req: Request, res: Response) => {
    const invoice = await getInvoice(req.tenantId!, String(req.params.id));
    res.json({ data: invoice });
  },

  getInvoiceBalance: async (req: Request, res: Response) => {
    const balance = await getInvoiceBalance(req.tenantId!, String(req.params.id));
    res.json({ data: balance });
  },

  downloadPdf: async (req: Request, res: Response) => {
    const { buffer, filename } = await generateInvoicePdfBuffer(req.tenantId!, String(req.params.id));
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  },

  createInvoice: async (req: Request, res: Response) => {
    const invoice = await createInvoice(
      req.tenantId!,
      req.body as CreateInvoiceBody,
      auditContextFromRequest(req),
    );
    res.status(201).json({ data: invoice });
  },

  updateInvoice: async (req: Request, res: Response) => {
    const invoice = await updateInvoice(
      req.tenantId!,
      String(req.params.id),
      req.body as UpdateInvoiceBody,
      auditContextFromRequest(req),
    );
    res.json({ data: invoice });
  },

  issueInvoice: async (req: Request, res: Response) => {
    const invoice = await issueInvoice(
      req.tenantId!,
      String(req.params.id),
      auditContextFromRequest(req),
    );
    res.json({ data: invoice });
  },

  voidInvoice: async (req: Request, res: Response) => {
    const invoice = await voidInvoice(
      req.tenantId!,
      String(req.params.id),
      auditContextFromRequest(req),
    );
    res.json({ data: invoice });
  },

  recordPayment: async (req: Request, res: Response) => {
    const payment = await recordPayment(
      req.tenantId!,
      String(req.params.id),
      req.body as RecordPaymentBody,
      auditContextFromRequest(req),
    );
    res.status(201).json({ data: payment });
  },
};
