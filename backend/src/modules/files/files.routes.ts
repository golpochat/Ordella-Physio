import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/async-handler";
import { policies } from "../rbac/policies";
import { filesController } from "./files.controller";

const MAX_UPLOAD_BYTES = Number(process.env.FILE_STORAGE_MAX_BYTES ?? String(50 * 1024 * 1024));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
});

const filesRouter = Router();

filesRouter.post(
  "/upload",
  policies.filesUpload,
  upload.single("file"),
  asyncHandler(filesController.upload),
);

filesRouter.post(
  "/",
  policies.filesUpload,
  upload.single("file"),
  asyncHandler(filesController.upload),
);

filesRouter.get("/", policies.filesRead, asyncHandler(filesController.list));

filesRouter.get("/:id/metadata", policies.filesRead, asyncHandler(filesController.getMetadata));

filesRouter.get("/:id/access-url", policies.filesRead, asyncHandler(filesController.getAccessUrl));

filesRouter.delete("/:id/hard", policies.filesDelete, asyncHandler(filesController.hardDelete));

filesRouter.delete("/:id", policies.filesDelete, asyncHandler(filesController.softDelete));

filesRouter.get("/:id", policies.filesRead, asyncHandler(filesController.getById));

export { filesRouter };
