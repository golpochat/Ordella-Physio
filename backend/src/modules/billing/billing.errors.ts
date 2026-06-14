import { ConflictError, NotFoundError, ValidationError } from "../../utils/api-error";

export class InvoiceNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Invoice not found: ${id}` : "Invoice not found");
    this.name = "InvoiceNotFoundError";
  }
}

export class InvoiceConflictError extends ConflictError {
  constructor(message: string) {
    super(message);
    this.name = "InvoiceConflictError";
  }
}

export class InvoiceStateError extends ValidationError {
  constructor(message: string) {
    super(message);
    this.name = "InvoiceStateError";
  }
}
