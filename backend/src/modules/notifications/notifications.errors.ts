import { ApiError } from "../../utils/api-error";

export class NotificationRecipientRequiredError extends ApiError {
  constructor(message = "Recipient email address is required") {
    super(message, 422, "NOTIFICATION_RECIPIENT_REQUIRED");
  }
}

export class NotificationContextError extends ApiError {
  constructor(message: string) {
    super(message, 422, "NOTIFICATION_CONTEXT_ERROR");
  }
}
