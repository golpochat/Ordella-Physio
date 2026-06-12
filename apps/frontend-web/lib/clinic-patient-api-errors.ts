import { ApiError } from "@/lib/api-client";

export type PatientFieldErrors = Record<string, string>;

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    metadata?: {
      fields?: Array<{ field?: string; message?: string }>;
      field?: string;
    };
  };
};

function extractFieldErrors(apiError: ApiErrorPayload["error"]): PatientFieldErrors {
  const fieldErrors: PatientFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parsePatientCreateErrors(error: unknown): {
  fieldErrors: PatientFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  emailExists: boolean;
} {
  const fieldErrors: PatientFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let emailExists = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to create patient.",
      forbidden,
      emailExists,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create patients.",
      forbidden,
      emailExists,
    };
  }

  if (code === "PATIENT_EMAIL_EXISTS") {
    emailExists = true;
    fieldErrors.email = apiError?.message ?? "A patient with this email already exists.";
    return { fieldErrors, generalError: null, forbidden, emailExists };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, emailExists };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to create patient.",
    forbidden,
    emailExists,
  };
}

export function parsePatientUpdateErrors(error: unknown): {
  fieldErrors: PatientFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  emailExists: boolean;
} {
  const fieldErrors: PatientFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let emailExists = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update patient.",
      forbidden,
      tenantMismatch,
      notFound,
      emailExists,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update patients.",
      forbidden,
      tenantMismatch,
      notFound,
      emailExists,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify patients from another tenant.",
      forbidden: true,
      tenantMismatch,
      notFound,
      emailExists,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Patient does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      emailExists,
    };
  }

  if (code === "PATIENT_EMAIL_EXISTS") {
    emailExists = true;
    fieldErrors.email = apiError?.message ?? "A patient with this email already exists.";
    return { fieldErrors, generalError: null, forbidden, tenantMismatch, notFound, emailExists };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, tenantMismatch, notFound, emailExists };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update patient.",
    forbidden,
    tenantMismatch,
    notFound,
    emailExists,
  };
}

export function parsePatientListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load patients. Please try again." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "INVALID_PAGINATION") {
    return {
      toastError: apiError?.message ?? "Page and limit must be positive numbers.",
    };
  }

  if (code === "INVALID_FILTER") {
    return {
      toastError: apiError?.message ?? "Invalid filter value.",
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load patients. Please try again.",
  };
}

export function parsePatientNoteSaveErrors(error: unknown): {
  fieldErrors: PatientFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  patientNotFound: boolean;
} {
  const fieldErrors: PatientFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let patientNotFound = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to save note.",
      forbidden,
      tenantMismatch,
      notFound,
      patientNotFound,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to manage patient notes.",
      forbidden,
      tenantMismatch,
      notFound,
      patientNotFound,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot access notes from another tenant.",
      forbidden: true,
      tenantMismatch,
      notFound,
      patientNotFound,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    patientNotFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Patient does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      patientNotFound,
    };
  }

  if (code === "NOTE_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Medical note does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      patientNotFound,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, tenantMismatch, notFound, patientNotFound };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to save note.",
    forbidden,
    tenantMismatch,
    notFound,
    patientNotFound,
  };
}

export function parsePatientNoteListErrors(error: unknown): {
  toastError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  patientNotFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      toastError: "Failed to load notes. Please try again.",
      forbidden: false,
      tenantMismatch: false,
      patientNotFound: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      toastError: apiError?.message ?? "You do not have permission to manage patient notes.",
      forbidden: true,
      tenantMismatch: false,
      patientNotFound: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      toastError: apiError?.message ?? "You cannot access notes from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      patientNotFound: false,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    return {
      toastError: apiError?.message ?? "Patient does not exist.",
      forbidden: false,
      tenantMismatch: false,
      patientNotFound: true,
    };
  }

  if (code === "INVALID_PAGINATION" || code === "INVALID_FILTER") {
    return {
      toastError: apiError?.message ?? "Invalid filter value.",
      forbidden: false,
      tenantMismatch: false,
      patientNotFound: false,
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load notes. Please try again.",
    forbidden: false,
    tenantMismatch: false,
    patientNotFound: false,
  };
}

const ALLOWED_ATTACHMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".doc", ".docx", ".txt"];
const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

export function validatePatientAttachmentFile(file: File): string | null {
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return "The uploaded file exceeds the maximum allowed size (20MB).";
  }

  const extension = file.name.includes(".")
    ? `.${file.name.split(".").pop()?.toLowerCase()}`
    : "";

  if (extension && !ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
    return "Unsupported file type. Allowed: PDF, images, DOCX, DOC, TXT.";
  }

  return null;
}

export function parsePatientAttachmentUploadErrors(error: unknown): {
  fieldErrors: PatientFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  patientNotFound: boolean;
  fileTooLarge: boolean;
} {
  const fieldErrors: PatientFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let patientNotFound = false;
  let fileTooLarge = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to upload attachment.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to manage patient attachments.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot access attachments from another tenant.",
      forbidden: true,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    patientNotFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Patient does not exist.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  if (code === "FILE_TOO_LARGE") {
    fileTooLarge = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "The uploaded file exceeds the maximum allowed size.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  if (code === "VALIDATION_ERROR" || code === "INVALID_FILE") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));
    return {
      fieldErrors,
      generalError:
        Object.keys(fieldErrors).length === 0
          ? (apiError?.message ?? "Please fix the highlighted fields and try again.")
          : null,
      forbidden,
      tenantMismatch,
      patientNotFound,
      fileTooLarge,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to upload attachment.",
    forbidden,
    tenantMismatch,
    patientNotFound,
    fileTooLarge,
  };
}

export function parsePatientAttachmentListErrors(error: unknown): {
  toastError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  patientNotFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      toastError: "Failed to load attachments. Please try again.",
      forbidden: false,
      tenantMismatch: false,
      patientNotFound: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      toastError: apiError?.message ?? "You do not have permission to manage patient attachments.",
      forbidden: true,
      tenantMismatch: false,
      patientNotFound: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      toastError: apiError?.message ?? "You cannot access attachments from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      patientNotFound: false,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    return {
      toastError: apiError?.message ?? "Patient does not exist.",
      forbidden: false,
      tenantMismatch: false,
      patientNotFound: true,
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load attachments. Please try again.",
    forbidden: false,
    tenantMismatch: false,
    patientNotFound: false,
  };
}

export function parsePatientAttachmentActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update attachment.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to manage patient attachments.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot access attachments from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "ATTACHMENT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Attachment does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? "Failed to update attachment.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}

export function parsePatientStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update patient status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify patients.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify patients from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Patient does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (
    code === "PATIENT_ALREADY_INACTIVE" ||
    code === "PATIENT_ALREADY_ACTIVE" ||
    code === "PATIENT_HAS_ACTIVE_APPOINTMENTS"
  ) {
    return {
      message: apiError?.message ?? "Patient status could not be updated.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update patient status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}

export function parsePatientFetchErrors(error: unknown): {
  message: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to load patient.",
      forbidden: false,
      tenantMismatch: false,
      notFound: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to view patients.",
      forbidden: true,
      tenantMismatch: false,
      notFound: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot access patients from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      notFound: false,
    };
  }

  if (code === "PATIENT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Patient does not exist.",
      forbidden: false,
      tenantMismatch: false,
      notFound: true,
    };
  }

  return {
    message: apiError?.message ?? "Failed to load patient.",
    forbidden: false,
    tenantMismatch: false,
    notFound: false,
  };
}
