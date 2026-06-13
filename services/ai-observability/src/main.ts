import { NestFactory } from "@nestjs/core";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { aiObservabilityConfig } from "@/config/ai-observability.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-observability-service" }));

  await app.listen(aiObservabilityConfig.port);
}

void bootstrap();
