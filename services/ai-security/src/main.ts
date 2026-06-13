import { NestFactory } from "@nestjs/core";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { aiSecurityConfig } from "@/config/ai-security.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-security-service" }));

  await app.listen(aiSecurityConfig.port);
}

void bootstrap();
