import { type ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import type { ZodTypeAny } from "zod";
import type { ZodSchemaSource } from "../decorators/metadata";

export type ZodValidationPipeOptions = {
  stripUnknown?: boolean;
  source?: ZodSchemaSource;
};

function resolveMetadataType(source: ZodSchemaSource): ArgumentMetadata["type"] {
  if (source === "query") {
    return "query";
  }

  if (source === "params") {
    return "param";
  }

  return "body";
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: ZodTypeAny,
    private readonly options: ZodValidationPipeOptions = {},
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const source = this.options.source ?? "body";
    if (metadata.type !== resolveMetadataType(source)) {
      return value;
    }

    if (this.options.stripUnknown && "strip" in this.schema && typeof this.schema.strip === "function") {
      return (this.schema as ZodTypeAny & { strip: () => ZodTypeAny }).strip().parse(value);
    }

    return this.schema.parse(value);
  }
}

export function createZodValidationPipe(
  schema: ZodTypeAny,
  options?: ZodValidationPipeOptions,
): ZodValidationPipe {
  return new ZodValidationPipe(schema, options);
}
