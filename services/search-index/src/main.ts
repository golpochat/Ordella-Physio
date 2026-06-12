import { NestFactory } from "@nestjs/core";
import { searchIndexConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("search-index");
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "search-index-service" }));

  const port = searchIndexConfig.port ?? Number(process.env.PORT ?? 3073);
  await app.listen(port);
  console.log(`Search index service listening on http://localhost:${port}`);
}

bootstrap();
