import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { Permission, requirePermission } from "../../middleware/permissions";
import { withAudit } from "../../middleware/audit";
import { assignRole, listRoles } from "./rbac.service";
import { z } from "zod";

const assignRoleSchema = z.object({
  userId: z.string().min(1),
  roleId: z.string().min(1),
});

export const rbacRouter = Router();

rbacRouter.get(
  "/roles",
  requirePermission(Permission.ROLE_MANAGE),
  asyncHandler(async (req, res) => {
    const roles = await listRoles(req.tenantId!);
    res.json({ data: roles });
  }),
);

rbacRouter.post(
  "/assign",
  requirePermission(Permission.ROLE_MANAGE),
  validateRequest(assignRoleSchema),
  withAudit("assign", "role")(async (req, res) => {
    const assignment = await assignRole(req.tenantId!, req.body.userId, req.body.roleId);
    res.status(201).json({ data: assignment });
  }),
);
