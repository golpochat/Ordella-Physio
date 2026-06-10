import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";
import { CUID_REGEX, UUID_REGEX } from "../utils/patterns";

type EntityIdProps = {
  value: string;
};

export class EntityId extends ValueObject<EntityIdProps> {
  private constructor(props: EntityIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(raw: string): Result<EntityId> {
    const normalized = raw.trim();

    if (!UUID_REGEX.test(normalized) && !CUID_REGEX.test(normalized)) {
      return fail("Invalid id format (expected UUID or CUID)");
    }

    return ok(new EntityId({ value: normalized }));
  }
}
