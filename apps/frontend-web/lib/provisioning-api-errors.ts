import { ApiError } from "@/lib/api-client";

export type ProvisioningFieldErrors = Record<string, string>;

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    metadata?: {
      fields?: Array<{ field?: string; message?: string }>;
    };
  };
};

function extractFieldErrors(apiError: ApiErrorPayload["error"]): ProvisioningFieldErrors {
  const fieldErrors: ProvisioningFieldErrors = {};
  const fields = apiError?.metadata?.fields ?? [];

  for (const entry of fields) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseFullProvisioningErrors(error: unknown): {
  fieldErrors: ProvisioningFieldErrors;
  generalError: string | null;
} {
  const fieldErrors: ProvisioningFieldErrors = {};
  let generalError: string | null = null;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to provision platform workspace." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError };
  }

  if (code === "OWNER_ALREADY_ASSIGNED") {
    fieldErrors["owner.ownerUserId"] = apiError?.message ?? "This user is already owner of another tenant.";
    return { fieldErrors, generalError: null };
  }

  if (code === "EMAIL_EXISTS") {
    fieldErrors["owner.ownerEmail"] = apiError?.message ?? "This email is already in use.";
    return { fieldErrors, generalError: null };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to provision platform workspace.",
  };
}
