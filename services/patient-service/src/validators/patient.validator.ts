import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";
import {
  LIST_PATIENT_SORT_FIELDS,
  PATIENT_GENDERS,
  PATIENT_STATUSES,
  type CreatePatientInsurancePayload,
  type CreatePatientPayload,
  type ListPatientSortField,
  type PatientGender,
  type PatientStatus,
  type PatientValidationFieldError,
  type UpdatePatientPayload,
} from "@/models/Patient";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function validateInsurance(
  insurance: unknown,
): { valid: true; payload: CreatePatientInsurancePayload } | { valid: false; fields: PatientValidationFieldError[] } {
  if (typeof insurance !== "object" || Array.isArray(insurance) || insurance === null) {
    return {
      valid: false,
      fields: [{ field: "insurance", message: "Insurance must be an object." }],
    };
  }

  const fields: PatientValidationFieldError[] = [];
  const record = insurance as Record<string, unknown>;
  const providerName = typeof record.providerName === "string" ? record.providerName.trim() : "";
  const policyNumber = typeof record.policyNumber === "string" ? record.policyNumber.trim() : "";
  const expiryDate = typeof record.expiryDate === "string" ? record.expiryDate.trim() : "";
  const notes = typeof record.notes === "string" ? record.notes.trim() : undefined;

  if (!providerName) {
    fields.push({ field: "insurance.providerName", message: "Insurance provider name is required." });
  }

  if (!policyNumber) {
    fields.push({ field: "insurance.policyNumber", message: "Policy number is required." });
  }

  if (!expiryDate) {
    fields.push({ field: "insurance.expiryDate", message: "Insurance expiry date is required." });
  } else if (!isValidIsoDate(expiryDate)) {
    fields.push({
      field: "insurance.expiryDate",
      message: "Insurance expiry date must be a valid date (YYYY-MM-DD).",
    });
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  return {
    valid: true,
    payload: {
      providerName,
      policyNumber,
      expiryDate,
      notes: notes || undefined,
    },
  };
}

export type NormalizedCreatePatientPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: PatientGender;
  bloodGroup?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance?: CreatePatientInsurancePayload;
};

export type CreatePatientValidationResult =
  | { valid: true; payload: NormalizedCreatePatientPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: PatientValidationFieldError[] };

export function validateCreatePatient(payload: unknown): CreatePatientValidationResult {
  const fields: PatientValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreatePatientPayload;
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim() ?? "";
  const dateOfBirth = body.dateOfBirth?.trim() ?? "";
  const gender = body.gender;
  const bloodGroup = body.bloodGroup?.trim();
  const addressLine1 = body.addressLine1?.trim() ?? "";
  const addressLine2 = body.addressLine2?.trim();
  const city = body.city?.trim() ?? "";
  const state = body.state?.trim() ?? "";
  const postalCode = body.postalCode?.trim() ?? "";
  const country = body.country?.trim() ?? "";
  const emergencyContactName = body.emergencyContactName?.trim() ?? "";
  const emergencyContactPhone = body.emergencyContactPhone?.trim() ?? "";

  if (!firstName) {
    fields.push({ field: "firstName", message: "First name is required." });
  } else if (firstName.length < 2) {
    fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
  }

  if (!lastName) {
    fields.push({ field: "lastName", message: "Last name is required." });
  } else if (lastName.length < 2) {
    fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
  }

  if (!phone) {
    fields.push({ field: "phone", message: "Phone is required." });
  } else if (!PHONE_REGEX.test(phone.replace(/[\s()-]/g, ""))) {
    fields.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (email && !EMAIL_REGEX.test(email)) {
    fields.push({ field: "email", message: "Enter a valid email address." });
  }

  if (!dateOfBirth) {
    fields.push({ field: "dateOfBirth", message: "Date of birth is required." });
  } else if (!isValidIsoDate(dateOfBirth)) {
    fields.push({ field: "dateOfBirth", message: "Date of birth must be a valid date (YYYY-MM-DD)." });
  }

  if (!gender) {
    fields.push({ field: "gender", message: "Gender is required." });
  } else if (!PATIENT_GENDERS.includes(gender)) {
    fields.push({ field: "gender", message: "Gender must be a valid value." });
  }

  if (!addressLine1) {
    fields.push({ field: "addressLine1", message: "Address line 1 is required." });
  }

  if (!city) {
    fields.push({ field: "city", message: "City is required." });
  }

  if (!state) {
    fields.push({ field: "state", message: "State is required." });
  }

  if (!postalCode) {
    fields.push({ field: "postalCode", message: "Postal code is required." });
  }

  if (!country) {
    fields.push({ field: "country", message: "Country is required." });
  }

  if (!emergencyContactName) {
    fields.push({ field: "emergencyContactName", message: "Emergency contact name is required." });
  }

  if (!emergencyContactPhone) {
    fields.push({ field: "emergencyContactPhone", message: "Emergency contact phone is required." });
  } else if (!PHONE_REGEX.test(emergencyContactPhone.replace(/[\s()-]/g, ""))) {
    fields.push({
      field: "emergencyContactPhone",
      message: "Enter a valid emergency contact phone number.",
    });
  }

  let insurance: CreatePatientInsurancePayload | undefined;
  if (body.insurance !== undefined && body.insurance !== null) {
    const insuranceResult = validateInsurance(body.insurance);
    if (!insuranceResult.valid) {
      fields.push(...insuranceResult.fields);
    } else {
      insurance = insuranceResult.payload;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      firstName,
      lastName,
      email: email || undefined,
      phone,
      dateOfBirth,
      gender: gender as PatientGender,
      bloodGroup: bloodGroup || undefined,
      addressLine1,
      addressLine2: addressLine2 || undefined,
      city,
      state,
      postalCode,
      country,
      emergencyContactName,
      emergencyContactPhone,
      insurance,
    },
  };
}

export type NormalizedUpdatePatientPayload = {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phone?: string;
  dateOfBirth?: string;
  gender?: PatientGender;
  bloodGroup?: string | null;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  insurance?: CreatePatientInsurancePayload;
};

export type UpdatePatientValidationResult =
  | { valid: true; payload: NormalizedUpdatePatientPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: PatientValidationFieldError[] };

export function validateUpdatePatient(payload: unknown): UpdatePatientValidationResult {
  const fields: PatientValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdatePatientPayload;
  const normalized: NormalizedUpdatePatientPayload = {};

  if (body.firstName !== undefined) {
    const firstName = body.firstName.trim();
    if (!firstName) {
      fields.push({ field: "firstName", message: "First name is required." });
    } else if (firstName.length < 2) {
      fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
    } else {
      normalized.firstName = firstName;
    }
  }

  if (body.lastName !== undefined) {
    const lastName = body.lastName.trim();
    if (!lastName) {
      fields.push({ field: "lastName", message: "Last name is required." });
    } else if (lastName.length < 2) {
      fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
    } else {
      normalized.lastName = lastName;
    }
  }

  if (body.phone !== undefined) {
    const phone = body.phone.trim();
    if (!phone) {
      fields.push({ field: "phone", message: "Phone is required." });
    } else if (!PHONE_REGEX.test(phone.replace(/[\s()-]/g, ""))) {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    } else {
      normalized.phone = phone;
    }
  }

  if (body.email !== undefined) {
    const email = body.email.trim().toLowerCase();
    if (!email) {
      normalized.email = null;
    } else if (!EMAIL_REGEX.test(email)) {
      fields.push({ field: "email", message: "Enter a valid email address." });
    } else {
      normalized.email = email;
    }
  }

  if (body.dateOfBirth !== undefined) {
    const dateOfBirth = body.dateOfBirth.trim();
    if (!dateOfBirth) {
      fields.push({ field: "dateOfBirth", message: "Date of birth is required." });
    } else if (!isValidIsoDate(dateOfBirth)) {
      fields.push({
        field: "dateOfBirth",
        message: "Date of birth must be a valid date (YYYY-MM-DD).",
      });
    } else {
      normalized.dateOfBirth = dateOfBirth;
    }
  }

  if (body.gender !== undefined) {
    if (!PATIENT_GENDERS.includes(body.gender)) {
      fields.push({ field: "gender", message: "Gender must be a valid value." });
    } else {
      normalized.gender = body.gender;
    }
  }

  if (body.bloodGroup !== undefined) {
    const bloodGroup = body.bloodGroup.trim();
    normalized.bloodGroup = bloodGroup || null;
  }

  if (body.addressLine1 !== undefined) {
    const addressLine1 = body.addressLine1.trim();
    if (!addressLine1) {
      fields.push({ field: "addressLine1", message: "Address line 1 is required." });
    } else {
      normalized.addressLine1 = addressLine1;
    }
  }

  if (body.addressLine2 !== undefined) {
    const addressLine2 = body.addressLine2.trim();
    normalized.addressLine2 = addressLine2 || null;
  }

  if (body.city !== undefined) {
    const city = body.city.trim();
    if (!city) {
      fields.push({ field: "city", message: "City is required." });
    } else {
      normalized.city = city;
    }
  }

  if (body.state !== undefined) {
    const state = body.state.trim();
    if (!state) {
      fields.push({ field: "state", message: "State is required." });
    } else {
      normalized.state = state;
    }
  }

  if (body.postalCode !== undefined) {
    const postalCode = body.postalCode.trim();
    if (!postalCode) {
      fields.push({ field: "postalCode", message: "Postal code is required." });
    } else {
      normalized.postalCode = postalCode;
    }
  }

  if (body.country !== undefined) {
    const country = body.country.trim();
    if (!country) {
      fields.push({ field: "country", message: "Country is required." });
    } else {
      normalized.country = country;
    }
  }

  if (body.emergencyContactName !== undefined) {
    const emergencyContactName = body.emergencyContactName.trim();
    if (!emergencyContactName) {
      fields.push({
        field: "emergencyContactName",
        message: "Emergency contact name is required.",
      });
    } else {
      normalized.emergencyContactName = emergencyContactName;
    }
  }

  if (body.emergencyContactPhone !== undefined) {
    const emergencyContactPhone = body.emergencyContactPhone.trim();
    if (!emergencyContactPhone) {
      fields.push({
        field: "emergencyContactPhone",
        message: "Emergency contact phone is required.",
      });
    } else if (!PHONE_REGEX.test(emergencyContactPhone.replace(/[\s()-]/g, ""))) {
      fields.push({
        field: "emergencyContactPhone",
        message: "Enter a valid emergency contact phone number.",
      });
    } else {
      normalized.emergencyContactPhone = emergencyContactPhone;
    }
  }

  if (body.insurance !== undefined && body.insurance !== null) {
    const insuranceResult = validateInsurance(body.insurance);
    if (!insuranceResult.valid) {
      fields.push(...insuranceResult.fields);
    } else {
      normalized.insurance = insuranceResult.payload;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  if (Object.keys(normalized).length === 0) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: normalized };
}

export type ListPatientsQuery = {
  page: number;
  limit: number;
  search?: string;
  gender?: PatientGender;
  status?: PatientStatus;
  dobStart?: string;
  dobEnd?: string;
  sortBy: ListPatientSortField;
  sortOrder: "asc" | "desc";
};

export type ListPatientsQueryResult =
  | { valid: true; payload: ListPatientsQuery }
  | { valid: false; error: "INVALID_PAGINATION" | "INVALID_FILTER" };

function readListQueryString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseListPositiveInt(value: unknown, fallback: number, required = false): number | null {
  if (value === undefined || value === null || value === "") {
    return required ? null : fallback;
  }

  const raw = readListQueryString(value);
  if (raw === undefined || raw === "") {
    return required ? null : fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function parseListPatientsQuery(query: unknown): ListPatientsQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const body = query as Record<string, unknown>;
  const hasPage = "page" in body && body.page !== undefined && body.page !== "";
  const hasLimit = "limit" in body && body.limit !== undefined && body.limit !== "";

  const page = parseListPositiveInt(body.page, 1, hasPage);
  if (page === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const limit = parseListPositiveInt(body.limit, 20, hasLimit);
  if (limit === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const safeLimit = Math.min(limit, 200);
  const searchRaw = readListQueryString(body.search)?.trim();
  const search = searchRaw ? searchRaw : undefined;

  let gender: PatientGender | undefined;
  const genderRaw = readListQueryString(body.gender)?.trim().toUpperCase();
  if (genderRaw) {
    if (!PATIENT_GENDERS.includes(genderRaw as PatientGender)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    gender = genderRaw as PatientGender;
  }

  let status: PatientStatus | undefined;
  const statusRaw = readListQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!PATIENT_STATUSES.includes(statusRaw as PatientStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as PatientStatus;
  }

  const dobStartRaw = readListQueryString(body.dobStart)?.trim();
  const dobEndRaw = readListQueryString(body.dobEnd)?.trim();
  if (dobStartRaw && !isValidIsoDate(dobStartRaw)) {
    return { valid: false, error: "INVALID_FILTER" };
  }
  if (dobEndRaw && !isValidIsoDate(dobEndRaw)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const sortByRaw = readListQueryString(body.sortBy)?.trim();
  let sortBy: ListPatientSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_PATIENT_SORT_FIELDS.includes(sortByRaw as ListPatientSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListPatientSortField;
  }

  const sortOrderRaw = readListQueryString(body.sortOrder)?.trim().toLowerCase();
  let sortOrder: "asc" | "desc" = "desc";
  if (sortOrderRaw) {
    if (sortOrderRaw !== "asc" && sortOrderRaw !== "desc") {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortOrder = sortOrderRaw;
  }

  return {
    valid: true,
    payload: {
      page,
      limit: safeLimit,
      search,
      gender,
      status,
      dobStart: dobStartRaw,
      dobEnd: dobEndRaw,
      sortBy,
      sortOrder,
    },
  };
}
