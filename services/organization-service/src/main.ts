import { NestFactory } from "@nestjs/core";
import { organizationConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "organization-service" }));

  const port = organizationConfig.port ?? Number(process.env.PORT ?? 3066);
  await app.listen(port);
  console.log(`Organization service listening on http://localhost:${port}`);
}

bootstrap();
