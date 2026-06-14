import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { staffController } from "./staff.controller";
import {
  adminUpdateStaffSchema,
  assignStaffRolesSchema,
  createStaffSchema,
  listStaffQuerySchema,
  staffIdParamSchema,
} from "./staff.validation";

const staffRouter = Router();

staffRouter.get(
  "/",
  policies.staffAdmin,
  validateRequest(listStaffQuerySchema, "query"),
  asyncHandler(staffController.list),
);

staffRouter.get("/me", policies.staffSelfRead, asyncHandler(staffController.getMe));

staffRouter.get(
  "/:id/permissions",
  policies.staffSelfRead,
  validateRequest(staffIdParamSchema, "params"),
  asyncHandler(staffController.getPermissions),
);

staffRouter.put(
  "/:id/roles",
  policies.staffAdmin,
  validateRequest(staffIdParamSchema, "params"),
  validateRequest(assignStaffRolesSchema),
  asyncHandler(staffController.assignRoles),
);

staffRouter.get(
  "/:id",
  policies.staffSelfRead,
  validateRequest(staffIdParamSchema, "params"),
  asyncHandler(staffController.getById),
);

staffRouter.post(
  "/",
  policies.staffAdmin,
  validateRequest(createStaffSchema),
  asyncHandler(staffController.create),
);

staffRouter.patch(
  "/:id",
  policies.staffAdmin,
  validateRequest(staffIdParamSchema, "params"),
  validateRequest(adminUpdateStaffSchema),
  asyncHandler(staffController.update),
);

staffRouter.delete(
  "/:id",
  policies.staffAdmin,
  validateRequest(staffIdParamSchema, "params"),
  asyncHandler(staffController.remove),
);

export { staffRouter };
