import { NestFactory } from "@nestjs/core";
import { pharmacyConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "pharmacy-service" }));

  const port = pharmacyConfig.port ?? Number(process.env.PORT ?? 3085);
  await app.listen(port);
  console.log(`Pharmacy service listening on http://localhost:${port}`);
}

bootstrap();
