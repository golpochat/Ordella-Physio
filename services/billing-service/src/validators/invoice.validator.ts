export type InvoiceValidationFieldError = {
  field: string;
  message: string;
};

export type CreateInvoiceItemPayload = {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  taxRate?: number;
  discountAmount?: number;
};

export type CreateInvoicePayload = {
  patientId?: string;
  staffId?: string;
  appointmentId?: string;
  items?: CreateInvoiceItemPayload[];
  notes?: string;
};

export type UpdateInvoiceItemPayload = CreateInvoiceItemPayload & {
  id?: string;
};

export type UpdateInvoicePayload = {
  patientId?: string;
  staffId?: string | null;
  appointmentId?: string | null;
  status?: "DRAFT" | "ISSUED" | "PAID" | "VOID" | "VOIDED";
  notes?: string;
  items?: UpdateInvoiceItemPayload[];
};

export type InvoiceValidationResult =
  | { valid: true; data: Required<Pick<CreateInvoicePayload, "patientId">> & CreateInvoicePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: InvoiceValidationFieldError[] };

export type UpdateInvoiceValidationResult =
  | { valid: true; data: UpdateInvoicePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: InvoiceValidationFieldError[] };

function pushField(
  fields: InvoiceValidationFieldError[],
  field: string,
  message: string,
): void {
  fields.push({ field, message });
}

export function validateCreateInvoice(payload: CreateInvoicePayload): InvoiceValidationResult {
  const fields: InvoiceValidationFieldError[] = [];

  if (!payload.patientId?.trim()) {
    pushField(fields, "patientId", "Patient is required.");
  }

  if (!payload.items || payload.items.length === 0) {
    pushField(fields, "items", "At least one invoice item is required.");
  } else {
    payload.items.forEach((item, index) => {
      const prefix = `items.${index}`;

      if (!item.description?.trim()) {
        pushField(fields, `${prefix}.description`, "Description is required.");
      }

      if (item.quantity === undefined || item.quantity === null) {
        pushField(fields, `${prefix}.quantity`, "Quantity is required.");
      } else if (item.quantity <= 0) {
        pushField(fields, `${prefix}.quantity`, "Quantity must be greater than 0.");
      }

      if (item.unitPrice === undefined || item.unitPrice === null) {
        pushField(fields, `${prefix}.unitPrice`, "Unit price is required.");
      } else if (item.unitPrice < 0) {
        pushField(fields, `${prefix}.unitPrice`, "Unit price must be at least 0.");
      }

      if (item.taxRate === undefined || item.taxRate === null) {
        pushField(fields, `${prefix}.taxRate`, "Tax rate is required.");
      } else if (item.taxRate < 0) {
        pushField(fields, `${prefix}.taxRate`, "Tax rate must be at least 0.");
      }

      if (item.discountAmount !== undefined && item.discountAmount < 0) {
        pushField(fields, `${prefix}.discountAmount`, "Discount amount must be at least 0.");
      }
    });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    data: payload as Required<Pick<CreateInvoicePayload, "patientId">> & CreateInvoicePayload,
  };
}

function validateInvoiceItems(
  items: UpdateInvoiceItemPayload[],
  fields: InvoiceValidationFieldError[],
): void {
  items.forEach((item, index) => {
    const prefix = `items.${index}`;

    if (!item.description?.trim()) {
      pushField(fields, `${prefix}.description`, "Description is required.");
    }

    if (item.quantity === undefined || item.quantity === null) {
      pushField(fields, `${prefix}.quantity`, "Quantity is required.");
    } else if (item.quantity <= 0) {
      pushField(fields, `${prefix}.quantity`, "Quantity must be greater than 0.");
    }

    if (item.unitPrice === undefined || item.unitPrice === null) {
      pushField(fields, `${prefix}.unitPrice`, "Unit price is required.");
    } else if (item.unitPrice < 0) {
      pushField(fields, `${prefix}.unitPrice`, "Unit price must be at least 0.");
    }

    if (item.taxRate === undefined || item.taxRate === null) {
      pushField(fields, `${prefix}.taxRate`, "Tax rate is required.");
    } else if (item.taxRate < 0) {
      pushField(fields, `${prefix}.taxRate`, "Tax rate must be at least 0.");
    }

    if (item.discountAmount !== undefined && item.discountAmount < 0) {
      pushField(fields, `${prefix}.discountAmount`, "Discount amount must be at least 0.");
    }
  });
}

const INVOICE_STATUSES = ["DRAFT", "ISSUED", "PAID", "VOIDED"] as const;
const INVOICE_SORT_FIELDS = [
  "createdAt",
  "invoiceNumber",
  "status",
  "subtotal",
  "total",
] as const;

export type ListInvoiceStatus = (typeof INVOICE_STATUSES)[number];
export type ListInvoiceSortField = (typeof INVOICE_SORT_FIELDS)[number];

export type ListInvoicesQuery = {
  page: number;
  limit: number;
  search?: string;
  patientId?: string;
  staffId?: string;
  status?: ListInvoiceStatus;
  dateStart?: string;
  dateEnd?: string;
  minTotal?: number;
  maxTotal?: number;
  sortBy: ListInvoiceSortField;
  sortOrder: "asc" | "desc";
};

export type ListInvoicesQueryResult =
  | { valid: true; payload: ListInvoicesQuery }
  | { valid: false; error: "INVALID_PAGINATION" }
  | { valid: false; error: "INVALID_FILTER" };

function readQueryString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function parsePositiveInt(value: unknown, fallback: number, required = false): number | null {
  if (value === undefined || value === null || value === "") {
    return required ? null : fallback;
  }

  const raw = readQueryString(value);
  if (raw === undefined || raw === "") {
    return required ? null : fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function parseNonNegativeNumber(value: unknown): number | null | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const raw = readQueryString(value);
  if (raw === undefined || raw === "") {
    return undefined;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function isValidDateString(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

export function parseListInvoicesQuery(query: unknown): ListInvoicesQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const body = query as Record<string, unknown>;
  const hasPage = "page" in body && body.page !== undefined && body.page !== "";
  const hasLimit = "limit" in body && body.limit !== undefined && body.limit !== "";

  const page = parsePositiveInt(body.page, 1, hasPage);
  if (page === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const limit = parsePositiveInt(body.limit, 20, hasLimit);
  if (limit === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const searchRaw = readQueryString(body.search)?.trim();
  const search = searchRaw || undefined;

  const patientId = readQueryString(body.patientId)?.trim() || undefined;
  const staffId = readQueryString(body.staffId)?.trim() || undefined;

  let status: ListInvoiceStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    const normalizedStatus = statusRaw === "VOID" ? "VOIDED" : statusRaw;
    if (!INVOICE_STATUSES.includes(normalizedStatus as ListInvoiceStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = normalizedStatus as ListInvoiceStatus;
  }

  const dateStart = readQueryString(body.dateStart)?.trim() || undefined;
  if (dateStart && !isValidDateString(dateStart)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const dateEnd = readQueryString(body.dateEnd)?.trim() || undefined;
  if (dateEnd && !isValidDateString(dateEnd)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const minTotal = parseNonNegativeNumber(body.minTotal);
  if (minTotal === null) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const maxTotal = parseNonNegativeNumber(body.maxTotal);
  if (maxTotal === null) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  if (minTotal !== undefined && maxTotal !== undefined && minTotal > maxTotal) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  let sortBy: ListInvoiceSortField = "createdAt";
  const sortByRaw = readQueryString(body.sortBy)?.trim();
  if (sortByRaw) {
    if (!INVOICE_SORT_FIELDS.includes(sortByRaw as ListInvoiceSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListInvoiceSortField;
  }

  let sortOrder: "asc" | "desc" = "desc";
  const sortOrderRaw = readQueryString(body.sortOrder)?.trim().toLowerCase();
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
      limit,
      search,
      patientId,
      staffId,
      status,
      dateStart,
      dateEnd,
      minTotal,
      maxTotal,
      sortBy,
      sortOrder,
    },
  };
}

export function validateUpdateInvoice(payload: UpdateInvoicePayload): UpdateInvoiceValidationResult {
  const fields: InvoiceValidationFieldError[] = [];

  if (payload.status && !["DRAFT", "ISSUED"].includes(payload.status)) {
    pushField(fields, "status", "Only draft or issued status can be set during update.");
  }

  if (payload.items !== undefined) {
    if (payload.items.length === 0) {
      pushField(fields, "items", "At least one invoice item is required.");
    } else {
      validateInvoiceItems(payload.items, fields);
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, data: payload };
}
