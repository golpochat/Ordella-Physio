import { ConflictError, NotFoundError, ValidationError } from "../../utils/api-error";

export class PatientNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Patient not found: ${id}` : "Patient not found");
    this.name = "PatientNotFoundError";
  }
}

export class PatientEmailConflictError extends ConflictError {
  constructor(email: string) {
    super(`A patient with email ${email} already exists in this clinic`);
    this.name = "PatientEmailConflictError";
  }
}

export class PatientInactiveError extends ValidationError {
  constructor() {
    super("Patient record is inactive");
    this.name = "PatientInactiveError";
  }
}
