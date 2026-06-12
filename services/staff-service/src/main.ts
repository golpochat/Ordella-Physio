import { NestFactory } from "@nestjs/core";
import { staffConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "staff-service" }));

  const port = staffConfig.port ?? Number(process.env.PORT ?? 3069);
  await app.listen(port);
  console.log(`Staff service listening on http://localhost:${port}`);
}

bootstrap();
