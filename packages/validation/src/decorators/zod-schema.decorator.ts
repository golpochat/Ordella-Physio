import { applyDecorators, SetMetadata, UsePipes } from "@nestjs/common";
import type { ZodTypeAny } from "zod";
import { createZodValidationPipe } from "../pipes/zod-validation.pipe";
import { ZOD_SCHEMA_KEY, ZOD_SCHEMA_SOURCE_KEY, type ZodSchemaSource } from "./metadata";

export const ZodSchema = (schema: ZodTypeAny, source: ZodSchemaSource = "body") =>
  applyDecorators(
    SetMetadata(ZOD_SCHEMA_KEY, schema),
    SetMetadata(ZOD_SCHEMA_SOURCE_KEY, source),
  );

export const UseZodValidation = (schema: ZodTypeAny, source: ZodSchemaSource = "body") =>
  applyDecorators(ZodSchema(schema, source), UsePipes(createZodValidationPipe(schema, { source })));

export { ZOD_SCHEMA_KEY, ZOD_SCHEMA_SOURCE_KEY, type ZodSchemaSource } from "./metadata";
