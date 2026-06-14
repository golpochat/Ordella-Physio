import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "../../utils/api-error";

export class TherapistNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Therapist not found: ${id}` : "Therapist not found");
    this.name = "TherapistNotFoundError";
  }
}

export class TherapistAccessError extends ForbiddenError {
  constructor(message = "Insufficient access to therapist resource") {
    super(message);
    this.name = "TherapistAccessError";
  }
}

export class TherapistConflictError extends ConflictError {
  constructor(message: string) {
    super(message);
    this.name = "TherapistConflictError";
  }
}

export class TherapistScheduleError extends ValidationError {
  constructor(message: string) {
    super(message);
    this.name = "TherapistScheduleError";
  }
}

export class BlockedSlotNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Blocked slot not found: ${id}` : "Blocked slot not found");
    this.name = "BlockedSlotNotFoundError";
  }
}
