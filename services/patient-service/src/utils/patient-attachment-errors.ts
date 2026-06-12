import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { PatientAttachmentValidationFieldError } from "@/models/PatientAttachment";

export function patientAttachmentValidationError(fields: PatientAttachmentValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function patientAttachmentNotFoundError(message = "Attachment does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.PATIENT.ATTACHMENT_NOT_FOUND,
    message,
  });
}

export function patientAttachmentsForbiddenError(
  message = "You do not have permission to manage patient attachments.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function patientAttachmentFileTooLargeError(
  message = "The uploaded file exceeds the maximum allowed size.",
) {
  return new HttpError({
    statusCode: 413,
    code: ERROR_CODES.AUTH.FILE_TOO_LARGE,
    message,
  });
}

export function patientAttachmentUploadFailedError(
  message = "Could not upload attachment. Try again.",
) {
  return new HttpError({
    statusCode: 500,
    code: ERROR_CODES.AUTH.UPLOAD_FAILED,
    message,
  });
}

export function patientAttachmentInvalidFileError(message = "Unsupported file type.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILE,
    message,
  });
}
