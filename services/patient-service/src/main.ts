import { NestFactory } from "@nestjs/core";
import { patientConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "patient-service" }));

  const port = patientConfig.port ?? Number(process.env.PORT ?? 3053);
  await app.listen(port);
  console.log(`Patient service listening on http://localhost:${port}`);
}

bootstrap();
