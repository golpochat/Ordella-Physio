import { NestFactory } from "@nestjs/core";
import { notesConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "notes-service" }));

  const port = notesConfig.port ?? Number(process.env.PORT ?? 3055);
  await app.listen(port);
  console.log(`Notes service listening on http://localhost:${port}`);
}

bootstrap();
