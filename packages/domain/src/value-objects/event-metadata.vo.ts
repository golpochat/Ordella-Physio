import { ValueObject } from "../core/value-object";

type EventMetadataProps = {
  correlationId?: string;
  causationId?: string;
  tenantId: string;
  timestamp: string;
  version: number;
};

export class EventMetadata extends ValueObject<EventMetadataProps> {
  private constructor(props: EventMetadataProps) {
    super(props);
  }

  get correlationId(): string | undefined {
    return this.props.correlationId;
  }

  get causationId(): string | undefined {
    return this.props.causationId;
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get timestamp(): string {
    return this.props.timestamp;
  }

  get version(): number {
    return this.props.version;
  }

  static create(input: EventMetadataProps): EventMetadata {
    return new EventMetadata(input);
  }
}
