export type Result<T, E = string> = Success<T, E> | Failure<T, E>;

export class Success<T, E = string> {
  readonly isSuccess = true as const;
  readonly isFailure = false as const;

  constructor(public readonly value: T) {}

  get error(): undefined {
    return undefined;
  }
}

export class Failure<T, E = string> {
  readonly isSuccess = false as const;
  readonly isFailure = true as const;

  constructor(public readonly error: E) {}

  get value(): undefined {
    return undefined;
  }
}

export function ok<T, E = string>(value: T): Result<T, E> {
  return new Success(value);
}

export function fail<T, E = string>(error: E): Result<T, E> {
  return new Failure(error);
}

export function combineResults<T, E = string>(results: Result<unknown, E>[]): Result<T[], E> {
  const values: unknown[] = [];

  for (const result of results) {
    if (result.isFailure) {
      return fail(result.error);
    }
    values.push(result.value);
  }

  return ok(values as T[]);
}
