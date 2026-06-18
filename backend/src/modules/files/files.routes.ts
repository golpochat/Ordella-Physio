import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { policies } from "../rbac/policies";
import { filesController } from "./files.controller";
import { uploadRouter } from "../../routes/uploads";

const filesRouter = Router();

filesRouter.use(uploadRouter);

filesRouter.get("/", policies.filesRead, asyncHandler(filesController.list));

filesRouter.get("/:id/metadata", policies.filesRead, asyncHandler(filesController.getMetadata));

filesRouter.get("/:id/access-url", policies.filesRead, asyncHandler(filesController.getAccessUrl));

filesRouter.delete("/:id/hard", policies.filesDelete, asyncHandler(filesController.hardDelete));

filesRouter.delete("/:id", policies.filesDelete, asyncHandler(filesController.softDelete));

filesRouter.get("/:id", policies.filesRead, asyncHandler(filesController.getById));

export { filesRouter };
