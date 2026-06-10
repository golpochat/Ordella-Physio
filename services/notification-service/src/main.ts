import { NestFactory } from "@nestjs/core";
import { notificationConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "notification-service" }));

  const port = notificationConfig.port ?? Number(process.env.PORT ?? 3062);
  await app.listen(port);
  console.log(`Notification service listening on http://localhost:${port}`);
}

bootstrap();
