import { NestFactory } from "@nestjs/core";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { featureFlagsConfig } from "@/config/feature-flags.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "feature-flags-service" }));

  await app.listen(featureFlagsConfig.port);
}

void bootstrap();
