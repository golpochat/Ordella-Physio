import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";

type EventVersionProps = {
  major: number;
  minor: number;
};

export class EventVersion extends ValueObject<EventVersionProps> {
  private constructor(props: EventVersionProps) {
    super(props);
  }

  get major(): number {
    return this.props.major;
  }

  get minor(): number {
    return this.props.minor;
  }

  toString(): string {
    return `${this.major}.${this.minor}`;
  }

  static create(major: number, minor = 0): Result<EventVersion> {
    if (!Number.isInteger(major) || major < 1) {
      return fail("Event version major must be a positive integer");
    }

    if (!Number.isInteger(minor) || minor < 0) {
      return fail("Event version minor must be a non-negative integer");
    }

    return ok(new EventVersion({ major, minor }));
  }
}
