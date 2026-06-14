import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "../../utils/api-error";

export class AppointmentNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super(id ? `Appointment not found: ${id}` : "Appointment not found");
    this.name = "AppointmentNotFoundError";
  }
}

export class AppointmentConflictError extends ConflictError {
  constructor(message: string, readonly details?: unknown) {
    super(message);
    this.name = "AppointmentConflictError";
  }
}

export class AppointmentScheduleError extends ValidationError {
  constructor(message: string) {
    super(message);
    this.name = "AppointmentScheduleError";
  }
}

export class AppointmentStatusTransitionError extends ValidationError {
  constructor(from: string, to: string) {
    super(`Invalid status transition from ${from} to ${to}`);
    this.name = "AppointmentStatusTransitionError";
  }
}

export class AppointmentAccessError extends ForbiddenError {
  constructor(message = "You can only manage your own appointments") {
    super(message);
    this.name = "AppointmentAccessError";
  }
}

export class AppointmentTerminalStateError extends ValidationError {
  constructor(status: string) {
    super(`Appointment in ${status} status cannot be modified`);
    this.name = "AppointmentTerminalStateError";
  }
}
