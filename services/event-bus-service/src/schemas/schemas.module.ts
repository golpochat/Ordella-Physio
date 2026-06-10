import { Global, Module } from "@nestjs/common";
import { SchemaRegistry } from "@/schemas/schema.registry";

@Global()
@Module({
  providers: [SchemaRegistry],
  exports: [SchemaRegistry],
})
export class SchemasModule {}
