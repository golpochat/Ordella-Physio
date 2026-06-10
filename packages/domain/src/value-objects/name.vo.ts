import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";

type NameProps = {
  firstName: string;
  lastName: string;
};

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  static create(firstName: string, lastName: string): Result<Name> {
    const normalizedFirst = firstName.trim();
    const normalizedLast = lastName.trim();

    if (!normalizedFirst || !normalizedLast) {
      return fail("First name and last name are required");
    }

    return ok(
      new Name({
        firstName: normalizedFirst,
        lastName: normalizedLast,
      }),
    );
  }
}
