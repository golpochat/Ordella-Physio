import { NestFactory } from "@nestjs/core";
import { auditConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "audit-service" }));

  const port = auditConfig.port ?? Number(process.env.PORT ?? 3070);
  await app.listen(port);
  console.log(`Audit service listening on http://localhost:${port}`);
}

bootstrap();
