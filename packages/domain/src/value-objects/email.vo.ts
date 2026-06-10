import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";
import { EMAIL_REGEX } from "../utils/patterns";

type EmailProps = {
  value: string;
};

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(raw: string): Result<Email> {
    const normalized = raw.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalized)) {
      return fail("Invalid email address");
    }

    return ok(new Email({ value: normalized }));
  }
}
