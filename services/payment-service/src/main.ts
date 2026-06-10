import { NestFactory } from "@nestjs/core";
import { paymentConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "payment-service" }));

  const port = paymentConfig.port ?? Number(process.env.PORT ?? 3057);
  await app.listen(port);
  console.log(`Payment service listening on http://localhost:${port}`);
}

bootstrap();
