import { NestFactory } from "@nestjs/core";
import { aiServiceConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("ai");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-service" }));

  const port = aiServiceConfig.port ?? Number(process.env.PORT ?? 3075);
  await app.listen(port);
  console.log(`AI service listening on http://localhost:${port}`);
}

bootstrap();
