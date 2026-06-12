import { ApiError } from "@/lib/api-client";

export type InvoiceFieldErrors = Record<string, string>;

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    metadata?: {
      fields?: Array<{ field?: string; message?: string }>;
    };
  };
};

function extractFieldErrors(apiError: ApiErrorPayload["error"]): InvoiceFieldErrors {
  const fieldErrors: InvoiceFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseInvoiceCreateErrors(error: unknown): {
  fieldErrors: InvoiceFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  patientNotFound: boolean;
  invalidItem: boolean;
} {
  const fieldErrors: InvoiceFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let patientNotFound = false;
  let invalidItem = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to create invoice.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      invalidItem,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create invoices.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      invalidItem,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot create invoices for another tenant.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      invalidItem,
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
      invalidItem,
    };
  }

  if (code === "INVALID_ITEM") {
    invalidItem = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Invoice item is invalid.",
      forbidden,
      tenantMismatch,
      patientNotFound,
      invalidItem,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      forbidden,
      tenantMismatch,
      patientNotFound,
      invalidItem,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to create invoice.",
    forbidden,
    tenantMismatch,
    patientNotFound,
    invalidItem,
  };
}

export function parseInvoiceUpdateErrors(error: unknown): {
  fieldErrors: InvoiceFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  cannotEditFinalized: boolean;
  invalidItem: boolean;
} {
  const fieldErrors: InvoiceFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let cannotEditFinalized = false;
  let invalidItem = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update invoice.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update invoices.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify invoices from another tenant.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  if (code === "INVOICE_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Invoice does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  if (code === "CANNOT_EDIT_FINALIZED_INVOICE") {
    cannotEditFinalized = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Paid or void invoices cannot be edited.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  if (code === "INVALID_ITEM") {
    invalidItem = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Invoice item is invalid.",
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      forbidden,
      tenantMismatch,
      notFound,
      cannotEditFinalized,
      invalidItem,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update invoice.",
    forbidden,
    tenantMismatch,
    notFound,
    cannotEditFinalized,
    invalidItem,
  };
}

export function parseInvoiceListErrors(error: unknown): {
  toastError: string | null;
} {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load invoices." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "INVALID_PAGINATION") {
    return { toastError: apiError?.message ?? "Page and limit must be positive numbers." };
  }

  if (code === "INVALID_FILTER") {
    return { toastError: apiError?.message ?? "Invalid filter value." };
  }

  return { toastError: apiError?.message ?? "Failed to load invoices." };
}

export function parseInvoiceStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
  invalidTransition: boolean;
  cannotVoidPaid: boolean;
  alreadyVoid: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update invoice status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
      invalidTransition: false,
      cannotVoidPaid: false,
      alreadyVoid: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify invoices.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
      invalidTransition: false,
      cannotVoidPaid: false,
      alreadyVoid: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify invoices from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
      invalidTransition: false,
      cannotVoidPaid: false,
      alreadyVoid: false,
    };
  }

  if (code === "INVOICE_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Invoice does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
      invalidTransition: false,
      cannotVoidPaid: false,
      alreadyVoid: false,
    };
  }

  if (code === "INVALID_STATUS_TRANSITION") {
    return {
      message: apiError?.message ?? "This invoice cannot transition to the requested status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
      invalidTransition: true,
      cannotVoidPaid: false,
      alreadyVoid: false,
    };
  }

  if (code === "CANNOT_VOID_PAID_INVOICE") {
    return {
      message: apiError?.message ?? "Paid invoices cannot be voided.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
      invalidTransition: false,
      cannotVoidPaid: true,
      alreadyVoid: false,
    };
  }

  if (code === "INVOICE_ALREADY_VOID") {
    return {
      message: apiError?.message ?? "Invoice is already void.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
      invalidTransition: false,
      cannotVoidPaid: false,
      alreadyVoid: true,
    };
  }

  return {
    message: apiError?.message ?? "Failed to update invoice status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
    invalidTransition: false,
    cannotVoidPaid: false,
    alreadyVoid: false,
  };
}
