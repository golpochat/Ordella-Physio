import { NestFactory } from "@nestjs/core";
import { billingConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "billing-service" }));

  const port = billingConfig.port ?? Number(process.env.PORT ?? 3056);
  await app.listen(port);
  console.log(`Billing service listening on http://localhost:${port}`);
}

bootstrap();
