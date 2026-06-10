import { NestFactory } from "@nestjs/core";
import { tenantConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "tenant-service" }));

  const port = tenantConfig.port ?? Number(process.env.PORT ?? 3052);
  await app.listen(port);
  console.log(`Tenant service listening on http://localhost:${port}`);
}

bootstrap();
