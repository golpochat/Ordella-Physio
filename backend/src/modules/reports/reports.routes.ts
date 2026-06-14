import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { getClinicSummaryReport, getRevenueReport } from "./reports.service";
import { revenueReportQuerySchema } from "./reports.validation";

export const reportsRouter = Router();

reportsRouter.get(
  "/summary",
  policies.reportsRead,
  asyncHandler(async (req, res) => {
    const report = await getClinicSummaryReport(req.tenantId!);
    res.json({ data: report });
  }),
);

reportsRouter.get(
  "/revenue",
  policies.reportsRead,
  validateRequest(revenueReportQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const { from, to } = req.query as unknown as { from: Date; to: Date };
    const report = await getRevenueReport(req.tenantId!, from, to);
    res.json({ data: report });
  }),
);
