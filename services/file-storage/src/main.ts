import { NestFactory } from "@nestjs/core";
import { fileStorageConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "file-storage-service" }));

  const port = fileStorageConfig.port ?? Number(process.env.PORT ?? 3071);
  await app.listen(port);
  console.log(`File storage service listening on http://localhost:${port}`);
}

bootstrap();
