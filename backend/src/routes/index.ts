import { Router } from "express";
import { authRouter } from "../modules/auth";
import { onboardingRouter } from "../modules/onboarding";
import { tenantRouter } from "../modules/tenant/tenant.routes";
import { patientsRouter } from "../modules/patients";
import { appointmentsRouter } from "../modules/appointments";
import { therapistsRouter } from "../modules/therapists";
import { staffRouter } from "../modules/staff";
import { billingRouter } from "../modules/billing";
import { notesRouter } from "../modules/notes";
import { reportsRouter } from "../modules/reports";
import { notificationsRouter } from "../modules/notifications";
import { rbacRouter } from "../modules/rbac";
import { filesRouter } from "../modules/files";
import { authMiddleware, requireAuth } from "../middleware/tenant.middleware";
import { requireTenant } from "../middleware/tenant";
import { enforceTenantAccess } from "../middleware/tenant-access";
import { asyncHandler } from "../utils/async-handler";
import { listAuditLogs } from "../modules/utilities/audit.service";
import { policies } from "../modules/rbac/policies";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "clinic-backend" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/onboarding", onboardingRouter);

const tenantScoped = Router();
tenantScoped.use(authMiddleware, requireAuth, requireTenant, enforceTenantAccess);

tenantScoped.use("/tenant", tenantRouter);

tenantScoped.use("/patients", patientsRouter);
tenantScoped.use("/appointments", appointmentsRouter);
tenantScoped.use("/therapists", therapistsRouter);
tenantScoped.use("/staff", staffRouter);
tenantScoped.use("/billing", billingRouter);
tenantScoped.use("/notes", notesRouter);
tenantScoped.use("/reports", reportsRouter);
tenantScoped.use("/notifications", notificationsRouter);
tenantScoped.use("/rbac", rbacRouter);
tenantScoped.use("/files", filesRouter);

tenantScoped.get(
  "/audit-logs",
  policies.auditRead,
  asyncHandler(async (req, res) => {
    const logs = await listAuditLogs(req.tenantId!);
    res.json({ data: logs });
  }),
);

apiRouter.use(tenantScoped);
