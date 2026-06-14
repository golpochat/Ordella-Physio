import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { billingController } from "./billing.controller";
import {
  createInvoiceSchema,
  invoiceIdParamSchema,
  listInvoicesQuerySchema,
  outstandingQuerySchema,
  patientIdParamSchema,
  recordPaymentSchema,
  updateInvoiceSchema,
} from "./billing.validation";

/**
 * RBAC: Admin + Staff manage billing; Clinicians read-only; Patients blocked.
 */
export const billingRouter = Router();

billingRouter.get(
  "/outstanding",
  policies.billingRead,
  validateRequest(outstandingQuerySchema, "query"),
  asyncHandler(billingController.getOutstanding),
);

billingRouter.get(
  "/patients/:patientId/outstanding",
  policies.billingRead,
  validateRequest(patientIdParamSchema, "params"),
  asyncHandler(billingController.getPatientOutstanding),
);

billingRouter.get(
  "/invoices",
  policies.billingRead,
  validateRequest(listInvoicesQuerySchema, "query"),
  asyncHandler(billingController.listInvoices),
);

billingRouter.get(
  "/invoices/:id",
  policies.billingRead,
  validateRequest(invoiceIdParamSchema, "params"),
  asyncHandler(billingController.getInvoice),
);

billingRouter.get(
  "/invoices/:id/balance",
  policies.billingRead,
  validateRequest(invoiceIdParamSchema, "params"),
  asyncHandler(billingController.getInvoiceBalance),
);

billingRouter.get(
  "/invoices/:id/pdf",
  policies.billingRead,
  validateRequest(invoiceIdParamSchema, "params"),
  asyncHandler(billingController.downloadPdf),
);

billingRouter.post(
  "/invoices",
  policies.billingWrite,
  validateRequest(createInvoiceSchema),
  asyncHandler(billingController.createInvoice),
);

billingRouter.patch(
  "/invoices/:id",
  policies.billingWrite,
  validateRequest(invoiceIdParamSchema, "params"),
  validateRequest(updateInvoiceSchema),
  asyncHandler(billingController.updateInvoice),
);

billingRouter.post(
  "/invoices/:id/issue",
  policies.billingWrite,
  validateRequest(invoiceIdParamSchema, "params"),
  asyncHandler(billingController.issueInvoice),
);

billingRouter.post(
  "/invoices/:id/void",
  policies.billingWrite,
  validateRequest(invoiceIdParamSchema, "params"),
  asyncHandler(billingController.voidInvoice),
);

billingRouter.post(
  "/invoices/:id/payments",
  policies.billingWrite,
  validateRequest(invoiceIdParamSchema, "params"),
  validateRequest(recordPaymentSchema),
  asyncHandler(billingController.recordPayment),
);

billingRouter.post(
  "/invoices/:id/pay",
  policies.billingWrite,
  validateRequest(invoiceIdParamSchema, "params"),
  validateRequest(recordPaymentSchema),
  asyncHandler(billingController.recordPayment),
);
