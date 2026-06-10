import { NestFactory } from "@nestjs/core";
import { aiNotesConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-notes-service" }));

  const port = aiNotesConfig.port ?? Number(process.env.PORT ?? 3063);
  await app.listen(port);
  console.log(`AI notes service listening on http://localhost:${port}`);
}

bootstrap();
