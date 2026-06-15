export class TooManyRequestsError extends Error {
  readonly statusCode = 429;
  readonly code = "TOO_MANY_REQUESTS";

  constructor(
    message = "Too many requests",
    readonly retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "TooManyRequestsError";
  }
}

export class AccountLockedError extends Error {
  readonly statusCode = 423;
  readonly code = "ACCOUNT_LOCKED";

  constructor(
    message = "Account temporarily locked due to failed login attempts",
    readonly retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "AccountLockedError";
  }
}
