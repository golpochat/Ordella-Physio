import { NestFactory } from "@nestjs/core";
import { notificationProviderConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("notification-providers");
  app.useGlobalFilters(
    new GlobalExceptionFilter({ loggerContext: "notification-provider-service" }),
  );

  const port = notificationProviderConfig.port ?? Number(process.env.PORT ?? 3072);
  await app.listen(port);
  console.log(`Notification provider service listening on http://localhost:${port}`);
}

bootstrap();
