import { NestFactory } from "@nestjs/core";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { trainingConfig } from "@/config/training.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-training-service" }));

  const port = trainingConfig.port;
  await app.listen(port);
}

void bootstrap();
