import { ERROR_CODES, HttpError } from "@ordella/errors";

export function missingFieldsError(message = "Email and password are required.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.MISSING_FIELDS,
    message,
  });
}

export function invalidCredentialsError(message = "Email or password is incorrect.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.INVALID_CREDENTIALS,
    message,
  });
}

export function userDisabledError(message = "This account has been disabled.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.USER_DISABLED,
    message,
  });
}

export function invalidTokenError(message = "Your session has expired. Please log in again.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.INVALID_TOKEN,
    message,
  });
}
