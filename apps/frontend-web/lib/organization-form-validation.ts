import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation/constants";

export function validateOrganizationName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Organization name is required";
  }
  if (trimmed.length < 3) {
    return "Organization name must be at least 3 characters";
  }
  return null;
}

export function validateOrganizationEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Primary contact email is required";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email";
  }
  return null;
}

export function validateOrganizationPhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) {
    return "Primary contact phone is required";
  }
  if (!PHONE_REGEX.test(trimmed)) {
    return "Enter a valid phone number";
  }
  return null;
}

export function validateBillingModel(value: string): string | null {
  if (!value) {
    return "Billing model is required";
  }
  if (value !== "tenant-level" && value !== "organization-level") {
    return "Select a valid billing model";
  }
  return null;
}
