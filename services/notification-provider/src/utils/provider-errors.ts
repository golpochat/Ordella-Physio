import { ERROR_CODES, HttpError } from "@ordella/errors";



export function providerValidationError(fields: Array<{ field: string; message: string }>) {

  return new HttpError({

    statusCode: 400,

    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,

    message: "Validation failed.",

    metadata: { error: "VALIDATION_ERROR", fields },

  });

}



export function providerForbiddenError(

  message = "You do not have permission to send notifications.",

) {

  return new HttpError({

    statusCode: 403,

    code: ERROR_CODES.AUTH.FORBIDDEN,

    message,

    metadata: { error: "FORBIDDEN" },

  });

}



export function noProviderConfiguredError(

  message = "No provider configured for this channel.",

) {

  return new HttpError({

    statusCode: 404,

    code: ERROR_CODES.NOTIFICATION_PROVIDER.NO_PROVIDER_CONFIGURED,

    message,

    metadata: { error: "NO_PROVIDER_CONFIGURED" },

  });

}



export function providerDeliveryFailedError(

  message = "All providers failed to deliver the message.",

) {

  return new HttpError({

    statusCode: 502,

    code: ERROR_CODES.NOTIFICATION_PROVIDER.DELIVERY_FAILED,

    message,

    metadata: { error: "PROVIDER_DELIVERY_FAILED" },

  });

}



export function rateLimitExceededError(
  message = "Rate limit exceeded for this channel.",
) {
  return new HttpError({
    statusCode: 429,
    code: ERROR_CODES.NOTIFICATION_PROVIDER.RATE_LIMIT_EXCEEDED,
    message,
    metadata: { error: "RATE_LIMIT_EXCEEDED" },
  });
}

export function deliveryLogNotFoundError(message = "Delivery log not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { error: "NOT_FOUND" },
  });
}

export function invalidPaginationError(message = "Page and limit must be positive numbers.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
    metadata: { error: "INVALID_PAGINATION" },
  });
}

export function providerNotFoundError(message = "Provider configuration not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { error: "NOT_FOUND" },
  });
}

export function queueError(message = "Failed to enqueue notification.") {
  return new HttpError({
    statusCode: 503,
    code: ERROR_CODES.NOTIFICATION_PROVIDER.QUEUE_ERROR,
    message,
    metadata: { error: "QUEUE_ERROR" },
  });
}

export function invalidAnalyticsQueryError(
  message = "The analytics query parameters are invalid.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.NOTIFICATION_PROVIDER.INVALID_ANALYTICS_QUERY,
    message,
    metadata: { error: "INVALID_ANALYTICS_QUERY" },
  });
}
