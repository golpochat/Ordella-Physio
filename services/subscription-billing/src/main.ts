import { NestFactory } from "@nestjs/core";
import { subscriptionBillingConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix("subscription-billing");
  app.useGlobalFilters(
    new GlobalExceptionFilter({ loggerContext: "subscription-billing-service" }),
  );

  const port = subscriptionBillingConfig.port ?? Number(process.env.PORT ?? 3074);
  await app.listen(port);
  console.log(`Subscription billing service listening on http://localhost:${port}`);
}

bootstrap();
