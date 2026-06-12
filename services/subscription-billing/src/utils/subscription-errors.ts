import { ERROR_CODES, HttpError } from "@ordella/errors";

export function subscriptionValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function planNotFoundError(message = "The selected plan does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.PLAN_NOT_FOUND,
    message,
    metadata: { error: "PLAN_NOT_FOUND" },
  });
}

export function stripeError(message = "Stripe operation failed.") {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.STRIPE_ERROR,
    message,
    metadata: { error: "STRIPE_ERROR" },
  });
}

export function subscriptionNotFoundError(message = "Tenant has no active subscription.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.SUBSCRIPTION_NOT_FOUND,
    message,
    metadata: { error: "SUBSCRIPTION_NOT_FOUND" },
  });
}

export function subscriptionForbiddenError(message = "You do not have permission to manage billing.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}

export function subscriptionInactiveError(message = "Your subscription is inactive.") {
  return new HttpError({
    statusCode: 402,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.SUBSCRIPTION_INACTIVE,
    message,
    metadata: { error: "SUBSCRIPTION_INACTIVE" },
  });
}

export function seatLimitExceededError(message = "You have reached your staff limit.") {
  return new HttpError({
    statusCode: 402,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.SEAT_LIMIT_EXCEEDED,
    message,
    metadata: { error: "SEAT_LIMIT_EXCEEDED" },
  });
}

export function featureNotAvailableError(message = "This feature is not available on your plan.") {
  return new HttpError({
    statusCode: 402,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.FEATURE_NOT_AVAILABLE,
    message,
    metadata: { error: "FEATURE_NOT_AVAILABLE" },
  });
}

export function usageLimitExceededError(message = "You have exceeded your plan limits.") {
  return new HttpError({
    statusCode: 402,
    code: ERROR_CODES.SUBSCRIPTION_BILLING.USAGE_LIMIT_EXCEEDED,
    message,
    metadata: { error: "USAGE_LIMIT_EXCEEDED" },
  });
}
