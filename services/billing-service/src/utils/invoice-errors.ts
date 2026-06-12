import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { InvoiceValidationFieldError } from "@/validators/invoice.validator";

export function invoiceValidationError(fields: InvoiceValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function patientNotFoundError(message = "Patient does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.PATIENT.NOT_FOUND,
    message,
  });
}

export function staffNotFoundError(message = "Staff member does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.STAFF.NOT_FOUND,
    message,
  });
}

export function appointmentNotFoundError(message = "Appointment does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.APPOINTMENT.NOT_FOUND,
    message,
  });
}

export function invalidInvoiceItemError(message = "Invoice item is invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.BILLING.INVALID_ITEM,
    message,
  });
}

export function invoiceTenantMismatchError(
  message = "You cannot create invoices for another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function invoiceForbiddenError(message = "You do not have permission to create invoices.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function invoiceUpdateForbiddenError(
  message = "You do not have permission to update invoices.",
) {
  return invoiceForbiddenError(message);
}

export function invoiceNotFoundError(message = "Invoice does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.BILLING.INVOICE_NOT_FOUND,
    message,
  });
}

export function cannotEditFinalizedInvoiceError(
  message = "Paid or void invoices cannot be edited.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.BILLING.CANNOT_EDIT_FINALIZED_INVOICE,
    message,
  });
}

export function invoiceUpdateTenantMismatchError(
  message = "You cannot modify invoices from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function invalidInvoicePaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidInvoiceFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function invalidInvoiceStatusTransitionError(
  message = "This invoice cannot transition to the requested status.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.BILLING.INVALID_STATUS_TRANSITION,
    message,
  });
}

export function cannotVoidPaidInvoiceError(message = "Paid invoices cannot be voided.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.BILLING.CANNOT_VOID_PAID_INVOICE,
    message,
  });
}

export function invoiceAlreadyVoidError(message = "Invoice is already void.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.BILLING.INVOICE_ALREADY_VOID,
    message,
  });
}

export function invoiceStatusForbiddenError(
  message = "You do not have permission to modify invoices.",
) {
  return invoiceForbiddenError(message);
}
