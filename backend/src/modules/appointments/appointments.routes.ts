import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { appointmentsController } from "./appointments.controller";
import {
  appointmentIdParamSchema,
  availabilityCheckQuerySchema,
  createAppointmentSchema,
  listAppointmentsQuerySchema,
  transitionStatusSchema,
  updateAppointmentSchema,
} from "./appointments.validation";

const deleteAppointmentSchema = z.object({
  cancellationReason: z.string().trim().max(500).optional(),
});

const appointmentsRouter = Router();

appointmentsRouter.get(
  "/availability/check",
  policies.appointmentsRead,
  validateRequest(availabilityCheckQuerySchema, "query"),
  asyncHandler(appointmentsController.checkAvailability),
);

appointmentsRouter.get(
  "/",
  policies.appointmentsRead,
  validateRequest(listAppointmentsQuerySchema, "query"),
  asyncHandler(appointmentsController.list),
);

appointmentsRouter.get(
  "/:id",
  policies.appointmentsRead,
  validateRequest(appointmentIdParamSchema, "params"),
  asyncHandler(appointmentsController.getById),
);

appointmentsRouter.post(
  "/",
  policies.appointmentsWrite,
  validateRequest(createAppointmentSchema),
  asyncHandler(appointmentsController.create),
);

appointmentsRouter.patch(
  "/:id",
  policies.appointmentsWrite,
  validateRequest(appointmentIdParamSchema, "params"),
  validateRequest(updateAppointmentSchema),
  asyncHandler(appointmentsController.update),
);

appointmentsRouter.patch(
  "/:id/status",
  policies.appointmentsWrite,
  validateRequest(appointmentIdParamSchema, "params"),
  validateRequest(transitionStatusSchema),
  asyncHandler(appointmentsController.transitionStatus),
);

appointmentsRouter.post(
  "/:id/cancel",
  policies.appointmentsWrite,
  validateRequest(appointmentIdParamSchema, "params"),
  validateRequest(deleteAppointmentSchema),
  asyncHandler(appointmentsController.cancel),
);

appointmentsRouter.post(
  "/:id/complete",
  policies.appointmentsWrite,
  validateRequest(appointmentIdParamSchema, "params"),
  asyncHandler(appointmentsController.complete),
);

appointmentsRouter.delete(
  "/:id",
  policies.appointmentsWrite,
  validateRequest(appointmentIdParamSchema, "params"),
  validateRequest(deleteAppointmentSchema),
  asyncHandler(appointmentsController.remove),
);

export { appointmentsRouter };
