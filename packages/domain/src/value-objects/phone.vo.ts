import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";
import { PHONE_REGEX } from "../utils/patterns";

type PhoneProps = {
  value: string;
};

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(raw: string): Result<Phone> {
    const normalized = raw.replace(/[\s()-]/g, "");

    if (!PHONE_REGEX.test(normalized)) {
      return fail("Invalid phone number");
    }

    return ok(new Phone({ value: normalized.startsWith("+") ? normalized : `+${normalized}` }));
  }
}
