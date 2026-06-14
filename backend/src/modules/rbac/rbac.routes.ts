import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "./policies";
import { assignRole, listRoles } from "./rbac.service";
import { auditContextFromRequest } from "../utilities/audit.service";
import { z } from "zod";

const assignRoleSchema = z.object({
  userId: z.string().min(1),
  roleId: z.string().min(1),
});

export const rbacRouter = Router();

rbacRouter.get(
  "/roles",
  policies.rbacRead,
  asyncHandler(async (req, res) => {
    const roles = await listRoles(req.tenantId!);
    res.json({ data: roles });
  }),
);

rbacRouter.post(
  "/assign",
  policies.rbacWrite,
  validateRequest(assignRoleSchema),
  asyncHandler(async (req, res) => {
    const assignment = await assignRole(
      req.tenantId!,
      req.body.userId,
      req.body.roleId,
      auditContextFromRequest(req),
    );
    res.status(201).json({ data: assignment });
  }),
);
