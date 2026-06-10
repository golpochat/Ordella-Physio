export class Guard {
  static againstNullOrUndefined(value: unknown, argumentName: string): asserts value {
    if (value === null || value === undefined) {
      throw new Error(`${argumentName} is null or undefined`);
    }
  }

  static againstEmptyString(value: string, argumentName: string): asserts value is string {
    Guard.againstNullOrUndefined(value, argumentName);
    if (value.trim().length === 0) {
      throw new Error(`${argumentName} is empty`);
    }
  }

  static againstInvalidProps(
    condition: boolean,
    message: string,
  ): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }
}
