import { NestFactory } from "@nestjs/core";
import { marketplaceConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "marketplace-service" }));

  const port = marketplaceConfig.port ?? Number(process.env.PORT ?? 3064);
  await app.listen(port);
  console.log(`Marketplace service listening on http://localhost:${port}`);
}

bootstrap();
