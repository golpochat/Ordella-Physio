import { NestFactory } from "@nestjs/core";
import { communicationConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "communication-service" }));

  const port = communicationConfig.port ?? Number(process.env.PORT ?? 3058);
  await app.listen(port);
  console.log(`Communication service listening on http://localhost:${port}`);
}

bootstrap();
