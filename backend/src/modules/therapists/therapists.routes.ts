import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { withAudit } from "../../middleware/audit";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { therapistsController } from "./therapists.controller";
import {
  adminUpdateTherapistSchema,
  blockedSlotIdParamSchema,
  createBlockedSlotSchema,
  createTherapistSchema,
  listTherapistAppointmentsQuerySchema,
  listTherapistsQuerySchema,
  selfUpdateTherapistSchema,
  serviceTypesSchema,
  therapistIdParamSchema,
  workingHoursSchema,
} from "./therapists.validation";

const therapistsRouter = Router();

therapistsRouter.get(
  "/",
  policies.therapistsRead,
  validateRequest(listTherapistsQuerySchema, "query"),
  asyncHandler(therapistsController.list),
);

therapistsRouter.get("/me", policies.therapistsRead, asyncHandler(therapistsController.getMe));

therapistsRouter.patch(
  "/me",
  policies.therapistSelfUpdate,
  validateRequest(selfUpdateTherapistSchema),
  withAudit("update", "therapist")(therapistsController.updateMe),
);

therapistsRouter.get(
  "/:id/appointments",
  policies.therapistsRead,
  validateRequest(therapistIdParamSchema, "params"),
  validateRequest(listTherapistAppointmentsQuerySchema, "query"),
  asyncHandler(therapistsController.listAppointments),
);

therapistsRouter.get(
  "/:id/schedule",
  policies.therapistsRead,
  validateRequest(therapistIdParamSchema, "params"),
  asyncHandler(therapistsController.getSchedule),
);

therapistsRouter.put(
  "/:id/schedule/working-hours",
  policies.therapistsAdmin,
  validateRequest(therapistIdParamSchema, "params"),
  validateRequest(workingHoursSchema),
  withAudit("update", "therapist_schedule")(therapistsController.setWorkingHours),
);

therapistsRouter.post(
  "/:id/schedule/blocked-slots",
  policies.therapistsAdmin,
  validateRequest(therapistIdParamSchema, "params"),
  validateRequest(createBlockedSlotSchema),
  withAudit("create", "blocked_slot")(therapistsController.addBlockedSlot),
);

therapistsRouter.delete(
  "/:id/schedule/blocked-slots/:blockId",
  policies.therapistsAdmin,
  validateRequest(blockedSlotIdParamSchema, "params"),
  withAudit("delete", "blocked_slot")(therapistsController.removeBlockedSlot),
);

therapistsRouter.get(
  "/:id/service-types",
  policies.therapistsRead,
  validateRequest(therapistIdParamSchema, "params"),
  asyncHandler(therapistsController.listServiceTypes),
);

therapistsRouter.put(
  "/:id/service-types",
  policies.therapistsAdmin,
  validateRequest(therapistIdParamSchema, "params"),
  validateRequest(serviceTypesSchema),
  withAudit("update", "therapist_service_types")(therapistsController.setServiceTypes),
);

therapistsRouter.get(
  "/:id",
  policies.therapistsRead,
  validateRequest(therapistIdParamSchema, "params"),
  asyncHandler(therapistsController.getById),
);

therapistsRouter.post(
  "/",
  policies.therapistsAdmin,
  validateRequest(createTherapistSchema),
  withAudit("create", "therapist")(therapistsController.create),
);

therapistsRouter.patch(
  "/:id",
  policies.therapistsAdmin,
  validateRequest(therapistIdParamSchema, "params"),
  validateRequest(adminUpdateTherapistSchema),
  withAudit("update", "therapist")(therapistsController.update),
);

therapistsRouter.delete(
  "/:id",
  policies.therapistsAdmin,
  validateRequest(therapistIdParamSchema, "params"),
  withAudit("delete", "therapist")(therapistsController.remove),
);

export { therapistsRouter };
