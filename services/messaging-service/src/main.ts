import { NestFactory } from "@nestjs/core";
import { messagingConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "messaging-service" }));

  const port = messagingConfig.port ?? Number(process.env.PORT ?? 3061);
  await app.listen(port);
  console.log(`Messaging service listening on http://localhost:${port}`);
}

bootstrap();
