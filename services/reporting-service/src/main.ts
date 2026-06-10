import { NestFactory } from "@nestjs/core";
import { reportingConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "reporting-service" }));

  const port = reportingConfig.port ?? Number(process.env.PORT ?? 3059);
  await app.listen(port);
  console.log(`Reporting service listening on http://localhost:${port}`);
}

bootstrap();
