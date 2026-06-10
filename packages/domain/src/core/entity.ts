import { ValueObject } from "./value-object";

export type EntityProps = {
  id: string;
};

export abstract class Entity<T extends EntityProps> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze({ ...props });
  }

  get id(): string {
    return this.props.id;
  }

  equals(other?: Entity<T> | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Entity)) {
      return false;
    }

    return this.id === other.id;
  }

  toObject(): T {
    return { ...this.props };
  }

  protected static serializeValue(value: unknown): unknown {
    if (value instanceof ValueObject) {
      return value.toObject();
    }

    if (value instanceof Entity) {
      return value.toObject();
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (Array.isArray(value)) {
      return value.map((item) => Entity.serializeValue(item));
    }

    if (value !== null && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
          key,
          Entity.serializeValue(entry),
        ]),
      );
    }

    return value;
  }
}
