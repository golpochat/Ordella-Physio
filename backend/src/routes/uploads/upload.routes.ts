import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/async-handler";
import { policies } from "../../modules/rbac/policies";
import { uploadController } from "./upload.controller";

const MAX_UPLOAD_BYTES = Number(process.env.FILE_STORAGE_MAX_BYTES ?? String(50 * 1024 * 1024));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
});

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  policies.filesUpload,
  upload.single("file"),
  asyncHandler(uploadController.upload),
);

uploadRouter.post(
  "/",
  policies.filesUpload,
  upload.single("file"),
  asyncHandler(uploadController.upload),
);

export { uploadRouter };
