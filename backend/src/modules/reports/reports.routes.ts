import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { Permission, requirePermission } from "../../middleware/permissions";
import { getClinicSummaryReport, getRevenueReport } from "./reports.service";
import { revenueReportQuerySchema } from "./reports.validation";

export const reportsRouter = Router();

reportsRouter.get(
  "/summary",
  requirePermission(Permission.REPORTING_VIEW),
  asyncHandler(async (req, res) => {
    const report = await getClinicSummaryReport(req.tenantId!);
    res.json({ data: report });
  }),
);

reportsRouter.get(
  "/revenue",
  requirePermission(Permission.REPORTING_VIEW),
  validateRequest(revenueReportQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const { from, to } = req.query as unknown as { from: Date; to: Date };
    const report = await getRevenueReport(req.tenantId!, from, to);
    res.json({ data: report });
  }),
);
