const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVOICE_PREFIX_REGEX = /^[A-Z0-9]*$/;

export function validateBillingEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Billing email is required";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email address";
  }
  return null;
}

export function validateBillingContactName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Billing contact name is required";
  }
  if (trimmed.length < 3) {
    return "Billing contact name is required";
  }
  return null;
}

export function validateBillingAddressLine1(value: string): string | null {
  if (!value.trim()) {
    return "Address is required";
  }
  return null;
}

export function validateBillingCity(value: string): string | null {
  if (!value.trim()) {
    return "City is required";
  }
  return null;
}

export function validateBillingPostcode(value: string): string | null {
  if (!value.trim()) {
    return "Postcode is required";
  }
  return null;
}

export function validateBillingCountry(value: string): string | null {
  if (!value) {
    return "Country is required";
  }
  return null;
}

export function validateBillingDefaultCurrency(value: string): string | null {
  if (!value) {
    return "Default currency is required";
  }
  if (!/^[A-Z]{3}$/.test(value)) {
    return "Default currency is required";
  }
  return null;
}

export function validateInvoicePrefix(value: string): string | null {
  const trimmed = value.trim().toUpperCase();
  if (!trimmed) {
    return null;
  }
  if (!INVOICE_PREFIX_REGEX.test(trimmed) || trimmed.length > 10) {
    return "Invoice prefix can only contain letters and numbers and max 10 characters";
  }
  return null;
}
