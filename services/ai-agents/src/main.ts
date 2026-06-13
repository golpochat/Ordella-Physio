import { NestFactory } from "@nestjs/core";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { aiAgentsConfig } from "@/config/ai-agents.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-agents-service" }));

  await app.listen(aiAgentsConfig.port);
}

void bootstrap();
