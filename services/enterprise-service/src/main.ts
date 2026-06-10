import { NestFactory } from "@nestjs/core";
import { enterpriseConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "enterprise-service" }));

  const port = enterpriseConfig.port ?? Number(process.env.PORT ?? 3065);
  await app.listen(port);
  console.log(`Enterprise service listening on http://localhost:${port}`);
}

bootstrap();
