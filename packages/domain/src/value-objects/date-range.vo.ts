import { fail, ok, type Result } from "../core/result";
import { ValueObject } from "../core/value-object";

type DateRangeProps = {
  start: Date;
  end: Date;
};

export class DateRange extends ValueObject<DateRangeProps> {
  private constructor(props: DateRangeProps) {
    super(props);
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }

  static create(start: Date, end: Date): Result<DateRange> {
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return fail("Invalid date range");
    }

    if (start > end) {
      return fail("Start date must be before or equal to end date");
    }

    return ok(new DateRange({ start, end }));
  }

  contains(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }

  durationMs(): number {
    return this.end.getTime() - this.start.getTime();
  }
}
