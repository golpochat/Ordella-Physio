import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { withAudit } from "../../middleware/audit";
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
  withAudit("email", "service_statement")(statementsController.emailToPatient),
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
  withAudit("create", "patient")(patientsController.create),
);

patientsRouter.patch(
  "/:id",
  policies.patientsEdit,
  validateRequest(patientIdParamSchema, "params"),
  validateRequest(updatePatientSchema),
  withAudit("update", "patient")(patientsController.update),
);

patientsRouter.delete(
  "/:id",
  policies.patientsWriteAdminStaff,
  validateRequest(patientIdParamSchema, "params"),
  withAudit("delete", "patient")(patientsController.remove),
);

export { patientsRouter };
