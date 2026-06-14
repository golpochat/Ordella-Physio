import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { statementsController } from "../statements/statements.controller";
import {
  emailServiceStatementSchema,
  patientIdParamSchema,
  serviceStatementQuerySchema,
} from "../statements/statements.validation";
import { patientsController } from "./patients.controller";
import {
  createPatientSchema,
  listPatientsQuerySchema,
  patientProfileQuerySchema,
  updatePatientSchema,
} from "./patients.validation";

const patientsRouter = Router();

patientsRouter.get(
  "/",
  policies.patientsRead,
  validateRequest(listPatientsQuerySchema, "query"),
  asyncHandler(patientsController.list),
);

patientsRouter.get(
  "/:id/service-statement/pdf",
  policies.patientStatements,
  validateRequest(patientIdParamSchema, "params"),
  validateRequest(serviceStatementQuerySchema, "query"),
  asyncHandler(statementsController.downloadPdf),
);

patientsRouter.post(
  "/:id/service-statement/email",
  policies.patientStatements,
  validateRequest(patientIdParamSchema, "params"),
  validateRequest(emailServiceStatementSchema),
  asyncHandler(statementsController.emailToPatient),
);

patientsRouter.get(
  "/:id/profile",
  policies.patientsRead,
  validateRequest(patientIdParamSchema, "params"),
  validateRequest(patientProfileQuerySchema, "query"),
  asyncHandler(patientsController.getProfile),
);

patientsRouter.get(
  "/:id",
  policies.patientsRead,
  validateRequest(patientIdParamSchema, "params"),
  asyncHandler(patientsController.getById),
);

patientsRouter.post(
  "/",
  policies.patientsWriteAdminStaff,
  validateRequest(createPatientSchema),
  asyncHandler(patientsController.create),
);

patientsRouter.patch(
  "/:id",
  policies.patientsWriteAdminStaff,
  validateRequest(patientIdParamSchema, "params"),
  validateRequest(updatePatientSchema),
  asyncHandler(patientsController.update),
);

patientsRouter.delete(
  "/:id",
  policies.patientsWriteAdminStaff,
  validateRequest(patientIdParamSchema, "params"),
  asyncHandler(patientsController.remove),
);

export { patientsRouter };
