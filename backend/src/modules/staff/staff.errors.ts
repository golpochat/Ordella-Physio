import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "../../utils/api-error";

export class StaffNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Staff member not found: ${id}` : "Staff member not found");
    this.name = "StaffNotFoundError";
  }
}

export class StaffAccessError extends ForbiddenError {
  constructor(message = "Insufficient access to staff resource") {
    super(message);
    this.name = "StaffAccessError";
  }
}

export class StaffConflictError extends ConflictError {
  constructor(message: string) {
    super(message);
    this.name = "StaffConflictError";
  }
}

export class StaffRoleAssignmentError extends ValidationError {
  constructor(message: string) {
    super(message);
    this.name = "StaffRoleAssignmentError";
  }
}
