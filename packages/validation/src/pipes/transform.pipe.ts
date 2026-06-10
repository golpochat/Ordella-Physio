import { type ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { normalizeString } from "../utils/normalize";
import { parseBoolean, parseDate, parseNumber } from "../utils/parse";

export type TransformPipeOptions = {
  trimStrings?: boolean;
  coerceNumbers?: boolean;
  coerceBooleans?: boolean;
  coerceDates?: boolean;
};

const DEFAULT_OPTIONS: TransformPipeOptions = {
  trimStrings: true,
  coerceNumbers: true,
  coerceBooleans: true,
  coerceDates: true,
};

function transformValue(value: unknown, options: TransformPipeOptions): unknown {
  if (typeof value === "string") {
    let next = options.trimStrings ? normalizeString(value) : value;

    if (options.coerceBooleans) {
      const bool = parseBoolean(next);
      if (bool !== undefined) {
        return bool;
      }
    }

    if (options.coerceNumbers) {
      const number = parseNumber(next);
      if (number !== undefined && /^-?\d+(?:\.\d+)?$/.test(next)) {
        return number;
      }
    }

    if (options.coerceDates) {
      const date = parseDate(next);
      if (date !== undefined && !/^-?\d+(?:\.\d+)?$/.test(next)) {
        return date.toISOString();
      }
    }

    return next;
  }

  if (Array.isArray(value)) {
    return value.map((item) => transformValue(item, options));
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        transformValue(entry, options),
      ]),
    );
  }

  return value;
}

@Injectable()
export class TransformPipe implements PipeTransform {
  constructor(private readonly options: TransformPipeOptions = DEFAULT_OPTIONS) {}

  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    return transformValue(value, { ...DEFAULT_OPTIONS, ...this.options });
  }
}

export function createTransformPipe(options?: TransformPipeOptions): TransformPipe {
  return new TransformPipe(options);
}
